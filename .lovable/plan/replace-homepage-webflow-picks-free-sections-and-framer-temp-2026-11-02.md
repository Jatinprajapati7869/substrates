# Replace homepage Webflow picks, Free sections and Framer templates with new designs

## What you'll get
Three homepage groups rebuilt as a large editorial showcase, filled with brand-new original designs (not the imported ones).

- **Free sections** — 4 new original sections (e.g. pricing table, testimonial wall, feature bento, newsletter footer). Each is a real working mini page that opens as a live, clickable preview, with "Copy for Claude" still working.
- **Webflow picks** — 4 new original template concepts (e.g. architecture studio, coffee roaster, fintech app, photographer portfolio).
- **Framer templates** — 4 new original template concepts (e.g. AI startup, fashion label, event conference, personal blog).
- Every new item gets its own AI-generated preview image in the Oversight look (device on warm-gray surface, clean, no text), its own product page, and appears in "You may also like".

## Layout (large showcase)
```text
[ Group title ............................ View all -> ]
[ Big featured card (2/3 width)   ][ Tall card (1/3) ]
[ Card 1/2 width ][ Card 1/2 width ]
```
Large images, name + one-line description + platform tag + price, favorite and preview buttons kept. Stacks to one column on phones.

## Steps
1. Add the 12 new products to the product list (name, description, category, platform, price).
2. Generate 12 preview images (uses credits).
3. Build the 4 new section previews as small self-contained pages.
4. Replace the three homepage groups with the new showcase layout; keep favorites, preview dialog and copy menus working.
5. Check desktop and phone in the browser.

## Technical details
- New entries appended to `src/lib/catalog.json` (single catalog source) flagged `featured: true`; homepage reads them instead of hard-coded markup.
- Images in `src/assets/products/<slug>.jpg`, picked up by existing `productPhoto()`.
- Section pages in `public/section-previews/<slug>/index.html`, added to `LOCAL_SECTION_PREVIEWS`.
- New showcase component lives in the index route file; styles in `src/styles/site.css`.
