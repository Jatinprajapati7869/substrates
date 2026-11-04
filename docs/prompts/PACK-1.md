# Substrates: Cursor prompts, pack 1 (P01 to P21)

Target tool: Cursor Agent. Rules in `.cursor/rules/` load automatically, so prompts do not repeat them. Workflow: [../WORKFLOW.md](../WORKFLOW.md). Decisions: [../DECISIONS.md](../DECISIONS.md).

**Agentic notice:** these prompts let Cursor edit files and run shell commands in your repo. Each has a stop list. Confirm the branch name before pushing.

## How to run

1. New Agent chat per prompt, repo root `oversight-supply-studio`.
2. Paste one prompt. Wait for the final report and a pushed branch.
3. Open the PR, wait for CI, check the preview, merge, then start the next prompt.
4. Every prompt begins by reading `docs/PROGRESS.md` and ends by updating its row.

## Skills

Each prompt has a **Skills** line and the same line is the first line of the prompt text, so Cursor loads them. Skill names come from the skill set in your earlier pack (`/tdd`, `/hallmark`, `frontend-design`, `ui-ux-pro-max`, `ponytail`, `/deslop`, `/impeccable audit|polish`, `/code-review`, `/ce-code-review`, `/thermo-nuclear-code-quality-review`, `surgical-patch`, `verify-and-stop`, `investigate-first`, `research`, `domain-modeling`, `/to-spec`, `codebase-design`, `writing-for-agents`, `/grill-me`, `/ce-plan`, `/ce-compound`, `/fix-ci`, `setup-pre-commit`, `a11y-debugging`, `caveman-commit`, context7). If a name is not installed in this Cursor, delete it from the line; the prompt still works. Use `context7` whenever a library API is in doubt (TanStack Start, Stripe, Firebase, zod).

Mode: **Plan** means switch Cursor to Plan mode, approve the plan, then run. **Review** means the read-only subagent.

| Id         | Mode            | Strong model? |
| ---------- | --------------- | ------------- |
| P01 to P05 | Agent           | No            |
| P06, P09   | Plan then Agent | Yes           |
| P07, P08   | Agent           | No            |
| P10, P11   | Plan then Agent | Yes           |
| P12 to P15 | Agent           | No            |
| P16        | Plan then Agent | Yes           |
| P17, P18   | Agent           | No            |
| P19        | Review          | Yes           |
| P20, P21   | Agent           | Yes           |

---

## P01: Baseline audit

Branch `p01-baseline`. No behavior changes.
**Skills:** `investigate-first`, `verify-and-stop`, `caveman-commit`

```
Skills: investigate-first, verify-and-stop, caveman-commit.

Read docs/PROGRESS.md, AGENTS.md, PRODUCT.md, docs/SPEC.md, docs/ARCHITECTURE.md, docs/DECISIONS.md.

Goal: record the true starting state so later prompts can be judged against it.

Do:
1. Run npm ci, npm run lint, npm test, npm run build. Record pass/fail and counts. Do not fix anything.
2. For each scenario S1 to S22 in docs/SPEC.md, find the test or code that covers it. Mark proven, manual, or open with the file path.
3. List files that exist but docs/ARCHITECTURE.md does not mention (top level and src/ one level deep). Skip node_modules, .output, Startup, .site-import.
4. Write docs/QA/baseline.md with sections: Commands, Scenario coverage table, Unlisted files, Surprises.
5. Report whether package.json declares a node engine and which package manager the lockfiles imply (package-lock.json and bun.lock both exist).

Do not modify any file outside docs/QA/baseline.md and docs/PROGRESS.md.
Stop and ask if npm ci fails.

Done when docs/QA/baseline.md exists with real command results and every scenario has a status. Mark P01 done.
```

## P02: Remove Lovable

Branch `p02-lovable-purge`.
**Skills:** `surgical-patch`, `investigate-first`, `verify-and-stop`

```
Skills: surgical-patch, investigate-first, verify-and-stop.

Read docs/PROGRESS.md and docs/DECISIONS.md (D1).

Goal: no Lovable platform dependency or leftover remains. "Lovable" as an assistant copy target in the product stays.

Authorized deletions (no need to ask): the .lovable/ directory, bun.lock, bunfig.toml (only after confirming CI and the Procfile use npm), patches/ (only if it contains only Lovable patches).
Authorized edits:
- AGENTS.md: remove the LOVABLE:BEGIN/END banner. Keep every other bullet. Add one line: never force-push or rewrite pushed history.
- src/components/ProductPage.tsx: "Picked by Lovable AI" becomes "Picked by AI".
- scripts/cron-trigger.mjs: drop the LOVABLE_* env fallback.
- Fix doc links that pointed at docs/cursor/.

Hunt: grep for lovable, @lovable, LOVABLE_, __lovable across src, scripts, docs, root configs, package.json, package-lock.json. Exclude node_modules, Startup, .site-import, .output, .kiro/skills, and the assistant-copy-target UI (src/lib/assistant-copy.ts, the "Lovable" menu items and logos in sections/pricing/index routes, guide article text).

Add an npm script "check:vendors" that fails if package.json or package-lock.json contains "@lovable.dev" or "@supabase". Mention it in README.

Stop and ask before: deleting anything not listed, adding a dependency.
Verify: npm run lint, npm test, npm run build, npm run check:vendors.

Done when check:vendors passes and a grep for LOVABLE_ in src, scripts, and root configs returns nothing. Mark P02 done.
Print this human step: disconnect the Lovable project from this GitHub repo in Lovable's project settings.
```

## P03: Remove Supabase and unused Postgres tooling

Branch `p03-supabase-purge`.
**Skills:** `investigate-first`, `surgical-patch`, `verify-and-stop`

```
Skills: investigate-first, surgical-patch, verify-and-stop.

Read docs/PROGRESS.md and docs/DECISIONS.md (D2, D12).

Goal: Firebase is the only backend. Remove Supabase traces and Postgres tooling nothing uses. The old startup's Hono + Better Auth + Drizzle + Postgres stack does not come into this repo.

Do:
1. Grep for supabase across the repo (exclude node_modules, Startup, .site-import, .output, .kiro). Report every hit before editing.
2. Check whether anything in src/ or scripts/ imports drizzle-orm, drizzle-kit, postgres, or reads drizzle.config.ts. If nothing does, remove drizzle.config.ts, the drizzle/ directory, and the devDependencies drizzle-orm, drizzle-kit, postgres. If something does, stop and report.
3. docs/plans/2026-11-03-0913-refactor-lovable-independence-saas-launch-plan.md already has a SUPERSEDED banner; confirm and leave the body alone.
4. Confirm src/routes/mcp.ts, src/routes/[.well-known]/oauth-protected-resource.ts, and src/lib/mcp-server/* use Firebase for issuer and audience. Report the variable names used.
5. Remove supabase/ from .gitignore only if the directory is not in git; otherwise leave it.

Stop and ask before deleting any directory not named above.
Verify: npm run lint, npm test, npm run build, npm run check:vendors.

Done when no Supabase or Drizzle reference remains outside archived docs and the build passes. Mark P03 done.
```

## P04: Typed env validation

Branch `p04-env`.
**Skills:** `/tdd`, `ponytail`, context7 (zod)

```
Skills: /tdd, ponytail, context7 for zod.

Read docs/PROGRESS.md, .env.example, src/integrations/firebase/*, src/lib/stripe.server.ts, src/lib/recommend.server.ts, src/lib/checkout.functions.ts.

Goal: one place defines every server env variable, validates it with zod, and fails with a clear message that names variables, never values.

Do (test first):
1. Create src/lib/env.server.ts exporting getServerEnv(group) (lazy, cached). Groups: firebaseAdmin (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY with \n unescaping), stripe (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET), openai (OPENAI_API_KEY optional, OPENAI_MODEL default), cron (CRON_SECRET, CRON_SECRET_PREVIOUS optional).
2. Each group is requested separately so a missing Stripe key does not break pages that never touch Stripe. Missing vars throw an error that lists variable names only.
3. Replace direct process.env reads of these variables in server files with the helper. No other behavior change.
4. src/test/env.test.ts: missing group names variables, never prints values, optional group returns undefined.
5. Sync .env.example with the schema. Keep NITRO_PRESET and PORT.

Do not change client-side VITE_FIREBASE_* handling.
Stop and ask before renaming any env variable.
Verify: npm run lint, npm test, npm run build.

Done when no server file outside env.server.ts reads process.env for these variables and the new tests pass. Mark P04 done.
```

## P05: CI, typecheck, dependency hygiene

Branch `p05-ci`.
**Skills:** `/fix-ci`, `setup-pre-commit`, `verify-and-stop`

```
Skills: /fix-ci, setup-pre-commit, verify-and-stop.

Read docs/PROGRESS.md, .github/workflows/ci.yml, package.json, docs/ci-workflow.yml.example.

Goal: every PR runs lint, typecheck, test, build, audit, vendor check, and a secret scan.

Do:
1. Add "typecheck": "tsc --noEmit" to package.json. Run it. List errors by file. Fix only errors in src/lib and src/integrations. Put the rest in docs/QA/typecheck-debt.md.
2. Update .github/workflows/ci.yml: npm ci, lint, typecheck (continue-on-error only if typecheck-debt.md is non-empty, with a comment pointing at it), test, build with placeholder VITE_FIREBASE_* env, check:vendors, npm audit --audit-level=high (non-blocking for now, commented), and a gitleaks secret scan.
3. Add .github/dependabot.yml: weekly npm and github-actions, grouped minor and patch.
4. Add .github/pull_request_template.md: what changed, SPEC ids touched, checks run, manual steps.
5. Pre-commit via setup-pre-commit: prettier check and a secret scan. No new dependency without asking.

Note: pushing workflow files needs a GitHub token with the workflow scope. If push fails, say so and stop.
Stop and ask before adding any dependency.
Verify: npm run lint, npm run typecheck, npm test, npm run build.

Done when the workflow file is valid YAML and typecheck passes or is documented. Mark P05 done.
```

## P06: Production 500 fix and health route

Branch `p06-prod-health`. Plan mode first.
**Skills:** `investigate-first`, `/tdd`, `verify-and-stop`, context7 (TanStack Start, Nitro presets)

```
Skills: investigate-first, /tdd, verify-and-stop, context7 for TanStack Start and Nitro.

Read docs/PROGRESS.md, docs/ARCHITECTURE.md, docs/DECISIONS.md (D3: production is Heroku), docs/runbooks/connectors-github-vercel-heroku.md, src/server.ts, src/integrations/firebase/*, src/routes/__root.tsx, src/lib/env.server.ts, Procfile, vercel.json.

Goal: S1. A missing or partial env never produces a bare 500 on page routes, the operator can see what is missing, and the build runs on either host.

Do:
1. Add GET /api/health under src/routes/api/. JSON: ok, commit sha (VERCEL_GIT_COMMIT_SHA or SOURCE_VERSION if set), and a boolean "configured" per env group (firebaseClient, firebaseAdmin, stripe, openai). Never return values. No auth.
2. Reproduce locally: npm run build, then start the built server with only placeholder VITE_FIREBASE_* values and no server env. Request /, /templates, /signin, /pricing, /api/health. Report status codes. Do not start the dev server.
3. Fix any route that returns 500 because server env is absent when it does not need that env. Admin SDK stays lazy.
4. Production is Heroku: make NITRO_PRESET=node-server the documented production build, confirm `node .output/server/index.mjs` serves and honors PORT, add a heroku-postbuild-safe build (Node version in package.json engines), a Procfile that works, and rewrite docs/runbooks/connectors-github-vercel-heroku.md as a Heroku-first runbook (create app, config vars, GitHub deploy from main, domain and TLS, Firebase authorized domains, Stripe webhook URL, log commands). Keep Vercel as a short fallback section.
5. src/test/health.test.ts. Update docs/runbooks/launch.md smoke tests with /api/health.

Do not change Stripe, auth, or catalog code.
Stop and ask before changing src/server.ts error wrapping.
Verify: lint, typecheck, test, build.

Done when the local built server returns 200 on those routes with placeholder env and /api/health reports false for missing groups. Mark P06 done.
Not Verified (human): what Vercel or Heroku is serving now. Check the deployed commit and env.
```

## P07: Firestore rules and auth tests

Branch `p07-rules-auth`.
**Skills:** `/tdd`, `domain-modeling`, `/code-review`, security-auditor subagent after

```
Skills: /tdd, domain-modeling, /code-review. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, firestore.rules, src/lib/account-validation.ts, src/lib/checkout.functions.ts, src/lib/account-context.tsx, docs/SPEC.md (S2, S3, S4, S6), docs/ARCHITECTURE.md (data stores).

Goal: S3, S4, S6 proven by tests, and rules cover the new collections.

Do:
1. Tighten firestore.rules: profiles must not let the client write stripeCustomerId or any billing field (use request.resource.data.diff().affectedKeys()). Owner read-only on purchases, entitlements, unlocks. No client access at all to product_content and stripe_events. Explicit default deny.
2. Rules tests with @firebase/rules-unit-testing against the emulator ONLY if already installed. If not, stop and ask. If declined, write docs/QA/rules-checklist.md with manual emulator steps and mark S6 manual.
3. Unit tests for the checkout server function: no token rejected, unknown plan rejected, plan metadata set server-side.
4. safeReturnPath tests: //evil.com, https://evil.com, /\evil, javascript:, and a valid /pricing?checkout=lifetime.

Stop and ask before adding dependencies or deploying rules.
Verify: lint, typecheck, test, build.

Done when S3, S4, S6 have named tests (or the checklist). Mark P07 done. Tell the human: deploy rules with firebase deploy --only firestore:rules.
```

## P08: Security headers and AI rate limit

Branch `p08-headers-limits`.
**Skills:** `/tdd`, context7 (Nitro routeRules), `research` (CSP origins)

```
Skills: /tdd, research, context7 for Nitro route rules.

Read docs/PROGRESS.md, docs/SECURITY.md, docs/DECISIONS.md (D3), vercel.json, src/lib/recommend.functions.ts, src/lib/recommend.server.ts, src/start.ts, vite.config.ts.

Goal: S13 and S14, host-agnostic.

Do:
1. Set response headers in app code (Nitro routeRules or request middleware), so they apply on Heroku and Vercel alike: Strict-Transport-Security, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera, microphone, geolocation denied), frame-ancestors through CSP. Leave vercel.json for build config only.
2. Add Content-Security-Policy-Report-Only first. Allow only origins this app uses: self, Firebase auth domains, Stripe (js.stripe.com and checkout), Google sign-in, fonts and images found by grepping the code. Do not guess. Record each origin and why in docs/SECURITY.md.
3. src/lib/rate-limit.server.ts: sliding-window limiter used by the recommendation server function, keyed by Firebase uid when signed in, otherwise IP. Defaults 20 requests per 10 minutes. Over limit returns the same-category fallback and skips OpenAI. Comment that in-memory limits are per instance and a shared store is the later upgrade.
4. Validate the recommendation slug against the catalog before any OpenAI call.
5. Tests: limiter windows, over-limit uses fallback, unknown slug rejected, headers present on a built-server request.

Stop and ask before adding dependencies such as Upstash.
Verify: lint, typecheck, test, build. Run the built server and report headers for / with curl -I.

Done when headers appear on the built server and limiter tests pass. Mark P08 done.
```

## P09: Stripe hardening and credits

Branch `p09-stripe-credits`. Plan mode first.
**Skills:** `domain-modeling`, `/to-spec`, `/tdd`, `research`, context7 (Stripe API)

```
Skills: domain-modeling, /to-spec, /tdd, research, context7 for the Stripe API.

Read docs/PROGRESS.md, docs/DECISIONS.md (D7, D15, D16), docs/SPEC.md (S4, S5, S7, S19, S20, S21), docs/ARCHITECTURE.md, src/lib/stripe.server.ts, src/lib/checkout.functions.ts, src/routes/api/public/stripe-webhook.ts, src/lib/purchases.server.ts, src/lib/plans.ts, src/test/checkout-plans.test.ts, src/routes/pricing.tsx, src/routes/pricing_.videos.tsx.

Goal: payments are safe for real money and the plan table in DECISIONS D7 is enforced.

Audit first. Report findings with path:line before editing: signature check on the raw body, timestamp tolerance, events handled, idempotency, price_data versus stored Price IDs, success and cancel URLs, customer reuse, and what happens on cancel, payment failure, refund. Also report what the video-plan buttons on pricing_.videos.tsx currently do.

Then implement, smallest change each, tests first:
1. Reject webhook timestamps older than 5 minutes; verify the raw body.
2. Idempotency: record processed event ids in stripe_events. A replay is a 2xx no-op.
3. Entitlements: write entitlements/{uid} with plan, status (active, past_due, canceled, refunded), creditsRemaining, creditsPeriodEnd. Extend PLANS with credits per month (sections 1, sections-templates 3, lifetime unlimited via flag) and sectionAccess/templateAccess. Pricing amounts do not change.
4. invoice.paid (subscription create and cycle): set creditsRemaining to the plan's monthly amount. Set, never add. Replay is a no-op.
5. customer.subscription.deleted, invoice.payment_failed, charge.refunded update status. Per D15 a refund cancels the plan and revokes credit unlocks bought in that period. Cancel keeps existing unlocks.
6. Server function spendCredit(slug): requires ID token, validates slug against the catalog, runs a Firestore transaction (check credits, create unlocks/{uid}_{slug}, decrement), idempotent for a repeated call. Lifetime unlocks without spending.
7. Set client_reference_id and metadata (user_id, plan) server-side only. Reuse the stored Stripe customer.
8. Fixture tests: each event type, bad signature, old timestamp, duplicate event, double spend, zero credits.

Do not implement video plans here; list exactly what P21 needs.
Stop and ask before: changing prices or plan modes, adding the Stripe SDK (the repo uses REST), deploying rules.
Verify: lint, typecheck, test, build.

Done when S4, S5, S7, S19, S20, S21 are proven by named tests. Mark P09 done.
Not Verified (human): test-mode checkout with Stripe CLI forwarding; live mode switch.
```

## P10: Delivery design (spec only)

Branch `p10-delivery-spec`. Plan mode. No application code.
**Skills:** `/grill-me`, `domain-modeling`, `/to-spec`, `codebase-design`, `research`

```
Skills: /grill-me, domain-modeling, /to-spec, codebase-design, research.

Read docs/PROGRESS.md, docs/DECISIONS.md (D6, D7, D9, D13), docs/OLD-STARTUP-REUSE.md, src/lib/assistant-copy.ts, src/lib/catalog.ts, the field names (not contents) of src/lib/catalog.json, and the files in docs/example_customer_recivere/Collage template/ (read the first 60 lines of cursur.md and the section headings of every file; do not print the full 46 KB files).

Goal: design delivery of the per-tool rebuild prompt before building it.

Facts to respect: the per-tool Collage files differ by almost nothing, so one canonical body per product plus a short per-tool wrapper is enough. Free sections today get a reference prompt from assistant-copy.ts. Paid sections and unlocked templates get the full body. The delivered text carries the product title "... — Oversight Supply"; the rebrand to Substrates must be applied to the delivered content.

Do:
1. Report which catalog products are free or paid and what fields exist. Report how assistant-copy.ts builds prompts today.
2. Use /grill-me to ask me only what you cannot infer (maximum 5 questions): for example how Webflow vs Framer templates differ in the prompt, whether Figma files are delivered as links, and the license text.
3. Write docs/specs/delivery.md: canonical body format, per-assistant wrapper (list each assistant with its differences, based on the example files), storage in Firestore product_content/{slug} (D9 default; compare Vercel Blob private storage and say what would change), the upload script design (scripts/upload-product-content.mjs reading a git-ignored content/ directory), entitlement rules (D7 table), the "confirm before spend" flow, response shape, size limits, caching rules (no shared caches for entitled content), abuse limits, and the license shown to customers.
4. State the precondition from D13: the owner says all UI kits are owned and licensed, but resale of derived work is a separate question. Create docs/QA/licenses.md as a table (kit, license type, resale of derived templates allowed yes/no/unknown, evidence file in Startup/repos/Resoruces if ever needed/licenses). Fill only what the license files actually say, and leave "unknown" otherwise. Do not interpret legal terms beyond quoting the relevant line.
5. End with a numbered implementation plan for P11, each step with a verify check.

Do not write application code. Do not read anything in Startup/ except folder names.
Ask me to approve or change the design. Mark P10 done only after I approve; otherwise mark blocked with the question.
```

## P11: Delivery implementation

Branch `p11-delivery`. Plan mode. Requires P09 and P10 done.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, context7 (Firebase Admin)

```
Skills: /tdd, surgical-patch, verify-and-stop, context7 for Firebase Admin Firestore.

Read docs/PROGRESS.md and docs/specs/delivery.md. If P09 or P10 is not done, stop and say so.

Goal: S8. An entitled member picks an assistant and gets the right prompt text; a template can be unlocked with a credit.

Follow docs/specs/delivery.md step by step. Constraints:
- Entitlement is computed on the server from entitlements/{uid} and unlocks/*. Free sections need only a signed-in account. Pro sections need an active Sections, Sections + Templates, or Lifetime plan. Templates need an unlock or Lifetime.
- The body is read from product_content/{slug} by a server function that requires an ID token, validates the slug against the catalog, and validates the assistant against assistantSchema. It returns the wrapped text. It sends Cache-Control: no-store.
- The existing copy flow stays: success is shown only after the clipboard write is awaited, and a signed-out visitor returns after sign-in and reopens the assistant choices without an automatic copy.
- UI: on a locked template show "Unlock with 1 credit" with a confirm dialog that states credits left. Not entitled and no credits: link to /pricing.
- scripts/upload-product-content.mjs uploads from a git-ignored content/ directory using the Admin SDK; add content/ to .gitignore. Do not upload real files.
- Tests: entitled section, wrong plan, no token, unknown slug, unknown assistant, template with credit, template without credit, lifetime, canceled keeps unlocks.
- Add a build-output test: grep the built client assets for a marker string stored only in a fixture product body; it must not appear.

Stop and ask before: changing Firestore rules, creating a bucket, adding a dependency.
Verify: lint, typecheck, test, build.

Done when S8 is proven by tests and the build-output test passes. Mark P11 done.
```

## P12: Checkout page with product photos

Branch `p12-checkout-page`.
**Skills:** `frontend-design`, `ui-ux-pro-max`, `/hallmark`, `/tdd`, `/impeccable polish`

```
Skills: frontend-design, ui-ux-pro-max, /hallmark, /tdd, /impeccable polish.

Read docs/PROGRESS.md, docs/DECISIONS.md (D7), roadmap.md, src/routes/pricing.tsx, src/routes/checkout-success.tsx, src/components/CatalogBrowser.tsx, src/components/ProductPage.tsx, src/lib/catalog.ts, src/lib/plans.ts, src/styles/ (pricing css only).

Goal: roadmap item "Checkout page showing product photos".

Do:
1. After a plan is chosen on /pricing and before the Stripe redirect, show a checkout summary: plan name, price from PLANS, what is included (use the wording from the pricing page: credits, permanent unlocks, 14-day refund), and three to six real product photos from the catalog for that plan. Photos come from catalog.json image fields only.
2. Keep the sign-in resume flow (checkoutResumePath). No second auth listener.
3. checkout-success.tsx: confirm the plan, wait for the webhook-written entitlement (poll up to 30 seconds with a clear "still confirming" state), then link to the account page and to the first available action (browse sections or unlock a template).
4. Pricing markup is captured source. Add the summary as a new component mounted with the smallest change in pricing.tsx; use existing design tokens and the existing look of the page.
5. Tests: summary shows plan and photos; success shows confirming then confirmed.

Do not generate new photos or edit captured CSS files.
Stop and ask before touching captured CSS.
Verify: lint, typecheck, test, build.

Done when summary and success states are covered by tests. Mark P12 done.
```

## P13: Account library page

Branch `p13-account-library`.
**Skills:** `frontend-design`, `ui-ux-pro-max`, `/tdd`, `/impeccable audit`

```
Skills: frontend-design, ui-ux-pro-max, /tdd, /impeccable audit.

Read docs/PROGRESS.md, src/routes/signin.tsx, src/lib/account-context.tsx, src/lib/purchases.server.ts, src/lib/checkout.functions.ts, docs/DECISIONS.md (D7).

Goal: S6, S7, S19 are visible to the user.

Do:
1. After sign-in, /signin renders account controls (existing structure, no new auth listener). Add: current plan and status, credits remaining and the date they reset, a library of unlocked templates with a "Copy for [assistant]" action, purchase history, and "Manage billing" (Customer Portal).
2. Empty states: no plan (link to /pricing), no unlocks.
3. Hide "Manage billing" with an explanation when there is no Stripe customer.
4. Tests for states: none, active with credits, active with 0 credits, past_due, canceled with unlocks kept, lifetime.

Keep the route at /signin; add no new public route unless forced, and say why.
Stop and ask before changing sign-in callback handling.
Verify: lint, typecheck, test, build.

Done when all states have tests. Mark P13 done.
```

## P14: SEO

Branch `p14-seo`.
**Skills:** `/tdd`, `research`, context7 (TanStack Router head)

```
Skills: /tdd, research, context7 for TanStack Router head() and server routes.

Read docs/PROGRESS.md, src/routes/__root.tsx, src/routes/templates_.$slug.tsx, src/routes/sections_.$slug.tsx, src/lib/brand.ts, public/robots.txt if present.

Goal: S15, branded Substrates only.

Do:
1. Per-route head(): title, description, canonical, og:title, og:description, og:image, twitter card. Product routes use catalog name, description, and photo. The canonical host comes from brand.ts (https://substrates.app). Remove any "Oversight Supply" in titles and descriptions.
2. /sitemap.xml route from catalog slugs, static pages, and guide slugs. /robots.txt allows crawling, disallows /api/ and /signin, and points at the sitemap.
3. JSON-LD Product on product pages using catalog name and price only. Do not invent ratings or reviews.
4. Tests: sitemap lists a known slug and excludes /api/; product head has canonical and og tags.

Do not edit captured markup beyond head metadata.
Verify: lint, typecheck, test, build.

Done when the tests pass. Mark P14 done.
```

## P15: Error monitoring

Branch `p15-monitoring`.
**Skills:** `research`, `/tdd`, context7 (Sentry)

```
Skills: research, /tdd, context7 for Sentry with TanStack Start.

Read docs/PROGRESS.md, docs/DECISIONS.md (D8), src/lib/error-capture.ts, src/lib/error-page.ts, src/server.ts, src/lib/webmcp-telemetry.ts.

Goal: production errors reach you with no secrets or personal data.

Do:
1. Report what error-capture.ts and webmcp-telemetry.ts do today and whether anything still posts to a Lovable endpoint. Remove it if so.
2. Check the current Sentry guidance for TanStack Start and for the education plan from the GitHub Student Developer Pack. Report the exact packages and versions. Ask me to approve before installing.
3. Add Sentry for server and client behind SENTRY_DSN / VITE_SENTRY_DSN. No-op when unset. Scrub request bodies, headers, cookies, and user emails. Tag releases with the commit sha env of the host (VERCEL_GIT_COMMIT_SHA or SOURCE_VERSION).
4. Capture unhandled server-function errors, webhook failures, and render errors. Do not capture expected 4xx.
5. Add the variable names to .env.example and src/lib/env.server.ts.
6. Test: the scrubber removes authorization, cookie, and email fields.

Verify: lint, typecheck, test, build.

Done when the scrubber test passes and the code is a no-op without a DSN. Mark P15 done.
Human step: create the Sentry project from the education account, set DSNs on the host, trigger one test error.
```

## P16: MCP hardening

Branch `p16-mcp`. Plan mode first.
**Skills:** `/tdd`, `codebase-design`, `/code-review`, context7 (MCP SDK)

```
Skills: /tdd, codebase-design, /code-review, context7 for the MCP SDK.

Read docs/PROGRESS.md, docs/DECISIONS.md (D10), docs/SPEC.md (S11, S12), src/routes/mcp.ts, src/routes/[.well-known]/oauth-protected-resource.ts, src/lib/mcp-server/*, src/lib/webmcp-telemetry.ts, ASSISTANT_INTEGRATIONS.md.

Goal: S11 and S12 proven. The MCP stays sign-in only and catalog-only; there is no paid tier (D10).

Do:
1. Verify the handler validates the Firebase ID token's signature, issuer, audience, and expiry. Report how, with path:line.
2. Tests: no token returns 401 with WWW-Authenticate pointing at the metadata URL; a valid mocked token lists tools; tools never return profile, purchase, entitlement, unlock, or product_content data.
3. Confirm the metadata names Firebase as issuer and nothing from Supabase or Lovable.
4. Apply the P08 per-uid limiter to the MCP endpoint.
5. Update ASSISTANT_INTEGRATIONS.md to match the real behavior.

Stop and ask before changing token validation rules or adding dependencies.
Verify: lint, typecheck, test, build.

Done when S11 and S12 have named tests. Mark P16 done.
```

## P17: Performance and accessibility

Branch `p17-perf-a11y`.
**Skills:** `/impeccable audit`, `/impeccable polish`, `a11y-debugging`, `ui-ux-pro-max`, `verify-and-stop`

```
Skills: /impeccable audit, /impeccable polish, a11y-debugging, ui-ux-pro-max, verify-and-stop.

Read docs/PROGRESS.md and the structure (sizes, not contents) of public/ and src/assets/.

Goal: key pages load fast and meet basic accessibility.

Do:
1. Measure the built server with Lighthouse CLI if installed (otherwise say what you could not run) for /, /templates, /sections, /pricing, one product page, /signin. Record mobile scores and LCP in docs/QA/perf.md.
2. Find the five largest images served on those pages. For images over 300 KB served from this repo: add width and height, lazy-load below the fold, and use WebP where an equivalent exists. Keep originals.
3. Fix cheap, local accessibility issues: missing alt text on non-decorative images, buttons without accessible names, contrast failures fixable with a token change, visible keyboard focus. Do not restructure captured markup.
4. Put anything needing captured-markup changes in docs/QA/perf.md instead of fixing it.
5. Check the new components from P12 and P13 with /impeccable audit.

Stop and ask before adding an image-processing dependency.
Verify: lint, typecheck, test, build.

Done when docs/QA/perf.md has before and after numbers for at least three pages. Mark P17 done.
```

## P18: Rebrand sweep and legal pages

Branch `p18-legal-rebrand`.
**Skills:** `/grill-me`, `writing-for-agents`, `verify-and-stop`

```
Skills: /grill-me, writing-for-agents, verify-and-stop.

Read docs/PROGRESS.md, docs/DECISIONS.md (D11, D14, D15), src/routes/privacy.tsx, terms.tsx, refunds.tsx, help.tsx, src/lib/brand.ts, src/lib/use-supply-shell.ts, and the pricing page copy (14-day refund, credits, permanent unlocks).

Goal: S18. Everything is Substrates. The old legal text is deleted and rewritten from what the app really does.

Do:
1. Sweep: grep "Oversight", "OversightStudio", "Oversight Supply", "oversight-supply" across src, public, docs (not Startup, .site-import, .output). List each hit, then replace the visible ones with Substrates or the brand.ts constants. Leave package name, repo folder name, and git history alone. Report what you left and why.
2. Use /grill-me to ask me for D14 (legal entity name, address, governing law) and anything else only I can decide. Do not invent them: where unanswered, insert a visible [LEGAL ENTITY] placeholder and list it.
3. Rewrite privacy.tsx, terms.tsx, refunds.tsx as new Substrates pages. Providers named must match the code (Firebase, Stripe, the host, OpenAI if enabled, Sentry if added). Remove PostHog and Supabase unless the code uses them.
4. Terms and refunds: the real plans and prices, credits that reset monthly and do not roll over, permanent unlocks, cancellation through the Customer Portal, 14-day refund (D15 for access), the license for delivered prompts and source, and acceptable use.
5. Cookie banner text matches real storage (localStorage favorites, Firebase auth persistence).
6. Keep route files as they are structurally; replace the text.
7. Write docs/QA/legal-claims.md: each claim marked true or false against the code.

Stop and ask for any policy numbers or license scope.
Verify: lint, typecheck, test, build.

Done when no visible "Oversight" remains except noted exceptions and every claim is true. Mark P18 done. State plainly that this is not legal advice and needs review by a person qualified to give it.
```

## P19: Full review (no fixes)

Review mode. Strong model.
**Skills:** `/code-review`, `/ce-code-review`, `/thermo-nuclear-code-quality-review`, `/impeccable audit`

```
Skills: /code-review, /ce-code-review, /thermo-nuclear-code-quality-review, /impeccable audit. Run the code-reviewer and security-auditor subagents.

Read docs/PROGRESS.md, docs/SPEC.md, docs/RELEASE.md.

Review the diff from the commit before P01 to main (git diff <base>...main). Write docs/REVIEW-PACK1.md that combines all reviews, plus a table of S1 to S22 with proven, manual, or open and the evidence.
Add sections "Launch blockers" (anything violating docs/RELEASE.md) and "Human steps still open".

Do not fix anything. Edit only docs/REVIEW-PACK1.md and docs/PROGRESS.md.

Done when REVIEW-PACK1.md exists with severities and file:line. Mark P19 done.
```

## P20: Repair and v0.1.0

Branch `p20-repair`. Strong model.
**Skills:** `surgical-patch`, `verify-and-stop`, `/ce-compound`, `caveman-commit`

```
Skills: surgical-patch, verify-and-stop, /ce-compound, caveman-commit.

Read docs/PROGRESS.md and docs/REVIEW-PACK1.md.

Fix every Critical, High, and Medium finding that is a real defect. Leave Low findings that are taste, listed in the report.
Each fix: smallest change, a test, one commit.
Re-run lint, typecheck, test, build, check:vendors.
Update scenario statuses in docs/QA/baseline.md terms and the docs/RELEASE.md checkboxes only where evidence exists.
Write docs/QA/pack1-record.md: each prompt P01 to P21 as done, blocked, or skipped with its PR and test command. Do not claim live Stripe, live Firebase, or production deployment without a recorded command or a human note.
Use /ce-compound to add a short docs/LEARNINGS.md from what went wrong in this pack.

Stop and ask before: changing plan prices, deploying rules, adding dependencies.

Done when all checks pass and pack1-record.md exists. Mark P20 done. Print the git tag command for v0.1.0 for the human to run after the production smoke test; do not tag yourself.
```

## P21: Video skills checkout (optional)

Branch `p21-video-plans`. Plan mode.
**Skills:** `domain-modeling`, `/tdd`, `frontend-design`, context7 (Stripe)

```
Skills: domain-modeling, /tdd, frontend-design, context7 for Stripe.

Read docs/PROGRESS.md, docs/DECISIONS.md (D16), docs/SPEC.md (S22), src/routes/pricing_.videos.tsx, src/routes/videos.tsx, src/routes/videos_.*.tsx, src/lib/plans.ts, the P09 audit notes about video plans.

Goal: S22. Video skills are a separate product at $9.99 per month or $79.99 per year, on /pricing/videos, independent of the template plans.

Do:
1. Add video plans to PLANS (or a sibling VIDEO_PLANS) with server-side prices. Monthly $9.99, yearly $79.99.
2. Checkout, webhook, and entitlements treat video access as a separate flag, so a template plan never grants video access and the reverse.
3. Wire the buttons on pricing_.videos.tsx with the smallest change to captured markup. Reuse the sign-in resume flow.
4. Gate whatever the video demo pages say is premium; report what that is before changing anything.
5. Tests: video checkout creates the right session, webhook sets the flag, a template-plan user has no video access.

Stop and ask before changing prices, adding a dependency, or deploying rules.
Verify: lint, typecheck, test, build.

Done when S22 is proven by tests. Mark P21 done.
```

---

## After pack 1

Next ideas live in [../LATER.md](../LATER.md). Write pack 2 only after P20 is merged and `RELEASE.md` is checked.
