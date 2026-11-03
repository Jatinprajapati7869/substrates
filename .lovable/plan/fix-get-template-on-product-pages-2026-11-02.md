# Fix "Get template" on product pages

## What changes
- Signed-out visitor clicks **Get template** → Sign in, then is returned to the **same product page** (not left on Sign in).
- Back on the product page, the button continues automatically into checkout for that template, using the same Stripe checkout already wired on Pricing (single-template purchase at the template's catalog price).
- Signed-in visitors clicking **Get template** go straight to checkout.
- Free sections: "Sign in to copy — free" also returns to the product page after sign-in, where the button becomes a working copy action.
- Pro sections keep linking to Pricing.
- Until the Stripe key is saved, the button shows a clear "Checkout isn't available yet" message instead of doing nothing.

## Technical details
- `ProductPage.tsx`: replace the `/signin` Link with a `ProductCheckoutButton` that navigates to `/signin?next=/templates/<slug>?buy=1` when signed out, and auto-resumes when `?buy=1` is present and a session exists (mirrors `CheckoutButton`).
- Add `startProductCheckout` server function (auth required) that looks up the product in `catalog.json` by slug, validates it is a paid template, and creates a one-time Stripe Checkout session; success returns to `/checkout-success`.
- Add a test: product checkout rejects unknown slugs and free/section products, and uses the catalog price.
- Verify in browser: signed-out click → sign in → lands on product page and checkout starts (or shows the missing-key message).
