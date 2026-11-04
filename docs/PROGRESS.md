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
| P21 | Video skills checkout (optional)            | done   | S22; [PR #1](https://github.com/Jatinprajapati7869/substrates/pull/1) on `p01-p21-pack1`                                                           |

## Pack 2: Lemon Squeezy migration

| Id  | Title                                  | Status | Notes                                                                                                         |
| --- | -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| P22 | Billing spec + provider-neutral core   | done   | `docs/specs/billing-lemonsqueezy.md`, `lemonsqueezy-setup.md`; `src/lib/billing/*`; branch `p22-billing-spec` |
| P23 | Lemon Squeezy checkout + remove Stripe | done   | `lemonsqueezy-provider`, `/api/public/lemonsqueezy-webhook`; branch `p23-lemonsqueezy`                        |

## Pack 3: launch readiness (`docs/prompts/PACK-3.md`)

| Id  | Title                                          | Status  | Notes                                                                      |
| --- | ---------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| P24 | Repo hygiene and doc reconciliation            | done    | branch `p24-hygiene`; `npm run verify`; Lemon Squeezy/Heroku doc reconcile |
| P25 | Billing hardening from the P23 review          | done    | test-mode guard, plan/variant cross-check, P25 tests                       |
| P26 | Video skills checkout on Lemon Squeezy (S22)   | done    | video variants env, Coming soon gate, `video-skills.test.ts`             |
| P27 | Kit licenses and the Substrates license        | skipped | deferred by owner (D22)                                                    |
| P28 | Legal pages for Substrates                     | done    | S18; brand.ts, privacy/terms/refunds, legal-claims.md                      |
| P29 | Heroku-ready build and runbook                 | done    | `app.json`, `docs/runbooks/heroku.md`, CI node-server smoke, Procfile `HOST=0.0.0.0` |
| P30 | Firestore rules tests and deploy checklist     | done    | `tests/rules/`, `npm run test:rules`, CI `firestore-rules`, `docs/runbooks/firebase.md` |
| P31 | Product-content tooling                        | done    | validate/upload/status, content-example, launch-products.md                |
| P32 | Launch catalog gating                          | done    | `isDeliverable`, server `not_available_yet`, Coming soon UI, Available now filter |
| P33 | Marketing claims audit                         | todo    |                                                                            |
| P34 | Account lifecycle                              | todo    |                                                                            |
| P35 | Assistant wrapper contract tests               | todo    |                                                                            |
| P36 | Observability                                  | todo    |                                                                            |
| P37 | Static asset caching, compression, bundle size | todo    |                                                                            |
| P38 | Accessibility pass II                          | todo    |                                                                            |
| P39 | SEO pass II                                    | todo    |                                                                            |
| P40 | Abuse limits and CSP enforcement               | todo    |                                                                            |
| P41 | Billing reconcile, backup, and admin CLI       | todo    |                                                                            |
| P42 | Full review, no fixes                          | todo    |                                                                            |
| P43 | Repair and v0.2.0                              | todo    |                                                                            |

## Human steps (cannot be done by an agent)

- [ ] Cursor: confirm the `stop` hook in `.cursor/hooks.json` is loaded (Cursor Settings, Hooks). Test: edit a file, let the agent finish, check that it is sent back to commit and push. There is a reported Windows bug where `followup_message` is ignored; if so, the rule file still applies and you can add `git status` to your habit
- [x] Merge order: PR #2 (`p22-billing-spec`) and PR #3 (`p23-lemonsqueezy`) merged to `main` (2026-11-04); open PR for `p24-hygiene` when ready
- [ ] Close or merge PR #1 if superseded by main history
- [ ] `gh auth login -h github.com -s repo,workflow` (the earlier refresh timed out)
- [ ] Lemon Squeezy: account, store, identity verification, payout method for India, three plan variants (+2 video variants if wanted), API key, webhook secret, test mode first (`docs/specs/lemonsqueezy-setup.md`)

- [x] Open Pack 1 PR — [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) on `p01-p21-pack1`; **CI verify** green (2026-11-03). Merge when ready.
- [ ] Disconnect the Lovable project from this GitHub repo (Lovable project settings)
- [ ] Create the Heroku app, activate the student credit, connect GitHub deploys from `main`, set config vars from `.env.example`, add `substrates.app` domain and TLS
- [ ] Update Firebase authorized domains and set the Lemon Squeezy webhook URL (`/api/public/lemonsqueezy-webhook`) to the Heroku/production domain
- [ ] Fill `docs/QA/licenses.md` per UI kit (resale of derived templates allowed or not) before P11 ships real content
- [x] D14 answered: Substrates, Chennai, India (solo founder)
- [ ] Sentry education account
- [ ] Keep the real product bodies out of git; they go in Firestore through the upload script
- [ ] Lemon Squeezy live mode, live webhook, and one real purchase plus refund by you
- [ ] Lawyer review of the license, terms, and privacy text
