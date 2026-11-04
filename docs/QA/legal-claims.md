# Legal claims vs code (P28 / S18)

Audited **2026-11-04** against `src/` behavior and public legal routes. This document is an engineering checklist, **not legal advice**.

| Claim (where stated)                                                                                    | True?      | Evidence                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| Product name **Substrates**                                                                             | yes        | `src/lib/brand.ts` `PRODUCT_NAME`                                                              |
| Operator **Substrates**, **Chennai, India**, solo founder (no registered company yet)                   | yes        | `LEGAL_ENTITY`, `LEGAL_ADDRESS`; privacy/terms/refunds copy                                    |
| Support **jatin@substrates.app**                                                                        | yes        | `SUPPORT_EMAIL`                                                                                |
| Three website plans: Sections $15/mo (1 credit), Sections + Templates $39/mo (3 credits), Lifetime $499 | yes        | `src/lib/plans.ts`                                                                             |
| Video skills $9.99/mo, $79.99/yr (separate product)                                                     | yes        | `VIDEO_PLANS` in `plans.ts`; terms + `/pricing/videos`                                         |
| Free account: browse; no template credits without paid plan                                             | yes        | catalog gating; pricing/help copy                                                              |
| Credits reset monthly, no rollover                                                                      | yes        | `creditsStateForInvoicePaid` in `entitlements.server.ts`                                        |
| Credit unlock persists after subscription cancel                                                        | yes        | unlock docs; `spend-credit.server.ts`                                                            |
| Confirm before spending a credit                                                                        | yes        | `ProductDeliveryActions.tsx`                                                                   |
| **Full refund within 14 days** on pricing page                                                          | **unproven** | `src/routes/pricing.tsx` (~L1230, ~L2090, ~L2484); refunds policy deferred (D15/D23); fix in P33 |
| Refund page states full policy deferred until paid launch                                               | yes        | `src/routes/refunds.tsx`                                                                       |
| Refund revokes entitlements when webhook reports refund                                                 | yes        | `applyRefundedEntitlement`; Lemon webhook `order_refunded` / `subscription_payment_refunded`   |
| Cancel via Lemon Squeezy customer portal                                                                | yes        | `openBillingPortal` / stored portal URL; terms + refunds copy                                  |
| Lemon Squeezy merchant of record for purchases                                                          | yes        | billing spec; privacy/terms/refunds copy                                                       |
| Delivery = reference prompts after entitlement check                                                    | yes        | `deliver-product-prompt.server.ts`                                                             |
| Firebase Auth + Firestore profiles/entitlements/unlocks                                                 | yes        | `AccountProvider`, Firestore rules                                                             |
| Lemon Squeezy checkout + webhooks write purchases/entitlements                                          | yes        | `lemonsqueezy-*`, `process-webhook.server.ts`                                                  |
| Production host **Heroku**                                                                              | yes        | D3; `HOSTING_PROVIDER` in `brand.ts`                                                           |
| OpenAI only when `OPENAI_API_KEY` configured                                                            | yes        | `recommend.server.ts`, `health.server.ts`                                                      |
| Sentry when `SENTRY_DSN` configured, with scrubbing                                                     | yes        | `sentry-config.ts`, `sentry-scrub.ts`                                                          |
| No PostHog / Supabase / Stripe in app or legal pages                                                    | yes        | grep `src/`; `src/test/legal-pages.test.ts`                                                      |
| Cookie banner `supply-cookie-choice`                                                                    | yes        | `use-supply-shell.ts`                                                                          |
| Favorites `supply-favorites`                                                                            | yes        | `CatalogBrowser.tsx`, `index.tsx`                                                              |
| Optional homepage feedback `supply-feedback` localStorage                                               | yes        | `index.tsx`; privacy cookies section                                                           |
| Accept/Decline does not load analytics scripts today                                                    | yes        | shell only writes localStorage                                                                   |
| Template prompt license (Terms) marked draft pending P27                                                | yes        | terms license section                                                                          |
| Governing law India / Chennai courts marked draft                                                       | yes        | `GOVERNING_LAW` in `brand.ts`; terms section                                                   |
| Automatic 14-day refund without published policy                                                        | **no**     | refunds page does not promise a window                                                           |
| Email provider sends account mail                                                                       | **no**     | no transactional email integration                                                             |
| Phone support on legal pages                                                                            | **no**     | not in brand/legal routes                                                                      |

## Oversight string sweep (left intentionally)

| Location                                                             | Why left                                            |
| -------------------------------------------------------------------- | --------------------------------------------------- |
| `src/lib/delivery-content.server.ts`, tests, fixtures                | Rebrand helper for legacy stored bodies             |
| `docs/`, Collage examples, workspace folder name                     | Historical / non-user-visible                       |

## Public section previews

Footer placeholders `[LEGAL ENTITY]` may remain on non-legal imported routes until a separate cleanup; **legal routes** use `LEGAL_ENTITY` from `brand.ts` (verified by `src/test/legal-pages.test.ts`).
