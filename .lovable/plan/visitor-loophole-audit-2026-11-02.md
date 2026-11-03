# Visitor loophole audit

Go through the whole site as a real visitor would, on desktop and phone, and write up every gap, broken promise or way the site could be misused.

## What gets tested
1. **Homepage**: every button, menu, copy option, favorite heart, preview, feedback form and cookie banner.
2. **Templates and Sections**: search, filters, saved-only view, product links, empty results, and very long or odd search text.
3. **Product pages**: price, photo, description, live preview, "You may also like" links, plus made-up product addresses.
4. **Pricing**: whether the buy buttons look like they charge but don't, and any way to reach paid content without paying.
5. **Sign in**: sign-up, wrong passwords, weak passwords, password reset, profile editing (including oversized or script-like text), sign-out, and whether one visitor can see another's profile.
6. **Other pages** (Guides, Videos, Help, Privacy, Terms, Refunds): dead links, "Coming soon" dead ends, copy that's wrong or contradicts itself.
7. **Security checks**: database access rules, the assistant catalog connection when signed out, and an automated security scan.

## What you get
A report grouped by severity (critical / high / medium / low). Each item says what a visitor can do, where it happens and what to fix. No changes are made until you choose what to fix.

## Technical details
- Playwright at 1280x1800 and 390x844, with screenshots of each problem.
- A temporary test account, deleted at the end.
- Database linter, security scan, a check that each person can only see their own profile, and a check that the assistant connection rejects visitors who aren't signed in.
