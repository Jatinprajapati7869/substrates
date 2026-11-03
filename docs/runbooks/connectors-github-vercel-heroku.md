# Connect GitHub and Heroku (production)

Canonical repo: [github.com/Jatinprajapati7869/substrates](https://github.com/Jatinprajapati7869/substrates)  
Production domain: [https://substrates.app](https://substrates.app)  
Support: jatin@substrates.app

**Production host:** Heroku (see `docs/DECISIONS.md` D3). The app is TanStack Start + Nitro SSR with preset **`node-server`**. Vercel remains a supported fallback (short section at the end).

---

## 1. GitHub (source of truth)

Connect the repo to Heroku for automatic deploys from `main` (see §3). Local development:

```powershell
cd C:\Users\Xingzi\Documents\oversight-supply-studio
npm install
npm run dev
```

Never commit `.env` or service-account JSON. Copy variable **names** from `.env.example`.

**Cursor / agents:** Edit code in this repo. Agents do not log into Heroku unless you approve shell + credentials on your machine.

---

## 2. Heroku app (production SSR)

### Create and connect

1. [dashboard.heroku.com/new-app](https://dashboard.heroku.com/new-app) → create app (e.g. `substrates-production`).
2. **Deploy** tab → **GitHub** → connect `Jatinprajapati7869/substrates` → enable **Automatic deploys** from `main` (optional: wait for CI).
3. **Settings** → **Buildpacks:** `heroku/nodejs` (default).
4. **Settings** → **Config Vars** — set at minimum:

| Variable                                                               | Notes                                                                         |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `NITRO_PRESET`                                                         | **`node-server`** (required on Heroku)                                        |
| `VITE_FIREBASE_*`                                                      | Web app config (also baked at build; set on Heroku for SSR health + rebuilds) |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Admin SDK (server only)                                                       |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`                           | Live or test per environment                                                  |
| `OPENAI_API_KEY`                                                       | Optional AI recommendations                                                   |
| `CRON_SECRET`                                                          | If you call cron routes from Scheduler                                        |

Heroku sets `PORT` and `SOURCE_VERSION` (commit slug) automatically.

### Build and process

- **Build:** `package.json` runs `heroku-postbuild` → `npm run build` → Nitro output in `.output/server/`.
- **Web dyno:** `Procfile`:

  ```
  web: node .output/server/index.mjs
  ```

- **Node version:** `engines.node` in `package.json` (`22.x`).

Manual local production smoke (same artifact Heroku runs):

```powershell
$env:NITRO_PRESET="node-server"
$env:VITE_FIREBASE_API_KEY="placeholder"
$env:VITE_FIREBASE_AUTH_DOMAIN="placeholder.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="placeholder"
$env:VITE_FIREBASE_APP_ID="placeholder"
npm run build
$env:PORT="8080"
node .output/server/index.mjs
```

Then `GET /api/health` — JSON lists `configured.*` booleans (no secret values). Missing server groups show `false`; pages should still return **200**.

### Domain and TLS

1. Heroku app → **Settings** → **Domains** → add `substrates.app` and `www.substrates.app`.
2. Point DNS (apex + www) to Heroku’s targets (ALIAS/ANAME or CNAME per Heroku docs).
3. **ACM** enables TLS on Heroku automatically once DNS validates.

### Firebase

Authentication → Settings → **Authorized domains** → add `substrates.app`, `www.substrates.app`, and any preview hosts you use.

Deploy Firestore rules from this repo (`firestore.rules`).

### Stripe

Webhook URL:

`https://substrates.app/api/public/stripe-webhook`

Use the matching signing secret in `STRIPE_WEBHOOK_SECRET`. Enable **Customer portal** in Stripe Dashboard.

### Logs and ops

```powershell
heroku logs --tail -a your-app-name
heroku releases -a your-app-name
heroku ps -a your-app-name
```

After deploy, confirm commit: `GET https://substrates.app/api/health` → `commit` should match `SOURCE_VERSION` / latest `main` SHA.

### Optional: Heroku Scheduler (cron)

POST to cron routes with `Authorization: Bearer $CRON_SECRET` (see `scripts/cron-trigger.mjs`, `docs/runbooks/launch.md`). Scheduler can run on the same app or a minimal worker app.

---

## 3. Checklist after connect

- [ ] `git push` to `main` → Heroku build green
- [ ] `GET /api/health` → `configured` reflects env (no secrets in body)
- [ ] `https://substrates.app/signin` loads; Google / email auth works
- [ ] Stripe test checkout → webhook 2xx → Firestore purchase
- [ ] Customer portal from `/signin`

---

## 4. Vercel (fallback only)

Use if you move off Heroku or need preview deploys on a commercial plan.

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Build: `npm run build`. Nitro preset defaults to **`vercel`** when `VERCEL=1` (or set `NITRO_PRESET=vercel`).
3. Set the same env vars as §2. `VERCEL_GIT_COMMIT_SHA` populates `/api/health` `commit`.
4. Domains and Firebase authorized domains: add `*.vercel.app` if using previews.

Do not rely on Vercel Hobby for commercial production (see D3).

---

## 5. What operators need (never commit)

Paste values only in Heroku/Vercel config or local `.env`:

- Firebase web (`VITE_*`) + admin (`FIREBASE_*`)
- Stripe secret + webhook signing secret
- Whether production Stripe is test or live

For debugging, share **variable names** in chat; use `/api/health` to see which groups are unset.
