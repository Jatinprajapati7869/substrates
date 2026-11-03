# Product prompt delivery (P10)

Design for S8: entitled members receive the correct rebuild prompt text; templates unlock with credits per D7. **No application code in P10.** Implementation is P11.

**Seam (codebase-design):** one deep module behind a server function interface. Callers (product UI, tests) pass `{ idToken, slug, assistant }` and optional spend confirmation handled separately. Entitlement, Firestore read, rebrand, wrapper assembly, and license appendix stay inside the module.

**Issue tracker:** this repo has no configured tracker for `/to-spec` publish; treat this file as the authoritative spec until an issue is created manually.

---

## Problem statement

Customers buy membership and template unlocks to receive assistant-ready rebuild prompts (D6), not file downloads. Today every section copy path uses a short **reference prompt** built in the browser (`assistant-copy.ts`), including Pro sections, which do not yet deliver the full Collage-style body. Licensed bodies must not appear in git, client bundles, MCP tools, or shared caches.

## Solution

Store one canonical markdown **body** per catalog slug in Firestore `product_content/{slug}` (D9). At delivery time the server validates the member, checks D7 entitlements, loads the body, applies Substrates rebrand, prepends a small per-assistant **wrapper** (mostly static in code), appends a **license notice**, and returns plain text with `Cache-Control: no-store`. Free sections keep the existing **reference prompt** flow for signed-in members. Pro sections and unlocked templates use the server **full rebuild prompt**.

---

## Catalog and pricing shape (current)

Source: `src/lib/catalog.json`, typed in `src/lib/catalog.ts`. **262 products:** 200 templates, 62 sections.

### Product fields

| Field                     | Meaning                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `slug`                    | Stable id; matches route and `product_content` doc id                               |
| `kind`                    | `"template"` \| `"section"`                                                         |
| `name`                    | Display title                                                                       |
| `description`             | Marketing / reference text                                                          |
| `category`, `subcategory` | Browse grouping                                                                     |
| `platform`                | Template host: mostly `webflow` (193), `framer` (7); null for sections              |
| `image`                   | Preview image URL                                                                   |
| `demoUrl`, `previewUrl`   | Optional external links                                                             |
| `priceUsd`                | Template list price when sold standalone in imported catalog; membership is primary |
| `tier`                    | Sections: `"free"` (42) or `"pro"` (20)                                             |
| `featured`                | Homepage flag                                                                       |

### Free vs paid (entitlement, not `priceUsd` alone)

| Catalog slice               | Count | Delivery tier                                                                     |
| --------------------------- | ----- | --------------------------------------------------------------------------------- |
| Sections, `tier: "free"`    | 42    | **Reference prompt** after sign-in                                                |
| Sections, `tier: "pro"`     | 20    | **Full rebuild prompt** with active Sections, Sections + Templates, or Lifetime   |
| Templates, `priceUsd > 0`   | 198   | **Full rebuild prompt** after **Unlock** or Lifetime                              |
| Templates, `priceUsd === 0` | 2     | Same as paid templates (plan + unlock rules); price display is “Free” / plans CTA |

Templates do not use `tier`; access is always via D7 template rules. Pro sections do not spend credits.

---

## How `assistant-copy.ts` works today

- **`assistantSchema`:** Claude Code, Cursor, Windsurf, v0, Bolt, Lovable, Replit, Codex, grokbuild.
- **`sectionPrompt(slug, assistant, origin)`:** loads section from catalog; builds one paragraph: “In {assistant}, recreate … from Substrates: {url}”, description, design-system note, and either “reference prompt, not licensed source code” plus free vs pro disclaimer. **No entitlement check.** **No Firestore.**
- **`copySectionPrompt`:** `sectionPrompt` + `navigator.clipboard.writeText` in the browser.

Pro sections still use this reference text if copy UI is wired; P11 must route Pro/template copy through the server **full rebuild prompt** instead.

**Free sections (owner 2026-11-03):** keep **client-only** `copySectionPrompt` / `sectionPrompt` for free tier; server delivery module handles **full** prompts only.

---

## Canonical body format (D6)

Based on `docs/example_customer_recivere/Collage template/` (~46 KB per product).

### Structure

1. **Title line:** `# {Product name} — {section \| template role}` (human heading, not necessarily catalog `name` alone).
2. **Narrative paragraph(s):** behaviour, visual, interactions (Collage lines 3–4 style).
3. **Rebuild instruction block:** imperative to create files exactly as listed (no paraphrase).
4. **Sections (headings):** Stack & dependencies; Layout & content; Interactions & animation; Responsive behaviour; Accessibility & robustness; Performance notes; Assets; Putting it in an existing site; **Full source code** (nested `###` per file path with fenced contents); Build / run; Limitations.

### Storage rules

- One **body** string per slug in Firestore; **no** per-assistant duplicates in storage.
- Bodies may still say `… — Oversight Supply` in document title lines inside the markdown; **delivery must rewrite** to Substrates (see Rebrand).
- Optional future fields on the same doc: `bodyVersion` (integer), `updatedAt`, `sha256` for upload idempotency—not required for v1 if upload script writes atomically.

### Template-specific content (in body, not wrapper)

- **Webflow vs Framer:** when a design exists in both platforms, store **separate canonical files** (e.g. `content/templates/{slug}.webflow.md` and `content/templates/{slug}.framer.md`) and matching Firestore docs **`product_content/{slug}__webflow`** and **`product_content/{slug}__framer`** (or `{slug}#webflow`—pick one delimiter in P11 and document in upload script). When only one platform exists in `catalog.json`, use a single doc id `{slug}` and one file.
- **Webflow templates:** body describes Webflow structure, classes, and export expectations.
- **Framer templates:** body describes Framer components and layout.
- **Figma (owner 2026-11-03):** embed a **signed or time-limited link** inside the delivered prompt text when the template includes Figma; link minting is server-side at delivery time (P11), not stored as a permanent public URL in git.

Sections use the same markdown shape (React/Vite example in Collage); template bodies differ by platform in separate stored bodies when both exist.

---

## Per-assistant wrapper

Collage example files (`cursur.md`, `claude.md`, `lovable.md`, `v0.md`, `windsurf.md`, `replit.md`) share **one** SHA-256 except `cursur.md`, which differs only by a trailing space on the last limitation bullet. **No assistant name appears in the example bodies.**

**Owner choice (2026-11-03):** prefix like today’s **`sectionPrompt`**: open with `In {assistant}, …` then the full rebranded body (not a separate one-line table per tool). Example shape:

```text
In Cursor, apply the following rebuild specification exactly. Create every file at the paths given under Full source code with the exact contents shown. Do not paraphrase visible copy.

{rebranded canonical body}
```

Same pattern for all values in `assistantSchema` (including Bolt, Codex, grokbuild).

**Assembly order:** `{wrapper prefix}\n\n{rebranded body}\n\n{license notice}`.

---

## Rebrand at delivery

Apply on the server immediately before return (do not mutate stored Oversight-era uploads until bulk re-upload):

| Pattern                                        | Replacement  |
| ---------------------------------------------- | ------------ |
| `Oversight Supply`                             | `Substrates` |
| `OversightStudio` / legacy variants if present | `Substrates` |

Also set clipboard-bound document title lines to `{Name} — Substrates`. Store raw historical bodies in Firestore until content pipeline rewrites them at source.

---

## Storage: Firestore `product_content/{slug}` (D9 default)

### Document shape (v1)

```text
product_content/{slug}
  body: string          // canonical markdown, ≤ ~500 KB practical; Firestore doc max 1 MiB
  updatedAt: timestamp  // optional
  bodyVersion: number   // optional, monotonic for support
```

### Access

- **Client:** denied (`firestore.rules`).
- **Server:** Admin SDK read in delivery module only.
- **MCP:** must not expose `product_content` (D10, P16).

### Vercel Blob (private) comparison

| Topic      | Firestore (default)                      | Vercel Blob private                                                                              |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Host fit   | Heroku production (D3)                   | Needs Vercel Pro + Blob token on app                                                             |
| Read path  | Admin `get()` per delivery               | Admin metadata in Firestore + HTTP fetch from Blob                                               |
| Size       | 1 MiB/doc sufficient (~46 KB)            | Larger bodies possible; not needed now                                                           |
| Secrets    | Existing Firebase service account        | `BLOB_READ_WRITE_TOKEN` on Heroku                                                                |
| P11 change | Upload script `set()` body field         | Upload puts object `{slug}.md`, Firestore stores `blobUrl` + `etag`; delivery fetches then wraps |
| Caching    | Same: response `no-store`; no CDN on API | Same                                                                                             |

**Decision:** stay on Firestore unless owner says “Blob” (D9).

---

## Upload script design

**Script:** `scripts/upload-product-content.mjs` (P11).

**Input directory:** git-ignored `content/` at repo root (add to `.gitignore`).

**Layout:**

```text
content/
  sections/{slug}.md
  templates/{slug}.md                    // single-platform template
  templates/{slug}.webflow.md            // when both platforms exist
  templates/{slug}.framer.md
```

Firestore doc ids follow the same suffix rule (`{slug}` vs `{slug}__webflow` / `{slug}__framer`—fixed in P11 step 4).

**Behaviour:**

1. Require `GOOGLE_APPLICATION_CREDENTIALS` or existing Admin env used elsewhere.
2. Parse CLI: `--dry-run`, optional `--slug`, optional `--kind`.
3. For each file: resolve slug; **`findProduct`** equivalent via catalog import or JSON read; skip unknown slugs with error.
4. Read UTF-8 markdown; optional compute SHA-256; skip upload if unchanged (compare to remote `sha256` if stored).
5. `set(product_content/{slug}, { body, updatedAt, bodyVersion })` merge.
6. **Never** commit real bodies; CI uses fixtures only in tests.

**Operator doc:** one line in `.env.example` comment pointing to script, not credentials.

---

## Entitlement rules (D7)

| Plan                          | Sections                  | Templates                                                           |
| ----------------------------- | ------------------------- | ------------------------------------------------------------------- |
| Free account ($0)             | Free sections only        | None                                                                |
| Sections ($15/mo)             | All Pro sections          | 1 credit / paid month                                               |
| Sections + Templates ($39/mo) | All Pro sections          | 3 credits / paid month; Webflow or Framer choice per marketing copy |
| Lifetime ($499)               | All Pro sections, ongoing | All templates; Figma where available                                |

**Rules:**

- Credit unlocks one template **permanently** (doc in `unlocks/{userId}_{slug}`).
- Credits reset each invoice period; **no rollover** (`entitlements.server.ts` invoice handler).
- **Confirm before spend** (UI + server idempotency): see flow below.
- Refunds (D15): revoke unlocks from refunded period—delivery must fail after revocation.

### Server decision table (`canDeliver`)

| Product            | Member signed in | Plan / unlock                             | Prompt kind                                                      |
| ------------------ | ---------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| Section, free tier | yes              | none                                      | reference (may stay client `sectionPrompt` or server equivalent) |
| Section, free tier | no               | —                                         | 401 / sign-in                                                    |
| Section, pro tier  | yes              | `sectionAccess: pro` and `status: active` | full                                                             |
| Section, pro tier  | yes              | inactive / free account                   | 403 + link `/pricing`                                            |
| Template           | yes              | Lifetime or unlock doc                    | full                                                             |
| Template           | yes              | credits plan, no unlock                   | 403 + unlock UI                                                  |
| Template           | yes              | no plan                                   | 403 + `/pricing`                                                 |

**Note:** `spendCreditForTemplate` already writes unlock without charging Lifetime (`spend-credit.server.ts`). Delivery must not spend credits; spending is a separate explicit action.

---

## Confirm-before-spend flow (templates)

1. Visitor opens template product page, signed in, entitled to credits but **no** unlock.
2. Primary CTA: **Unlock with 1 credit** (not “Copy” yet).
3. Modal: template name, “This uses 1 credit; you have **N** left this period.” Confirm / Cancel.
4. On confirm: call existing **`spendCredit`** server function with Firebase ID token + slug.
5. On success: show assistant picker (same grid as free sections).
6. On pick: call **`deliverProductPrompt`** (name TBD); await clipboard; then show success (existing AGENTS.md rule).
7. If already unlocked: skip spend; go to assistant picker.
8. If `no_credits`: link to `/pricing` without opening spend dialog.

Spend and deliver are **two calls** so delivery stays read-only and testable; spend remains transactional.

---

## Response shape (server function)

Success (`200`, `Cache-Control: no-store`, `Vary: Authorization`):

```json
{
  "kind": "full",
  "text": "…full wrapped markdown…",
  "assistant": "Cursor",
  "productSlug": "portfolio-collage",
  "productKind": "section",
  "licenseNotice": "…short plain text…"
}
```

Reference path for free sections (if implemented server-side for parity):

```json
{
  "kind": "reference",
  "text": "…",
  "assistant": "Cursor",
  "productSlug": "signal",
  "productKind": "section",
  "licenseNotice": "…"
}
```

Errors (JSON body, no prompt text):

| HTTP | Code                | When                               |
| ---- | ------------------- | ---------------------------------- |
| 401  | `auth_required`     | Missing/invalid ID token           |
| 403  | `not_entitled`      | Plan/unlock insufficient           |
| 404  | `unknown_product`   | Slug not in catalog                |
| 400  | `unknown_assistant` | Not in `assistantSchema`           |
| 404  | `content_missing`   | No `product_content` doc (ops gap) |
| 429  | `rate_limited`      | Abuse limit                        |
| 500  | `internal`          | Unexpected                         |

Client copies `text` only; shows `licenseNotice` in UI footer optional.

---

## Size limits

| Layer              | Limit                                                             |
| ------------------ | ----------------------------------------------------------------- |
| Firestore document | 1 MiB hard max                                                    |
| Target body        | ~46 KB (Collage); allow headroom to ~900 KB before ops review     |
| HTTP response      | Single string; gzip at transport ok; **`no-store`**               |
| Clipboard          | Browser-dependent; if overflow risk, future chunking out of scope |

Upload script rejects files &gt; 900 KB with clear error.

---

## Caching rules

- **Entitled prompt responses:** `Cache-Control: no-store, private`. No shared CDN cache on delivery route.
- **Do not** put bodies in TanStack Query `staleTime: Infinity` or service workers.
- **Do not** embed bodies in SSR HTML for product pages.
- **Build output test (P11):** grep client bundle for a fixture-only marker string; must not appear.
- Reference prompts for free sections are public-ish marketing text; still avoid bundling Pro/template markers.

---

## Abuse limits

Reuse AI rate-limit pattern (`rate-limit.server.ts`):

- Per **UID**: e.g. 30 full deliveries / hour (configurable env `DELIVER_RATE_LIMIT`).
- Per **UID + slug + assistant**: dedupe not required; logging for support.
- Failed auth: tight IP bucket optional later; P11 minimum UID bucket on success path only.
- **`spendCredit`:** already transactional; no change.

---

## License shown to customers

Append **`licenseNotice`** after the body (not inside stored body) so legal can change copy without re-uploading all products.

**Default text (owner 2026-11-03: terms excerpt + Substrates one-liner):**

1. **Terms `/terms` (reuse):** “You may use an unlocked template in your own or a client project, subject to any licence terms supplied with that template or its source platform. You may not resell or redistribute the template files or access links…”
2. **Full rebuild prompt:** “This prompt includes Substrates-licensed source specifications. For your use in projects you build; do not redistribute the prompt text or generated source as a standalone product for sale.”
3. **Reference prompt:** keep existing sentence: “This is a reference prompt, not licensed source code.”

Per-template platform licenses (Webflow marketplace, etc.) may be added to `licenseNotice` when catalog metadata exists—**out of scope** until owner supplies strings (grill-me).

**D13:** shipping content that relies on UI kits with unknown resale in `docs/QA/licenses.md` is blocked for launch.

---

## Testing decisions (P11)

- **Seam:** server function with injected Firestore + entitlement reader (same style as `spend-credit` / webhook tests).
- **Behaviour-only tests:** entitled Pro section returns full text containing rebranded title; free section reference unchanged; template without unlock 403; spend then deliver; lifetime without spend; canceled subscription keeps unlock; wrong assistant 400; missing content 404; rate limit 429.
- **Build grep test:** marker in fixture `product_content` only in test harness, absent from `dist` client assets.
- Prior art: `src/test/spend-credit.test.ts`, `entitlements.test.ts`, `recommend.functions.test.ts` (rate limit).

---

## Out of scope (P10 / P11)

- Video skills delivery (P21).
- Figma file hosting infrastructure until owner defines link pattern.
- Bulk re-upload of all 262 bodies (operator task post-P11).
- MCP exposing prompts.
- Changing Firestore rules beyond existing deny on `product_content` (confirm before edits in P11).

---

## P11 implementation plan

1. **Add delivery module + server function** — Interface: token + slug + assistant → result or error; internal: catalog lookup, entitlement, Firestore read, rebrand, wrap, license append. **Verify:** unit tests with fake Firestore doc and entitlement matrix rows.
2. **Wire Pro section + template UI** — Replace reference copy for pro/template with server deliver; keep free section client reference (or server parity test). **Verify:** manual product page + `npm test` entitlement cases.
3. **Unlock confirm UI** — Dialog + `spendCredit` then assistant menu. **Verify:** `spend-credit.test.ts` still green; E2E checklist unlock → copy.
4. **Upload script + `.gitignore`** — `content/` ignored; `--dry-run` documented. **Verify:** dry-run against one fixture file without writing secrets.
5. **Rate limit on deliver route** — Env-driven limit. **Verify:** `rate-limit.test.ts` pattern extended or dedicated test 429.
6. **HTTP headers** — `Cache-Control: no-store` on deliver responses. **Verify:** test asserts header.
7. **Build leakage test** — Fixture marker not in client bundle. **Verify:** `npm run build` + grep test passes.
8. **Docs** — Update `docs/PROGRESS.md` P11; operator note for upload. **Verify:** `npm run lint`, `npm test`, `npm run build` (and `typecheck` if clean).

---

## Further notes

- **Test seam confirmation:** prefer single server function `deliverProductPrompt` over splitting read/spend unless you want spend-only tests unchanged.
- **Grill-me (2026-11-03):** separate Webflow/Framer bodies when both exist; Figma via signed link in prompt; wrappers match `sectionPrompt` prefix; free sections stay client reference; license = terms excerpt + one-liner.
