# Performance and accessibility (P17)

Recorded **2026-11-03** on Windows, built Nitro server (`node .output/server/index.mjs`, port **8765**), placeholder `VITE_FIREBASE_*` only.

## Lighthouse CLI

| Item                                      | Result                                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `lighthouse` on PATH                      | **Not installed**                                                                                   |
| `npx lighthouse`                          | **Failed** — `No Chrome installations found` (stable Chrome not present; DevTools MCP reports same) |
| Mobile performance / accessibility scores | **Not captured**                                                                                    |
| LCP (lab)                                 | **Not captured**                                                                                    |

**Could not run:** Google Lighthouse or PageSpeed lab metrics against localhost without a Chromium install. Re-run on a machine with Chrome using:

```bash
node .output/server/index.mjs   # PORT=8765
npx lighthouse http://127.0.0.1:8765/ --form-factor=mobile --screenEmulation.mobile --only-categories=performance,accessibility --output=json
```

Repeat for `/templates`, `/sections`, `/pricing`, `/templates/aerials`, `/signin`.

## Proxy metrics (built server, cold SSR)

Full-document `Invoke-WebRequest` time includes first-hit compile; use for trend only, not production SLA.

| Page         | Before (ms) | After (ms) | HTML bytes before | HTML bytes after |
| ------------ | ----------: | ---------: | ----------------: | ---------------: |
| `/`          |       16621 |      23929 |            200481 |           200531 |
| `/templates` |       21829 |      16723 |            157907 |           157907 |
| `/pricing`   |       19464 |      19936 |            190964 |           190964 |

After = P17 build on port 8766 (second cold start; variance dominates — compare HTML size, not ms). `/` gained +50 B from `width`/`height` on hero JPG.

## Largest static images (repo `public/site-assets/`)

Sizes on disk for the heaviest assets referenced on key routes (CDN catalog thumbs on `/templates` and product pages are **not** in repo).

| Asset                   |    KB | Routes                            | P17 change                                                                         |
| ----------------------- | ----: | --------------------------------- | ---------------------------------------------------------------------------------- |
| `b20b3900aa8e76f7.jpg`  | 723.8 | `/` hero stack, homepage showcase | `width`/`height` 640×400; already `loading="lazy"`; **no WebP sibling** — kept JPG |
| `adef9145afaf21d6.webp` | 368.0 | `/sections` card                  | `width`/`height` 640×400; already WebP + lazy                                      |
| `99635933ce7a7ab4.webp` |  33.9 | `/` hero stack                    | unchanged (under 300 KB)                                                           |
| `5ee6ef4b5d3a5a80.webp` |  72.3 | `/`, `/pricing`, `/signin` decor  | unchanged                                                                          |
| `84cb0b3d02e2b143.webp` |   ~45 | `/signin` decor                   | unchanged                                                                          |

**Top five by weight on `/`:** `b20b3900aa8e76f7.jpg`, `5ee6ef4b5d3a5a80.webp`, `99635933ce7a7ab4.webp`, plus smaller stack webps.

**Over 300 KB in repo:** only **`b20b3900aa8e76f7.jpg`** and **`adef9145afaf21d6.webp`** on these routes. No new image-processing dependency; JPG not converted (no equivalent WebP in tree).

## Accessibility fixes (local, non-captured UI)

| Area                      | Fix                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `CheckoutSummaryProvider` | Preview `alt={item.name}`; `width`/`height`; figcaption/caption token → `text-muted-foreground` |
| `AccountDashboardPanel`   | Unlock thumb `alt={name}`; billing button `aria-busy`                                           |
| Global shadcn             | `Button` already `focus-visible:ring`; account/checkout use shadcn `Button`                     |

## Captured markup — not changed (backlog)

Do **not** edit without an import/regen prompt:

- `/`, `/pricing`, `/sections`, `/signin`: decorative collage `<img alt="">` inside `aria-hidden` regions — acceptable if parent hidden; empty alts on marketing stacks remain.
- `--text-tertiary` (#8a8a8a) in imported `src/styles/pages/*.css` — fails AA on small text; fix needs token pass on captured CSS bundles, not one-off route edits.
- Product grid cards in captured listing markup: missing explicit dimensions on many `/site-assets/*.webp` thumbs.
- `/templates/aerials` hero/preview images from **Webflow CDN** — size and format out of repo scope.

## Impeccable audit — P12 / P13 components

Scores 0–4 per Impeccable audit rubric; judgement on Operate-mode account/checkout surfaces.

| Dimension                |     Score | Notes                                                                                                                                                                       |
| ------------------------ | --------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility            |         3 | Named preview/unlock images; dialog title/description; `role="alert"` on checkout error; billing `aria-busy`. Copy-for-assistant buttons have visible text (not icon-only). |
| Performance              |         3 | Checkout previews lazy-loaded with dimensions; catalog images still CDN-sized.                                                                                              |
| Theming                  |         3 | Uses `border-line`, `bg-surface`, shadcn tokens; one caption moved off low-contrast tertiary token.                                                                         |
| Responsive               |         3 | Checkout dialog scrolls `max-h-[90vh]`; account stacks on narrow widths.                                                                                                    |
| Implementation integrity |         4 | Single-purpose modules; tests in `account-dashboard-ui.test.tsx`.                                                                                                           |
| **Total**                | **16/20** | **Good** — polish captured pages separately (P18+).                                                                                                                         |

### Residual P12/P13 issues

- Checkout preview grid: three-column thumbs may be tight on very small viewports (acceptable for modal).
- Multiple “Copy for {assistant}” buttons per row — verbose but named; consider menu in a future Operate pass (not P17).

## Verification (P17)

| Command             | Result                             |
| ------------------- | ---------------------------------- |
| `npm test`          | **98 passed** (2026-11-03)         |
| `npm run build`     | **OK**                             |
| `npm run lint`      | Often hangs on Windows (see P01)   |
| `npm run typecheck` | Pre-existing debt unrelated to P17 |
