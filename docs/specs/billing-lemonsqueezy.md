# Billing: Lemon Squeezy (merchant of record)

P22 spec. P23 implements checkout, webhook, and removes Stripe. Video plans (P21 / S22) stay on Stripe until a follow-up prompt.

Official references (read before changing code):

- [Create checkout (API)](https://docs.lemonsqueezy.com/api/checkouts/create-checkout)
- [Checkout object](https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout)
- [Passing custom data](https://docs.lemonsqueezy.com/help/checkout/passing-custom-data)
- [Webhook event types](https://docs.lemonsqueezy.com/help/webhooks/event-types)
- [Example payloads](https://docs.lemonsqueezy.com/help/webhooks/example-payloads)
- [Signing requests](https://docs.lemonsqueezy.com/help/webhooks/signing-requests)
- [Subscription object / statuses](https://docs.lemonsqueezy.com/api/subscriptions/the-subscription-object)
- [Test mode (webhooks)](https://docs.lemonsqueezy.com/api/webhooks/create-webhook) (`test_mode` attribute)

## Provider-neutral layer (P22)

- `src/lib/billing/types.ts` — `BillingEvent`, `BillingProvider`
- `src/lib/billing/dispatch.server.ts` — entitlement changes from normalized events only
- `src/lib/billing/stripe-provider.ts` — current Stripe adapter (removed in P23)

## Variant mapping (env)

One Lemon Squeezy variant per template plan (not video):

| Plan id (`plans.ts`) | Env var |
| -------------------- | ------- |
| `sections` | `LEMONSQUEEZY_VARIANT_ID_SECTIONS` |
| `sections-templates` | `LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES` |
| `lifetime` | `LEMONSQUEEZY_VARIANT_ID_LIFETIME` |

Map variant id → plan id on webhook using these env values (inverse lookup). Unknown variant: log, 200 no-op (no entitlement write).

## Checkout custom data

Set **only on the server** when calling `POST /v1/checkouts` ([checkout_data.custom](https://docs.lemonsqueezy.com/api/checkouts/create-checkout)):

- `user_id` — Firebase uid from verified ID token
- `plan` — validated `PlanId` from `PLANS`

Prefill `checkout_data.email` from the token. Set `product_options.redirect_url` from configured app origin (`SITE_ORIGIN` / trusted origin helper), not from client headers. Pass `test_mode: true` when `LEMONSQUEEZY_TEST_MODE` is set.

## Event → state mapping

| Lemon Squeezy event | Normalized `BillingEvent.type` | Entitlement change |
| ------------------- | ------------------------------ | ------------------ |
| `order_created` (one-time, `lifetime` in custom_data) | `checkout_completed` | Record purchase; `applyLifetimeEntitlementFromCheckout` (D7) |
| `subscription_created` | `subscription_cycle_paid` (initial) | Set plan, status `active`, **set** `creditsRemaining` to plan allowance (not add) |
| `subscription_payment_success` | `subscription_cycle_paid` | **Set** credits to plan allowance for the new period; update period end; store ids + portal URL |
| `subscription_payment_recovered` | (same as success) | Treat as `subscription_cycle_paid` (LS also sends `subscription_payment_success`) |
| `subscription_updated` | no-op or refresh portal URL | Update `providerCustomerPortalUrl` when `urls.customer_portal` present |
| `subscription_cancelled` | `subscription_canceled` | Status `canceled`; **keep** credit unlocks (D7 / S21) |
| `subscription_expired` | `subscription_canceled` | Status `canceled` or `refunded` per product policy; access ends |
| `subscription_payment_failed` | `subscription_past_due` | Status `past_due` |
| `order_refunded` | `refunded` | D15: revoke plan + credit unlocks; lifetime refund revokes all |
| `subscription_payment_refunded` | `refunded` | Same as D15 for subscription line |

Read `meta.custom_data.user_id` and `meta.custom_data.plan` on order/subscription webhooks ([custom data in webhooks](https://docs.lemonsqueezy.com/help/checkout/passing-custom-data)).

## Idempotency key

Firestore collection (P23 rename): `billing_processed_events/{eventKey}` (today: `stripe_events/{eventId}`).

**Rule:** `eventKey = meta.event_name + ":" + data.type + ":" + data.id`

For `subscription_payment_success`, append subscription invoice id if distinct from `data.id` (invoice objects): `eventKey = meta.event_name + ":subscription-invoices:" + data.id`.

Claim before dispatch; duplicate delivery → 200 with no work. Handler throw → release claim → 500 so LS retries.

Stripe (until P23): keep using Stripe event `id` as `eventKey`.

## Credit rule (D7)

On each **paid subscription cycle** (`subscription_cycle_paid`): set `creditsRemaining` to the plan’s monthly allowance (1 or 3), never increment. Lifetime: `unlimitedTemplates` / unlock-all without spending credits on each template.

## Cancel / refund

- **Cancel:** unlocks in `unlocks/{uid}_{slug}` remain; status becomes `canceled`.
- **Refund:** D15 — remove access and revoke credit-based unlocks from the refunded period; lifetime refund clears lifetime access. (Partial refund policy: default full revoke on any refund webhook until D15 is revisited.)

## Customer portal (S7)

Store `providerCustomerPortalUrl` on `entitlements/{uid}` from subscription payload `attributes.urls.customer_portal` ([subscription_created example](https://docs.lemonsqueezy.com/guides/developer-guide/webhooks)). Refresh when `subscription_updated`, `subscription_created`, or `subscription_payment_success` includes a new portal URL. `openBillingPortal` returns stored URL for the signed-in uid (no Stripe Billing Portal session in P23).

## Firestore renames (P23)

| Today | Neutral |
| ----- | ------- |
| `profiles.stripeCustomerId` | `billingCustomerId` |
| `entitlements.stripeCustomerId` | `billingCustomerId` |
| `entitlements.stripeSubscriptionId` | `billingSubscriptionId` |
| `entitlements.videoStripeSubscriptionId` | `videoBillingSubscriptionId` |
| `purchases.stripeSessionId` | `billingCheckoutId` |
| `purchases.stripeCustomerId` | `billingCustomerId` |
| `purchases.stripeSubscriptionId` | `billingSubscriptionId` |
| `stripe_events` | `billing_processed_events` |
| (new) | `entitlements.providerCustomerPortalUrl` |

**Migration:** not required — `docs/QA/pack1-record.md` § Live records no operator purchase/refund smoke; no production entitlement data to migrate.

## Env vars (names only)

- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_STORE_ID`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `LEMONSQUEEZY_TEST_MODE`
- `LEMONSQUEEZY_VARIANT_ID_SECTIONS`
- `LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES`
- `LEMONSQUEEZY_VARIANT_ID_LIFETIME`

Stripe vars remain until P23: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Webhook route

`POST /api/public/lemonsqueezy-webhook` (P23). Raw body, verify signature, idempotency, dispatch normalized events.

## Security checklist

1. Read raw body once; verify before `JSON.parse`.
2. HMAC-SHA256 of raw body with webhook secret; compare to `X-Signature` using constant-time compare ([signing](https://docs.lemonsqueezy.com/help/webhooks/signing-requests)). (Stripe uses `Stripe-Signature` with timestamp tolerance — keep tolerance only where the provider documents it; LS docs do not specify timestamp skew.)
3. Idempotency on `eventKey`; never trust client-supplied plan, price, or uid.
4. Amounts and plans come from server env + `PLANS`, not webhook totals alone (webhook selects variant → plan mapping).
5. Do not log secrets, raw card data, or full webhook bodies in production.

## Lemon Squeezy research notes (P22)

### Checkout API

- `POST https://api.lemonsqueezy.com/v1/checkouts` with JSON:API body: `relationships.store`, `relationships.variant`, optional `attributes.checkout_data`, `attributes.product_options.redirect_url`, `attributes.test_mode` ([create checkout](https://docs.lemonsqueezy.com/api/checkouts/create-checkout)).
- Response includes `data.attributes.url` — hosted checkout URL ([response example](https://docs.lemonsqueezy.com/api/checkouts/create-checkout)).

### Webhooks

- Events listed in [event types](https://docs.lemonsqueezy.com/help/webhooks/event-types); payloads in [examples](https://docs.lemonsqueezy.com/help/webhooks/example-payloads).
- `meta.event_name`, `meta.custom_data`; `data.type`, `data.id`, `attributes.test_mode` on resources.

### Signature

- Header: `X-Signature`. Algorithm: HMAC-SHA256 hex digest of **raw body** with signing secret ([signing requests](https://docs.lemonsqueezy.com/help/webhooks/signing-requests)).

### Subscription status + portal

- Status enum: `on_trial`, `active`, `paused`, `past_due`, `unpaid`, `cancelled`, `expired` ([subscription object](https://docs.lemonsqueezy.com/api/subscriptions/the-subscription-object)).
- Portal: `attributes.urls.customer_portal` on subscription objects (signed URL, expires).

### Test vs live

- `test_mode` on checkouts, webhooks, and resource attributes ([create webhook test_mode](https://docs.lemonsqueezy.com/api/webhooks/create-webhook)). Separate API keys / store mode — **check in dashboard** for how test orders appear in reporting.

### India / individual seller

- Identity: government ID via dashboard ([verify identity](https://docs.lemonsqueezy.com/help/getting-started/verify-your-identity)).
- Payouts: bank or PayPal in [supported countries](https://docs.lemonsqueezy.com/help/getting-started/getting-paid) — **check in dashboard** whether India bank/PayPal onboarding requires a registered business (docs do not state sole proprietorship vs individual explicitly).
- Fees: platform fee $0.50 + 5% of order total, +1.5% international, +0.5% subscription renewals ([fees](https://docs.lemonsqueezy.com/help/getting-started/fees)); payout fees vary ([getting paid](https://docs.lemonsqueezy.com/help/getting-started/getting-paid)).
- US tax forms (W-9/W-8): **unknown** in public docs — check in dashboard during seller verification.
