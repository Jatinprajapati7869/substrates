# P09 Stripe audit (pre-implementation)

> **Historical:** Pack 1 Stripe audit; production billing moved to Lemon Squeezy in P23.

Findings from `src/lib/stripe.server.ts`, webhook route, purchases, plans, pricing.

## Signature and raw body

| Finding                                | Location                   |
| -------------------------------------- | -------------------------- |
| Raw body read once before verify       | `stripe-webhook.ts:15-16`  |
| HMAC-SHA256 v1 over `${t}.${body}`     | `stripe.server.ts:150-165` |
| Default tolerance **300s (5 minutes)** | `stripe.server.ts:154,163` |
| Missing header → invalid               | `stripe.server.ts:156`     |

## Events handled (before P09)

| Event                                      | Handled? | Location                  |
| ------------------------------------------ | -------- | ------------------------- |
| `checkout.session.completed`               | Yes      | `stripe-webhook.ts:20-24` |
| `checkout.session.async_payment_succeeded` | Yes      | same                      |
| `invoice.paid`                             | **No**   | —                         |
| `customer.subscription.deleted`            | **No**   | —                         |
| `invoice.payment_failed`                   | **No**   | —                         |
| `charge.refunded`                          | **No**   | —                         |

## Idempotency

| Finding                           | Location                                  |
| --------------------------------- | ----------------------------------------- |
| No `stripe_events` writes         | webhook only calls `recordSession`        |
| Purchase merge by session id only | `purchases.server.ts:19-35`               |
| Replay can re-run `recordSession` | idempotent merge but no event-level no-op |

## Pricing model

| Finding                                                 | Location                       |
| ------------------------------------------------------- | ------------------------------ |
| Uses **`price_data`** at checkout, not stored Price IDs | `stripe.server.ts:47-49,90-91` |
| Amounts from `PLANS` / catalog server-side              | `stripe.server.ts:37-48,78-91` |

## Checkout URLs and metadata

| Finding                                                                      | Location                                                     |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `success_url` / `cancel_url` from request `origin`                           | `stripe.server.ts:40-41,83-84`                               |
| `client_reference_id`, `metadata[user_id]`, `metadata[plan]` set server-side | `stripe.server.ts:42-44,85-87`                               |
| Subscription metadata on `subscription_data`                                 | `stripe.server.ts:52-53`                                     |
| **`customer` reuse not set**; uses `customer_email` only                     | `stripe.server.ts:45,88`                                     |
| `resolveStripeCustomerId` exists for portal                                  | `purchases.server.ts:44-58`, used `checkout.functions.ts:66` |

## Cancel / failure / refund (before P09)

| Scenario             | Behavior                                              |
| -------------------- | ----------------------------------------------------- |
| Subscription cancel  | **Not handled** — entitlement status unchanged        |
| Payment failure      | **Not handled**                                       |
| Refund               | **Not handled** — no entitlement or unlock revocation |
| Cancel keeps unlocks | N/A until unlocks exist                               |

## Entitlements / credits (before P09)

| Finding                        | Location                              |
| ------------------------------ | ------------------------------------- |
| No `entitlements/{uid}` writes | only rules in `firestore.rules:35-37` |
| No `spendCredit`               | —                                     |
| `PLANS` has price/mode only    | `plans.ts:11-15`                      |

## Video plans (`pricing_.videos.tsx`)

| Control                           | Behavior                                                                     | Location                  |
| --------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| “Start monthly”                   | **Disabled** button, title “Video membership payments are not connected yet” | `pricing_.videos.tsx:78`  |
| “Start yearly”                    | Same                                                                         | `pricing_.videos.tsx:106` |
| No checkout server function wired | D16 → **P21**                                                                |

## P21 needs (out of scope for P09)

1. `VideoPlanId` + amounts ($9.99/mo, $79.99/yr) in `plans.ts` without mixing template credits.
2. Enable buttons; wire to checkout server function (Stripe mode subscription or payment per year).
3. Separate entitlement flag or collection for video access (must not grant template credits).
4. Webhook handling for video SKUs (metadata plan discriminator).
5. SPEC S22 tests + pricing copy alignment.
