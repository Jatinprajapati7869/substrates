# Baseline audit (P01)

Recorded **2026-11-03** on Windows, workspace `oversight-supply-studio`. Git `main` includes firebase-admin lazy-load fix (`b323e3f`+). This file is the starting state for later prompts; do not treat it as current CI unless commands below passed on your machine.

## Commands

| Command         | Result      | Detail                                                                                                                                                                                                                                                  |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`        | **fail**    | Exit `-4048` / `EPERM`: could not unlink `node_modules/lightningcss-win32-x64-msvc/lightningcss.win32-x64-msvc.node` (file in use or permissions). **Stop here for clean install** — close dev servers, editors locking `node_modules`, retry `npm ci`. |
| `npm run lint`  | **blocked** | After failed `npm ci`, `eslint` not on PATH (`'eslint' is not recognized'`). Not a lint verdict on source.                                                                                                                                              |
| `npm test`      | **blocked** | `'vitest' is not recognized'` — same broken/partial `node_modules`.                                                                                                                                                                                     |
| `npm run build` | **blocked** | `'vite' is not recognized'` — same.                                                                                                                                                                                                                     |

**Expected when `npm ci` succeeds** (from prior green runs on this repo, not re-run this session): Vitest **21** tests in `src/test/` (5 files), build with placeholder `VITE_FIREBASE_*`.

**Node engine:** `package.json` has **no** `"engines"` field.

**Package manager lockfiles:** Both **`package-lock.json`** (lockfileVersion 3, npm) and **`bun.lock`** + **`bunfig.toml`** (Bun). Scripts invoke **`npm run …`**; treat **npm + package-lock.json** as the documented CI path unless the team standardizes on Bun.

## Scenario coverage

Statuses: **proven** = automated test covers the acceptance evidence named in SPEC; **manual** = human or production only; **open** = not implemented or no matching test.

Updated **2026-11-03** after P20 (110 Vitest tests). Historical P01 counts below replaced.

| Id  | Status | Coverage                                                           |
| --- | ------ | ------------------------------------------------------------------ |
| S1  | proven | `src/test/health.test.ts`, `src/test/env.test.ts`                  |
| S2  | manual | `src/routes/signin.tsx` profile writes; no Vitest for OAuth create |
| S3  | proven | `src/test/account-validation.test.ts`                              |
| S4  | proven | `src/test/checkout.functions.test.ts`, `checkout-plans.test.ts`    |
| S5  | proven | `src/test/stripe-webhook.test.ts`                                  |
| S6  | manual | `firestore.rules`; `docs/QA/rules-checklist.md` emulator steps     |
| S7  | proven | `src/test/billing-portal.test.ts`                                  |
| S8  | proven | `deliver-product-prompt.test.ts`, `build-output-leak.test.ts`      |
| S9  | proven | `recommend.functions.test.ts`                                      |
| S10 | proven | `free-section-copy.test.tsx`                                       |
| S11 | proven | `mcp-server.test.ts`                                               |
| S12 | proven | `mcp-server.test.ts` metadata                                      |
| S13 | proven | `security-headers.test.ts`                                         |
| S14 | proven | `rate-limit.test.ts`, `recommend.functions.test.ts`                |
| S15 | proven | `seo.test.ts`                                                      |
| S16 | proven | `.github/workflows/ci.yml`; local `npm run typecheck` green (P20)  |
| S17 | proven | `npm run check:vendors`                                            |
| S18 | manual | `docs/QA/legal-claims.md`; D14 placeholders in `brand.ts`          |
| S19 | proven | `spend-credit.test.ts`                                             |
| S20 | proven | `entitlements.test.ts`, `stripe-webhook.test.ts`                   |
| S21 | proven | `stripe-webhook.test.ts` refund/cancel paths                       |
| S22 | proven | `src/test/video-skills.test.ts`; `VIDEO_PLANS` in `plans.ts`       |

**Counts:** proven **20**. manual **3** (S2, S6, S18). open **0**.

## Historical P01 snapshot (2026-11-03 morning)

The table below is the original audit before Pack 1 tests landed. Keep for archaeology only.

| Id  | Status     | Coverage                                                                                                                                                                                                             |
| --- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | open       | No `GET /api/health` route; no env-group test. SSR error page: `src/lib/error-page.ts`, `src/routes/$.tsx`.                                                                                                          |
| S2  | manual     | Runtime: `src/lib/account-context.tsx`, `src/routes/signin.tsx`, Firestore profile on sign-up. Tests only touch validation: `src/test/account-validation.test.ts` (display name length, not OAuth/profile creation). |
| S3  | proven     | `src/test/account-validation.test.ts` — `safeReturnPath`, `signInCallbackPath` reject external/protocol-relative URLs.                                                                                               |
| S4  | open       | Server: `src/lib/checkout.functions.ts` (`startCheckout`, `requireFirebaseAuth`). Tests: `src/test/checkout-plans.test.ts` — Stripe **parameter** shapes only, not 401/400 HTTP from server fn.                      |
| S5  | open       | Handler: `src/routes/api/public/stripe-webhook.ts`, `src/lib/stripe.server.ts`, `src/lib/purchases.server.ts`. No webhook fixture test.                                                                              |
| S6  | open       | Rules: `firestore.rules`. No emulator/rules unit test. Purchases read: `src/lib/purchases.server.ts`.                                                                                                                |
| S7  | open       | Server fn: `src/lib/checkout.functions.ts` (`openBillingPortal`). UI: `src/routes/signin.tsx`. No automated test.                                                                                                    |
| S8  | done (P11) | Server `deliverProductPrompt` + entitlement tests; free sections stay client reference; build leak test                                                                                                              |
| S9  | open       | Fallback logic: `src/lib/recommend.functions.ts`, `src/lib/catalog.ts` (`fallbackRelated`). No dedicated Vitest for AI failure path.                                                                                 |
| S10 | proven     | `src/test/free-section-copy.test.tsx` — resume copy dialog after sign-in.                                                                                                                                            |
| S11 | open       | Routes: `src/routes/mcp.ts`, `src/lib/mcp-server/handlers.server.ts`. Catalog-only tests: `src/test/assistant-support.test.ts` (no HTTP 401 / `WWW-Authenticate`).                                                   |
| S12 | open       | Route: `src/routes/[.well-known]/oauth-protected-resource.ts`. No metadata assertion test.                                                                                                                           |
| S13 | open       | No security-header test on built server (P08).                                                                                                                                                                       |
| S14 | open       | No `rate-limit.server.ts` or limiter test (P08).                                                                                                                                                                     |
| S15 | open       | No `/sitemap.xml` or dynamic robots route tests (P14). Static assets may live under `public/` only.                                                                                                                  |
| S16 | open       | Workflow file exists: `.github/workflows/ci.yml` — not executed in this audit (local CI blocked).                                                                                                                    |
| S17 | open       | No `npm run check:vendors` in `package.json` (P02/P03). `drizzle-orm` / `drizzle-kit` still in dependencies.                                                                                                         |
| S18 | manual     | Legal routes: `src/routes/privacy.tsx`, `terms.tsx`, `refunds.tsx` — content review P18.                                                                                                                             |
| S19 | open       | No credit-spend transaction or confirm UI tests (P09/P11).                                                                                                                                                           |
| S20 | open       | No `invoice.paid` handler tests (P09).                                                                                                                                                                               |
| S21 | open       | Refund/revoke behavior not tested (P09).                                                                                                                                                                             |
| S22 | open       | Video pricing UI: `src/routes/pricing_.videos.tsx`; no video plan in `src/lib/plans.ts` (D16, P21).                                                                                                                  |

**Counts:** proven **2** (S3, S10). manual **2** (S2, S18). open **18**.

## Unlisted files

Paths under repo root and `src/` (one level) **not named** in `docs/ARCHITECTURE.md` code-layout / runtime sections. Skipped: `node_modules`, `.output`, `Startup`, `.site-import`.

### Repository root

`.cursor/`, `.github/` (CI mentioned but not `.cursor`), `.kiro/`, `.lovable/`, `.tanstack/`, `docs/`, `drizzle/`, `patches/`, `prompt-master-main/`, `public/`, `scripts/`, `supabase/`, `.env`, `.env.example`, `.gitignore`, `.prettierignore`, `.prettierrc`, `AGENTS.md`, `ASSISTANT_INTEGRATIONS.md`, `bun.lock`, `bunfig.toml`, `components.json`, `drizzle.config.ts`, `eslint.config.js`, `firestore.rules`, `package.json`, `package-lock.json`, `roadmap.md`, `tsconfig.json`, `vercel.json`, `vite.config.ts`, `vitest.config.ts`, `README.md`, `PRODUCT.md`

### `src/` (one level)

`assets/`, `hooks/`, `integrations/` (doc names `integrations/firebase/` only), `styles/` (doc mentions `src/styles/` in prose), `router.tsx`, `routeTree.gen.ts`, `server.ts`, `start.ts`, `styles.css`

Listed in ARCHITECTURE: `src/routes/`, `src/lib/`, `src/integrations/firebase/`, `src/components/`, `src/test/`.

## Surprises

1. **`npm ci` failed** and left devDependencies unreachable in this session — baseline command table is fail/blocked, not green.
2. **`docs/DECISIONS.md` D3** says production on **Heroku**; **`vercel.json`**, Vercel deploy, and runbooks still describe **Vercel** as primary SSR host — docs and ops disagree.
3. **`drizzle-orm` / `drizzle-kit`** remain in `package.json` while ARCHITECTURE marks them as P03 leftovers.
4. **`.github/workflows/ci.yml`** exists locally; earlier notes said workflow lived only under `docs/ci-workflow.yml.example` — verify what is pushed to GitHub.
5. **Dual lockfiles** (`package-lock.json` + `bun.lock`) without a single documented package-manager policy.
6. **SPEC S1 / P06** health route and missing-env reporting **not implemented**; production 500 on Vercel traced to old deploy + firebase-admin SSR (fix on `main`, not verified here).
7. **21 Vitest cases** exist in source (`src/test/*.ts(x)`) but **0 executed** in this baseline run due to blocked install.
