# Token-efficiency tools for this workspace

Setup status as of November 3, 2026. This guide is reference only. Kiro does not load it automatically, so it adds no context to normal chats.

## Status

| Tool             | Kiro type      | Status                                                                                                  | Where it lives                   |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Ponytail         | Skill          | Installed from upstream `skills/ponytail/SKILL.md`. Not run in Kiro yet.                                | `.kiro/skills/ponytail/`         |
| Caveman          | Skill          | Installed from upstream `skills/caveman/SKILL.md`. Skill only, no proxy, no hooks. Not run in Kiro yet. | `.kiro/skills/caveman/`          |
| Repomix Explorer | Skill plus CLI | Skill installed. Repomix CLI reachable via `npx`, not verified from this environment.                   | `.kiro/skills/repomix-explorer/` |
| Serena           | MCP server     | Not installed. Waiting on approval for a global install. MCP entry not written (see below).             | none yet                         |
| RTK              | CLI proxy      | Installed (`rtk 1.1.0`, winget). No automatic Kiro hook exists. Use it explicitly.                      | `rtk.exe` on PATH                |

## Ponytail

Lazy-senior-dev mode. Asks for the smallest change that fully solves a task, and keeps validation, security, and error handling.

- Activation: Kiro loads it when a request matches the skill description (coding tasks, "simplest solution", "yagni", and similar).
- Only the core `ponytail` skill is installed. The review, audit, debt, gain, and help skills are not, to keep context small.
- Upstream notes that the slash commands (`/ponytail`, `/ponytail-review`) do not run in Kiro. The always-on Kiro option is `.kiro/steering/ponytail.md`, which I did not add because it loads on every message.

## Caveman

Terse answer style. Keeps code, commands, paths, and errors exact.

- Activation: say "caveman mode" or "be brief", or run `/caveman` if Kiro supports the slash form. Say "stop caveman" or "normal mode" to end it.
- Only the skill is installed. The upstream CLI, proxy, hooks, and "Auto" model routing are not installed. Auto sends prompt data to a third-party service when signed in, so it stays off.

## Repomix Explorer

Packs a repository into one file and searches it, for orientation in unfamiliar or large repos. Not for targeted edits.

- Activation: ask for a repo overview, a pattern search across many files, or metrics. Ask for file edits in the normal way.
- Run it by hand to test the CLI: `npx -y repomix@latest --version`. Node.js is needed (this machine has it).
- Known issues on Windows:
  - The skill writes to `/tmp/`. On Windows, use `$env:TEMP` or the workspace instead.
  - The skill uses `grep` and `rm`. In PowerShell, use Kiro's `grep_search` or `Select-String`, and `Remove-Item`.
  - `npx repomix@latest` downloads the newest version each run. Pin a version if you need reproducible output.
- Repomix output can contain secrets that are not in the default ignore list. Review the output before sharing it. Repomix runs its own security checks, but do not treat them as complete.

## RTK

Filters noisy command output (git, test runners, linters) before it reaches the model. Kiro is not in RTK's list of supported agents, so no hook is installed and nothing rewrites commands on its own.

Use `rtk` in front of a command when output is large:

```powershell
rtk git status
rtk git diff
rtk git log --oneline -20
```

Useful commands:

- `rtk gain`: savings summary for RTK's recorded history.
- `rtk bypass <cmd>`: run one command unfiltered when a filtered result looks wrong.
- `rtk discover`: find commands where RTK could help.

Do not run `rtk init`. It writes agent hooks into config files for tools that are not Kiro.

`rtk gain` reports bytes-based estimates of command output reduction. It does not measure your Kiro bill. Its own docs say the reduction dilutes once prompts and output tokens are counted.

## Serena (not installed)

Serena gives the agent symbol-level tools: find references, rename across files, replace a function body. These are useful for refactors.

Install steps that need your approval first:

1. `uv tool install -p 3.13 serena-agent` installs Serena globally with uv. Global installs change your user environment.
2. `serena init` writes setup files into the Serena installation, then `serena project init` in the workspace writes `.serena/project.yml`.

Planned MCP entry for `.kiro/settings/mcp.json`. Writing that file was blocked by a permission rule, so add this through Kiro's MCP settings, or allow the write and I will add it:

```json
{
  "mcpServers": {
    "serena": {
      "command": "serena",
      "args": [
        "start-mcp-server",
        "--project",
        "C:\\Users\\Xingzi\\Documents\\oversight-supply-studio"
      ],
      "env": {},
      "disabled": true
    }
  }
}
```

Set `"disabled": false` after the install works in a terminal. Test with `serena --help` first. Serena's docs warn against installing through MCP marketplaces, because those versions are outdated. Community guides also use `--context ide-assistant`. I did not verify that flag against Serena's official docs, so I left it out.

## Verifying the setup in Kiro

These checks need the Kiro UI, which I cannot open from here:

1. Open the Kiro skills list. Confirm `ponytail`, `caveman`, `repomix-explorer`, and `prompt-master` appear.
2. Ask: "Use the repomix-explorer skill to summarize this workspace's structure." Confirm the skill is used.
3. Ask a coding question with and without the ponytail skill. Compare the answers.
4. After installing Serena and enabling the MCP entry, confirm the server connects and runs a read-only lookup, such as `find_symbol` on a known function.

## Measuring savings

Savings are not confirmed yet. To measure them:

1. Pick 5 to 10 similar tasks with clear pass/fail checks, such as a test passing or a specific bug fixed.
2. Run each task twice: once with the tools off, once with them on. Start each run in a new chat.
3. Record Kiro credits used per run and whether the result passed the check.
4. Compare credits per verified task, not credits per run. A cheaper run that fails the check does not count as a saving.

## Risks and conflicts

- Ponytail and Caveman both change how the model writes replies. Ponytail asks for a closing line listing what was not checked. Caveman forbids closing lines. Both can trigger on the same request. If replies look inconsistent, keep only one active.
- The skill files are copies of upstream code and text. Update them by re-downloading, not by editing them locally.
- Serena's global install and its MCP server run code on your machine. Review the upstream source before enabling.
- Caveman's CLI and Auto routing send data to third-party services. They are not installed here.
