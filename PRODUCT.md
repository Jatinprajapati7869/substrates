# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

TanStack Start, Firebase Auth, Firestore, Lemon Squeezy (merchant of record), Heroku (D3). Catalog in `src/lib/catalog.json`.

## Users

- **Primary:** Indie builders, designers, and AI-assisted developers who want polished Webflow/Framer-style templates and section blocks without rebuilding from scratch.

## Product Purpose

**Substrates** sells and delivers website templates and copy-paste sections with account-based access, Lemon Squeezy billing, and assistant-friendly reference prompts. The former Japanese-learning app is **archived**; this codebase is the live product.

## Positioning

Curated template marketplace with AI-ready sections — not a language course, not a generic asset dump.

## Brand Commitments

- Public name: **Substrates** — [https://substrates.app](https://substrates.app), logo at `/logo.webp`.
- Support: **jatin@substrates.app**.
- Operator on legal pages: **`[LEGAL ENTITY]`** (D14 — fill in `src/lib/brand.ts` after counsel).
- Imported marketing pages may lag the account/checkout surfaces during rebrand; Operate surfaces (sign-in, pricing checkout, legal) lead the name change.

## Capabilities and Constraints

- Auth: Firebase (Google + email). Purchases in Firestore. Lemon Squeezy checkout + webhooks; customer portal URL stored on entitlements.
- Catalog MCP at `/mcp` (Firebase ID token). No learner app or Postgres API in this repo.

## Product Principles

1. **Shippable assets** — what you buy is usable in real projects, not mockups only.
2. **Clear licensing boundary** — catalog and prompts are reference; licensed source unlocks with purchase.
3. **Low account friction** — browse free; sign in for profile, checkout, and billing portal.
