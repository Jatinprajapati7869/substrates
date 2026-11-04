# Product body format (canonical markdown)

One Firestore document per deliverable slug: `product_content/{docId}` (see `docs/specs/delivery.md`). Authors edit git-ignored files under `content/`; the format sample lives in `content-example/collage.md`.

## Title and branding

1. **First line:** `# {Product name} — {role}` (H1). Public-facing title must say **Substrates**, never **Oversight Supply** or **OversightStudio**.
2. **Description:** One or more paragraphs after the title, before the first `##` section. Imperative rebuild instructions belong here (Collage-style).

## Required sections (## headings, in order)

| # | Heading | Notes |
| - | ------- | ----- |
| 1 | Stack & dependencies | Runtime, packages, install commands |
| 2 | Layout & content | Structure and copy overview |
| 3 | Interactions & animation | Behaviour |
| 4 | Responsive behaviour | US spelling `behavior` is accepted at validation |
| 5 | Accessibility | `Accessibility & robustness` is accepted |
| 6 | Performance notes | |
| 7 | Assets | Paths and formats |
| 8 | Putting it in an existing site | Integration notes |
| 9 | Full source code | See below |
| 10 | Build / run | Or **Build and run** |
| 11 | Limitations | |

Extra `##` subsections are allowed if the required headings still appear in order.

## Full source code

Under `## Full source code`:

- One `### \`path/to/file\`` heading per file.
- Immediately followed by a fenced code block with the full file contents.
- At least one file required; balance all ``` fences in the document.

## Allowed placeholders

- `#` route placeholders in copy (`href="#"`, `/about`) when the body tells the reader to swap for their routes.
- Generic example emails and domains that are not your local dev machine (e.g. `hello@example.com`).
- Asset paths under `src/` that ship inside the product body.

## Forbidden content (validator rejects)

| Rule | Reason |
| ---- | ------ |
| `Oversight`, `Oversight Supply`, `OversightStudio` | Rebrand to Substrates at delivery; do not store in new bodies |
| `http://localhost…`, `127.0.0.1`, `[::1]` URLs | Author machine leakage |
| Lines like `api_key=…`, `secret: …`, `token=…`, `private_key:` | Secret-like patterns |
| `<script src="https://…">` remote scripts | XSS / supply-chain risk |
| Bodies over **900 KB** | Firestore doc limit 1 MiB with headroom |

## File layout in repo

| Path | Purpose |
| ---- | ------- |
| `content/<slug>.md` | Preferred flat layout; slug must exist in `catalog.json` |
| `content/sections/<slug>.md` | Section body → `product_content/{slug}` |
| `content/templates/<slug>.md` | Template → `product_content/{slug}` |
| `content/templates/<slug>.webflow.md` | → `product_content/{slug}__webflow` |
| `content/templates/<slug>.framer.md` | → `product_content/{slug}__framer` |
| `content-example/collage.md` | Tracked format sample only (maps to section `portfolio-collage`) |

## Tooling

- `npm run content:validate` — all files under `content/` and `content-example/`
- `npm run content:status` — launch checklist vs homepage showcase
- `npm run content:upload` — dry-run by default; `--confirm` writes Firestore + updates `src/lib/content-manifest.json`

See `docs/runbooks/firebase.md` for deploying rules; upload requires owner approval and Admin env vars.
