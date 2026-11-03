# Typecheck debt (P05 / cleared P20)

`npm run typecheck` (`tsc --noEmit`) passes as of **2026-11-03** after P20.

CI runs typecheck without `continue-on-error` (`.github/workflows/ci.yml`).

Previous debt items (routes, tests, vite.config, sentry init casts, ProductPage search params, deliver response headers) were fixed in P20.
