# Pack 1 prompt record (P01–P21)

Branch work mostly on `p07-firestore-auth-tests` (not all merged to `main` at P20). PR column: **pending** until human opens PR. Tests: `npm test` unless noted.

| Id  | Status  | PR      | Verify command / evidence                                                                                         |
| --- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| P01 | done    | pending | `docs/QA/baseline.md` (historical); superseded by scenario table below                                            |
| P02 | done    | pending | `npm run check:vendors`                                                                                           |
| P03 | done    | pending | no `@supabase` in `src`; drizzle removed                                                                          |
| P04 | done    | pending | `npm test` → `src/test/env.test.ts`                                                                               |
| P05 | done    | pending | `npm run typecheck` (P20 cleared debt); `.github/workflows/ci.yml`                                                |
| P06 | done    | pending | `npm test` → `src/test/health.test.ts`; built-server smoke in PROGRESS notes                                      |
| P07 | done    | pending | `npm test` → `account-validation.test.ts`; manual S6 `docs/QA/rules-checklist.md`                                 |
| P08 | done    | pending | `npm test` → `security-headers.test.ts`, `rate-limit.test.ts`                                                     |
| P09 | done    | pending | `npm test` → `stripe-webhook.test.ts`, `spend-credit.test.ts`, `entitlements.test.ts`                             |
| P10 | done    | pending | spec only: `docs/specs/delivery.md`, `docs/QA/licenses.md`                                                        |
| P11 | done    | pending | `npm test` → `deliver-product-prompt.test.ts`, `build-output-leak.test.ts`                                        |
| P12 | done    | pending | `npm test` → `checkout-summary.test.ts`                                                                           |
| P13 | done    | pending | `npm test` → `account-dashboard.test.ts`, `account-dashboard-ui.test.tsx`                                         |
| P14 | done    | pending | `npm test` → `seo.test.ts`                                                                                        |
| P15 | done    | pending | `npm test` → `sentry-scrub.test.ts`, `sentry-noop.test.ts`                                                        |
| P16 | done    | pending | `npm test` → `mcp-server.test.ts`                                                                                 |
| P17 | done    | pending | `docs/QA/perf.md` (Lighthouse blocked locally)                                                                    |
| P18 | done    | pending | `docs/QA/legal-claims.md`; D14 placeholders remain                                                                |
| P19 | done    | pending | `docs/REVIEW-PACK1.md` (review only)                                                                              |
| P20 | done    | pending | 2026-11-03: `npm test` (111), `typecheck`, `lint`, `build`, `check:vendors` pass on `p07-firestore-auth-tests`; P20 fixes still uncommitted |
| P21 | done    | pending | `npm test` → `src/test/video-skills.test.ts` |

## Live / production (human only — not claimed)

- Stripe live keys, live webhook, operator purchase/refund smoke: **not recorded**
- Firebase authorized domains on production host: **not recorded**
- Heroku deploy with full `.env.example` on production: **not recorded**
- Sentry event from production: **not recorded**

## Scenario status (post-P20)

See updated counts in `docs/QA/baseline.md` § Scenario coverage. **Open:** none. **Manual:** S2, S6, S18 (with checklist). **Proven:** S1–S22 covered by Vitest or scripts listed in `docs/SPEC.md` and `docs/QA/legal-claims.md`.
