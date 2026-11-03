# Codex and Grok Build

The app exposes a **catalog-only** OAuth-protected MCP server at `/mcp` on your deployed origin (for example `https://substrates.app/mcp`).

- **Auth:** Firebase ID tokens (Google or email/password sign-in). Clients use OAuth discovery against `/.well-known/oauth-protected-resource`, which names Firebase (`https://securetoken.google.com/<project-id>`) as the issuer.
- **Tools:** `search_catalog` and `get_product` read from `src/lib/catalog.json` only. No profiles, purchases, entitlements, unlocks, or licensed `product_content` bodies are exposed.
- **Rate limit:** Same per-uid sliding window as AI recommendations (20 requests / 10 minutes per user per instance).
- **Sign-in required:** Unauthenticated calls receive `401` with `WWW-Authenticate` pointing at the protected-resource metadata URL.

Replace `<published-app-origin>` below with your HTTPS origin.

## Codex

```sh
codex mcp add substrates --url <published-app-origin>/mcp
codex mcp login substrates
```

Official reference: https://developers.openai.com/learn/docs-mcp

## xAI Grok Build

```sh
grok mcp add --transport http substrates <published-app-origin>/mcp
grok mcp doctor substrates
```

Complete the client's OAuth sign-in and approval flow. Do not paste app-session tokens into chat logs.
Official reference: https://docs.x.ai/build/features/mcp-servers

The UI label `grokbuild` refers to xAI Grok Build, whose CLI command is `grok`.
Copy buttons on the site produce **reference prompts**, not downloaded product source code.

## Verification

- Vitest: `src/test/mcp-server.test.ts` (S11 unauthenticated 401, mocked token tool list, catalog-only output; S12 metadata issuer).
- Manual after deploy: unauthenticated `POST /mcp` → 401; metadata at `GET /.well-known/oauth-protected-resource/mcp` shows Firebase issuer; authenticated client lists exactly two tools.
