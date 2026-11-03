# P15 — Sentry with TanStack Start (research notes)

Sources: [Sentry TanStack Start manual setup](https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/manual-setup/), [GitHub Student Developer Pack — Sentry education](https://sentry.io/for/education/), npm registry `@sentry/tanstackstart-react@11.10.0` (2026-03-26).

## Current telemetry (pre-P15)

| Module                        | Behavior                                                                                                                                                     | Lovable endpoint?   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `src/lib/error-capture.ts`    | Records last `Error` from `console.error`, `error`, and `unhandledrejection` for `server.ts` when h3 returns generic 500 JSON. Expands error stacks in logs. | **No network I/O.** |
| `src/lib/webmcp-telemetry.ts` | No-op wrapper: runs the tool callback only.                                                                                                                  | **No.**             |

No Lovable error POST remains in `src/`.

## Education plan (D8)

GitHub Student Developer Pack includes Sentry via [sentry.io/for/education](https://sentry.io/for/education/). Eligibility is verified on Sentry’s site; billing is on the education/org account, not a separate npm package.

## Recommended packages (installed for P15)

| Package                       | Version     | Role                                                                                                |
| ----------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `@sentry/tanstackstart-react` | **11.10.0** | Official TanStack Start SDK (server `wrapFetchWithSentry`, client router init, `captureException`). |

Env vars: `SENTRY_DSN` (server), `VITE_SENTRY_DSN` (browser). Release: `VERCEL_GIT_COMMIT_SHA` or `SOURCE_VERSION` (server); optional `VITE_VERCEL_GIT_COMMIT_SHA` / `VITE_SOURCE_VERSION` at build for client release tag.

Human step: create project in Sentry education org, paste DSNs into host config, trigger one test error.
