#!/usr/bin/env node
// cursor-runner.mjs
//
// Runs a Kiro-written prompt pack through Cursor's headless CLI (`agent -p`):
// each prompt in a fresh chat, in order, with its skills invoked as /skill-name.
// It stops at the first prompt that fails, asks a question, or leaves the repo
// uncommitted or unpushed. No dependencies. Node 18+. Windows, macOS, Linux.
//
// Run it from your repo root:
//   node cursor-runner.mjs docs/prompts/PACK-3.md --dry-run
//   node cursor-runner.mjs docs/prompts/PACK-3.md --only P24
//   node cursor-runner.mjs docs/prompts/PACK-3.md --from P25 --verify "npm.cmd run verify"
//
// Pack format (what your packs already use):
//   ## P24: Title                  one heading per prompt: "## <ID>: <title>"
//   Branch `p24-hygiene`.          optional; "Branch none" means stay on the current branch
//   ```                            the FIRST fenced block under the heading is the prompt,
//   Skills: /tdd, surgical-patch   and its first line lists the skills
//   ```
//   "(DEFERRED" in the heading, or "Skip this prompt" above the block   -> skipped
//   "Plan mode first" above the block, or "Plan then Agent" in the table -> plan, pause, approve
//   "Strong model" above the block, or "Yes" in a "Strong model?" column -> uses --strong-model

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const IS_WIN = process.platform === 'win32';
const RUN_DIR_NAME = '.cursor-runner';

const HELP = `Usage: node cursor-runner.mjs <pack.md> [options]

  --status               Show whether a run is active and each prompt's result. Calls nothing.
  --wait <seconds>       With --status: keep checking every 5 s while a run is active, up to this many seconds.
  --background           Start the run detached and return at once. Log: .cursor-runner/<pack>/run.log
  --dry-run              Parse the pack, resolve skills, write prompt files. Calls nothing.
  --only <ID>            Run one prompt (runs it even if the pack marks it DEFERRED).
  --from <ID>            Start at this prompt.
  --to <ID>              Stop after this prompt.
  --approve-plan         The first selected prompt is "Plan mode first" and you reviewed its plan: build it.
  --verify "<command>"   Your own check after each prompt, e.g. "npm.cmd run verify". Failure stops the run.
  --model <id>           Cursor model (default: $CURSOR_MODEL or composer-2.5). List them: agent models
  --strong-model <id>    Model for prompts the pack marks "Strong model" (default: same as --model).
  --timeout <minutes>    Stop a prompt that runs longer than this (default: 60).
  --skills-dir <dir>     Extra folder to search for skills (repeatable).
  --agent-bin <cmd>      Cursor CLI command (default: $CURSOR_AGENT_BIN or agent).
  -- <args...>           Passed straight to the Cursor CLI, e.g.  -- --sandbox disabled

Exit codes: 0 all done, 2 paused (plan ready, or the agent asked a question), 1 failed.`;

// ---------------------------------------------------------------- arguments

function parseArgs(argv) {
  const o = {
    pack: null, dryRun: false, only: null, from: null, to: null, approvePlan: false, verify: null,
    status: false, wait: 0, background: false,
    model: process.env.CURSOR_MODEL || 'composer-2.5',
    strongModel: process.env.CURSOR_STRONG_MODEL || null,
    timeoutMin: 60, skillsDirs: [], agentBin: process.env.CURSOR_AGENT_BIN || 'agent', passthrough: [],
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const value = () => {
      const v = argv[++i];
      if (v === undefined) die(`${a} needs a value.`);
      return v;
    };
    switch (a) {
      case '--': o.passthrough = argv.slice(i + 1); i = argv.length; break;
      case '--dry-run': o.dryRun = true; break;
      case '--status': o.status = true; break;
      case '--wait': o.wait = Number(value()); break;
      case '--background': o.background = true; break;
      case '--only': o.only = value().toUpperCase(); break;
      case '--from': o.from = value().toUpperCase(); break;
      case '--to': o.to = value().toUpperCase(); break;
      case '--approve-plan': o.approvePlan = true; break;
      case '--verify': o.verify = value(); break;
      case '--model': o.model = value(); break;
      case '--strong-model': o.strongModel = value(); break;
      case '--timeout': o.timeoutMin = Number(value()); break;
      case '--skills-dir': o.skillsDirs.push(value()); break;
      case '--agent-bin': o.agentBin = value(); break;
      case '-h': case '--help': console.log(HELP); process.exit(0); break;
      default:
        if (a.startsWith('-')) die(`Unknown option ${a}\n\n${HELP}`);
        if (o.pack) die('Pass exactly one pack file.');
        o.pack = a;
    }
  }
  if (!o.pack) die(HELP);
  if (o.only && (o.from || o.to)) die('Use --only, or --from/--to, not both.');
  if (!(o.timeoutMin > 0)) die('--timeout must be a positive number of minutes.');
  return o;
}

// ---------------------------------------------------------------- pack parsing

const ID_HEADING = /^#{2,3}\s+([A-Za-z]{1,4}-?\d+[A-Za-z]?)\s*:\s*(.*)$/;
const ID_CELL = /^[A-Z]{1,4}-?\d+[A-Z]?$/;

export function parsePack(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const sections = [];
  const table = new Map(); // id -> { mode, strong } from a run-order table, if the pack has one
  const otherHeadings = [];
  let cur = null;
  let fence = null; // { re } while inside a fenced block
  let cols = null;  // column indexes of the current markdown table

  for (const line of lines) {
    if (fence) {
      if (fence.re.test(line)) {
        fence = null;
        if (cur?.collecting) { cur.collecting = false; cur.closed = true; }
      } else if (cur?.collecting) {
        cur.promptLines.push(line);
      }
      continue;
    }
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) {
      fence = { re: new RegExp(`^ {0,3}${open[1][0]}{${open[1].length},}\\s*$`) };
      if (cur && cur.promptLines === null) { cur.promptLines = []; cur.collecting = true; }
      cols = null;
      continue;
    }
    const h = line.match(ID_HEADING);
    if (h) {
      cur = { id: h[1].toUpperCase(), heading: h[2].trim(), meta: [], promptLines: null, collecting: false, closed: false };
      sections.push(cur);
      cols = null;
      continue;
    }
    if (/^#{1,6}\s/.test(line)) { otherHeadings.push(line.replace(/^#+\s*/, '').trim()); cur = null; cols = null; continue; }

    if (/^\s*\|/.test(line)) {
      const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // separator row
      if (!cols) {
        const lower = cells.map((c) => c.toLowerCase());
        cols = {
          id: lower.indexOf('id'),
          mode: lower.findIndex((c) => c.startsWith('mode')),
          strong: lower.findIndex((c) => c.includes('strong')),
        };
        continue;
      }
      const id = (cells[cols.id] ?? '').toUpperCase();
      if (cols.id >= 0 && ID_CELL.test(id)) {
        table.set(id, { mode: cells[cols.mode] ?? '', strong: cells[cols.strong] ?? '' });
      }
      continue;
    }
    cols = null;
    if (cur && cur.promptLines === null) cur.meta.push(line);
  }

  return {
    otherHeadings,
    sections: sections.map((s) => {
      const meta = s.meta.join('\n');
      const row = table.get(s.id) ?? {};
      const branchMatch = meta.match(/\bBranch\s+`([^`]+)`/i);
      const branch = branchMatch && branchMatch[1].trim().toLowerCase() !== 'none' ? branchMatch[1].trim() : null;
      const prompt = s.closed ? s.promptLines.join('\n').trim() : '';
      return {
        id: s.id,
        heading: s.heading,
        branch,
        deferred: /\bDEFERRED\b/.test(s.heading) || /skip this prompt/i.test(meta),
        plan: /plan mode first|plan then agent/i.test(`${meta}\n${row.mode ?? ''}`),
        strong: /strong model/i.test(meta) || /^y(es)?\b/i.test(row.strong ?? ''),
        prompt,
        skills: parseSkillsLine(prompt),
      };
    }),
  };
}

// "Skills: /tdd, surgical-patch, /impeccable audit, context7 for Sentry. Run the ..." -> names + args
export function parseSkillsLine(prompt) {
  const first = prompt.split('\n').find((l) => l.trim()) ?? '';
  const m = first.match(/^\s*\**\s*skills\s*\**\s*:\s*\**(.*)$/i);
  if (!m) return [];
  let list = m[1];
  const end = list.search(/\.(\s|$)/); // the list ends at the first full stop
  if (end >= 0) list = list.slice(0, end);
  return list.split(',').map((t) => t.replace(/[`*]/g, '').trim()).filter(Boolean).map((t) => {
    const [word, ...rest] = t.split(/\s+/);
    return { name: word.replace(/^\//, '').toLowerCase(), args: rest.join(' '), raw: t };
  }).filter((s) => /^[a-z0-9][a-z0-9-]*$/.test(s.name));
}

// ---------------------------------------------------------------- skills on disk

// Same places Cursor loads skills and commands from (docs: cursor.com/docs/skills).
// Used to decide which names get a /slash invocation and to warn about missing ones.
function buildSkillIndex(repo, extraDirs) {
  const home = os.homedir();
  const kinds = ['.cursor/skills', '.agents/skills', '.claude/skills', '.codex/skills'];
  const roots = [
    ...extraDirs.map((d) => path.resolve(d)),
    ...kinds.map((k) => path.join(repo, k)),
    ...kinds.map((k) => path.join(home, k)),
    path.join(home, '.cursor', 'plugins'),
  ];
  const index = new Map();
  const walk = (dir, depth) => {
    if (depth > 6) return;
    let names;
    try { names = fs.readdirSync(dir); } catch { return; }
    if (names.includes('SKILL.md')) {
      const n = path.basename(dir).toLowerCase();
      if (!index.has(n)) index.set(n, path.join(dir, 'SKILL.md'));
    }
    for (const name of names) {
      if (name === 'node_modules' || name === '.git') continue;
      const full = path.join(dir, name);
      let st;
      try { st = fs.statSync(full); } catch { continue; } // statSync follows symlinked skill folders
      if (st.isDirectory()) walk(full, depth + 1);
    }
  };
  roots.forEach((r) => walk(r, 0));
  for (const dir of [path.join(repo, '.cursor', 'commands'), path.join(home, '.cursor', 'commands')]) {
    let names = [];
    try { names = fs.readdirSync(dir); } catch { /* none */ }
    for (const f of names) {
      if (!f.endsWith('.md')) continue;
      const n = f.slice(0, -3).toLowerCase();
      if (!index.has(n)) index.set(n, path.join(dir, f));
    }
  }
  return index;
}

// ---------------------------------------------------------------- git

function git(repo, args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd: repo, encoding: 'utf8' });
  if (r.error) die(`git is not available: ${r.error.message}`);
  if (r.status !== 0 && !allowFail) die(`git ${args.join(' ')} failed:\n${r.stderr || r.stdout}`);
  return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
}

const gitState = (repo) => ({
  head: git(repo, ['rev-parse', 'HEAD']).out,
  branch: git(repo, ['rev-parse', '--abbrev-ref', 'HEAD']).out,
  dirty: git(repo, ['status', '--porcelain']).out,
});

// Pushed = HEAD is contained in at least one remote-tracking branch. Works without an upstream.
const isPushed = (repo) => git(repo, ['branch', '-r', '--contains', 'HEAD'], { allowFail: true }).out.length > 0;

function checkoutBranch(repo, branch) {
  if (git(repo, ['rev-parse', '--abbrev-ref', 'HEAD']).out === branch) return 'already on it';
  const local = git(repo, ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { allowFail: true }).ok;
  const remote = git(repo, ['for-each-ref', '--format=%(refname)', `refs/remotes/*/${branch}`]).out.length > 0;
  if (local || remote) { git(repo, ['switch', branch]); return 'switched'; }
  git(repo, ['switch', '-c', branch]); // stacked on the previous prompt's branch, like your earlier packs
  return 'created from current HEAD';
}

// Keeps the runner's files out of `git status` without touching .gitignore (local-only, never committed).
function ensureExcluded(repo) {
  const file = path.resolve(repo, git(repo, ['rev-parse', '--git-path', 'info/exclude']).out);
  const entry = `/${RUN_DIR_NAME}/`;
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (current.split(/\r?\n/).includes(entry)) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${current && !current.endsWith('\n') ? '\n' : ''}${entry}\n`);
  log(`Added ${entry} to ${path.relative(repo, file)} (local-only ignore, never committed).`);
}

// ---------------------------------------------------------------- Cursor CLI

// cmd.exe can't carry newlines or quotes inside one argument, which is why the prompt goes in a file
// and the command line only carries a short one-line message.
export function winQuote(arg) {
  if (/^[\w@+=:,./\\-]+$/.test(arg)) return arg;
  if (/["\r\n%]/.test(arg)) die(`Can't pass this argument safely through cmd.exe: ${arg}`);
  return `"${arg}"`;
}

function spawnAgent(bin, args, cwd) {
  return IS_WIN
    ? spawn([bin, ...args.map(winQuote)].join(' '), { cwd, shell: true, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
    : spawn(bin, args, { cwd, detached: true, stdio: ['ignore', 'pipe', 'pipe'] }); // own process group, so we can stop all of it
}

function killTree(child) {
  if (child.exitCode !== null) return;
  if (IS_WIN) spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F']);
  else {
    try { process.kill(-child.pid, 'SIGTERM'); } catch { return; }
    setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { /* gone */ } }, 5000).unref();
  }
}

function preflight(bin) {
  const r = IS_WIN
    ? spawnSync(`${bin} --version`, { shell: true, encoding: 'utf8' })
    : spawnSync(bin, ['--version'], { encoding: 'utf8' });
  if (r.error || r.status !== 0) {
    die(`The Cursor CLI isn't working ("${bin} --version" failed).
Install it (PowerShell):  irm 'https://cursor.com/install?win32=true' | iex
Then sign in:            agent login
Installed under another name? Pass --agent-bin <command>.`);
  }
  return (r.stdout || '').trim().split('\n')[0];
}

let activeChild = null;

function runAgent({ bin, args, cwd, logFile, timeoutMs, tag }) {
  return new Promise((resolve) => {
    const logStream = fs.createWriteStream(logFile);
    const st = { sessionId: null, lastText: '', result: null, timedOut: false, model: null };
    const child = spawnAgent(bin, args, cwd);
    activeChild = child;
    const timer = setTimeout(() => { st.timedOut = true; killTree(child); }, timeoutMs);
    let buf = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      buf += chunk;
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line) continue;
        logStream.write(`${line}\n`);
        let ev;
        try { ev = JSON.parse(line); } catch { log(`${tag} ${oneLine(line, 140)}`); continue; }
        onEvent(ev, st, tag);
      }
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk) => {
      logStream.write(`[stderr] ${chunk}`);
      chunk.split('\n').filter((l) => l.trim()).forEach((l) => log(`${tag} ! ${oneLine(l, 160)}`));
    });
    let settled = false;
    const finish = (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      activeChild = null;
      logStream.end();
      resolve({ ...st, code });
    };
    child.on('error', (e) => { st.spawnError = e.message; finish(-1); });
    child.on('close', (code) => finish(code));
  });
}

function onEvent(ev, st, tag) {
  if (ev.session_id && !st.sessionId) st.sessionId = ev.session_id;
  if (ev.type === 'system' && ev.subtype === 'init') {
    st.model = ev.model;
    log(`${tag} model: ${ev.model}   chat: ${ev.session_id}`);
  } else if (ev.type === 'assistant') {
    const text = (ev.message?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    if (text.trim()) { st.lastText = text; log(`${tag} ${oneLine(text, 120)}`); }
  } else if (ev.type === 'tool_call' && ev.subtype === 'started') {
    log(`${tag}   - ${describeTool(ev.tool_call)}`);
  } else if (ev.type === 'result') {
    st.result = ev;
  }
}

function describeTool(tc = {}) {
  const [kind, body = {}] = Object.entries(tc)[0] ?? ['tool'];
  if (kind === 'function') return body.name ?? 'tool';
  const a = body.args ?? {};
  const detail = a.path ?? a.command ?? a.pattern ?? a.query ?? a.url ?? '';
  return `${kind.replace(/ToolCall$/, '')} ${oneLine(String(detail), 100)}`.trim();
}

// ---------------------------------------------------------------- prompt composition

function composePrompt(s, phase, packName, planText, skillFiles) {
  const out = [`<!-- cursor-runner: generated from ${packName} > ${s.id}. Edit the pack, not this file. -->`, `# ${s.id}: ${s.heading}`, ''];
  if (skillFiles.length) {
    out.push('## Skills',
      'These skills were invoked for this chat. If one of them is not already in your context, read its file before you start, and follow it for the whole task.',
      ...skillFiles.map(([name, file]) => `- /${name}: ${file}`), '');
  }
  if (phase === 'plan') {
    out.push('## Plan mode, unattended run',
      '- Nobody can answer questions during this run. Make the complete implementation plan your final message. Do not edit files.',
      '- Put each decision you need from the owner on its own line starting with `QUESTION:`. The owner answers them in the plan before approving it.', '');
  } else {
    out.push('## Unattended run',
      s.branch
        ? `- Branch \`${s.branch}\` is already checked out. Commit and push here. Do not switch branches.`
        : '- Stay on the current branch. Do not switch branches.',
      '- Nobody can answer questions during this run. Wherever the task says "stop and ask", stop: make no further changes, and end your report with one line per question, each starting with `QUESTION:`.',
      '- If you cannot finish, say why on a line starting with `BLOCKED:`.', '');
    if (planText) out.push('## Approved plan', 'The owner reviewed this plan from Plan mode. Implement it, within the task below.', '', planText.trim(), '');
  }
  out.push('## Task', '', s.prompt, '');
  return out.join('\n');
}

// ---------------------------------------------------------------- summary

function loadState(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; }
}

function renderSummary({ pack, packName, repo, state, next }) {
  const cell = (v) => String(v ?? '').replace(/\|/g, '\\|');
  const rows = pack.sections.map((s) => {
    const r = state[s.id] ?? {};
    const commits = r.commits === undefined ? '' : `${r.commits}${r.head ? ` (${r.head})` : ''}`;
    const pushed = r.pushed === undefined ? '' : r.pushed === null ? '-' : r.pushed ? 'yes' : 'no';
    const file = r.report ? `[${r.report}](${r.report})` : '';
    return `| ${s.id} | ${cell(s.heading)} | ${r.status ?? 'not run'} | ${cell(r.branch ?? s.branch ?? '-')} | ${commits} | ${pushed} | ${r.duration ?? ''} | ${file} |`;
  });
  const details = pack.sections.filter((s) => state[s.id]).map((s) => {
    const r = state[s.id];
    return [
      `### ${s.id}: ${s.heading}`,
      `- Status: ${r.status}${r.at ? ` (${r.at})` : ''}`,
      r.problems?.length ? `- Problems: ${r.problems.join('; ')}` : null,
      r.questions?.length ? `- Agent asked:\n${r.questions.map((q) => `  - ${q}`).join('\n')}` : null,
      r.warnings?.length ? `- Warnings: ${r.warnings.join('; ')}` : null,
      r.diffStat ? `- Diff: ${r.diffStat}` : null,
      r.usage ? `- Usage: ${r.usage}` : null,
      r.sessionId ? `- Chat: \`${r.sessionId}\` (continue it with \`agent --resume ${r.sessionId}\`)` : null,
    ].filter(Boolean).join('\n');
  });
  return [
    `# Cursor runner: ${packName}`, '',
    `Repo: \`${repo}\`  `, `Updated: ${new Date().toISOString()}`, '',
    next ? `**Next:** ${next}\n` : '',
    '| Id | Title | Status | Branch | Commits | Pushed | Time | Report |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
    ...rows, '', '## Details', '', ...details.join('\n\n').split('\n'), '',
  ].join('\n');
}

// ---------------------------------------------------------------- run lock and status

// One run per pack at a time. The lock holds the run's pid; a lock whose pid is gone is stale and ignored.
const lockFile = (runDir) => path.join(runDir, 'run.lock.json');

function readLock(runDir) {
  let lock;
  try { lock = JSON.parse(fs.readFileSync(lockFile(runDir), 'utf8')); } catch { return null; }
  try { process.kill(lock.pid, 0); return lock; } catch (e) { return e.code === 'EPERM' ? lock : null; }
}

function acquireLock(runDir, command) {
  const live = readLock(runDir);
  if (live) die(`A run is already active (pid ${live.pid}, started ${live.started}). Not starting another. Check it with --status.`);
  fs.writeFileSync(lockFile(runDir), JSON.stringify({ pid: process.pid, started: new Date().toISOString(), command }, null, 2));
  process.on('exit', () => { try { fs.unlinkSync(lockFile(runDir)); } catch { /* already gone */ } });
}

function printStatus(runDir, packName) {
  const lock = readLock(runDir);
  const state = loadState(path.join(runDir, 'state.json'));
  log(`${packName}: ${lock ? `RUNNING (pid ${lock.pid}, started ${lock.started})` : 'not running'}`);
  for (const [id, r] of Object.entries(state)) {
    const pushed = r.pushed === undefined ? '' : ` | pushed: ${r.pushed === null ? '-' : r.pushed ? 'yes' : 'no'}`;
    log(`  ${id}: ${r.status}${pushed}${r.at ? ` (${r.at})` : ''}`);
  }
  if (!Object.keys(state).length) log('  no prompts have run yet');
  const summary = path.join(runDir, 'SUMMARY.md');
  const next = fs.existsSync(summary) ? fs.readFileSync(summary, 'utf8').split('\n').find((l) => l.startsWith('**Next:**')) : null;
  if (next) log(`  ${next}`);
  const logFile = path.join(runDir, 'run.log');
  if (fs.existsSync(logFile)) {
    log(`  last lines of ${path.relative(process.cwd(), logFile)}:`);
    fs.readFileSync(logFile, 'utf8').split('\n').filter(Boolean).slice(-10).forEach((l) => log(`    ${oneLine(l, 160)}`));
  }
  return lock;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- main

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const top = git(process.cwd(), ['rev-parse', '--show-toplevel'], { allowFail: true });
  if (!top.ok) die('Run this from inside your git repo.');
  const repo = path.resolve(top.out);

  const packPath = path.resolve(opts.pack);
  if (!fs.existsSync(packPath)) die(`Pack not found: ${packPath}`);
  const packName = path.basename(packPath);
  const pack = parsePack(fs.readFileSync(packPath, 'utf8'));
  if (!pack.sections.length) die(`No prompts found in ${packName}. Expected "## P24: Title" headings, each followed by a fenced code block.`);
  const seen = new Set();
  for (const s of pack.sections) {
    if (seen.has(s.id)) die(`${s.id} appears twice in ${packName}.`);
    seen.add(s.id);
    if (!s.prompt) die(`${s.id} has no complete fenced code block for its prompt.`);
  }

  const indexOf = (id) => {
    const i = pack.sections.findIndex((s) => s.id === id);
    if (i < 0) die(`${id} is not in ${packName}. Prompts: ${pack.sections.map((s) => s.id).join(', ')}`);
    return i;
  };
  const selected = opts.only
    ? [pack.sections[indexOf(opts.only)]]
    : pack.sections.slice(opts.from ? indexOf(opts.from) : 0, (opts.to ? indexOf(opts.to) : pack.sections.length - 1) + 1);
  if (!selected.length) die('--to comes before --from.');

  const runDir = path.join(repo, RUN_DIR_NAME, path.basename(packPath, path.extname(packPath)).replace(/[^\w.-]/g, '-'));

  if (opts.status) {
    let lock = printStatus(runDir, packName);
    const deadline = Date.now() + opts.wait * 1000;
    while (lock && opts.wait > 0 && Date.now() < deadline) {
      await sleep(5000);
      lock = readLock(runDir);
    }
    if (opts.wait > 0) log(`\n${lock ? 'Still running. Check again with the same command.' : 'Run has stopped. Final status:'}`);
    if (opts.wait > 0 && !lock) printStatus(runDir, packName);
    process.exitCode = lock ? 3 : 0;
    return;
  }

  if (opts.background) {
    const live = readLock(runDir);
    if (live) die(`A run is already active (pid ${live.pid}, started ${live.started}). Not starting another. Check it with --status.`);
    fs.mkdirSync(runDir, { recursive: true });
    const logFd = fs.openSync(path.join(runDir, 'run.log'), 'w');
    const child = spawn(process.execPath, process.argv.slice(1).filter((a) => a !== '--background'), {
      cwd: process.cwd(), detached: true, stdio: ['ignore', logFd, logFd], windowsHide: true,
    });
    child.unref();
    log(`Started in the background (pid ${child.pid}). Output: ${path.relative(process.cwd(), path.join(runDir, 'run.log'))}`);
    log(`Check it: node "automate Building\\cursor-runner.mjs" ${opts.pack} --status --wait 25`);
    return;
  }

  fs.mkdirSync(runDir, { recursive: true });
  ensureExcluded(repo);
  const relRun = (f) => path.relative(repo, path.join(runDir, f)).split(path.sep).join('/');
  const planFile = (s) => path.join(runDir, `${s.id}.plan.md`);

  if (opts.approvePlan) {
    const first = selected[0];
    if (!first.plan) die(`--approve-plan: ${first.id} is not a "Plan mode first" prompt.`);
    if (!fs.existsSync(planFile(first))) die(`--approve-plan: there is no saved plan for ${first.id} yet. Run it once without --approve-plan.`);
  }

  if (!opts.dryRun) acquireLock(runDir, process.argv.slice(2).join(' '));

  const skills = buildSkillIndex(repo, opts.skillsDirs);
  const stateFile = path.join(runDir, 'state.json');
  const state = loadState(stateFile);
  const q = (p) => (/\s/.test(p) ? `"${p}"` : p);
  const self = `node ${q(process.argv[1])} ${q(opts.pack)}`;
  const save = (next) => {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    fs.writeFileSync(path.join(runDir, 'SUMMARY.md'), renderSummary({ pack, packName, repo, state, next }));
  };

  const human = pack.otherHeadings.filter((h) => /before you start|questions? for the owner|human/i.test(h));
  if (human.length) log(`Reminder: ${packName} has human steps (${human.join('; ')}). Do them before the prompts that need them.`);
  if (!opts.dryRun) log(`Cursor CLI: ${preflight(opts.agentBin)}`);
  const start = gitState(repo);
  log(`Repo ${repo} on ${start.branch} @ ${start.head.slice(0, 7)}. Reports: ${relRun('SUMMARY.md')}`);
  if (opts.dryRun && start.dirty) log('Warning: the working tree has uncommitted changes. A real run would stop before the first prompt.');
  log('');

  let exitCode = 0;
  let next = null;
  let shownCommand = false;

  for (const [i, s] of selected.entries()) {
    const tag = `[${s.id}]`;
    if (s.deferred && opts.only !== s.id) {
      log(`${tag} skipped: the pack marks it DEFERRED / "Skip this prompt".`);
      state[s.id] = { status: 'skipped (deferred)', at: new Date().toISOString() };
      if (!opts.dryRun) save(null);
      continue;
    }

    const phase = s.plan && !(opts.approvePlan && i === 0) ? 'plan' : 'build';
    const model = s.strong && opts.strongModel ? opts.strongModel : opts.model;
    const found = s.skills.filter((k) => skills.has(k.name));
    const missing = s.skills.filter((k) => !skills.has(k.name)).map((k) => k.name);
    const slash = [...new Set(found.map((k) => `/${k.name}`))].join(' ');
    const planText = phase === 'build' && s.plan ? fs.readFileSync(planFile(s), 'utf8') : null;
    const promptName = `${s.id}.${phase}.prompt.md`;
    const skillFiles = [...new Map(found.map((k) => [k.name, skills.get(k.name)]))];
    fs.writeFileSync(path.join(runDir, promptName), composePrompt(s, phase, packName, planText, skillFiles));

    const message = `${slash} Your task is in the file ${relRun(promptName)}. Read that whole file first, then do exactly what it says.`.trim();
    const args = ['-p', '--output-format', 'stream-json', '--trust', '--model', model,
      ...(phase === 'plan' ? ['--mode', 'plan'] : ['--force']), ...opts.passthrough, message];

    const warnings = missing.length ? [`no local skill or command named: ${missing.join(', ')} (fine for MCP servers like context7)`] : [];
    log(`${tag} ${s.heading}`);
    log(`${tag} ${phase === 'plan' ? 'PLAN (pauses for your review)' : 'build'} | branch ${s.branch ?? '(current)'} | model ${model}${s.strong ? ' (strong)' : ''}`);
    log(`${tag} skills: ${slash || '(none)'}${missing.length ? ` | not found: ${missing.join(', ')}` : ''}`);

    if (opts.dryRun) {
      log(`${tag} prompt file: ${relRun(promptName)}`);
      if (!shownCommand) log(`${tag} command: ${opts.agentBin} ${args.map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(' ')}`);
      shownCommand = true;
      log('');
      continue;
    }

    // Pre-flight: the next prompt must start from committed work (your packs' own rule, checked for free).
    const pre = gitState(repo);
    if (pre.dirty) {
      next = `Commit or stash your changes, then run: ${self} --from ${s.id}`;
      state[s.id] = { status: 'not started', problems: ['working tree has uncommitted changes'], at: new Date().toISOString() };
      log(`${tag} STOP: uncommitted changes in the repo:\n${pre.dirty}`);
      exitCode = 1;
      save(next);
      break;
    }
    if (phase === 'build' && s.branch) log(`${tag} branch ${s.branch}: ${checkoutBranch(repo, s.branch)}`);
    const before = gitState(repo);

    const t0 = Date.now();
    const res = await runAgent({
      bin: opts.agentBin, args, cwd: repo, tag,
      logFile: path.join(runDir, `${s.id}.${phase}.log`),
      timeoutMs: opts.timeoutMin * 60_000,
    });
    const duration = fmtDuration(Date.now() - t0);
    const report = res.lastText || res.result?.result || '';

    const problems = [];
    if (res.spawnError) problems.push(`could not start the Cursor CLI: ${res.spawnError}`);
    if (res.timedOut) problems.push(`stopped after ${opts.timeoutMin} min (--timeout)`);
    if (res.code !== 0 && !res.timedOut) problems.push(`Cursor CLI exited with code ${res.code}${IS_WIN && res.code === 9009 ? ' (command not found)' : ''}`);
    if (!res.result || res.result.is_error) problems.push('no successful result from the Cursor CLI');
    const questions = report.split('\n').map((l) => l.trim()).filter((l) => {
      const m = l.match(/^\W*(QUESTION|BLOCKED)[\s*_]*:[\s*_]*(.*)$/i);
      return m && !/^(none|n\/a|nothing|no)\.?$/i.test(m[2].trim());
    });
    const after = gitState(repo);
    if (phase === 'plan' && after.dirty) problems.push(`Plan mode changed files:\n${after.dirty}`);
    if (phase === 'plan' && !report.trim()) problems.push('Plan mode returned no plan');
    const reportName = phase === 'build' ? `${s.id}.result.md` : problems.length ? `${s.id}.plan.failed.md` : `${s.id}.plan.md`;
    fs.writeFileSync(path.join(runDir, reportName), report || '(the agent produced no final message)\n');
    const usage = res.result?.usage ? Object.entries(res.result.usage).filter(([, v]) => typeof v === 'number').map(([k, v]) => `${k}=${v}`).join(', ') : null;
    const base = { branch: after.branch, duration, report: reportName, sessionId: res.sessionId, usage, at: new Date().toISOString() };

    if (phase === 'plan') {
      if (problems.length) {
        state[s.id] = { ...base, status: 'FAILED (plan)', problems };
        next = `See ${relRun(reportName)} and ${relRun(`${s.id}.plan.log`)}, fix the cause, then: ${self} --from ${s.id}`;
        exitCode = 1;
      } else {
        state[s.id] = { ...base, status: 'plan ready', questions, warnings };
        next = `Review (and edit) ${relRun(reportName)}${questions.length ? ', answering its QUESTION lines' : ''}, then build it: ${self} --from ${s.id} --approve-plan`;
        exitCode = 2;
      }
      log(`${tag} ${state[s.id].status} (${duration})`);
      save(next);
      break;
    }

    if (/^\W*NOT PUSHED/i.test(report)) problems.push('the agent reported NOT PUSHED');
    if (after.dirty) problems.push('uncommitted changes left in the repo');
    if (s.branch && after.branch !== s.branch) problems.push(`ended on branch ${after.branch}, expected ${s.branch}`);
    const commits = Number(git(repo, ['rev-list', '--count', `${before.head}..HEAD`]).out);
    const pushed = commits > 0 ? isPushed(repo) : null; // null = nothing new to push
    if (/pushed:\s*yes/i.test(s.prompt) && pushed === false) problems.push('HEAD is not on any remote branch (not pushed)');
    if (!questions.length && !problems.length) {
      if (/pushed:\s*yes/i.test(s.prompt) && !/pushed:\s*yes/i.test(report)) warnings.push('report has no "Pushed: yes" line');
      if (commits === 0) warnings.push('no new commits');
    }
    const diffStat = commits > 0 ? git(repo, ['diff', '--shortstat', `${before.head}..HEAD`]).out : '';

    if (!problems.length && !questions.length && opts.verify) {
      log(`${tag} verify: ${opts.verify}`);
      const v = spawnSync(opts.verify, { cwd: repo, shell: true, encoding: 'utf8', timeout: opts.timeoutMin * 60_000, maxBuffer: 64 * 1024 * 1024 });
      fs.writeFileSync(path.join(runDir, `${s.id}.verify.log`), `${v.stdout ?? ''}\n${v.stderr ?? ''}`);
      if (v.status !== 0) problems.push(`--verify failed (exit ${v.status ?? v.signal}); see ${relRun(`${s.id}.verify.log`)}`);
    }

    const status = questions.length ? 'needs your answer' : problems.length ? 'FAILED' : 'done';
    state[s.id] = { ...base, status, commits, head: after.head.slice(0, 7), pushed, diffStat, problems, questions, warnings };
    log(`${tag} ${status} | ${commits} commit(s) | pushed: ${pushed === null ? '-' : pushed ? 'yes' : 'no'} | ${duration}`);
    questions.forEach((q) => log(`${tag}   ${q}`));
    problems.forEach((p) => log(`${tag}   problem: ${p}`));
    warnings.forEach((w) => log(`${tag}   warning: ${w}`));

    if (status !== 'done') {
      const chat = res.sessionId ? ` (\`agent --resume ${res.sessionId}\`)` : '';
      const following = selected[i + 1]?.id;
      const cont = following ? `continue with \`${self} --from ${following}\`` : 'you are done with this range';
      next = questions.length
        ? `${s.id} needs your answer. Answer it in the same chat${chat}. Once it has committed and pushed, ${cont}.`
        : `${s.id} failed. Read ${relRun(reportName)}. Fix it yourself or in the same chat${chat}, leave the tree clean, then ${cont}. To re-run ${s.id} from scratch instead: \`${self} --from ${s.id}\`.`;
      exitCode = questions.length ? 2 : 1;
      save(next);
      break;
    }
    save(null);
    log('');
  }

  if (!opts.dryRun) {
    if (exitCode === 0) save(`All selected prompts are done. Give ${relRun('SUMMARY.md')} to Kiro to plan the next pack.`);
    log(`\nSummary: ${relRun('SUMMARY.md')}`);
    if (next) log(`Next: ${next}`);
  } else {
    log(`Dry run only: nothing was sent to Cursor. Prompt files are in ${relRun('')}`);
  }
  process.exitCode = exitCode;
}

// ---------------------------------------------------------------- helpers

function log(msg) { console.log(msg); }
function die(msg) { console.error(msg); process.exit(1); }
function oneLine(s, max) { const t = s.replace(/\s+/g, ' ').trim(); return t.length > max ? `${t.slice(0, max - 1)}…` : t; }
function fmtDuration(ms) { const m = Math.floor(ms / 60000); const sec = Math.round((ms % 60000) / 1000); return m ? `${m}m ${sec}s` : `${sec}s`; }

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => { if (activeChild) killTree(activeChild); process.exit(130); });
}

if (!process.env.CURSOR_RUNNER_NO_MAIN) main(); // tests import the helpers without running
