# Public marketing claims (P33)

Audit scope: `/` (home), `/pricing`, `/templates`, `/sections`, `/help`. Counts and availability lines come from `src/lib/public-claims.ts` (`catalog.json` + `content-manifest.json`). Plan prices and credits from `src/lib/plans.ts`.

Owner grill decisions (2026-11-04): keep refund line, keep “AI-ready”, keep Figma qualified bullets on plans, Figma request → “(coming soon)” only, keep lifetime “all templates” entitlement wording with manifest availability on cards, keep “Works with” as tool compatibility. Removed “Trusted by developers and designers” (no user-evidence source).

## Claim table

| Claim (public surface) | Page(s) | Verdict | Evidence |
| --- | --- | --- | --- |
| `{N} templates` in hero, browse links, templates H1, pricing chip/headlines | home, pricing, templates | **true** | `countCatalogTemplates()` → `catalog.json` (`kind: "template"`). Was falsely **192**; catalog has **200** (fixed P33). |
| `{N} sections free to copy` | home | **true** | `countCatalogFreeSections()` → 42 non-pro sections in `catalog.json`. Was falsely **38** (fixed P33). |
| `{N} sections · {F} free to copy` (hero chip) | sections | **true** | `SectionsHeroCatalogChip` → `formatSectionCatalogCount()` / `formatFreeSectionCatalogCount()`. Was **58 / 38** (fixed P33). |
| `Browse {F} free sections` | sections | **true** | `SectionsBrowseFreeSectionsLabel` → `formatFreeSectionCatalogCount()`. Was **38** (fixed P33). |
| `{N} sections` (library filter line) | sections | **true** | `SectionsLibraryCountLine` → `formatSectionCatalogCount()`. Was **58** (fixed P33). |
| `{N} Pro sections + {credits} template(s) a month` | pricing illustration | **true** | Pro count: `countCatalogProSections()` = 20. Credits: `PLANS.sections.monthlyCredits` = 1. |
| `{N} templates, unlock 3 per month` | pricing illustration | **true** | N from catalog; 3 from `PLANS["sections-templates"].monthlyCredits`. |
| `{N} of {M} templates with rebuild prompts available now` | pricing plan cards, checkout (lifetime) | **true** | `countDeliverableTemplates()` / `countCatalogTemplates()` from manifest + catalog (P32). |
| `{N} of {M} Pro sections with full prompts available now` | pricing Sections / S+T cards | **true** | Deliverable pro slugs in manifest vs `countCatalogProSections()`. |
| `$15`, `$39`, `$499` plan prices | pricing | **true** | `PLANS.*.amountCents` in `src/lib/plans.ts` (matches D7). |
| 1 / 3 template credits per month | pricing copy, D7 | **true** | `PLANS.sections.monthlyCredits`, `PLANS["sections-templates"].monthlyCredits`. |
| Every Pro section (membership) | pricing bullets | **true** | 20 pro sections in catalog; entitlement `sectionAccess: "pro"` in plans. |
| Every template unlocked (Lifetime) | pricing bullets | **true (entitlement)** | `PLANS.lifetime.unlimitedTemplates` + `templateAccess: "all"`. **Delivery** gated by manifest (P32); availability line on card. Owner chose to keep wording. |
| Full refund within 14 days, no questions asked | pricing cards, checkout summary | **kept (owner)** | Stated in D7; `CHECKOUT_REFUND_LINE` in `checkout-summary.ts`. Formal refund workflow deferred (D23); `/refunds` describes certain facts only. |
| AI-ready (badges / copy) | home, pricing | **kept (owner)** | Defined: products expose assistant copy flows (`assistant-copy.ts`, deliver pipeline). Free sections = reference prompt; full rebuild prompt when slug is in manifest. Not a guarantee every catalog item ships body day one. |
| Figma source file(s) where available | pricing plan bullets | **kept (owner)** | Qualified wording; `/help` FAQ states only a subset have Figma files. No per-slug Figma field in catalog yet—inventory not machine-verified. |
| Request a Figma file (coming soon) | Lifetime plan bullet | **true (future)** | Feature not shipped; label matches owner choice. |
| Works with (Claude, Cursor, Webflow, …) | pricing | **true (compatibility)** | Tool/integration logos; not user counts or reviews. |
| Trusted by developers and designers | pricing | **removed** | No substantiation; implies social proof (P33 step 5). |
| Does every template come with a Figma file? → No | help FAQ | **true** | Honest FAQ; aligns with qualified plan copy. |
| `{N}` sections (sidebar) | all five pages | **true** | `countCatalogSections()` = 62 (was falsely **58**). |

## Maintenance

- When adding marketing numbers, only use helpers in `public-claims.ts` or components under `src/components/marketing/`.
- After manifest uploads, availability lines update automatically.
- Re-run `src/test/public-claims.test.tsx` after copy changes.

## Related docs

- `docs/DECISIONS.md` D7 (entitlements table), D19 (launch “more coming” via manifest), D23 (refund policy deferred)
- `docs/QA/legal-claims.md` (legal pages, separate pass)
