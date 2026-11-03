# Progress

Every prompt reads this first and updates its own row. Mark done only when the prompt's Done-when is true. Status: `todo`, `done`, `blocked`, `skipped`. Put branch and PR in Notes.

## Setup (done by Kiro on 2026-11-03)

- [x] docs/ set, `.cursor/rules/`, `.cursor/agents/`, prompt pack written
- [x] Supabase-era plan marked superseded; owner answers recorded in DECISIONS (2026-11-03)
- [x] Assistant example copies live under `docs/example_customer_recivere/Collage template/` (see `docs/prompts/PACK-1.md` for Cursor prompts)

## Pack 1: foundation and launch readiness

| Id  | Title                                       | Status | Notes                                                                                                                                              |
| --- | ------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| P01 | Baseline audit                              | done   | `docs/QA/baseline.md`; npm ci EPERM blocked lint/test/build on 2026-11-03                                                                          |
| P02 | Remove Lovable                              | done   | branch `p02-lovable-purge`; `.lovable/` removed; `check:vendors` added                                                                             |
| P03 | Remove Supabase and unused Postgres tooling | done   | removed `drizzle/` + deps; `supabase/config.toml` kept in git                                                                                      |
| P04 | Typed env validation                        | done   | `src/lib/env.server.ts`, `src/test/env.test.ts`                                                                                                    |
| P05 | CI, typecheck, dependency hygiene           | done   | `.github/workflows/ci.yml`, typecheck-debt, `.githooks/pre-commit` (no Husky — see WORKFLOW)                                                       |
| P06 | Production 500 fix and health route         | done   | `GET /api/health`, env probes, Heroku-first runbook; built-server smoke 200 on `/`, `/templates`, `/signin`, `/pricing` with placeholder VITE only |
| P07 | Firestore rules and auth tests              | done   | tightened `firestore.rules`; S3/S4 Vitest; S6 `docs/QA/rules-checklist.md` (no rules-unit-testing dep)                                             |
| P08 | Security headers and AI rate limit          | done   | S13 headers + CSP-RO in `security-headers.server.ts`; S14 rate limit + catalog slug gate; tests                                                    |
| P09 | Stripe hardening                            | done   | webhook idempotency, entitlements, spendCredit, fixture tests; audit `docs/QA/stripe-audit-p09.md`                                                 |
| P10 | Delivery design (spec only)                 | done   | `docs/specs/delivery.md`, `docs/QA/licenses.md`, `GLOSSARY.md`; owner approved 2026-11-03                                                          |
| P11 | Delivery implementation                     | done   | S8 deliverProductPrompt, UI unlock/copy, upload script, 71 tests, build leak grep                                                                  |
| P12 | Checkout page with photos                   | done   | CheckoutSummaryProvider on /pricing; success entitlement poll                                                                                      |
| P13 | Account library page                        | done   | Account dashboard on /signin; view-model + UI tests                                                                                                |
| P14 | SEO                                         | done   | seo.ts, sitemap.xml + robots.txt routes, product JSON-LD, head canonical/OG                                                                        |
| P15 | Error monitoring                            | done   | @sentry/tanstackstart-react 11.10.0; scrubber tests; docs/QA/sentry-p15-research.md                                                                |
| P16 | MCP hardening                               | done   | S11/S12 tests in mcp-server.test.ts; per-uid rate limit on /mcp                                                                                    |
| P17 | Performance and accessibility               | done   | `docs/QA/perf.md`; P12/P13 a11y; img dimensions on >300KB repo assets                                                                              |
| P18 | Legal copy accuracy                         | done   | S18 rebrand; `docs/QA/legal-claims.md`; D14 placeholders in `brand.ts`                                                                             |
| P19 | Full review (no fixes)                      | done   | `docs/REVIEW-PACK1.md`; scope 375df138…main + working tree                                                                                         |
| P20 | Repair and v0.1.0                           | done   | P20 security/spec fixes; typecheck green; `docs/QA/pack1-record.md`, `docs/LEARNINGS.md`                                                           |
| P21 | Video skills checkout (optional)            | done   | S22; [PR #1](https://github.com/Jatinprajapati7869/substrates/pull/1) on `p01-p21-pack1` |

## Human steps (cannot be done by an agent)

- [ ] Disconnect the Lovable project from this GitHub repo (Lovable project settings)
- [ ] Commit `.github/`, `.kiro/`, `.cursor/`, `docs/` setup on a branch and open a PR — **PR [#1](https://github.com/Jatinprajapati7869/substrates/pull/1)** open on `p01-p21-pack1`; add `.github/workflows/ci.yml` on GitHub (copy from repo `docs/ci-workflow.yml.example`) — local git token lacks `workflow` scope
- [ ] Create the Heroku app, activate the student credit, connect GitHub deploys from `main`, set config vars from `.env.example`, add `substrates.app` domain and TLS
- [ ] Update Firebase authorized domains and the Stripe webhook URL to the Heroku/production domain
- [ ] Fill `docs/QA/licenses.md` per UI kit (resale of derived templates allowed or not) before P11 ships real content
- [ ] Answer D14 (legal entity) in `docs/DECISIONS.md`
- [ ] Sentry education account
- [ ] Keep the real product bodies out of git; they go in Firestore through the upload script
- [ ] Stripe live keys and live webhook
