# India business setup checklist (draft, not legal or tax advice)

Operator: Substrates, Chennai, India. Trade name only so far. Verify every item with a chartered accountant before relying on it; rules and Stripe requirements change.

## Why this matters

Stripe's India documentation says an Indian Stripe account must be a registered Indian business (sole proprietorship, LLP, or company), and that individuals cannot accept international payments. Taking international card payments also needs an Import/Export Code (IEC). Sources: [Stripe: accept international payments from India](https://docs.stripe.com/india-accept-international-payments), [Stripe support: international payments from Stripe accounts in India](https://support.stripe.com/questions/accepting-international-payments-from-stripe-accounts-in-india).

## Smallest path (typical for a solo founder)

1. Pick the structure: sole proprietorship under your own PAN, or an LLP / Private Limited company for liability protection and a cleaner brand. Ask the accountant which fits your expected revenue and risk.
2. Proof of business: for a sole proprietorship, commonly a GST registration, Udyam registration, or Shops and Establishment registration in the business name. Which one your bank and Stripe accept is the accountant's call.
3. Current bank account in the business name (Substrates), linked to PAN.
4. IEC from DGFT (online, usually free) for receiving export payments.
5. GST: services supplied to customers abroad are generally treated as exports; registration thresholds and LUT filing rules apply. Accountant to confirm.
6. Stripe: apply as an India business, complete "Accepting International Transactions", and check that USD pricing is allowed for your category.
7. Then fill D14 with the registered name and address and replace the draft text on the legal pages.

## Fallback if registration takes time

Launch in Stripe test mode and a waitlist, or use a merchant-of-record provider that handles sales tax and payouts to India. That is a separate decision and changes the checkout code, so treat it as its own prompt.

## Do not

- Do not use another person's PAN or bank account.
- Do not write a registered name on legal pages that does not exist yet. Use "Substrates, Chennai, India" until registration is done.
