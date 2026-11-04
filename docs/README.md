# Substrates docs

Single source of truth for building and shipping Substrates. Agents read `docs/PROGRESS.md` first on every prompt.

| File                                                    | Purpose                                                                |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| [charter.md](charter.md)                                | What the product is, who it is for, in and out of scope                |
| [SPEC.md](SPEC.md)                                      | Testable scenarios with the evidence we accept                         |
| [ARCHITECTURE.md](ARCHITECTURE.md)                      | Stack, folders, data stores, trust boundaries                          |
| [WORKFLOW.md](WORKFLOW.md)                              | Branch, PR, CI, Cursor usage, review cadence                           |
| [RELEASE.md](RELEASE.md)                                | What "ready to launch" means, rollback                                 |
| [SECURITY.md](SECURITY.md)                              | Threat model and checklist                                             |
| [DECISIONS.md](DECISIONS.md)                            | Closed and open decisions, with defaults                               |
| [LATER.md](LATER.md)                                    | Deferred work                                                          |
| [PROGRESS.md](PROGRESS.md)                              | Prompt tracker. Updated by every prompt                                |
| [OLD-STARTUP-REUSE.md](OLD-STARTUP-REUSE.md)            | What was taken from the earlier startup and what was not               |
| [prompts/PACK-1.md](prompts/PACK-1.md)                  | Cursor prompts P01 to P21, each with skills to invoke                  |
| [example_customer_recivere/](example_customer_recivere) | Examples of what a customer receives (Collage template, per assistant) |
| [runbooks/](runbooks)                                   | Operator steps for GitHub, Vercel, Heroku, launch                      |
| [plans/](plans)                                         | Historical plans. The Supabase-era launch plan is superseded           |

Cursor config lives in `.cursor/rules/` (always-on rules) and `.cursor/agents/` (read-only reviewers).
