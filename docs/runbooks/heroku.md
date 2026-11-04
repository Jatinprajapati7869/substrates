# Heroku production runbook

Single operator path for **Substrates** on Heroku (D3, D24). Production domain: [https://substrates.app](https://substrates.app). Support: [jatin@substrates.app](mailto:jatin@substrates.app).

**Not legal advice.** This is engineering and ops documentation.

**You deploy; agents do not.** Paste secret **values** only in the Heroku dashboard or your local `.env`, never in git.

Related: [connectors-github-vercel-heroku.md](./connectors-github-vercel-heroku.md) (overview), [launch.md](./launch.md) (smoke checklist), `.env.example` (variable names).

---

## Dyno plan (D24)

| Plan    | Cost (approx.) | Sleep?                         | Use                         |
| ------- | -------------- | ------------------------------ | --------------------------- |
| **Basic** | ~$7/month/dyno | No                             | **Production** (chosen)     |
| Eco     | ~$5/month/dyno | Yes (30 min idle)              | Do **not** use for production — webhooks and checkout can stall while sleeping |

**GitHub Student Pack:** $13/month Heroku credit for 24 months (D3). One Basic web dyno (~$7) fits inside the credit with headroom (~$6/month left for add-ons or a second dyno later).

Scale formation in `app.json` defaults to **basic** size for `web`.

---

## How the build works

1. **Buildpack:** `heroku/nodejs` (see `app.json`).
2. **Install:** `NPM_CONFIG_PRODUCTION=false` so **devDependencies** (Vite, Nitro, TypeScript, ESLint, etc.) are present for `npm run build`.
3. **Build:** `heroku-postbuild` in `package.json` runs `NITRO_PRESET=node-server npm run build` → Nitro output in `.output/server/`.
4. **Web process:** `Procfile` → `HOST=0.0.0.0 node .output/server/index.mjs`. Heroku sets **`PORT`**; Nitro reads `PORT` / `NITRO_PORT`.
5. **Node version:** `engines.node` in `package.json` (`22.x`).

Local production smoke (same artifact as Heroku):

```powershell
cd C:\Users\Xingzi\Documents\oversight-supply-studio
$env:NITRO_PRESET="node-server"
$env:VITE_FIREBASE_API_KEY="placeholder"
$env:VITE_FIREBASE_AUTH_DOMAIN="placeholder.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="placeholder"
$env:VITE_FIREBASE_APP_ID="placeholder"
npm run build
$env:PORT="5055"
$env:HOST="0.0.0.0"
node scripts/smoke-node-server.mjs --skip-build
```

Expect JSON with `"ok": true` and HTTP **200** on `/` and `/api/health`.

---

## Graceful shutdown (SIGTERM)

Heroku sends **SIGTERM** on deploy, scale, or restart. The dyno has a **30 second** shutdown window, then **SIGKILL**.

The shipped Nitro **node-server** entry (`.output/server/index.mjs`) uses **srvx** `serve()` and does **not** register an application-level SIGTERM drain in this build. In-flight HTTP requests may be cut off at process exit; Lemon Squeezy and browsers typically retry. Keep webhook handlers idempotent (already required in billing spec).

If you need longer drains later, wrap the process or upgrade Nitro when upstream adds graceful shutdown.

---

## Memory and cold start

Target: web dyno **RSS under 400 MB** after warm traffic (512 MB limit on Basic/Eco).

Measured locally after **20** round-trips to `/` and `/api/health` on the built server: see [docs/QA/heroku-memory.md](../QA/heroku-memory.md).

Cold start: first request after deploy pays SSR + lazy Firebase Admin import cost; health checks should still return **200** with placeholder-only env.

---

## 1. Create the Heroku app

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and log in.

```bash
heroku login
heroku apps:create substrates-production --region us
# Or from the repo template:
heroku apps:create --json app.json
```

Set buildpack (if not using `app.json`):

```bash
heroku buildpacks:set heroku/nodejs -a substrates-production
```

---

## 2. Config vars (names only — you paste values)

Copy every name from [`.env.example`](../../.env.example). Minimum for a working site + billing:

```bash
heroku config:set NITRO_PRESET=node-server -a substrates-production
heroku config:set NPM_CONFIG_PRODUCTION=false -a substrates-production
```

Set each variable (replace `…` with real values):

```bash
heroku config:set VITE_FIREBASE_API_KEY=… VITE_FIREBASE_AUTH_DOMAIN=… VITE_FIREBASE_PROJECT_ID=… VITE_FIREBASE_APP_ID=… -a substrates-production
heroku config:set FIREBASE_PROJECT_ID=… FIREBASE_CLIENT_EMAIL=… FIREBASE_PRIVATE_KEY=… -a substrates-production
heroku config:set LEMONSQUEEZY_API_KEY=… LEMONSQUEEZY_STORE_ID=… LEMONSQUEEZY_WEBHOOK_SECRET=… -a substrates-production
heroku config:set LEMONSQUEEZY_VARIANT_ID_SECTIONS=… LEMONSQUEEZY_VARIANT_ID_SECTIONS_TEMPLATES=… LEMONSQUEEZY_VARIANT_ID_LIFETIME=… -a substrates-production
```

Optional: `OPENAI_API_KEY`, `SENTRY_DSN`, `VITE_SENTRY_DSN`, video variant ids, `CRON_SECRET`, `LEMONSQUEEZY_TEST_MODE`.

List (no values in output names only):

```bash
heroku config -a substrates-production
```

Heroku sets **`PORT`** and **`SOURCE_VERSION`** (commit slug) automatically. `/api/health` exposes `commit` from `SOURCE_VERSION`.

---

## 3. GitHub deploy from `main`

1. Dashboard → app → **Deploy** → **GitHub** → connect `Jatinprajapati7869/substrates`.
2. **Automatic deploys** → branch **`main`**.
3. Enable **Wait for CI to pass before deploy** (matches `.github/workflows/ci.yml`).

Manual deploy:

```bash
git push heroku main
```

---

## 4. Custom domain, ACM TLS, DNS

Add domains:

```bash
heroku domains:add substrates.app -a substrates-production
heroku domains:add www.substrates.app -a substrates-production
heroku domains -a substrates-production
```

Heroku prints DNS targets (e.g. `subdomain.herokudns.com`). At your **registrar**:

- **www** → CNAME to the Heroku DNS target for `www`.
- **apex** (`substrates.app`) → ALIAS/ANAME to the apex target, or use your registrar’s “flattened” CNAME to Heroku (follow [Heroku custom domains](https://devcenter.heroku.com/articles/custom-domains)).

**ACM** (Automatic Certificate Management) provisions TLS once DNS validates. Confirm in **Settings → SSL Certificate**.

Also add the default app hostname (e.g. `substrates-production.herokuapp.com`) to Firebase authorized domains during setup.

---

## 5. Firebase authorized domains

Firebase console → **Authentication** → **Settings** → **Authorized domains**:

- `substrates.app`
- `www.substrates.app`
- `substrates-production.herokuapp.com` (or your app name)
- `localhost` (dev)

Deploy Firestore rules from this repo when ready (`firestore.rules`).

---

## 6. Lemon Squeezy webhook

Production webhook URL:

`https://substrates.app/api/public/lemonsqueezy-webhook`

Set the signing secret in `LEMONSQUEEZY_WEBHOOK_SECRET`. Details: [docs/specs/lemonsqueezy-setup.md](../specs/lemonsqueezy-setup.md).

---

## 7. Logs, scale, rollback

```bash
heroku logs --tail -a substrates-production
heroku logs -n 500 -a substrates-production
heroku ps -a substrates-production
heroku releases -a substrates-production
heroku releases:rollback -a substrates-production
heroku releases:rollback v42 -a substrates-production
heroku ps:scale web=1:basic -a substrates-production
heroku ps:scale web=0 -a substrates-production
```

After deploy:

```bash
curl -sS https://substrates.app/api/health | jq .
```

`commit` should match the deployed Git SHA (`SOURCE_VERSION`).

---

## 8. Vercel fallback (keep `vercel.json`)

Do **not** use Vercel Hobby for commercial production (D3). The repo keeps [`vercel.json`](../../vercel.json) as a **fallback** for previews or a future Vercel Pro move:

- Import the GitHub repo on Vercel; build command `npm run build`.
- When `VERCEL=1`, Nitro preset defaults to **`vercel`** (see `vite.config.ts`), or set `NITRO_PRESET=vercel`.
- Same config var **names** as Heroku; add `*.vercel.app` to Firebase authorized domains for previews.

---

## Not verified by this repo (human)

- Actual Heroku deploy, DNS propagation, ACM issuance
- Live webhook delivery and TLS on custom domain
- Lemon Squeezy live-mode purchase smoke (P35 / launch checklist)
