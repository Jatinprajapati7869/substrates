# Pack 1 full review (P19)

**Date:** 2026-11-03  
**Scope:** `git diff 375df138...b323e3fd` (committed on `main`) **plus** the working tree on branch `p07-firestore-auth-tests` where P02–P18 work lives (mostly uncommitted/untracked).  
**Spec:** `docs/SPEC.md` S1–S22, `docs/RELEASE.md`, `docs/PROGRESS.md` P01–P18.  
**Verification run for this review:** `npm test` — 98 passed (2026-11-03). Typecheck still fails (`docs/QA/typecheck-debt.md` + additional `src/` errors).  
**Subagents:** [Code reviewer](e5c56d4c-16a6-4266-996c-10b4209613d4), [Security auditor](375132a7-302d-41d3-8a8a-054923ebcc59). Claude Sonnet subagents unavailable (quota); Composer + Grok used.

This document is a review only. **No code was changed** for P19 except this file and `docs/PROGRESS.md`.

---

## Executive summary

Pack 1 adds substantial tests and server-side billing/delivery/MCP hardening in the working tree, but **`main` still ends at `b323e3fd`** (firebase-admin lazy-load only). Shipping requires committing the branch and closing SPEC/RELEASE gaps below.

**Worst per axis:** **Spec** — S22 open (P21), S7 missing automated portal test, most Pack 1 not on `main`. **Security** — checkout session `complete` without `paid` can grant purchases (`src/lib/purchases.server.ts:16`, `src/lib/stripe.server.ts:136`). **Standards** — typecheck not gating CI (`.github/workflows/ci.yml:28`).

---

## Scenario matrix (S1–S22)

| Id  | Status     | Evidence                                                                                                                                           |
| --- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | **proven** | `src/test/health.test.ts`, `src/test/env.test.ts`; `GET /api/health` reports configured groups                                                     |
| S2  | **manual** | Sign-in + `profiles/{uid}` create in `src/routes/signin.tsx:83-121`; no Vitest for post-sign-in profile                                            |
| S3  | **proven** | `src/test/account-validation.test.ts:19-32`                                                                                                        |
| S4  | **proven** | `src/test/checkout.functions.test.ts`, `src/test/checkout-plans.test.ts`                                                                           |
| S5  | **proven** | `src/test/stripe-webhook.test.ts` (signature, idempotency, checkout completed)                                                                     |
| S6  | **manual** | `firestore.rules:24-55`; steps in `docs/QA/rules-checklist.md` (no rules-unit-testing)                                                             |
| S7  | **open**   | `openBillingPortal` at `src/lib/checkout.functions.ts:84-101`; **no** matching Vitest (SPEC asks server function test)                             |
| S8  | **proven** | `src/test/deliver-product-prompt.test.ts`, `src/test/build-output-leak.test.ts`                                                                    |
| S9  | **proven** | `src/test/recommend.functions.test.ts` (slug gate + fallback)                                                                                      |
| S10 | **proven** | `src/test/free-section-copy.test.tsx`                                                                                                              |
| S11 | **proven** | `src/test/mcp-server.test.ts` (401, tools, catalog-only, rate limit)                                                                               |
| S12 | **proven** | `src/test/mcp-server.test.ts` metadata route                                                                                                       |
| S13 | **proven** | `src/test/security-headers.test.ts`                                                                                                                |
| S14 | **proven** | `src/test/rate-limit.test.ts`, `src/test/recommend.functions.test.ts`                                                                              |
| S15 | **proven** | `src/test/seo.test.ts`; `src/routes/sitemap[.]xml.ts`, `robots[.]txt.ts`                                                                           |
| S16 | **open**   | `.github/workflows/ci.yml` (untracked on branch); typecheck `continue-on-error: true` at line 28 — **does not match RELEASE “CI green typecheck”** |
| S17 | **proven** | `scripts/check-vendors.mjs`; CI step line 41; no `@lovable`/`@supabase` in `src`                                                                   |
| S18 | **manual** | `docs/QA/legal-claims.md`; pages use D14 placeholders `src/lib/brand.ts:10-14`                                                                     |
| S19 | **proven** | `src/test/spend-credit.test.ts`                                                                                                                    |
| S20 | **proven** | `src/test/entitlements.test.ts`, `src/test/stripe-webhook.test.ts`                                                                                 |
| S21 | **proven** | `src/test/stripe-webhook.test.ts:79-96`; `applyRefundedEntitlement` `src/lib/entitlements.server.ts:117-148`                                       |
| S22 | **open**   | No video plans in `src/lib/plans.ts`; P21 optional per `docs/PROGRESS.md`                                                                          |

---

## Launch blockers (`docs/RELEASE.md`)

| RELEASE requirement                              | Blocked? | Notes                                                                                                           |
| ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| Every S1–S22 `proven` or recorded `manual`       | **Yes**  | S7, S16, S22 **open**; S2, S6, S18 **manual** without recorded pass in repo                                     |
| CI green: lint, typecheck, test, build, audit    | **Yes**  | Typecheck fails; CI allows failure (`ci.yml:28`); `npm audit --audit-level=high` commented out (`ci.yml:43-44`) |
| Production host + full `.env.example` via health | **Yes**  | Human Heroku setup not done (`docs/PROGRESS.md` human steps)                                                    |
| Stripe live + webhook URL                        | **Yes**  | Human step; test keys only in dev                                                                               |
| Operator live purchase + refund smoke            | **Yes**  | Not recorded                                                                                                    |
| Firebase authorized domains                      | **Yes**  | Human step                                                                                                      |
| Legal pages match reality (P18)                  | **Yes**  | `[LEGAL ENTITY]` placeholders; license draft flag on terms                                                      |
| Sentry test event from production                | **Yes**  | Human Sentry education account; P15 code present, prod not wired                                                |

**Doc inconsistency:** `docs/RELEASE.md:16-20` describes Vercel deploy/rollback; **D3** (`docs/DECISIONS.md`) commits to **Heroku** for production. Launch runbook must not follow RELEASE verbatim without reconciling host.

---

## Human steps still open

From `docs/PROGRESS.md` (unchanged by P19):

- Disconnect Lovable from GitHub
- Commit `.github/`, `.kiro/`, `.cursor/`, `docs/` setup and open PR
- Heroku app, config vars, `substrates.app` TLS
- Firebase authorized domains + Stripe webhook URL to production
- Fill `docs/QA/licenses.md` per UI kit (all rows still **unknown**)
- Answer **D14** (legal entity, address, governing law)
- Sentry education account
- Product bodies via upload script (not in git)
- Stripe live keys and live webhook

---

## Code reviewer ([subagent](e5c56d4c-16a6-4266-996c-10b4209613d4))

| Sev         | File:line                                        | Finding                                                                          |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| **blocker** | git / `docs/PROGRESS.md`                         | P01–P18 marked done but ~99 files uncommitted vs `375df138`; `main` missing pack |
| **major**   | `src/lib/checkout.functions.ts:84-101`           | S7 Customer Portal — no Vitest                                                   |
| **major**   | `src/routes/signin.tsx:83-121`                   | S2 profile lifecycle — manual only                                               |
| **major**   | `firestore.rules` + `docs/QA/rules-checklist.md` | S6 — manual emulator only                                                        |
| **major**   | `.github/workflows/ci.yml:28`                    | Typecheck non-blocking                                                           |
| **minor**   | `src/lib/brand.ts:10-14`                         | Legal placeholders                                                               |
| **minor**   | `public/robots.txt:5`                            | `Disallow: /signin` — confirm SEO intent vs S15                                  |
| **minor**   | `docs/QA/licenses.md`                            | D13 gate incomplete vs P11 real content                                          |

---

## Security auditor ([subagent](375132a7-302d-41d3-8a8a-054923ebcc59))

| Sev         | File:line                                      | Finding                                                                                                                                      |
| ----------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **blocker** | `src/lib/purchases.server.ts:16`               | Accepts session when `status === "complete"` even if `payment_status !== "paid"` (OR logic)                                                  |
| **blocker** | `src/lib/stripe.server.ts:136`                 | Same gate in `recordSession` → lifetime entitlement path `140-146`                                                                           |
| **blocker** | `src/lib/spend-credit.server.ts:46-54`         | No `entitlement.status === "refunded"` before lifetime/credit unlock                                                                         |
| **blocker** | `src/lib/delivery-entitlement.server.ts:20-31` | `hasUnlock` short-circuit before refunded check; lifetime branch ignores `canceled`/`past_due`                                               |
| **major**   | `src/lib/stripe-webhook.server.ts:127-128`     | Claim event id before dispatch; failed handler after claim can drop retries (returns 500 only on throw, not on silent `recordSession` false) |
| **major**   | `src/lib/mcp-server/handlers.server.ts:16`     | Metadata URL from `X-Forwarded-Host` / `X-Forwarded-Proto`                                                                                   |
| **major**   | `src/lib/checkout.functions.ts:20`             | Checkout/portal URLs from request Host                                                                                                       |
| **major**   | `src/lib/recommend.functions.ts:47`            | Unauthenticated recommend; OpenAI cost = rate limit only                                                                                     |
| **major**   | `src/lib/security-headers.server.ts:45`        | CSP Report-Only only                                                                                                                         |
| **major**   | `src/lib/sentry-scrub.ts:3`                    | Scrub list may miss `private_key` / `api_key` substrings                                                                                     |
| **minor**   | `firestore.rules:41`                           | Unlock id `matches` with uid concatenation                                                                                                   |
| **minor**   | `src/lib/stripe.server.ts:185`                 | HMAC compare not constant-time                                                                                                               |
| **minor**   | `src/routes/api/health.ts:7`                   | Public config flags                                                                                                                          |
| **minor**   | `src/lib/deliver-rate-limit.server.ts:9`       | In-memory limits per instance                                                                                                                |

---

## Standards review (repo rules + smell baseline)

| Sev       | File:line                                            | Finding                                                                                                              |
| --------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **major** | `.github/workflows/ci.yml:28`                        | Violates RELEASE + P05 intent: typecheck must gate merge when debt cleared (`task-protocol` verify)                  |
| **major** | `src/routes/sections.tsx`, `index.tsx`, etc.         | **>1k lines** imported markup routes; Pack 1 adds more footer/legal strings — **Shotgun Surgery** / file-size smell  |
| **minor** | `src/lib/use-supply-shell.ts:7-14`                   | Cookie copy via `innerHTML` + DOM patch — workable but **Divergent Change** vs captured banner markup in every route |
| **minor** | `src/routes/privacy.tsx`, `terms.tsx`, `refunds.tsx` | Parallel article structures — **Duplicated Code** shape (acceptable until shared legal module approved)              |
| **minor** | `AGENTS.md` / `project.mdc`                          | Single catalog source respected; delivery rebrand helper keeps Oversight strings server-side only — OK               |

---

## Spec review (P01–P18 vs `docs/SPEC.md`)

| Sev         | Spec          | Finding                                                                         |
| ----------- | ------------- | ------------------------------------------------------------------------------- |
| **blocker** | RELEASE + S16 | CI typecheck not green / not blocking                                           |
| **major**   | S7            | Customer Portal test missing                                                    |
| **major**   | S22           | Video checkout not implemented (acknowledged P21)                               |
| **major**   | Pack delivery | Working tree ≠ `main` — spec evidence not on default branch                     |
| **minor**   | S18           | Claims true per `legal-claims.md` except placeholders and counsel license draft |
| **minor**   | S21           | Cancel keeps unlocks; refund revokes — matches D15 in tests + code              |

**Scope creep (acceptable):** Sentry P15, MCP P16, perf/a11y P17, legal P18 — all tracked in PROGRESS.

---

## Thermo-nuclear code quality

| Sev       | File:line                                                 | Finding                                                                                                                 |
| --------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **major** | `src/routes/sections.tsx` (~1771 lines)                   | File already far above 1k; Pack 1 footer edits add churn without decomposition                                          |
| **major** | `src/lib/purchases.server.ts:16` + `stripe.server.ts:136` | **Code-judo missed:** single guard should require `payment_status === "paid"` (or webhook-only path), not `complete` OR |
| **major** | `src/lib/delivery-entitlement.server.ts:7-35`             | Entitlement gate order (`hasUnlock` first) hides invariant; refactor would delete security bugs                         |
| **minor** | `src/lib/spend-credit.server.ts:23-76`                    | Transaction should centralize `status`/`refunded` policy with delivery gate                                             |
| **minor** | Branch hygiene                                            | Large untracked surface — hard to review incrementally; prefer PR slices per prompt                                     |

---

## Impeccable audit (P12 / P13)

From `docs/QA/perf.md:68-79`: **16/20 Good** on `CheckoutSummaryProvider` / account dashboard surfaces. Not re-run for P19.

---

## Recommended order for P20 (informational only)

1. Fix payment-status and refunded-entitlement bugs (security blockers).
2. Commit Pack 1 tree; align RELEASE deploy section with Heroku (D3).
3. Add `openBillingPortal` Vitest; record manual S2/S6/S18 passes.
4. Clear typecheck debt; remove `continue-on-error`.
5. D14, licenses.md, production human steps.

---

## Severity legend

- **blocker** — launch or security integrity
- **major** — SPEC/RELEASE gap or meaningful risk
- **minor** — debt, manual follow-up, or maintainability
