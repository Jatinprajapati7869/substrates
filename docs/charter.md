# Charter

Reviewed November 3, 2026.

## Product

**Substrates** sells website templates and copy-paste sections (Webflow/Framer style) with account-based access, Stripe plans, and assistant-ready reference prompts. Site: https://substrates.app. Support: jatin@substrates.app. Operator on legal pages: `[LEGAL ENTITY]` (see D14 in DECISIONS.md).

Users: indie builders, designers, and AI-assisted developers who want polished templates and sections without rebuilding from scratch.

Positioning: curated marketplace with AI-ready sections. Not a language course, not a generic asset dump. The earlier Japanese-learning app is archived and not part of this repo.

## Stack (closed)

TanStack Start (Nitro SSR), React 19, Tailwind 4, Firebase Auth (Google + email), Firestore, Stripe, OpenAI for recommendations, GitHub for source and CI. Catalog in `src/lib/catalog.json`. Host: Heroku on the GitHub Student credit (DECISIONS D3). Vercel Hobby cannot be used for a paid product.

Lovable and Supabase are dropped. No new code may depend on either. Everything is branded Substrates.

## What the product sells

A customer pays for access, then receives a **rebuild prompt** for the AI tool they choose (Claude Code, Cursor, Windsurf, v0, Codex, Lovable, Replit and others). The prompt contains the description, stack, interactions, accessibility notes, and the full source code, so the tool recreates that exact section or template. Examples: `docs/example_customer_recivere/Collage template/`.

Plans (see DECISIONS D7): Sections $15/mo, Sections + Templates $39/mo with 3 credits a month, Lifetime $499. Credits unlock a template permanently; they reset monthly and do not roll over. 14-day refund. Video skills are a separate product.

## In scope for v1

- Public browse of templates, sections, guides, videos with working search, filters, favorites.
- Sign-in, sign-up, profile, sign-out.
- Free section copy after sign-in, with assistant choices (Claude Code, Cursor, Windsurf, v0, Bolt, Replit, Codex, grokbuild; Lovable stays as a copy target only).
- Pricing plans: Sections ($15/mo), Sections + Templates ($39/mo), Lifetime ($499) through Stripe Checkout.
- Verified purchase access: webhook records purchases, the account shows them, the Customer Portal opens.
- Credit ledger: monthly credit grant on each paid invoice, confirm-before-spend, permanent unlocks.
- Delivery of the per-tool rebuild prompt to entitled customers (P10, P11).
- Video skills checkout (optional prompt P21).
- Checkout page with product photos.
- Product pages with AI "You may also like" and same-category fallback.
- Catalog MCP at `/mcp`, authenticated with Firebase ID tokens.
- Production-grade basics: CI, typecheck, env validation, health route, security headers, error monitoring, SEO, legal pages that match reality.

## Out of scope for v1

- Remaining 122 AI product photos (paused; see LATER).
- Paid MCP or API tier (decision document only, in P16).
- Mobile apps, teams/seats, affiliate program, multi-currency, tax automation beyond what Stripe provides by default.
- Postgres or any second database. Firestore is the only datastore.

## Success criteria

A stranger can find substrates.app, browse, sign up, pay with a real card, receive what they bought, and manage billing, with no manual work from the operator. Every one of those steps is covered by a SPEC scenario with evidence.
