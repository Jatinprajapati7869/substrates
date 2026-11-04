#!/usr/bin/env node
// Cursor `stop` hook: if the agent finishes with uncommitted changes or unpushed
// commits, send it back with an instruction to commit and push.
// Prints ONLY JSON on stdout. Always exits 0. Set SKIP_COMMIT_HOOK=1 to disable.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", timeout: 15000, stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function readStdin() {
  try {
    const data = readFileSync(0, "utf8");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function main() {
  if (process.env.SKIP_COMMIT_HOOK === "1") return {};

  const input = readStdin();
  // Only nag after a normal finish, not after an abort or error.
  if (input.status && input.status !== "completed") return {};

  let branch;
  try {
    git(["rev-parse", "--is-inside-work-tree"]);
    branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  } catch {
    return {};
  }

  const problems = [];

  let dirty = "";
  try {
    dirty = git(["status", "--porcelain"]);
  } catch {
    return {};
  }
  if (dirty) {
    const count = dirty.split("\n").length;
    problems.push(`${count} file(s) have uncommitted changes`);
  }

  if (branch === "main" || branch === "master") {
    if (dirty) problems.push(`you are on ${branch}; create a task branch (pNN-short-name) and commit there, never on ${branch}`);
  } else {
    let upstream = "";
    try {
      upstream = git(["rev-parse", "--abbrev-ref", `${branch}@{u}`]);
    } catch {
      upstream = "";
    }
    if (!upstream) {
      let hasCommitsNotOnMain = true;
      try {
        hasCommitsNotOnMain = Number(git(["rev-list", "--count", "origin/main..HEAD"])) > 0;
      } catch {
        hasCommitsNotOnMain = true;
      }
      if (hasCommitsNotOnMain || dirty) problems.push(`branch ${branch} has not been pushed (no upstream)`);
    } else {
      try {
        const ahead = Number(git(["rev-list", "--count", `${upstream}..HEAD`]));
        if (ahead > 0) problems.push(`${ahead} commit(s) on ${branch} are not pushed`);
      } catch {
        // ignore
      }
    }
  }

  if (problems.length === 0) return {};

  const loop = Number(input.loop_count || 0);
  return {
    followup_message:
      `MANDATORY GIT RULE (.cursor/rules/git-commit-push.mdc): you are not done. ${problems.join("; ")}. ` +
      `Stage only the files this task changed, commit with a conventional message naming the task, run ` +
      `git push -u origin ${branch === "main" || branch === "master" ? "<task-branch>" : branch}, then run git status -sb and git log -1 --stat and ` +
      `end your report with the branch, the commit hash, and "Pushed: yes" plus the git status -sb line. ` +
      `If the push fails, start the report with NOT PUSHED and the exact error.` +
      (loop >= 1 ? " This is a repeat reminder; do not finish before the push succeeds." : ""),
  };
}

try {
  process.stdout.write(JSON.stringify(main()));
} catch {
  process.stdout.write("{}");
}
process.exit(0);
