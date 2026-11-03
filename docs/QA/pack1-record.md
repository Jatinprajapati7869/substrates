# Pack 1 prompt record (P01–P21)

Branch **`p01-p21-pack1`**. PR: [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) (CI verify green 2026-11-03). Tests: `npm test` unless noted.

| Id  | Status  | PR      | Verify command / evidence                                                                                         |
| --- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| P01 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `docs/QA/baseline.md` (historical); superseded by scenario table below                                            |
| P02 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm run check:vendors`                                                                                           |
| P03 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | no `@supabase` in `src`; drizzle removed                                                                          |
| P04 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `src/test/env.test.ts`                                                                               |
| P05 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm run typecheck` (P20 cleared debt); `.github/workflows/ci.yml`                                                |
| P06 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `src/test/health.test.ts`; built-server smoke in PROGRESS notes                                      |
| P07 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `account-validation.test.ts`; manual S6 `docs/QA/rules-checklist.md`                                 |
| P08 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `security-headers.test.ts`, `rate-limit.test.ts`                                                     |
| P09 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `stripe-webhook.test.ts`, `spend-credit.test.ts`, `entitlements.test.ts`                             |
| P10 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | spec only: `docs/specs/delivery.md`, `docs/QA/licenses.md`                                                        |
| P11 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `deliver-product-prompt.test.ts`, `build-output-leak.test.ts`                                        |
| P12 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `checkout-summary.test.ts`                                                                           |
| P13 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `account-dashboard.test.ts`, `account-dashboard-ui.test.tsx`                                         |
| P14 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `seo.test.ts`                                                                                        |
| P15 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `sentry-scrub.test.ts`, `sentry-noop.test.ts`                                                        |
| P16 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `mcp-server.test.ts`                                                                                 |
| P17 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `docs/QA/perf.md` (Lighthouse blocked locally)                                                                    |
| P18 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `docs/QA/legal-claims.md`; D14 placeholders remain                                                                |
| P19 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `docs/REVIEW-PACK1.md` (review only)                                                                              |
| P20 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | 2026-11-03: `npm test` (111), `typecheck`, `lint`, `build`, `check:vendors` pass on `p07-firestore-auth-tests`; P20 fixes still uncommitted |
| P21 | done    | [#1](https://github.com/Jatinprajapati7869/substrates/pull/1) | `npm test` → `src/test/video-skills.test.ts` |

## Live / production (human only — not claimed)

- Stripe live keys, live webhook, operator purchase/refund smoke: **not recorded**
- Firebase authorized domains on production host: **not recorded**
- Heroku deploy with full `.env.example` on production: **not recorded**
- Sentry event from production: **not recorded**

## Scenario status (post-P20)

See updated counts in `docs/QA/baseline.md` § Scenario coverage. **Open:** none. **Manual:** S2, S6, S18 (with checklist). **Proven:** S1–S22 covered by Vitest or scripts listed in `docs/SPEC.md` and `docs/QA/legal-claims.md`.
