# Substrates: Cursor prompts, pack 3 (P24 to P43)

Goal: take the Lemon Squeezy build from "tests pass" to "safe to launch an MVP". Same rules as [PACK-1.md](PACK-1.md) and [PACK-2.md](PACK-2.md): one prompt per chat, new Agent chat, repo root, `.cursor/rules/` load automatically, and the **Skills** line is also the first line of each prompt. Decisions: [../DECISIONS.md](../DECISIONS.md) (D3, D14, D17 to D21).

**Every prompt uses the same five skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, and the `security-auditor` subagent. Extra skills are added where the work needs them. If a skill name is not installed, delete it from the line.

**Standard footer (already inside each prompt):** run `git status` first and stop if earlier work is uncommitted; verify with `npm.cmd run lint`, `typecheck`, `test`, `build`, `check:vendors`; run the `security-auditor` subagent on the branch and fix in-scope High findings; update `docs/PROGRESS.md`; commit AND push the branch (**mandatory**, `.cursor/rules/git-commit-push.mdc`; a task that changed any line is not done until the report shows the commit hash, `Pushed: yes`, and a clean `git status -sb`).

**Agentic notice:** these prompts let Cursor edit files and run shell commands in your repo. Each has a stop list.

## Before you start

1. Merge in this order so branches stack cleanly: PR #1 (`p01-p21-pack1`), then `p22-billing-spec`, then `p23-lemonsqueezy`. Start P24 from updated `main`.
2. Run `gh auth login -h github.com -s repo,workflow` once if you want the CLI to touch workflows.
3. Answer the open questions listed under "Questions for the owner" at the end. P25 and P26 need the answers.

## Run order

| Id  | Topic                                              | Mode            | Strong model? |
| --- | -------------------------------------------------- | --------------- | ------------- |
| P24 | Repo hygiene and doc reconciliation                | Agent           | No            |
| P25 | Billing hardening from the P23 review              | Agent           | Yes           |
| P26 | Video skills checkout on Lemon Squeezy (S22)       | Agent           | No            |
| P27 | Kit licenses and the Substrates license (D20)      | Agent           | Yes           |
| P28 | Legal pages for Substrates (D14, D17)              | Agent           | No            |
| P29 | Heroku-ready build and runbook                     | Plan then Agent | Yes           |
| P30 | Firestore rules tests and deploy checklist         | Agent           | No            |
| P31 | Product-content tooling                            | Agent           | No            |
| P32 | Launch catalog gating ("coming soon")              | Agent           | No            |
| P33 | Marketing claims audit                             | Agent           | No            |
| P34 | Account lifecycle                                  | Agent           | No            |
| P35 | Assistant wrapper contract tests                   | Agent           | No            |
| P36 | Observability                                      | Agent           | No            |
| P37 | Static asset caching, compression, bundle size     | Agent           | No            |
| P38 | Accessibility pass II                              | Agent           | No            |
| P39 | SEO pass II                                        | Agent           | No            |
| P40 | Abuse limits and CSP enforcement                   | Agent           | Yes           |
| P41 | Billing reconcile, backup, and admin CLI           | Agent           | No            |
| P42 | Full review, no fixes                              | Review          | Yes           |
| P43 | Repair and v0.2.0                                  | Agent           | Yes           |

---

## P24: Repo hygiene and doc reconciliation

Branch `p24-hygiene`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `/deslop`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, /deslop. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (Round 3), docs/WORKFLOW.md, .gitignore, package.json, docs/RELEASE.md, docs/SECURITY.md, docs/runbooks/*.

Run git status first; stop if earlier work is uncommitted.

Goal: the repo and docs describe the Lemon Squeezy, Heroku, Firebase-only product, with no junk files.

Do:
1. .gitignore: add .tsc-out.txt, lint-out.txt, *.log outputs, prompt-master-main/, and the content/ directory (product bodies). Remove any of those already tracked with git rm --cached (do not delete the files on disk).
2. Lint: fix the 11 warnings (react-refresh and exhaustive-deps) without changing behavior and without touching captured markup. If a warning needs captured-markup changes, list it and leave it.
3. Delete the legacy Stripe fixtures under src/test/fixtures/stripe/ if nothing references them; keep no-stripe-sources.test.ts and extend it to scan docs-free source only (src, scripts, root configs, .env.example).
4. Reconcile stale docs. Search docs, PRODUCT.md, AGENTS.md, README.md, ASSISTANT_INTEGRATIONS.md, .cursor/, and runbooks for: Stripe, Vercel as production, Customer Portal wording tied to Stripe, "Oversight", [LEGAL ENTITY]. Update: docs/PROGRESS.md human-steps list (Lemon Squeezy account, webhook URL on Heroku, not Stripe), docs/RELEASE.md checkboxes, docs/SECURITY.md CSP origin table (Stripe origins removed), docs/runbooks/connectors-github-vercel-heroku.md. Leave docs/plans/ and docs/QA/stripe-audit-p09.md as history with a one-line "historical" banner.
5. Add npm script "verify": runs lint, typecheck, test, build, check:vendors in order, and use it in the footer of future prompts. Mention it in docs/WORKFLOW.md.
6. Add a test or script check that fails if a tracked file name matches *-out.txt.

Stop and ask before: deleting anything not listed, adding a dependency.
Done when npm.cmd run verify passes, git ls-files shows none of the junk, and no doc claims Stripe or Vercel is the production setup. Mark P24 done in docs/PROGRESS.md. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P25: Billing hardening from the P23 review

Branch `p25-billing-hardening`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `domain-modeling`, context7

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, domain-modeling, context7 for Lemon Squeezy. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/specs/billing-lemonsqueezy.md, docs/DECISIONS.md (D7, D15, D17), src/lib/billing/*, the webhook route and process-webhook.server.ts, src/lib/checkout.functions.ts, src/lib/entitlements.server.ts, src/lib/spend-credit.server.ts, src/lib/env.server.ts, src/test/lemonsqueezy-webhook.test.ts, src/test/checkout-plans.test.ts.

Run git status first; stop if earlier work is uncommitted.

Goal: fix every item the P23 review and security audit raised. Tests first for each.

Do:
1. Test-mode guard: when NODE_ENV is production (or the host sets a production flag you can read from env) and LEMONSQUEEZY_TEST_MODE is true, /api/health reports a warning and the webhook ignores test-mode events unless an explicit LEMONSQUEEZY_ALLOW_TEST_IN_PROD=true is set. Live events are ignored while test mode is on in a non-production environment. Test all four combinations.
2. Plan and variant cross-check: on every order or subscription event, the variant id must map to the same plan as custom_data.plan. A mismatch is logged (no PII) and produces no entitlement write. Cover the single-template purchase path (plan "template:<slug>"): it must only grant an unlock for that slug, never the lifetime plan, and the slug must exist in the catalog and be purchasable.
3. Single-template purchases use the lifetime variant with custom_price from the catalog. Prove with tests that: the price is computed on the server from catalog.json, a lifetime variant order WITHOUT the template custom data grants lifetime only when the paid total is at least the lifetime plan price, and a template order can never grant lifetime. If Lemon Squeezy's docs say custom_price cannot be relied on this way, stop and report.
4. Unknown variant: log a warning with the variant id and event name, return 200, write nothing. Missing user_id after idempotency claim: release the claim, log, and return 200 (so a fix can be replayed from the dashboard); test it.
5. Map subscription_payment_recovered to the normalized subscription_cycle_paid event per the spec table, with a test that credits are set, not added.
6. Set the checkout cancel/redirect behavior the spec describes (return to /pricing?checkout=cancelled) and show a calm message on /pricing.
7. Scrub Lemon Squeezy API error logging: never log the Authorization header, API key, request body email, or full response bodies; log status and error code only. Add a test with a fake failing fetch.
8. Idempotency under partial failure: if dispatch throws after a claim, the claim is released and the provider retry succeeds; test it.
9. Split lemonsqueezy-provider.ts if it exceeds about 300 lines: one file for checkout, one for webhook parsing, one for event mapping. Behavior must not change.

Stop and ask before: adding a dependency, changing prices or plan ids, editing Firestore rules.
Done when each item has a named test, npm.cmd run verify passes, and the security-auditor reports no High. Mark P25 done in docs/PROGRESS.md. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): test-mode purchase in the real Lemon Squeezy dashboard.
```

## P26: Video skills checkout on Lemon Squeezy (S22)

Branch `p26-video-checkout`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `frontend-design`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, frontend-design. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D7 video line, D16, D17), docs/SPEC.md (S22), docs/specs/billing-lemonsqueezy.md, src/routes/pricing_.videos.tsx, src/routes/videos.tsx, src/routes/videos_.*.tsx, src/lib/plans.ts, src/lib/billing/*, src/test/video-skills.test.ts.

Run git status first; stop if earlier work is uncommitted.

Goal: S22. Video skills are a separate product at $9.99 per month or $79.99 per year, independent of the template plans.

Do:
1. Add two video plans to the plan model with server-side prices and two env variant ids (LEMONSQUEEZY_VARIANT_ID_VIDEO_MONTHLY, LEMONSQUEEZY_VARIANT_ID_VIDEO_YEARLY). Add them to env.server.ts, .env.example, and /api/health (booleans).
2. Entitlement: a separate videoAccess flag with status and period end. A template plan never grants video access; a video plan never grants templates, credits, or unlocks. Cancel keeps access until the period ends; expiry and refund remove it.
3. The owner has not created the video product or its content yet. Build the code and tests, but the video buttons stay disabled with a calm "Coming soon" label whenever either video variant env var is missing (and in /api/health report videoConfigured false). Re-enable startVideoCheckout using the same checkout path, with the same plan/variant cross-check as P25.
4. Wire the buttons on pricing_.videos.tsx with the smallest change to captured markup and keep the sign-in resume flow.
5. Report what the video demo pages claim is premium. Gate only what the pages already say is premium; do not invent gating.
6. Tests: monthly and yearly checkout bodies, webhook grants and removes videoAccess, template-plan user has no video access, video buyer has no template access, renewal sets period end.
7. Update docs/SPEC.md S22 wording, the account dashboard to show video status, and docs/specs/lemonsqueezy-setup.md with the two extra variants.

Stop and ask before: changing prices, adding a dependency, editing Firestore rules (if the rules need a new field, ask and show the exact diff).
Done when S22 is proven by named tests and npm.cmd run verify passes. Mark P26 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P27: Kit licenses and the Substrates license (DEFERRED: owner said skip for now)

> **Skip this prompt.** On 2026-11-03 the owner decided to leave licensing for later (DECISIONS D22). Do not run it before launch work. Risk the owner accepted: products built on UI kits whose resale terms are unknown (`docs/QA/licenses.md`) may breach a kit license. Run P27 before charging real customers if any launch product derives from a kit. Prompts P28 and P35 are written to work without it.

Branch `p27-licenses`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `research`, `writing-for-agents`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, research, writing-for-agents. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D13, D20), docs/QA/licenses.md, docs/specs/delivery.md (license section), and the delivery wrapper code that adds licenseNotice.

Run git status first; stop if earlier work is uncommitted.

Goal: D13 and D20. Know exactly what each UI-kit license allows, and ship a Substrates customer license.

The owner authorizes you to read these files, which belong to the owner: Startup/repos/Resoruces if ever needed/licenses/ (the eight *_license.json and *ACTIVATION_CERTIFICATE.txt files) and the license text inside each kit folder (LICENSE, license.txt, EULA). Read only license and certificate files. Do not copy any kit source into the repo. Never print serial numbers, activation keys, emails, or order ids; quote only the sentences about use, redistribution, resale, and derivative works.

Do:
1. For each of the eight kits fill docs/QA/licenses.md: license type, resale of derived templates (yes, no, unknown), quoted line, and file name. If a license file does not address resale of derivative work, write unknown. Do not interpret law; add a line "needs human or counsel review" for every row marked yes.
2. Add a column "Products in catalog.json built on this kit" ONLY if the catalog or docs say so; otherwise write "owner to fill".
3. Write docs/legal/substrates-license.md: the customer license for delivered rebuild prompts and generated code. It must state: licensed to the buyer (person or one company), use in unlimited own and client projects, no resale or redistribution of the prompt or source as a template, prompt or collection, no sharing of account access, attribution not required, permanent for unlocked products, plan terms for subscription content, termination on chargeback abuse, no warranty, third-party fonts and images carry their own licenses. Mark it "draft, not legal advice" and list questions for a lawyer.
4. Replace the draft licenseNotice in the delivery wrapper with a short pointer and a link to /license (new static route using the existing legal page layout). Keep the license page text in one source file so the wrapper and the page cannot drift. Test that the wrapper contains the license URL and that the page renders the same version string.
5. Add a launch gate in code: a build-time or test-time check reads a list of product slugs marked "shippable" in a small JSON file (content-gate.json) and fails if any shippable slug depends on a kit row marked no or unknown. If the catalog has no kit field, add an optional "kit" field to the gate file, not to catalog.json.

Stop and ask before: adding a dependency, changing catalog.json, or marking any row yes without a quoted sentence.
Done when licenses.md has no row left unfilled that the files could answer, /license renders, tests pass, and npm.cmd run verify passes. Mark P27 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): lawyer review of the license text.
```

## P28: Legal pages for Substrates

Branch `p28-legal`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `writing-for-agents`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, writing-for-agents. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D11, D14, D15, D17, D22, D23), docs/QA/legal-claims.md, src/lib/brand.ts, src/routes/privacy.tsx, terms.tsx, refunds.tsx, help.tsx, the cookie banner code in src/lib/use-supply-shell.ts.

Run git status first; stop if earlier work is uncommitted.

Goal: S18. Legal pages describe the real product: Substrates, a solo-founder business in Chennai, India, with Lemon Squeezy as merchant of record.

Facts to use (from the owner): operator "Substrates", Chennai, India; support email jatin@substrates.app; no registered company yet; payments, tax collection, receipts, and billing management handled by Lemon Squeezy as merchant of record; hosting on Heroku; Firebase Authentication and Firestore (Google LLC) for accounts and data; OpenAI for related-item suggestions when enabled; Sentry for error monitoring when enabled.

Do:
1. Set the operator constants in brand.ts and remove every [LEGAL ENTITY] placeholder. Do not invent an address beyond "Chennai, India".
2. Rewrite privacy.tsx: what is collected (email, name, profile, purchase and entitlement records, IP and device data in server logs, error reports), why, which providers receive what, retention, user rights (access, correction, deletion by emailing or through account deletion once P34 ships), international transfer note, cookies and localStorage actually used (read the code to list them), children, contact. Remove any provider the code does not use.
3. Rewrite terms.tsx: the real plans and prices (read plans.ts), credits that reset monthly with no rollover, permanent unlocks, a short "use of purchased content" clause (use in your own and client projects; no resale, sharing, or redistribution of the prompts or source), marked draft because the full license (P27) is deferred, acceptable use, accounts, availability, limitation of liability, governing law India with courts at Chennai (draft), changes to terms, contact. State that Lemon Squeezy is the seller of record for purchases and its terms apply to payment.
4. Rewrite refunds.tsx minimally: the owner deferred the refund policy until the product is complete (D15, D23). State only what is certain: refunds are handled through Lemon Squeezy and the support email, subscriptions are cancelled through the customer portal, and the full refund terms will be published before paid launch. Do not state a refund window or what happens to unlocks. Record in docs/QA/legal-claims.md that the pricing page still says "Full refund within 14 days" and that this claim is unproven until the policy exists (P33 handles it).
5. Update docs/QA/legal-claims.md: each claim true or false against the code, with file paths.
6. Add tests: no legal page contains Stripe, Supabase, PostHog, Vercel as host, Oversight, or [LEGAL ENTITY]; every provider named on the privacy page appears in the provider list constant, and the list matches env groups that exist.
7. Replace text only. Do not restructure captured markup or change captured CSS.

Stop and ask before: stating any policy number the owner has not given, or adding a dependency.
Done when the tests pass, npm.cmd run verify passes, and legal-claims.md has no false claim. Mark P28 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
State plainly in the report that this is not legal advice.
```

## P29: Heroku-ready build and runbook

Branch `p29-heroku`. Plan mode first.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `investigate-first`, context7

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, investigate-first, context7 for Nitro node-server and Heroku Node buildpack. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D3, D18), docs/ARCHITECTURE.md, Procfile, package.json (scripts, engines), vite.config.ts, vercel.json, .env.example, docs/runbooks/*, src/routes/api/health.ts.

Run git status first; stop if earlier work is uncommitted.

Goal: the app builds and runs on a Heroku Basic or Eco dyno with only free-tier services, and the human can deploy by following one runbook. You do not deploy.

Do:
1. Build for Heroku: confirm NITRO_PRESET=node-server is what Heroku's build uses (set in package.json scripts or app.json, not only in a dashboard var). Pin Node in package.json engines to a version Heroku supports. Make sure the Node buildpack runs npm run build and does not prune build tools before it. Check devDependencies needed at build time are available (set NPM_CONFIG_PRODUCTION=false in app.json if required).
2. Procfile: web process starts the built server, binds 0.0.0.0 and $PORT. Test locally with PORT=5055: / and /api/health return 200 with placeholder env.
3. Add app.json (name, buildpacks, env var NAMES with descriptions, no values, required flags) so a Heroku app can be created from the repo.
4. Add a graceful SIGTERM handler or confirm Nitro's, so deploys do not drop webhook requests; document the 30 second window.
5. Memory and cold start: report the built server's RSS after serving 20 requests; target under 400 MB (Basic/Eco dynos have 512 MB). If higher, list the cause.
6. Dyno choice is made (D24): Basic (about $7/month, never sleeps, fits inside the $13/month student credit). Document it, with the credit math, and note that Eco sleeps after 30 minutes idle and can delay webhooks, so do not use it for production.
7. Write docs/runbooks/heroku.md with exact commands: create app, set buildpack, set config vars from .env.example by name (values are pasted by the human), connect GitHub deploys from main with "wait for CI", add domain substrates.app and www, ACM TLS, DNS records the registrar needs, set the Lemon Squeezy webhook URL, set Firebase authorized domains, heroku logs commands, rollback with heroku releases:rollback, scale commands.
8. Remove vercel.json only if nothing else needs it; otherwise keep it and label it "fallback" in the runbook.
9. CI: add a job step that builds with NITRO_PRESET=node-server and starts the server for a 200 check on /api/health.

Stop and ask before: adding a dependency, changing the Node major version, deleting vercel.json.
Done when the local node-server smoke test passes, the runbook exists, CI has the smoke step, and npm.cmd run verify passes. Mark P29 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): the actual Heroku deploy, DNS, TLS, and webhook delivery.
```

## P30: Firestore rules tests and deploy checklist

Branch `p30-rules-tests`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `domain-modeling`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, domain-modeling. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, firestore.rules, docs/QA/rules-checklist.md, docs/SPEC.md (S6), docs/ARCHITECTURE.md (data stores), docs/SECURITY.md.

Run git status first; stop if earlier work is uncommitted.

Goal: S6 becomes automated. The owner approves adding @firebase/rules-unit-testing and firebase-tools as DEV dependencies only, both free, to run the Firestore emulator locally and in CI.

Do:
1. Add the dev dependencies, a firebase.json (firestore rules path and emulator port only), and an npm script "test:rules" that starts the emulator and runs rules tests under tests/rules/ (keep them out of the default "npm test" if they need Java; document the Java requirement and make CI install it).
2. Rules tests, one file per collection, covering allow and deny: profiles (owner read, owner create and update of allowed fields only, no write of billing or role fields, no cross-user read), billing_* and entitlements and unlocks (owner read only, no client write), purchases, product_content (no client read or write), billing_processed_events (no client access), and a catch-all deny for any other path. Every rule in firestore.rules gets at least one allow test and one deny test. Test that unauthenticated reads are denied everywhere.
3. If the tests expose a hole, fix firestore.rules with the smallest change and show the diff in the report.
4. CI: add a job that runs test:rules with the emulator (setup-java and cache). Mark it required in docs only; the human sets branch protection.
5. Document in docs/runbooks/firebase.md: create the production Firebase project on the free Spark plan, enable Google and Email/Password sign-in, authorized domains (substrates.app, www, the Heroku app domain, localhost), deploy rules with firebase deploy --only firestore:rules, Spark daily quotas (read/write/delete counts and storage) as published in Firebase docs (cite the URL; if unsure, say "check the console"), and what to do when the quota is hit.
6. Update docs/QA/rules-checklist.md to point at the automated tests and mark S6 proven in docs/QA/baseline.md terms.

Stop and ask before: adding any dependency other than the two named, or deploying rules.
Done when test:rules passes locally (or you report Java missing and the human must install it), CI job exists, and npm.cmd run verify passes. Mark P30 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): rules deployed to the production Firebase project.
```

## P31: Product-content tooling

Branch `p31-content-tooling`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `writing-for-agents`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, writing-for-agents. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D6, D9, D19, D20), docs/specs/delivery.md, scripts/upload-product-content.mjs, src/lib/deliver-product-prompt* and the wrapper code, and the files in docs/example_customer_recivere/Collage template/ (headings and the first 60 lines of one file only; never print a whole 46 KB file).

Run git status first; stop if earlier work is uncommitted.

Goal: the owner can write one product body per template or section, validate it, and upload it safely. Bodies are not finished yet; build the pipeline, not the content. The first products to get bodies are the ones on the homepage showcase (D25): read src/routes/index.tsx, extract the slugs of the Webflow picks, Free sections, and Framer templates groups, and write them to docs/launch-products.md with the catalog slug for each (flag any that do not match a catalog slug). Add a content/TODO.md template (git-ignored) listing those slugs as a checklist, and make `npm run content:status` print which launch products have a validated body and which do not.

Do:
1. Write docs/specs/product-body-format.md from the Collage example: required headings in order (title line, description, stack and dependencies, layout and content, interactions and animation, responsive behavior, accessibility, performance notes, assets, putting it in an existing site, full source code with one heading per file and a fenced block, build and run, limitations), allowed placeholders, and the rule that the delivered title uses "Substrates", never "Oversight Supply".
2. Add a content/ directory layout (git-ignored): content/<slug>.md, plus content/README.md ignored too. Add content-example/collage.md as a TRACKED, rebranded sample derived from the Collage example, with the full source collapsed to two small files so the repo does not hold a real product body. State clearly in its first line that it is a format sample.
3. scripts/validate-product-content.mjs: for each file in content/ (and content-example/), check required headings and order, fenced blocks balanced, size under 900 KB (Firestore doc limit is 1 MiB; leave headroom), the slug exists in catalog.json, no forbidden strings (Oversight, OversightStudio, localhost URLs from the author's machine, anything matching key/secret/token patterns), no HTML script tags from remote hosts. Exit non-zero on any error and print path and line.
4. Extend the upload script: --dry-run default, --slug, --all, SHA-256 skip when unchanged, writes product_content/{slug} with body, bodyVersion, sha256, updatedAt; never prints the body; refuses to run if validation fails; requires an explicit --confirm for a write. It must read Admin credentials from the same env group as the server.
5. Generate a non-secret manifest src/lib/content-manifest.json (slug, bodyVersion, sha256, bytes) on upload, so the site knows which products have a body without reading Firestore. The manifest contains no body text.
6. Tests: validator accepts the sample, rejects each failure mode, upload dry-run writes nothing, manifest has no body text, a body containing a secret-like string is rejected.
7. npm scripts: content:validate, content:upload.

Stop and ask before: adding a dependency, uploading anything to Firestore, or committing anything from content/.
Done when the tests pass and npm.cmd run verify passes. Mark P31 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P32: Launch catalog gating

Branch `p32-catalog-gating`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `frontend-design`, `ui-ux-pro-max`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, frontend-design, ui-ux-pro-max. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D19), src/lib/content-manifest.json, src/lib/catalog.ts, src/components/CatalogBrowser.tsx, src/components/ProductPage.tsx, src/routes/templates_.$slug.tsx, src/routes/sections_.$slug.tsx, src/lib/checkout.functions.ts, src/lib/spend-credit.server.ts.

Run git status first; stop if earlier work is uncommitted.

Goal: never sell or unlock a product that has no body yet. Visitors see an honest "coming soon" state.

Do:
1. Add isDeliverable(slug) that is true only when the slug is in content-manifest.json. Server side, spendCredit and single-template checkout reject non-deliverable slugs with a clear error code (not_available_yet) and no charge or credit spent. Test both.
2. Product pages and cards: for non-deliverable products replace "Unlock", "Get template", and "Buy" with a disabled "Coming soon" state and a neutral line. Previews, descriptions, photos, and free reference copy stay.
3. Plans: a subscriber's monthly credits are not consumed by non-deliverable products. The account library and unlock dialog show how many products are available now.
4. Lifetime and the "all templates" promise: add a count line from the manifest ("N of M templates available now") on the pricing summary only if the pricing copy claims a total; otherwise leave pricing copy for P33.
5. CatalogBrowser: add a filter "Available now" (default off) using the shared component, so search, filter, and favorites stay in one place.
6. Tests for: deliverable and non-deliverable cards, server rejection with no credit spent, filter, and pages for a non-deliverable slug still render and are indexable.

Do not change captured markup beyond the buttons and one status line per page. Stop and ask before editing captured CSS or adding a dependency.
Done when the tests pass and npm.cmd run verify passes. Mark P32 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P33: Marketing claims audit

Branch `p33-claims`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `/grill-me`, `research`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, /grill-me, research. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D7, D19), src/routes/pricing.tsx, src/routes/index.tsx, src/lib/catalog.ts, src/lib/content-manifest.json, src/lib/plans.ts, the pricing image description in docs/DECISIONS.md D7.

Run git status first; stop if earlier work is uncommitted.

Goal: no public claim that the product cannot back up. In many countries false or misleading claims about what a customer buys are a legal risk, and they cause refunds.

Do:
1. List every quantitative or promise claim on the home, pricing, templates, sections, and help pages: counts ("192 templates", "20 Pro sections"), "AI-ready", "Figma source where available", "Trusted by developers and designers", award-style badges, "Works with" logos, "Request a Figma file (coming soon)", "no questions asked", and anything with a number.
2. For each claim give the evidence in the repo (catalog count, manifest count, plan table) and mark true, false, or unprovable.
3. Use /grill-me to ask me about each unprovable claim (maximum 6 questions). Do not decide for me.
4. Fix: counts derive from catalog.json or the content manifest through one helper, not hard-coded text. Where a claim is false or unprovable and I say remove it, remove it. Where I say keep it, add the evidence to docs/QA/claims.md.
5. "Trusted by" badges and testimonials: remove anything that implies real users or reviews unless I supply the source.
6. Make the pricing cards say what is available now versus coming, using the manifest count.
7. Tests: the displayed counts equal the helper values; a snapshot test fails if a hard-coded number returns in the pricing component.
8. Write docs/QA/claims.md with the final claim table.

Stop and ask before: deleting captured sections wholesale, adding a dependency, or changing plan prices.
Done when docs/QA/claims.md has no unprovable claim left on a public page and npm.cmd run verify passes. Mark P33 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P34: Account lifecycle

Branch `p34-account-lifecycle`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `domain-modeling`, context7

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, domain-modeling, context7 for Firebase Auth and Firebase Admin. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D2, D14, D15), docs/SPEC.md (S2, S3), src/lib/account-context.tsx, src/routes/signin.tsx, src/routes/reset-password.tsx, src/lib/account-validation.ts, firestore.rules, privacy.tsx.

Run git status first; stop if earlier work is uncommitted.

Goal: S2 becomes proven, and users can verify, recover, export, and delete their account without emailing me.

Do:
1. Email verification: after email/password sign-up send Firebase verification email; unverified users can browse and copy free sections but cannot start checkout or spend credits (server-enforced from the ID token's email_verified claim for email/password accounts; Google accounts are verified). Show a clear banner with a resend button that respects a cooldown.
2. Password reset: confirm /reset-password works end to end with Firebase action codes; handle expired and used codes with calm messages. Tests with a mocked Firebase client.
3. Auth errors: map Firebase error codes (wrong password, user not found, too many requests, popup closed, popup blocked, network) to plain messages without revealing whether an email exists. Popup blocked falls back to a redirect sign-in. Tests for each mapping.
4. Profile creation: prove S2 with a test that first sign-in creates profiles/{uid} once and a second sign-in does not overwrite.
5. Data export: a signed-in server function returns the user's profile, entitlements, unlocks, and purchase records as JSON (no product bodies, no provider secrets). Rate limited.
6. Account deletion: a server function behind a typed confirmation that deletes profile and personal fields, keeps the minimum purchase and tax records the law may require (mark each field kept or deleted in docs/specs/account-deletion.md), deletes the Firebase Auth user, and tells the user how access ends. If the user has an active subscription, the function first tells them to cancel it in the customer portal and refuses to delete until the status is not active. Tests for all branches, including the active subscription case.
7. UI: add Export and Delete to the existing account dashboard on /signin using existing styles. No new auth listener.
8. Update privacy.tsx user-rights text to match what now exists.

Stop and ask before: adding a dependency, changing Firestore rules (show the diff), or deleting purchase records.
Done when S2 and the new functions are proven by named tests and npm.cmd run verify passes. Mark P34 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P35: Assistant wrapper contract tests

Branch `p35-wrapper-contract`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/specs/delivery.md (wrapper section), src/lib/assistant-copy.ts, the delivery wrapper code, src/test/deliver-product-prompt.test.ts, src/test/free-section-copy.test.tsx, and the headings plus first 40 lines of two files in docs/example_customer_recivere/Collage template/ (cursur.md and v0.md; never print whole files).

Run git status first; stop if earlier work is uncommitted.

Goal: the text a customer copies for each assistant is correct, consistent, and tested.

Do:
1. Compare the example files per assistant (claude, cursur, v0, windsurf, lovable, replit) with a script that prints only the differing line numbers and counts. Record the differences in docs/specs/assistant-wrappers.md. If they differ only by whitespace, say so.
2. For each assistant in assistantSchema (Claude Code, Cursor, Windsurf, v0, Bolt, Lovable, Replit, Codex, grokbuild) define one wrapper: opening line naming the tool, the body untouched, and a closing line. If a licenseNotice exists in the current wrapper keep it as is; do not write new license text (P27 is deferred). Keep the wrapper small and in one file.
3. Contract tests using the tracked sample from content-example/: for every assistant the output starts with the right opening, contains the body byte for byte, never contains "Oversight", and is under 900 KB.
4. Free sections: the free reference prompt (from assistant-copy.ts) must never contain more than the reference fields; add a test that it contains no source code block from product bodies.
5. Clipboard: success is shown only after the clipboard write resolves; add tests for a rejected clipboard write (calm error, text still selectable in a fallback textarea).
6. An unknown assistant value is rejected on the server with a 400 and no body read.

Stop and ask before: adding a dependency or changing the free reference prompt format.
Done when the contract tests pass and npm.cmd run verify passes. Mark P35 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P36: Observability

Branch `p36-observability`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `research`, context7

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, research, context7 for Sentry. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D8, D18), docs/QA/sentry-p15-research.md, src/lib/error-capture.ts, the Sentry setup files, src/lib/sentry-scrub.ts, src/routes/api/health.ts, docs/runbooks/heroku.md.

Run git status first; stop if earlier work is uncommitted.

Goal: I can see what is broken in production without paying for anything.

Do:
1. Structured logs: one small logger (src/lib/log.server.ts) that writes JSON lines to stdout with level, event name, request id, uid hash (never the raw uid or email), duration, and status. Replace ad-hoc console calls in server functions and API routes. Heroku collects stdout.
2. Request id: generate or accept X-Request-Id, return it in the response, include it in logs and Sentry tags.
3. Sentry: confirm releases use the Heroku slug commit (SOURCE_VERSION or HEROKU_SLUG_COMMIT) and environment tags production versus preview. Scrubber adds private_key, api_key, authorization, x-signature, and webhook secret patterns with tests (the P19 audit found these missing).
4. Alert-worthy events: webhook signature failure spikes, webhook handler throw, credit spend transaction failure, delivery content_missing, Firestore quota errors. Each logs at error level with a stable event name documented in docs/runbooks/monitoring.md.
5. Uptime: document a free external check (for example UptimeRobot free tier or Better Stack free) on /api/health with a 5 minute interval, and what each health boolean means. Do not add code for it.
6. /api/health: add version, uptime seconds, and a "billing test mode" warning flag from P25. No secrets.
7. Tests: logger never outputs the raw email or uid in a fixture request; scrubber cases; request id round trip.

Stop and ask before: adding a dependency or enabling Sentry performance tracing (it uses quota).
Done when the tests pass, docs/runbooks/monitoring.md exists, and npm.cmd run verify passes. Mark P36 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P37: Static asset caching, compression, bundle size

Branch `p37-assets-perf`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `investigate-first`, `devtools-for-agents`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, investigate-first, devtools-for-agents. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/QA/perf.md, docs/DECISIONS.md (D3, D18), vite.config.ts, src/server.ts, src/lib/security-headers.server.ts, public/ and src/assets/ sizes.

Run git status first; stop if earlier work is uncommitted.

Goal: Heroku has no CDN, so the app server must serve assets efficiently. Keep it free.

Do:
1. Measure first. Build, run the node-server on a port, and record for /, /templates, /sections, /pricing, a product page: response size, gzip/brotli status, TTFB, number of requests, total image bytes. Save to docs/QA/perf-heroku.md as the "before" table.
2. Caching headers: hashed build assets (under /assets/) get Cache-Control public, max-age=31536000, immutable. Images in /site-assets and /section-previews get a long max-age with revalidation. HTML gets no-cache or a short s-maxage. API and auth routes get no-store. Test headers on the built server for each path class.
3. Compression: confirm the Nitro server compresses text responses (gzip or brotli). If not, enable the Nitro compression option. Test Content-Encoding on a JS asset and on HTML.
4. Images: list the 10 largest images served on key pages. Convert or resize only those above 300 KB that exist in this repo, keep originals in a git-ignored folder, add width and height, lazy-load below the fold, and use fetchpriority on the LCP image. Do not touch captured markup beyond attributes. Report bytes saved.
5. Bundle: report the largest route chunks. For routes over about 1,000 lines of imported markup (sections.tsx and similar), check whether the router already splits them; if not, enable automatic code splitting and verify with the build output. Do not rewrite markup.
6. Re-measure and fill the "after" table. Targets: no image over 300 KB on the home page, JS transferred on / under 250 KB gzip if achievable; if not, state why.
7. Tests: header assertions per path class.

Stop and ask before: adding an image-processing dependency (sharp is acceptable if you show why a script cannot do it) or changing captured CSS.
Done when the before and after table exists and npm.cmd run verify passes. Mark P37 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P38: Accessibility pass II

Branch `p38-a11y-2`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `/impeccable audit`, `a11y-debugging`, `ui-ux-pro-max`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, /impeccable audit, a11y-debugging, ui-ux-pro-max. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/QA/perf.md (accessibility section), the checkout summary, success, account dashboard, unlock dialog, and pricing components.

Run git status first; stop if earlier work is uncommitted.

Goal: the paid flow works with a keyboard and a screen reader.

Do:
1. Audit these flows only: sign-in, pricing to checkout summary, checkout success waiting state, unlock-with-credit dialog, copy-for-assistant menu, account dashboard (export and delete from P34). Use a11y-debugging or axe in tests if jest-axe is already installed; otherwise ask before adding it.
2. Fix: dialog focus trap and return focus, Escape closes, aria-live for the waiting state and copy success, visible focus, form labels and error association, button names, color contrast failures fixable by a token change, reduced-motion respect.
3. Keyboard-only test notes in docs/QA/a11y-flows.md (steps and expected results).
4. Tests: dialog focus behavior, live region text appears, labels present.
5. Do not restructure captured markup; if a captured section needs changes, list it in docs/QA/a11y-flows.md.

Stop and ask before: adding a dependency or editing captured CSS.
Done when the listed flows have tests and npm.cmd run verify passes. Mark P38 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P39: SEO pass II

Branch `p39-seo-2`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `research`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, research. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, src/lib/seo.ts, the sitemap and robots routes, src/routes/__root.tsx, src/routes/$.tsx (the not-found route), src/lib/brand.ts, docs/QA/claims.md.

Run git status first; stop if earlier work is uncommitted.

Goal: search engines and link previews see accurate, branded pages.

Do:
1. Host canonicalization: redirect www to the apex domain and http to https (Heroku terminates TLS, so read x-forwarded-proto). Test with mocked headers. Do not trust the Host header for canonical URLs; use the configured site origin.
2. Not found: a branded 404 with correct status 404 (not 200), noindex, links home and to templates. Test the status.
3. noindex on account, checkout success, reset-password, and any page that needs sign-in. Keep /license and legal pages indexable.
4. Sitemap: includes only deliverable plus coming-soon product pages according to a rule you state in the report; lastmod from a real date field if the catalog has one, otherwise omit it. Product JSON-LD offers only where a price is real and the product is deliverable (from the manifest).
5. Open Graph images: if the catalog has a photo, use it with absolute URLs; otherwise a single default /og-default.png (create a simple one from the logo, under 200 KB). Test absolute URLs.
6. Structured data validity: add a test that every JSON-LD block parses and has @context and @type.
7. Remove any leftover brand strings that are not Substrates from titles and descriptions (grep Oversight).

Stop and ask before: adding a dependency.
Done when tests pass and npm.cmd run verify passes. Mark P39 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): Google Search Console property, sitemap submission.
```

## P40: Abuse limits and CSP enforcement

Branch `p40-abuse-csp`. Strong model.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `research`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, research. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/SECURITY.md, src/lib/rate-limit.server.ts, src/lib/deliver-rate-limit.server.ts, src/lib/security-headers.server.ts, docs/REVIEW-PACK1.md (security table), every server function and API route (list them first).

Run git status first; stop if earlier work is uncommitted.

Goal: every public or paid endpoint has a limit, and CSP is enforced instead of only reported.

Do:
1. Table of every server function and API route: auth required, limiter, input validation (zod), max body size. Save as docs/QA/endpoint-matrix.md. Anything without a limiter or validation gets one.
2. One shared limiter module with named policies (checkout create, portal, spend credit, deliver, recommend, export, delete, verify-email resend, MCP, webhook). The in-memory limiter is per dyno; with one dyno that is acceptable. Document the single-dyno assumption and what breaks when scaling to two.
3. Webhook: size cap on the raw body (reject over 1 MB before hashing), and no rate limit that could drop real provider retries; log instead of block.
4. Trusted origin: checkout redirect and portal URLs use the configured site origin only. Remove any remaining use of Host or X-Forwarded-Host for URLs (the audit found some in the MCP metadata handler). Tests with spoofed headers.
5. CSP: collect the violations you can find by running the built server and loading the key pages in a browser tool if available; otherwise derive from the code. Move Content-Security-Policy-Report-Only to an enforced Content-Security-Policy with the origins the app really uses (Firebase Auth and Google sign-in, Sentry, Lemon Squeezy checkout is a redirect so no frame needed unless overlay is used). Keep a report-only copy of any stricter candidate policy. Add a report-uri only if it points to something that exists.
6. Use nonces or hashes for inline scripts if the captured markup has them; if that is not feasible without editing captured markup, keep 'unsafe-inline' for script only where proven necessary and list exactly why in docs/SECURITY.md.
7. Tests: enforced header present, each limiter policy returns 429 after its quota, spoofed host ignored, oversized webhook rejected.

Stop and ask before: adding a dependency (for example a Redis client) or changing sign-in popup behavior.
Done when tests pass, endpoint-matrix.md is complete, and npm.cmd run verify passes. Mark P40 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
Not Verified (human): browser check of sign-in, checkout redirect, and Sentry under the enforced CSP on the Heroku URL.
```

## P41: Billing reconcile, backup, and admin CLI

Branch `p41-ops-tools`.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `domain-modeling`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, domain-modeling. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md, docs/DECISIONS.md (D15, D18, D21), docs/specs/billing-lemonsqueezy.md, src/lib/entitlements.server.ts, src/lib/billing/*, scripts/*.

Run git status first; stop if earlier work is uncommitted.

Goal: as a solo founder I can fix a billing mix-up, back up data, and check that Lemon Squeezy and Firestore agree, without building an admin web page yet.

Do (all as Node scripts under scripts/ using the Admin SDK and plain fetch; no new dependency; every write command needs --confirm and prints a dry-run diff by default):
1. scripts/ops/reconcile-billing.mjs: read orders and subscriptions from the Lemon Squeezy API (read-only key), compare with entitlements and unlocks in Firestore, print mismatches (paid but no entitlement, entitlement without order, status drift, credits drift). Never print emails; print uid hashes and order ids.
2. scripts/ops/replay-event.mjs: re-run a stored webhook payload from a local JSON file through the same processing code (dry-run by default).
3. scripts/ops/grant.mjs and revoke.mjs: set or remove a plan, credits, or an unlock for a uid, with a reason string stored in an audit collection (admin_audit, Admin-only; ask before adding rules for it and show the diff).
4. scripts/ops/backup-firestore.mjs: export profiles, entitlements, unlocks, purchases (not product_content bodies) to a local JSON file with a timestamp, excluding secrets. The file goes in a git-ignored backups/ folder. Spark has no scheduled export, so document a weekly manual run in docs/runbooks/backup.md, plus a restore script with --confirm and a dry run.
5. scripts/ops/find-user.mjs: look up a uid by email through Firebase Admin, print uid and flags only.
6. Tests with fake Admin and fake fetch: reconcile detects each mismatch type, grant/revoke are dry-run by default, backup excludes product_content, nothing prints an email.
7. docs/runbooks/ops.md: when to use each script, with examples that use placeholder ids.

Stop and ask before: adding a dependency or changing Firestore rules.
Done when tests pass and npm.cmd run verify passes. Mark P41 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P42: Full review, no fixes

Review mode. Strong model. Branch none.
**Skills:** `/code-review`, `/ce-code-review`, `/thermo-nuclear-code-quality-review`, `/impeccable audit`, `verify-and-stop`, security-auditor subagent, code-reviewer subagent

```
Skills: /code-review, /ce-code-review, /thermo-nuclear-code-quality-review, /impeccable audit, verify-and-stop. Run the code-reviewer and security-auditor subagents.

Read docs/PROGRESS.md, docs/SPEC.md, docs/RELEASE.md, docs/REVIEW-PACK1.md, docs/QA/endpoint-matrix.md.

Run git status first; stop if earlier work is uncommitted.

Review the diff from the end of pack 1 to HEAD (git diff <pack1-merge-commit>...HEAD; find the commit and say which). Write docs/REVIEW-PACK3.md with:
- scenario table S1 to S22 plus the new ones from this pack, each proven, manual, or open with file evidence;
- Launch blockers, checked against docs/RELEASE.md line by line;
- security findings with severity and file:line, with the lens "can a user get paid access without paying, keep access after a refund, read another user's data, run up my OpenAI bill, or leak a product body";
- code quality findings (file size, duplication, dead code);
- Human steps still open (Lemon Squeezy account and seller verification, Heroku app, Firebase production project, DNS, live purchase, lawyer review of license and legal text).

Do not fix anything. Edit only docs/REVIEW-PACK3.md and docs/PROGRESS.md.
Done when REVIEW-PACK3.md exists with severities and file:line. Mark P42 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error.
```

## P43: Repair and v0.2.0

Branch `p43-repair`. Strong model.
**Skills:** `/tdd`, `surgical-patch`, `verify-and-stop`, `/code-review`, security-auditor subagent, `/ce-compound`

```
Skills: /tdd, surgical-patch, verify-and-stop, /code-review, /ce-compound. Run the security-auditor subagent on the finished branch.

Read docs/PROGRESS.md and docs/REVIEW-PACK3.md.

Run git status first; stop if earlier work is uncommitted.

Fix every Critical, High, and Medium finding that is a real defect, test first, one commit each, smallest change. Leave Low findings that are taste, listed in the report.
Re-run npm.cmd run verify and the Firestore rules tests.
Update scenario statuses in docs/QA/baseline.md terms and the docs/RELEASE.md checkboxes only where evidence exists.
Write docs/QA/pack3-record.md: each prompt P24 to P43 as done, blocked, or skipped, with its PR and test command. Do not claim live Lemon Squeezy, live Firebase, Heroku production, or a lawyer's approval without a recorded command or a human note.
Use /ce-compound to append a short Pack 3 section to docs/LEARNINGS.md.

Stop and ask before: changing plan prices, deploying rules, adding dependencies.
Done when all checks pass and pack3-record.md exists. Mark P43 done. MANDATORY GIT (.cursor/rules/git-commit-push.mdc): you are not done until your changes are committed AND pushed to the branch on GitHub. End the report with the branch, commit hash, "Pushed: yes", and the `git status -sb` line showing a clean tree. If the push fails, start the report with NOT PUSHED and the error. Print the git tag command for v0.2.0 for the human to run after the production smoke test; do not tag yourself.
```

---

## Questions for the owner

Answer these before P25, P26, and P27. Defaults apply if you stay silent.

1. **Single-template purchase (P25).** Cursor added a buy-one-template path that uses the lifetime variant with a server-computed custom price. It was not in the plan table. Keep it? Default: keep it, but only for products that have a body (P32), and prove it can never grant Lifetime.
2. **Video plans (P26).** Do you want video skills at launch? If yes, create two variants in Lemon Squeezy ($9.99 monthly, $79.99 yearly). Default: build the code, leave the buttons disabled until the variant ids exist.
3. **Heroku dyno (P29).** Basic (never sleeps, about $7/month, covered by the $13 student credit) or Eco (sleeps after 30 minutes idle, which can delay webhooks)? Default: Basic.
4. **Kit licenses (P27).** Do you want the agent to quote only the resale sentences, or also summarize each kit's rules? Default: quote only.
5. **Governing law (P28).** Courts at Chennai under Indian law as a draft? Default: yes.
6. **Refunds when credits were used (P28, D15).** Default: a refund removes access and unlocks bought in that period.
7. **Which products ship first (P31, P32).** Answered: the products shown on the homepage showcase (Webflow picks, Free sections, Framer templates in `src/routes/index.tsx`).
