# Make the Pricing buttons take real payments with your own Stripe account

No Lovable upgrade needed. Payments go through a Stripe account that you own, using its secret key. Lovable's built-in payments need Pro, so they're skipped.

## What visitors get
- **Get Sections** ($15/mo), **Get Sections + Templates** ($39/mo) and **Get Lifetime** ($499 once) each open Stripe's secure payment page.
- After paying, they come back to a "Thanks, you're in" page. If they cancel, they return to Pricing with a short note.
- Visitors must be signed in first, so each payment is linked to their account. Signed-out visitors go to Sign in, then straight back to checkout.
- After payment, their Account page shows the plan they bought.

## What you need to do
1. Create a free account at stripe.com (or use one you already have).
2. Paste your Stripe secret key when I ask. Use the test key (`sk_test_...`) first so no real money moves.
3. Later, swap in your live key (`sk_live_...`) once Stripe has verified your business.

## Notes
- You handle taxes, refunds and disputes yourself in Stripe. Stripe charges its normal fees (about 2.9% + 30¢ per US card payment).
- The prices are the ones on your Pricing page ($15, $39, $499). Tell me if you want any changed.

## Technical details
- Secret `STRIPE_SECRET_KEY` (through the add-secret flow) and `STRIPE_WEBHOOK_SECRET`.
- Server function (requires sign-in) that creates a Stripe Checkout Session using inline `price_data`: subscription mode for the two monthly plans, payment mode for Lifetime. It stores `user_id` in the session metadata.
- Public webhook route `src/routes/api/public/stripe-webhook.ts` that checks the Stripe signature, then writes to a new `purchases` table (user_id, plan, status, stripe ids). Row-level security lets each user read only their own purchases, and only the webhook (admin client) writes.
- New `checkout-success` page; Pricing buttons wired in `pricing.tsx`; signin `redirect` param brings visitors back to checkout.
- Tests for plan to price mapping ($15/mo, $39/mo, $499 one-time) and the signed-out redirect.
