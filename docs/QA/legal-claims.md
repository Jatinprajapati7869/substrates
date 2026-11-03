# Legal claims vs code (P18 / S18)

Audited **2026-11-03** against `src/` behavior. Placeholders `[LEGAL ENTITY]`, `[LEGAL ADDRESS]`, `[GOVERNING LAW]` are intentional until D14 is answered.

| Claim (where stated)                                                                                    | True?           | Evidence                                                                          |
| ------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| Product name **Substrates**                                                                             | yes             | `src/lib/brand.ts` `PRODUCT_NAME`                                                 |
| Support **jatin@substrates.app**                                                                        | yes             | `SUPPORT_EMAIL`                                                                   |
| Three website plans: Sections $15/mo (1 credit), Sections + Templates $39/mo (3 credits), Lifetime $499 | yes             | `src/lib/plans.ts`                                                                |
| Free account: free sections only, no template credits                                                   | yes             | `PLANS` missing free row; catalog gating + pricing copy                           |
| Credits reset monthly, no rollover                                                                      | yes             | `creditsStateForInvoicePaid` / webhook invoice paid in `entitlements.server.ts`   |
| Credit unlock is permanent through cancellation                                                         | yes             | unlock docs persist; `spend-credit.server.ts`                                     |
| Confirm before spending a credit                                                                        | yes             | `ProductDeliveryActions.tsx` + pricing footnote                                   |
| 14-day refund wording on pricing/checkout                                                               | yes             | `checkout-summary.ts`, pricing UI (process is manual email + Stripe refund)       |
| Refund revokes plan, credits, period unlocks; lifetime revokes all unlocks                              | yes             | `applyRefundedEntitlement` in `entitlements.server.ts`; webhook `charge.refunded` |
| Cancel via Stripe Customer Portal                                                                       | yes             | `openBillingPortal` in `checkout.functions.ts`, `AccountDashboard.tsx`            |
| Delivery = assistant reference prompts after entitlement check                                          | yes             | `deliver-product-prompt.server.ts`, D6                                            |
| Firebase Auth + Firestore profiles/entitlements/unlocks                                                 | yes             | `AccountProvider`, Firestore rules                                                |
| Stripe checkout + webhooks write purchases/entitlements                                                 | yes             | `stripe-webhook.server.ts`, `purchases.server.ts`                                 |
| Production host **Heroku** (not Vercel prod)                                                            | yes             | D3; `HOSTING_PROVIDER` in brand                                                   |
| OpenAI used only when `OPENAI_API_KEY` configured                                                       | yes             | `recommend.server.ts`, `health.server.ts`                                         |
| Sentry error monitoring with scrubbing                                                                  | yes             | `sentry-config.ts`, `sentry-scrub.ts`                                             |
| No PostHog / Supabase in app                                                                            | yes             | grep `src/` (privacy old text removed)                                            |
| Cookie banner stores Accept/Decline in `supply-cookie-choice`                                           | yes             | `use-supply-shell.ts`                                                             |
| Favorites in `supply-favorites` localStorage                                                            | yes             | `CatalogBrowser.tsx`, `index.tsx`                                                 |
| Accept/Decline does not load analytics scripts today                                                    | yes             | shell only writes localStorage                                                    |
| MCP catalog tools require Firebase token                                                                | yes             | MCP tests P16                                                                     |
| Video plans $9.99/mo, $79.99/yr on `/pricing/videos`                                                    | yes             | pricing route copy                                                                |
| Video Stripe checkout live                                                                              | **no**          | D16; no video plans in `plans.ts` (refunds page states this)                      |
| Phone **+1 856 295 2300** on legal pages                                                                | **removed**     | not in code/brand; was stale import copy                                          |
| Email provider sends account messages                                                                   | **no**          | no transactional email integration in `src/`                                      |
| Stripe customer created before first checkout                                                           | **no**          | customer id from checkout webhook / profile merge                                 |
| Automatic 14-day refund without support action                                                          | **no**          | policy is email request; webhook runs after Stripe refunds                        |
| Template prompt license (Terms)                                                                         | **draft**       | Owner asked for counsel-drafted text; marked in terms                             |
| Governing law / registered address                                                                      | **placeholder** | D14                                                                               |

## Oversight string sweep (left intentionally)

| Location                                                             | Why left                                            |
| -------------------------------------------------------------------- | --------------------------------------------------- |
| `src/lib/delivery-content.server.ts`, tests, fixtures                | Rebrand helper for legacy stored bodies             |
| `docs/specs/delivery.md`, `docs/prompts/PACK-1.md`, Collage examples | Historical / spec references to pre-rebrand uploads |
| `docs/QA/baseline.md`, runbooks, `.kiro` paths                       | Workspace folder name `oversight-supply-studio`     |
| `package.json` name (if present)                                     | Repo/package id not user-visible                    |

## Public section previews

`<title>` lines in `public/section-previews/*/index.html` updated to **Substrates** where they said Oversight Supply. Minified bundles may still contain old strings inside unrelated JS; not shown in normal page title.
