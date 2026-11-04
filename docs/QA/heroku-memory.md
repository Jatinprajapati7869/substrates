# Heroku node-server memory (P29)

Measured on a **local** Windows dev machine against the production build artifact (not a live Heroku dyno). Method: `node scripts/smoke-node-server.mjs --skip-build` with `PORT=5055`, placeholder `VITE_FIREBASE_*` only, **40** HTTP requests (20× `/api/health` + 20× `/`).

| Metric        | Value   | Target   |
| ------------- | ------- | -------- |
| Child RSS     | ~148 MB | < 400 MB |
| Under 400 MB? | yes     | yes      |

**Cold start:** first request after process start includes Nitro SSR boot; not separately timed here.

**If RSS grows on Heroku:** likely causes include full Firebase Admin + large SSR routes loaded on first traffic, Sentry SDK when `SENTRY_DSN` is set, and concurrent requests on a single dyno. Re-run this script after dependency upgrades.

Reproduce:

```powershell
$env:NITRO_PRESET="node-server"
$env:VITE_FIREBASE_API_KEY="placeholder"
$env:VITE_FIREBASE_AUTH_DOMAIN="placeholder.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="placeholder"
$env:VITE_FIREBASE_APP_ID="placeholder"
npm run build
$env:PORT="5055"
node scripts/smoke-node-server.mjs --skip-build
```

Recorded: 2026-11-04 (P29).
