# Architecture

## Runtime

- **Web + API:** one TanStack Start app, SSR through Nitro. Host is Heroku (DECISIONS D3): `NITRO_PRESET=node-server`, `Procfile`, `PORT` from Heroku. Vercel Pro (`NITRO_PRESET=vercel`) is the fallback. Keep code host-agnostic: security headers and env handling live in app code, not in `vercel.json` alone. File routes in `src/routes/`.
- **Firebase is not a host here.** It provides Auth and Firestore only. Heroku and Firebase are not alternatives: Heroku runs the Node server, Firebase stores accounts and data.
- **GitHub Actions:** CI only (`.github/workflows/ci.yml`). Deploys come from Vercel's Git integration.

## Data stores

| Store                                   | Holds                                                   | Writers                                                                |
| --------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `src/lib/catalog.json`                  | Products (templates, sections)                          | Humans, via PR                                                         |
| Firestore `profiles/{uid}`              | Profile, billing customer id (`stripeCustomerId` until P23) | Owner (client) and server                                          |
| Firestore `purchases/{checkoutId}`      | Paid checkouts (`stripeSessionId` until P23)            | Webhook via Admin SDK only                                             |
| Firestore `entitlements/{uid}`          | Plan, status, credits remaining, credit period end      | Webhook and credit-spend server function (Admin only; client read own) |
| Firestore `unlocks/{uid}_{slug}`        | Permanent template unlocks                              | Server function only (Admin; client read own)                          |
| Firestore `product_content/{slug}`      | Canonical rebuild-prompt body per product (about 46 KB) | Upload script, Admin only; no client access                            |
| Firestore `stripe_events/{eventId}`     | Processed webhook ids (→ `billing_processed_events` P23) | Webhook only                                                          |
| localStorage `supply-favorites`         | Favorites by product name                               | Browser                                                                |
| Payment provider (Stripe → Lemon Squeezy) | Customers, subscriptions, payments                    | Provider MoR                                                           |

No SQL database. Firestore is the only application datastore.

## Code layout

- `src/routes/`: pages and API routes. Imported pages keep captured markup, with source CSS in `src/styles/`. Detail routes use trailing-underscore unnesting (`templates_.$slug`, `sections_.$slug`, `guides_.<slug>`, `videos_.<slug>`).
- `src/lib/`: catalog, plans, `billing/` provider layer, purchases, recommendations, MCP server, shell hook. `*.server.ts` files are server-only.
- `src/integrations/firebase/`: client SDK and `admin.server.ts` (lazy-loaded so SSR does not crash when env is absent).
- `src/components/`: shared UI (`CatalogBrowser`, `ProductPage`, shadcn/ui under `components/ui`).
- `src/test/`: Vitest + Testing Library.

## Trust boundaries

1. Browser to server functions: Firebase ID token required; verified with the Admin SDK.
2. Payment provider to webhook: signature on the raw body, normalized events, idempotent write (`docs/specs/billing-lemonsqueezy.md`).
3. MCP client to `/mcp`: Firebase ID token; tools read only the shared catalog.
4. Server env (`FIREBASE_*`, `STRIPE_*` / `LEMONSQUEEZY_*`, `OPENAI_API_KEY`, `CRON_SECRET`) never reaches the client. Only `VITE_FIREBASE_*` is public.

## Rules

- Prices come from `src/lib/plans.ts` on the server. Never from the request.
- Product data is read from `catalog.json` only.
- Product rebuild prompts are never bundled into client JS, `public/`, `catalog.json`, MCP tools, or git. They are read from `product_content` by an entitlement-checked server function and returned as text (P10, P11).
- Credits are spent only inside a Firestore transaction on the server.
