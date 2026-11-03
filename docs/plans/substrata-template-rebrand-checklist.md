# Path A: Substrata = template business (Japanese app archived)

## Decision (locked)

- **Live product:** This repo (templates/sections SaaS).
- **Archived:** `Startup/repos/Substrata` + `substrata-api` (learning). No new learner features; redirect or sunset public learner URLs.

## Phase 1 — Brand in code (this repo)

- [x] `PRODUCT.md`, `src/lib/brand.ts`, logos in `public/logo.webp` + `logo.png`
- [x] Bulk rename Oversight Supply → Substrata in `src/`
- [ ] Homepage/imported routes: optional second pass for hero copy and footer (large captured markup)
- [ ] `/impeccable init` follow-up: `DESIGN.md` from Substrata tokens when you replace the Webflow visual world

## Phase 2 — Stripe (same account, new product line)

1. Stripe Dashboard → **Products**: create USD products matching `src/lib/plans.ts` (Sections, Sections + Templates, Lifetime, per-template one-offs).
2. Optional: attach **Price IDs** in env later; today checkout uses dynamic `price_data` — receipt line already says `Substrata — …`.
3. **Customer portal**: enable; confirm return URL `/signin` works on production domain.
4. Webhook: `https://<production-domain>/api/public/stripe-webhook` — same secret on Vercel.
5. **Archive learner products**: mark old Substrata Pro / founding plans **inactive** in Dashboard (do not delete if active subscribers exist — list customers first).
6. Test mode: full checkout → webhook → Firestore `purchases` → Manage billing on `/signin`.

## Phase 3 — Firebase

1. Firebase Console → project for this app → **Authorized domains**: production + Vercel previews.
2. Auth providers: Email/Password + Google (same as now).
3. Firestore rules deployed from `firestore.rules`.
4. If you reuse a Firebase project that was for another experiment, confirm Auth users are empty or intended.

## Phase 4 — Domain & redirects

1. Point **primary domain** **substrates.app** to this Vercel project.
2. Old Oversight domain → 301 to Substrata or same host.
3. Learner app host: **301 to /** or a single “We now build templates” page — not a broken app store link.

## Phase 5 — Archive learner stack

1. Vercel: disable or delete deploy for old Substrata client; keep repo read-only.
2. Heroku/API: scale to zero or delete after DB backup if no paying users.
3. Postgres: export backup to cold storage; document retention policy.
4. Resend: pause learner drip campaigns; create template-business lists if needed.
5. PostHog/analytics: new project or filter by app name so funnels aren’t mixed.

## Phase 6 — Legal & comms

1. Privacy/terms/refunds: product name **Substrata**; operator **OversightStudio, LLC** (update if DBA changes).
2. Email footers and Stripe receipt descriptor aligned with Substrata.
3. If any active **learner subscribers**: email cancellation/migration policy before deactivating Stripe prices.

## Phase 7 — Launch smoke

- [ ] Sign up / Google sign-in
- [ ] Test checkout + webhook
- [ ] Billing portal
- [ ] `GET /.well-known/oauth-protected-resource/mcp` (if using MCP)
- [ ] Mobile `/signin` + `/pricing`

## Not in scope (avoid scope creep)

- Merging substrata-api into this repo
- Migrating lesson JSON or Ayumi assets into templates
- INR Pro plan on template checkout unless you deliberately add INR pricing
