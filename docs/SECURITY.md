# Security

## Assets worth protecting

1. Paid access (purchases, licensed source).
2. Payment provider and Firebase Admin credentials.
3. User accounts and email addresses.
4. OpenAI budget.

## Threats and controls

| Threat                             | Control                                                                | Prompt   |
| ---------------------------------- | ---------------------------------------------------------------------- | -------- |
| Forged payment webhook               | Verify signature on raw body, event-key idempotency (see `billing-lemonsqueezy.md`) | P09, P22 |
| Client picks its own price or plan | Server reads `PLANS`; metadata set server-side                         | P09      |
| Reading another user's purchases   | Firestore rules, server filters by token uid                           | P07      |
| Open redirect after sign-in        | `safeReturnPath` allow-list                                            | P07      |
| Licensed source leaked publicly    | No source in `public/` or client bundle; signed, expiring server links | P10, P11 |
| Cost abuse of AI recommendations   | Per-user/IP limit, input validation, slug allow-list from catalog      | P08      |
| Missing env crashes SSR            | Typed env module, lazy admin init, health route                        | P04, P06 |
| XSS / clickjacking / MIME sniffing | Security headers and CSP baseline                                      | P08      |
| Vulnerable dependencies            | `npm audit` in CI, Dependabot                                          | P05      |
| Secrets in git                     | `.gitignore` for `.env*`, secret scan in CI                            | P05      |
| MCP overreach                      | Token audience check; catalog-only tools                               | P16      |

## Security headers (S13)

Applied on every response in `src/server.ts` via `withSecurityHeaders()` (`src/lib/security-headers.server.ts`). Host-agnostic (Heroku `node-server` and Vercel).

| Header                                | Value (summary)                                |
| ------------------------------------- | ---------------------------------------------- |
| `Strict-Transport-Security`           | `max-age=31536000; includeSubDomains`          |
| `X-Content-Type-Options`              | `nosniff`                                      |
| `Referrer-Policy`                     | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`                  | `camera=()`, `microphone=()`, `geolocation=()` |
| `X-Frame-Options`                     | `DENY`                                         |
| `Content-Security-Policy-Report-Only` | See origins table below                        |

CSP is **report-only** first. Promote to enforcing after reports are clean.

### CSP report-only origins (grep-derived)

| Directive         | Origin                                                    | Why in this app                                           |
| ----------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `default-src`     | `'self'`                                                  | App scripts and documents                                 |
| `script-src`      | `'self'`, `'unsafe-inline'`                               | Vite/TanStack inline hydration                            |
| `script-src`      | `https://apis.google.com`, `https://www.gstatic.com`      | Google sign-in popup (`signin.tsx`)                       |
| `script-src`      | `https://js.stripe.com`                                   | Stripe checkout scripts (removed when P23 drops Stripe)   |
| `style-src`       | `'self'`, `'unsafe-inline'`                               | Captured CSS + Tailwind                                   |
| `font-src`        | `'self'`, `data:`                                         | Inter woff2 under `/site-assets/` (`src/styles/site.css`) |
| `img-src`         | `'self'`, `data:`, `blob:`                                | Local assets                                              |
| `img-src`         | `https://cdn.prod.website-files.com`                      | Template thumbnails (`catalog.json`)                      |
| `img-src`         | `https://*.webflow.io`                                    | Demo URLs (`catalog.json`, `index.tsx`)                   |
| `img-src`         | `https://y4pdgnepgswqffpt.public.blob.vercel-storage.com` | Framer images (`catalog.json`)                            |
| `img-src`         | `https://supply.madebyoversight.com`                      | Section images (`catalog.json`)                           |
| `connect-src`     | `'self'`                                                  | Same-origin server functions                              |
| `connect-src`     | Firebase Google APIs hosts                                | Client SDK (`integrations/firebase/client.ts`)            |
| `connect-src`     | `https://<VITE_FIREBASE_AUTH_DOMAIN>`                     | Auth domain from env at runtime                           |
| `frame-src`       | `https://accounts.google.com`                             | Google OAuth                                              |
| `frame-src`       | `https://checkout.stripe.com`, `https://js.stripe.com`    | Stripe Checkout                                           |
| `form-action`     | `'self'`, `https://checkout.stripe.com`                   | Checkout redirect                                         |
| `frame-ancestors` | `'none'`                                                  | Clickjacking protection                                   |

Browser CSP does not restrict server-side payment-provider or OpenAI fetches.

## AI recommendation rate limit (S14)

`src/lib/rate-limit.server.ts`: sliding window **20 / 10 minutes**, key = Firebase `uid` when Bearer token verifies else IP (`recommend-rate-limit.server.ts`). **Per-instance** memory; shared store is the multi-dyno upgrade.

Over limit: `getRelatedProducts` uses `fallbackRelated()` and skips OpenAI.

## Rules

- Server functions and API routes authenticate before doing work.
- Validate every input with zod at the boundary.
- Do not log tokens, emails, or request bodies containing card or auth data.
- Rotate any key that appears in a commit, a log, or a chat transcript.

## Reporting

Security reports go to jatin@substrates.app.
