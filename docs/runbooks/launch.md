# Production launch checklist

## DNS and hosting

1. Connect the Git repo to Vercel; set production branch to `main`.
2. Add all variables from `.env.example` in Vercel project settings.
3. Point the apex and `www` DNS records to Vercel.

## Firebase

1. Enable Authentication: Email/Password and Google; add authorized domains (production + Vercel previews).
2. Create Firestore; deploy `firestore.rules` from this repo.
3. Create a service account; set `FIREBASE_*` server env vars (never expose private key to the client).
4. Set `VITE_FIREBASE_*` from the Firebase web app config.

## Stripe

1. Set live `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
2. Register webhook URL: `https://<your-domain>/api/public/stripe-webhook`.
3. Enable the **Customer portal** in Stripe Dashboard (Settings → Billing → Customer portal).
4. Run a test checkout in Stripe test mode on a Vercel preview first.

## Heroku (optional cron)

1. Create a Heroku app; set `CRON_SECRET` to match the app.
2. Use Heroku Scheduler to POST to cron routes with `Authorization: Bearer <secret>`.
3. Do not run the full SSR app on Heroku unless you intentionally mirror Vercel.

## Smoke tests

- Homepage loads.
- Google sign-in completes.
- Stripe test checkout + webhook 2xx; billing portal opens from `/signin`.
- `GET /.well-known/oauth-protected-resource/mcp` returns JSON with Firebase token issuer.
- Product page shows related items when `OPENAI_API_KEY` is set, fallback when not.
