# Workflow

## Loop for every prompt

1. Open a new Cursor Agent chat on this repo root. One prompt per chat.
2. Paste the prompt from `docs/prompts/PACK-1.md`.
3. The agent reads `docs/PROGRESS.md`, creates branch `pNN-short-name`, does the work, runs checks, updates `PROGRESS.md`, commits, pushes the branch.
4. You open the PR, wait for CI, open the Vercel preview, run the manual steps the report lists, then merge.
5. Next prompt only after the previous one is merged (so the next branch starts from current `main`).

## Commit cadence

Commit and push after every prompt (never fewer than every 2 prompts), so the GitHub graph shows steady progress and nothing is lost. Why: pack 1 finished P01 to P21 with nothing committed, leaving ~100 files only on disk. On Windows PowerShell use `npm.cmd` (the `npm.ps1` shim is blocked by execution policy).

## Branches and history

- `main` is production. Vercel deploys it.
- Never force-push or rewrite pushed history. Revert with a new commit.
- Squash-merge PRs. Title format: `P07: firestore rules tests`.
- After Lovable is disconnected (human step in P02), the Lovable sync warning in `AGENTS.md` goes away, but the no-rewrite rule stays.

## Cursor setup

- Always-on rules: `.cursor/rules/`. Read-only reviewers: `.cursor/agents/code-reviewer.md`, `security-auditor.md`.
- Model choice: use your strongest available model for P10, P11, P19 (design, money, review) and a fast coding model such as Composer for the rest. Model availability changes; check the model picker rather than trusting this file.
- Use Plan mode first for P06, P09, P10, P11, P16. Use Agent mode for the rest.
- Cursor Pro has a usage budget. Prefer one scoped prompt per chat and avoid pasting whole files; the prompts name paths so the agent reads only what it needs.

## Checks

| Command                 | When                   |
| ----------------------- | ---------------------- |
| `npm run lint`          | every prompt           |
| `npm run typecheck`     | every prompt after P05 |
| `npm test`              | every prompt           |
| `npm run build`         | every prompt           |
| `npm run check:vendors` | after P03              |

CI runs the same set on every PR and on push to `main`.

## Local pre-commit (optional)

No Husky dependency. Enable once:

```bash
git config core.hooksPath .githooks
```

`.githooks/pre-commit` runs `prettier --check` on staged files and `gitleaks detect` when `gitleaks` is on PATH. CI always runs gitleaks-action.

## Review cadence

- After a prompt that touches money, auth, rules, or headers: run the `security-auditor` subagent on the branch.
- Prompt P19 is the full review. P20 repairs it.

## Secrets

Names go in chat and docs; values go only in Vercel, Firebase, Stripe, Heroku dashboards or local `.env`. If a value leaks into a commit, rotate it. Do not rely on deleting the commit.
