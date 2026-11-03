# Substrates: Cursor prompts, pack 2 (P22 onward)

Same rules as [PACK-1.md](PACK-1.md): one prompt per chat, new Agent chat, repo root, `.cursor/rules/` load automatically, the **Skills** line is also the first line of each prompt. Decisions behind this pack: [../DECISIONS.md](../DECISIONS.md), section "Round 3" (D17 to D21).

Run P22, then P23. Commit and push after each, as you do now. On Windows PowerShell use `npm.cmd`.

**Agentic notice:** these prompts let Cursor edit files and run shell commands in your repo. Each has a stop list.

| Id  | Mode            | Strong model? |
| --- | --------------- | ------------- |
| P22 | Plan then Agent | Yes           |
| P23 | Agent           | Yes           |

---

## P22: Lemon Squeezy, part 1: spec and provider-neutral core

Branch `p22-billing-spec`. Switch Cursor to Plan mode first.
**Skills:** `investigate-first`, `domain-modeling`, `/to-spec`, `codebase-design`, `research`, `/tdd`, context7

```
Skills: investigate-first, domain-modeling, /to-spec, codebase-design, research, /tdd, context7.

Read docs/PROGRESS.md, docs/DECISIONS.md (D7, D14, D17, D18), docs/SPEC.md (S4, S5, S7, S19, S20, S21, S22), docs/ARCHITECTURE.md, docs/SECURITY.md, docs/QA/stripe-audit-p09.md.

Context: payments move from Stripe to Lemon Squeezy, a merchant of record. I am a solo student in India with no registered company. Everything must stay on free tiers. Lemon Squeezy is owned by Stripe, so keep payments behind a provider-neutral layer to make a later move cheap.

Step 0. Run git status. If uncommitted work from an earlier prompt exists, stop and tell me.

Step 1. Inventory (report before editing). List every file, env variable, route, Firestore field, test, and doc that mentions Stripe (grep stripe, STRIPE_, stripeCustomerId, stripe_events, stripe-webhook, js.stripe.com). Mark each as provider-specific or already provider-neutral. Entitlement, credit, unlock, and delivery logic should be neutral; say where it is not.

Step 2. Research Lemon Squeezy from its official docs (docs.lemonsqueezy.com). Report with URLs, never from memory:
- creating a checkout through the API (store id, variant id, custom data, prefilled email, redirect URL, test mode) and what the response returns;
- webhook events for orders, subscriptions, subscription payments, refunds, and what each payload contains;
- the signature header and algorithm, and how a stable event id or idempotency key can be derived;
- subscription statuses and the customer portal URL;
- test mode versus live mode, and any fields that differ;
- whether an individual seller in India can onboard (identity, tax form, payout methods) and the fee line items. If the docs do not say, write "unknown" and list what I must check in my dashboard.
Do not install any SDK. Plain fetch is enough.

Step 3. Write docs/specs/billing-lemonsqueezy.md:
- event-to-state mapping table (provider event -> our normalized event -> entitlement change);
- variant mapping through env (one variant per plan: sections, sections-templates, lifetime; video plans are P21 and out of scope);
- checkout custom data: user_id and plan, set on the server only;
- idempotency key rule;
- credit rule: set creditsRemaining to the plan amount on each paid subscription cycle, never add; lifetime unlocks every template without spending credits;
- cancel keeps unlocks; refund revokes access (D15 deferred, default as documented);
- customer portal: where the URL is stored (providerCustomerPortalUrl on entitlements/{uid}) and when it is refreshed;
- Firestore field renames from stripe* to provider-neutral names, and that no migration is needed because no live data exists (confirm by checking that nothing in docs/QA records a live purchase);
- env variable list by name only: LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID, LEMONSQUEEZY_WEBHOOK_SECRET, LEMONSQUEEZY_TEST_MODE, and the three variant ids;
- webhook route path /api/public/lemonsqueezy-webhook;
- security checklist (raw body, constant-time compare, replay tolerance if the payload allows it, no trust in client data).

Step 4. Write docs/specs/lemonsqueezy-setup.md: the human steps in order (create the Lemon Squeezy account and store, seller verification and payout setup for India as the docs describe it, create three products or variants and note the ids, test mode, API key and webhook secret created in the dashboard and pasted only into Heroku config vars and local .env, webhook URL on the Heroku app, redirect URLs, refund handling settings). Mark every unverified requirement as "check in dashboard".

Step 5. Code (tests first, no behavior change): create src/lib/billing/types.ts with a normalized BillingEvent type (type, eventKey, userId, plan, status, periodEnd, customerId, subscriptionId, portalUrl, amountCents, currency) and a BillingProvider interface (createCheckout, verifyAndParseWebhook, getPortalUrl). Move the existing Stripe code behind this interface as src/lib/billing/stripe-provider.ts so entitlement code consumes only normalized events. All existing tests must still pass without being weakened.

Step 6. Update wording that names Stripe in docs/SPEC.md, docs/ARCHITECTURE.md, docs/SECURITY.md, docs/RELEASE.md, and .env.example comments. Do not delete Stripe code yet; P23 does that.

Stop and ask before: adding a dependency, changing plan prices, changing Firestore rules, deleting files.
Verify: npm.cmd run lint, typecheck, test, build.

Done when both spec files exist with cited URLs, the provider-neutral layer exists, and all checks pass. Mark P22 done in docs/PROGRESS.md.
Then ask me the questions you could not answer from the docs and wait for my reply before I run P23. Commit and push the branch per .cursor/rules/task-protocol.mdc.
```

---

## P23: Lemon Squeezy, part 2: checkout, webhook, remove Stripe

Branch `p23-lemonsqueezy`. Requires P22 done and its questions answered.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, context7. Then run the `security-auditor` subagent.

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, context7 for Lemon Squeezy. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/specs/billing-lemonsqueezy.md, docs/specs/lemonsqueezy-setup.md, docs/DECISIONS.md (D17), src/lib/billing/*, src/lib/checkout.functions.ts, src/routes/api/public/*, src/routes/pricing.tsx, src/routes/checkout-success.tsx, src/lib/env.server.ts, src/lib/security-headers.server.ts.

If P22 is not done or its open questions are unanswered, stop and say so. Run git status first; stop if earlier work is uncommitted.

Goal: S4, S5, S7, S19, S20, S21 work with Lemon Squeezy, and Stripe is gone.

Do, tests first, following the spec:
1. src/lib/billing/lemonsqueezy-provider.ts implementing BillingProvider with plain fetch:
   - createCheckout: server function path that requires a Firebase ID token, validates the plan against PLANS, maps it to the variant id from env, sets custom data user_id and plan on the server, prefilled email from the verified token, redirect URL from the app origin config (not from request headers), test mode from LEMONSQUEEZY_TEST_MODE. Returns the checkout URL only.
   - verifyAndParseWebhook: HMAC-SHA256 over the raw request body with the webhook secret, compared with crypto.timingSafeEqual against the signature header, before any JSON parse. Maps provider events to normalized events exactly as the spec table says. Unknown events return a 200 no-op.
2. Route /api/public/lemonsqueezy-webhook: raw body, verify, idempotency in the processed-events Firestore collection (rename from stripe_events), apply the normalized event through the existing entitlement code, 200 on duplicate, 400 on bad signature, 500 only when a handler throws (so the provider retries). Rename stripe-prefixed Firestore fields to the neutral names from the spec.
3. Customer portal (S7): store the portal URL from subscription data; the server function returns it for the signed-in owner only; clear message when none exists (for example lifetime-only buyers).
4. Pricing, checkout summary, and checkout-success: same behavior and look. Success still waits for the webhook-written entitlement. Remove Stripe wording and logos from visible copy; say the payment is processed by Lemon Squeezy as merchant of record.
5. Remove Stripe: delete the Stripe provider, webhook route, env group, tests that only covered Stripe internals (replace with equivalent Lemon Squeezy tests), STRIPE_* from .env.example and env.server.ts, js.stripe.com and Stripe checkout origins from the CSP report-only list, and the stripe_events references. Add the lemonsqueezy env group to /api/health (booleans only) and to env.server.ts.
6. Tests with fixtures, no network: valid signature, bad signature, tampered body, duplicate event, missing custom data, unknown plan variant, order for lifetime, subscription created grants credits, subscription payment on renewal sets (not adds) credits, cancel keeps unlocks, refund revokes, expired subscription, portal URL stored. Add a test that no source under src/ contains "STRIPE_" or "stripe.server".
7. Update docs: runbook (test mode first, webhook URL on the Heroku app, then live), docs/RELEASE.md checkboxes, SPEC wording, PRODUCT.md, AGENTS.md (the billing bullet), README. Record what only I can verify.

Stop and ask before: adding any dependency (including the official Lemon Squeezy SDK), changing prices or plan ids, editing Firestore rules, deleting anything not in step 5.
Verify: npm.cmd run lint, typecheck, test, build, run check:vendors. Report real counts.

Done when the six scenarios are proven by named tests, no Stripe code or env remains, and all checks pass. Mark P23 done in docs/PROGRESS.md.
Not Verified (human): a test-mode purchase through the real Lemon Squeezy checkout, webhook delivery to the Heroku URL, live-mode switch.
Commit and push the branch per .cursor/rules/task-protocol.mdc.
```

---

## Next in pack 2 (prompts not written yet)

Write these after P23 is merged and your Lemon Squeezy account is set up.

| Id  | Topic                                                                                                                                                                       |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P24 | Read the 8 UI-kit license files, fill `docs/QA/licenses.md` with quoted lines, and write the new Substrates customer license (D20)                                          |
| P25 | Rewrite privacy, terms, refunds for Substrates, solo founder, Chennai, Lemon Squeezy as merchant of record (D14, D17)                                                       |
| P26 | Heroku deploy: app, config vars, domain and TLS, Firebase production project (Spark), authorized domains, health check green                                                |
| P27 | Content pipeline: write and upload rebuild-prompt bodies for the first launch products, "more coming" state for the rest (D19)                                              |
| P28 | Launch smoke: live-mode Lemon Squeezy purchase by you, refund, entitlement, delivery, Sentry test event, tag `v0.1.0`                                                       |
