# Finish the imported Oversight Supply homepage

Make the remaining controls on the homepage work, keeping the page's current look.

## What gets fixed
1. **Live previews**: the section cards play their preview (video or animated image) on hover/focus and pause when you move away. The full preview window opens and plays.
2. **Filters**: the category and price filters (e.g. "Free") narrow the grid of section cards in place, with a "clear" option and an empty-state message.
3. **Favorites**: the heart button on each card toggles on/off and stays saved in this browser.
4. **Copy menus**: every "Copy Section" menu opens, closes on outside click/Escape, and each tool option (Claude Code, Cursor, Windsurf, v0, Bolt, Lovable, Replit) copies a prompt to the clipboard with a "Copied" confirmation. The original's sign-in requirement is shown as a note, not a blocker.
5. **Feedback**: the feedback form validates the message and shows a thank-you confirmation (stored only in this browser, nothing is sent).
6. **Linked pages**: links to pages that weren't imported (section details, pricing, etc.) go to a simple "Coming soon" page with a link back home instead of a broken page.

## Not included
Real sign-in, payments, sending feedback anywhere, or importing other pages of the site. These can be done next if you want them.

## Technical details
- All repairs stay in `src/routes/index.tsx`; original captured CSS remains untouched.
- Favorites/feedback use localStorage read in `useEffect` (hydration-safe).
- Add a catch-all `src/routes/$.tsx` placeholder page with its own head metadata.
- Verify with Playwright at desktop and phone sizes.
