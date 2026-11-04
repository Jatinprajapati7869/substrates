# Pack 1 learnings (P20)

Recorded after `docs/REVIEW-PACK1.md` repairs (2026-11-03).

## Stripe Checkout vs payment status

**What went wrong:** Purchase recording used `(payment_status !== "paid" && status !== "complete")`, which treats a **complete but unpaid** async session as paid.

**Fix:** Record purchases only when `payment_status === "paid"` (`isCheckoutSessionPaid` in `src/lib/purchases.server.ts`).

**Lesson:** Never OR-combine Stripe session `status` with `payment_status` for entitlement grants.

## Refunded entitlements vs leftover flags

**What went wrong:** `applyRefundedEntitlement` set `status: refunded` but left `unlimitedTemplates` / lifetime flags, so `spendCreditTransaction` and template delivery still treated the user as lifetime.

**Fix:** Clear lifetime/template flags on refund; block spend when `status === "refunded"`; require `status === "active"` for catalog-wide template delivery without an unlock doc.

**Lesson:** Refund handlers must reset every field downstream code reads, not only status and credits.

## Webhook idempotency vs retries

**What went wrong:** Stripe event IDs were claimed in Firestore before dispatch; a thrown handler returned 500 but left the claim, so Stripe retries got `200` with no work.

**Fix:** `releaseStripeEvent` on handler failure (`src/lib/stripe-events.server.ts`).

**Lesson:** Claim-then-process needs an explicit release (or process-then-claim) so retries can succeed.

## Host header on Stripe return URLs

**What went wrong:** Checkout and portal return URLs used `new URL(request.url).origin`, which follows the client `Host` header.

**Fix:** `trustedCheckoutOrigin` allowlists production hostname and localhost (`src/lib/checkout-origin.server.ts`).

**Lesson:** Never pass raw request origin to Stripe redirect URLs.

## MCP OAuth metadata URL

**What went wrong:** Resource metadata used `X-Forwarded-Host`, which clients can spoof outside a trusted edge.

**Fix:** Publish metadata at `SITE_ORIGIN` from `src/lib/brand.ts`.

## Pack 1 on `main`

**What went wrong:** PROGRESS marked P01–P18 done while most files lived uncommitted on a feature branch; `main` still pointed at an early firebase-admin fix.

**Lesson:** Mark prompts done only when changes are committed (or note branch/PR explicitly in PROGRESS).

## Typecheck debt

**What went wrong:** CI used `continue-on-error: true` on typecheck while errors accumulated outside `src/lib`.

**Fix:** P20 cleared remaining TS errors and removed the CI waiver.

**Lesson:** Do not widen CI exceptions without a dated debt file and a prompt to clear it.

## ESLint scanning out-of-scope trees

**What went wrong:** `eslint .` matched `**/*.{ts,tsx}` under a local `Startup/` checkout (gitignored but present on disk), so `npm run lint` looked hung on Windows.

**Fix:** Ignore `Startup/**`, `prompt-master-main/**`, and `.site-import/**` in `eslint.config.js`.

**Lesson:** Align ESLint globs with repo scope, not only `.gitignore`.
