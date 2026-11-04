# Lemon Squeezy setup (human checklist)

Do these in order before P23 deploy. Mark items **check in dashboard** when the public docs do not confirm Substrates-specific eligibility.

## 1. Account and store

1. Create a Lemon Squeezy account at [lemonsqueezy.com](https://www.lemonsqueezy.com).
2. Create a **Store** for Substrates. Note the **Store ID** for `LEMONSQUEEZY_STORE_ID`.
3. Complete **Verify your identity** (government ID) per [Verify your identity](https://docs.lemonsqueezy.com/help/getting-started/verify-your-identity). **check in dashboard** if additional India-specific documents are requested.

## 2. Payout (India)

1. Open **Settings → Payout** ([Getting paid](https://docs.lemonsqueezy.com/help/getting-started/getting-paid)).
2. Connect **bank account** and/or **PayPal** (PayPal payouts in USD). **check in dashboard** that Chennai / India payout method is supported for your account type (student, no registered company).
3. Note **$50 minimum payout** and twice-monthly schedule (1st / 15th creation; 13-day hold).

## 3. Products (three template plans only)

Create three products or variants matching `src/lib/plans.ts` (USD):

| Plan                 | Price  | Billing      |
| -------------------- | ------ | ------------ |
| Sections             | $15/mo | Subscription |
| Sections + Templates | $39/mo | Subscription |
| Lifetime             | $499   | One-time     |

Record each **Variant ID** for:

- `LEMONSQUEEZY_VARIANT_ID_SECTIONS`
- `LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES`
- `LEMONSQUEEZY_VARIANT_ID_LIFETIME`

### Video skills (S22 / P26)

Optional until the owner creates the video product. When ready, add two subscription variants ($9.99/mo, $79.99/yr):

- `LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY`
- `LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY`

Until **both** are set, `/pricing/videos` checkout buttons stay disabled (**Coming soon**) and `/api/health` reports `configured.videoConfigured: false`.

## 4. Test mode

1. Enable test mode in the dashboard (**check in dashboard** for current UI path).
2. Set `LEMONSQUEEZY_TEST_MODE=true` on Heroku and local `.env` while testing.
3. Create checkouts with `test_mode: true` via API ([create checkout](https://docs.lemonsqueezy.com/api/checkouts/create-checkout)).

## 5. API key

1. Create an API key with checkout + webhook permissions (**check in dashboard** for scoped keys).
2. Set `LEMONSQUEEZY_API_KEY` on Heroku config vars and local `.env` only — never commit.

## 6. Webhook

1. Create a webhook pointing to `https://<your-heroku-app>.herokuapp.com/api/public/lemonsqueezy-webhook` (production host from D3).
2. Choose signing secret → `LEMONSQUEEZY_WEBHOOK_SECRET`.
3. Subscribe at minimum ([event types](https://docs.lemonsqueezy.com/help/webhooks/event-types)): `order_created`, `order_refunded`, `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`, `subscription_payment_success`, `subscription_payment_failed`, `subscription_payment_refunded`.
4. Create a **test mode** webhook duplicate if the dashboard separates test deliveries (**check in dashboard**).

## 7. Redirect URLs

In checkout API calls (P23), set `product_options.redirect_url` to:

- Success: `https://substrates.app/checkout-success` (or Heroku preview URL during testing)
- Cancel (templates): `https://substrates.app/pricing?checkout=cancelled`
- Cancel (video): `https://substrates.app/pricing/videos?checkout=cancelled`

Use the same trusted origin helper as today’s Stripe checkout (not user-controlled `Origin`).

## 8. Refunds

Configure refund behavior in the Lemon Squeezy dashboard (**check in dashboard**). App default (D15): full refund webhooks revoke entitlements and unlocks.

## 9. After P23

1. Run test-mode purchase end-to-end; confirm webhook hits Heroku and Firestore updates.
2. Switch off `LEMONSQUEEZY_TEST_MODE` and use live webhook URL on production.
3. Update `docs/RELEASE.md` checkboxes and record operator smoke in `docs/QA/pack1-record.md`.
