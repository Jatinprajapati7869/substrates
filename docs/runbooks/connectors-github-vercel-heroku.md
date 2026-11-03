# Connect GitHub, Vercel, and Heroku

Canonical repo: [github.com/Jatinprajapati7869/substrates](https://github.com/Jatinprajapati7869/substrates)  
Production domain: [https://substrates.app](https://substrates.app)  
Support: jatin@substrates.app

This app is **SSR on Vercel** (primary). **Heroku** is optional (cron/aux only — see below).

---

## 1. GitHub (source of truth)

Local folder is not a git repo until initialized. One-time:

```powershell
cd C:\Users\Xingzi\Documents\oversight-supply-studio
git init
git remote add origin https://github.com/Jatinprajapati7869/substrates.git
git add .
git commit -m "Initial Substrates template SaaS (Firebase, Stripe, TanStack Start)"
git branch -M main
git push -u origin main
```

If the GitHub repo already has a README commit, pull with rebase first or force-push only if you intend to replace remote history.

**Cursor / agent access:** Open this folder (or clone `substrates` elsewhere). Agents edit code here; they do **not** log into Vercel/Heroku unless you add MCP integrations or paste env vars.

---

## 2. Vercel (production SSR)

1. [vercel.com/new](https://vercel.com/new) → Import **Jatinprajapati7869/substrates**.
2. Framework: **Other** (Nitro/TanStack Start — `vercel.json` sets build).
3. Build: `npm run build` · Install: `npm install` · Output: handled by Nitro preset `vercel`.
4. **Environment variables** (Production + Preview) — copy from `.env.example`:

| Variable | Notes |
|----------|--------|
| `VITE_FIREBASE_*` | Web app config |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Admin SDK (server only) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Live or test per environment |
| `OPENAI_API_KEY` | Optional recommendations |
| `NITRO_PRESET` | `vercel` (default when `VERCEL=1`) |
| `CRON_SECRET` | If you call cron routes from Heroku |

5. **Domains:** Project → Settings → Domains → add `substrates.app` and `www.substrates.app` (redirect www → apex if you prefer).
6. **Firebase:** Authentication → Settings → Authorized domains → add `substrates.app` and `*.vercel.app` previews.
7. **Stripe webhook:** `https://substrates.app/api/public/stripe-webhook` (use test secret on preview if you add a preview URL).

**Cursor ↔ Vercel:** There is no required “connector” in-repo. Options:

- Deploy via git push (Vercel Git integration).
- Optional: Vercel CLI (`vercel link`) in this directory for previews from terminal.
- Optional: Cursor MCP/deployment plugins if you install them in Cursor Settings → MCP (not shipped in this repo).

---

## 3. Heroku (optional — cron only)

Do **not** run the full TanStack SSR app on Heroku unless you want a second host. Intended pattern from `Procfile`:

```
web: node .output/server/index.mjs
```

For **cron triggers only**, create a small Heroku app that POSTs to your Vercel cron routes with `Authorization: Bearer $CRON_SECRET` (see `scripts/cron-trigger.mjs`, `docs/runbooks/launch.md`).

1. Heroku Dashboard → Create app.
2. Connect GitHub **same repo** *or* use Heroku only as Scheduler + curl (no deploy).
3. Config vars: `CRON_SECRET` (match Vercel), target URL `https://substrates.app/...`.
4. Heroku Scheduler: daily/hourly job running `node scripts/cron-trigger.mjs` if you deploy that script, or a one-line curl.

**Cursor ↔ Heroku:** Heroku CLI + git remote `heroku` after `heroku git:remote -a your-app`. Agents can run CLI only if you approve shell + login on your machine.

---

## 4. Checklist after connect

- [ ] `git push` → Vercel production deploy green
- [ ] `https://substrates.app/signin` loads, logo + Firebase auth works
- [ ] Stripe test checkout → webhook 200 → Firestore purchase
- [ ] Customer portal from `/signin`
- [ ] Old learner Substrata hosts redirected or disabled

---

## 5. What agents need from you (paste once in chat or `.env`)

Never commit secrets. For deployment debugging, share **names only** in chat; paste values in Vercel/Heroku UI or local `.env`:

- Firebase web + admin
- Stripe keys + webhook signing secret
- Whether production Stripe is test or live mode
