# Production launch checklist

Production host: **Heroku** (`NITRO_PRESET=node-server`, `Procfile` → `node .output/server/index.mjs`). See `docs/runbooks/connectors-github-vercel-heroku.md`.

## DNS and hosting

1. Connect the Git repo to Heroku; enable deploys from `main`.
2. Set all variables from `.env.example` in Heroku config vars (including `NITRO_PRESET=node-server`).
3. Point apex and `www` DNS to Heroku; verify TLS.

## Firebase

1. Enable Authentication: Email/Password and Google; add authorized domains (production + any preview hosts).
2. Create Firestore; deploy `firestore.rules` from this repo.
3. Create a service account; set `FIREBASE_*` server env vars (never expose private key to the client).
4. Set `VITE_FIREBASE_*` from the Firebase web app config.

## Lemon Squeezy

1. Follow `docs/specs/lemonsqueezy-setup.md` (test mode first).
2. Set `LEMONSQUEEZY_*` vars from `.env.example` on Heroku.
3. Register webhook URL: `https://<your-domain>/api/public/lemonsqueezy-webhook` with signing secret in `LEMONSQUEEZY_WEBHOOK_SECRET`.
4. Run a **test mode** checkout on staging; confirm webhook 2xx and entitlement write before disabling `LEMONSQUEEZY_TEST_MODE`.

## Heroku Scheduler (optional cron)

1. Set `CRON_SECRET` on the app.
2. Use Heroku Scheduler to POST to cron routes with `Authorization: Bearer <secret>`.

## Smoke tests

- `GET /api/health` returns 200 JSON; `configured.*` matches env (no secret values).
- Homepage loads.
- Google sign-in completes.
- Lemon Squeezy test checkout + webhook 2xx; billing portal link opens from `/signin` when subscribed.
- `GET /.well-known/oauth-protected-resource/mcp` returns JSON when Firebase admin env is set.
- Product page shows related items when `OPENAI_API_KEY` is set, fallback when not.
