# Complete the site import

The homepage and all 250 product pages exist. These linked pages still show "Coming soon" and will be copied from supply.madebyoversight.com:

- Sections (/sections) and Templates (/templates) listing pages
- Pricing (/pricing)
- Videos (/videos) and Guides (/guides)
- Help (/help)
- Sign in (/signin)
- Privacy, Terms, Refunds (/privacy, /terms, /refunds)

## Approach
1. Import the 10 pages in one batch with the website importer; each gets its own page file and separate styles.
2. Make the shared menu, footer and cookie banner work on every new page (same fixes as the homepage).
3. Connect listing pages to the existing product pages, so cards open /templates/<name> and /sections/<name>; make any filter tabs on those listings work from the catalog.
4. Sign in: copy the look only; the form shows a "sign-in coming soon" message (no accounts unless you ask for them).
5. Pricing: buttons show the plans; no real payments unless requested.
6. Keep the "Coming soon" page for anything still unlinked.
7. Check every page on desktop and phone, and fix broken images or controls.

## Technical details
- Use site_import batch `urls`; new routes become src/routes/<slug>.tsx with CSS in src/styles/pages/<slug>.css.
- Interaction repairs stay inside each route file (project rule); product links read src/lib/catalog.json.
- Verify with Playwright at 1280x1800 and 390x844; build must be clean.
