# Release

## Ready to launch means

- [ ] Every scenario S1 to S22 in `docs/SPEC.md` is `proven` or has a recorded `manual` pass. (S22 open; S2/S6/S18 manual — see `docs/QA/baseline.md`.)
- [x] CI is green on `main`: lint, typecheck, test, build, audit. (Verified locally 2026-11-03: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:vendors`. GitHub Actions not re-run here.)
- [ ] The production host is a commercial plan (Heroku with student credit, or Vercel Pro; Hobby is non-commercial). Production env has every variable from `.env.example` (names checked by `/api/health`).
- [ ] Stripe is in live mode: live keys, live webhook endpoint `https://substrates.app/api/public/stripe-webhook`, Customer Portal configured.
- [ ] One real purchase (smallest plan) made by the operator, refunded afterwards, with webhook, account entry, and delivery verified.
- [ ] Firebase authorized domains include `substrates.app` and the Vercel preview domain.
- [ ] Legal pages match reality (P18). (Copy matches code per `docs/QA/legal-claims.md`; D14 `[LEGAL ENTITY]` placeholders remain — human/counsel.)
- [ ] Error monitoring receives a test event from production (P15).

## Deploy

Merge to `main`. **Production host is Heroku** (D3); see `docs/runbooks/launch.md` and `docs/runbooks/connectors-github-vercel-heroku.md`. Smoke test `docs/runbooks/launch.md` section "Smoke tests".

## Rollback

Heroku: rollback dyno release or redeploy prior slug. Keep a revert commit on `main`; do not rewrite history. (Legacy Vercel rollback steps in git history only if you still use previews there.)

## Versioning

Tag releases `vMAJOR.MINOR.PATCH` on `main` after the smoke test. First tag `v0.1.0` at the end of P20.
