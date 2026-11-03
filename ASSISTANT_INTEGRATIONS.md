# Codex and Grok Build

The app exposes OAuth-protected catalog search and product details at `/mcp`.
Publish the app first, then replace `<published-app-origin>` below with its actual HTTPS origin.
No profiles, purchases, or licensed source code are exposed.

## Codex

```sh
codex mcp add oversight-supply --url <published-app-origin>/mcp
codex mcp login oversight-supply
```

Official reference: https://developers.openai.com/learn/docs-mcp

## xAI Grok Build

```sh
grok mcp add --transport http oversight-supply <published-app-origin>/mcp
grok mcp doctor oversight-supply
```

Complete the client's OAuth sign-in and approval flow. Do not paste app-session tokens.
Official reference: https://docs.x.ai/build/features/mcp-servers

The UI label `grokbuild` refers to xAI Grok Build, whose CLI command is `grok`.
Copy buttons produce reference prompts, not downloaded product source code.

## Verification

Copy prompts for both clients were tested on the homepage, Sections, and a section product page.
Unauthenticated MCP initialization returns 401. Manifest extraction advertises `search_catalog` and `get_product`.
Hosted OAuth approval, denial, client discovery and token exchange still require testing after publication.