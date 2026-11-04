# Research: `substrates.vercel.app` “This page didn’t load”

**Date:** 2026-11-03

## TL;DR

The message is **application-defined**, not Vercel’s default. The live site returns **HTTP 500** and HTML from `src/lib/error-page.ts` — the Nitro/Vercel **serverless handler is failing**. Documented fixes on `main` (`b323e3fd`) target **firebase-admin / OpenTelemetry bundling**; **missing `VITE_FIREBASE_*` at build** remains a common SSR failure mode. `getServerEnv()` is **lazy** and should not alone break `/api/health`. Vercel usually deploys **`main`**, not unmerged **`p23-lemonsqueezy`**; commercial production is intended for **Heroku** (`docs/DECISIONS.md` D3).

## What users see

- `src/lib/error-page.ts` — `renderErrorPage()` static HTML for catastrophic failures.
- `src/routes/__root.tsx` — same headline in `errorComponent`.
- `src/server.ts` — returns `renderErrorPage()` on uncaught errors and h3-swallowed SSR 500s.
- `src/start.ts` — server-fn middleware may return the same page.

**Live (2026-11-03):** `GET https://substrates.vercel.app/` and `GET /api/health` → **500**, `Server: Vercel`, body matches `renderErrorPage()` (`text/html`).

## Deploy configuration (repo)

| File | Fact |
|------|------|
| `vercel.json` | `buildCommand`: `npm run build`, `framework`: `null` |
| `package.json` | `"build": "vite build"`, `"engines": { "node": "22.x" }` |
| `vite.config.ts` | `NITRO_PRESET` defaults to **`vercel`** when `VERCEL` is set; Heroku uses `node-server` (`.env.example`, runbook) |
| Nitro docs | [Vercel preset](https://nitro.build/deploy/providers/vercel): zero-config Git deploy; Node from `engines.node` |

## Environment and boot

- `src/lib/env.server.ts` — `getServerEnv(group)` throws only when a **caller** needs a group with missing vars.
- `src/lib/health.server.ts` + `src/routes/api/health.ts` — GET returns JSON with `configured.*` flags; **does not throw** when vars are unset.
- **Because `/api/health` also 500s with the HTML error page**, failure is likely **pipeline-wide** (server entry, global middleware, or init), not “admin env missing on homepage” alone.
- `src/integrations/firebase/config.ts` — throws `Missing Firebase config: VITE_*` if `firebaseWebConfig()` runs without all four `VITE_FIREBASE_*` values (inlined at build via `vite.config.ts` `loadEnv`).

## Fix on `main`: `b323e3fd`

Message: *Fix Vercel 500: lazy-load firebase-admin on server.*

- `src/integrations/firebase/admin.server.ts` — dynamic `import("firebase-admin/...")`, deferred `getServerEnv("firebaseAdmin")`.
- `vite.config.ts` — Nitro `rollupConfig.external` for `firebase-admin`, `@google-cloud/*`, `@grpc/grpc-js`, `google-gax` (broken OTel bundle on Vercel).

Commit notes also mention required Vercel env vars for `substrates.vercel.app`; runbook §4 lists the same names as Heroku.

## Branches

- **`main` / `origin/main`:** tip `b323e3fdbf10c3028524708d5cfe6cc1807e407c`.
- **`p23-lemonsqueezy`:** ahead of `main` (Lemon Squeezy, Pack 3 docs); **not merged** here.
- Vercel **production branch** is usually **`main`** unless dashboard overrides. `docs/runbooks/connectors-github-vercel-heroku.md` §4: Vercel = preview/fallback; **`substrates.app`** = Heroku.

## Vercel limits (external)

[Vercel Functions limitations](https://vercel.com/docs/functions/limitations): ~**250 MB** uncompressed bundle; Hobby memory/duration caps. Missing env vars typically cause **runtime 500**, not build failure. This app’s 500 body matches **in-app** handling, not a bare platform timeout page.

## Likely causes (ranked)

1. **Serverless bundle/runtime** — eager `firebase-admin`/OTel before `b323e3fd`; redeploy may lag, or **`initSentryServer()` at import** in `src/lib/sentry.server.ts` when `SENTRY_DSN` is set could still fail cold start.
2. **Missing `VITE_FIREBASE_*` on Vercel at build** — SSR throws via `firebaseWebConfig()`.
3. **Missing server env on specific routes** — `getServerEnv("firebaseAdmin"|"lemonsqueezy")` on checkout/webhooks/MCP; unlikely sole cause of `/api/health` 500 unless whole handler fails to load.

## Operator checks

1. Vercel: production branch + deployment SHA vs `b323e3fd`.
2. Function logs for failing `X-Vercel-Id`.
3. When healthy: `GET /api/health` → JSON `ok: true` and `configured` object.
4. Env: all names in `.env.example` / runbook §2–§4 for Preview/Production.

## References

Repo: `vercel.json`, `vite.config.ts`, `package.json`, `src/lib/env.server.ts`, `src/lib/error-page.ts`, `src/server.ts`, `docs/DECISIONS.md`, `docs/runbooks/connectors-github-vercel-heroku.md` · Git: `b323e3fd` · Live: `https://substrates.vercel.app/` (500 observed 2026-11-03)
