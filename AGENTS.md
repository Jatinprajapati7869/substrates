<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep imported markup and interaction repairs in their TanStack route files and retain source CSS separately, so source structure and cascade remain comparable.
- Product data lives in `src/lib/catalog.json` (extracted from the imported site); product pages and AI recommendations read from it, so keep a single catalog source.
- Product detail routes use trailing-underscore unnesting (`templates_.$slug` and `sections_.$slug`) to preserve public URLs without mounting the captured listing pages as layouts.
- Guide articles use unnested `guides_.<slug>` routes with original captured article markup and separate source CSS, so listing links open complete articles without mounting the Guides index.
- Video demos and video pricing use unnested `videos_.<slug>` and `pricing_.videos` routes with source CSS retained; sample selection stays in each demo route so captured structure remains comparable.
- AI recommendations run in a server function with a same-category fallback, so product pages still show suggestions if AI fails.
- Homepage showcase groups (Webflow picks / Free sections / Framer templates) are the captured imported markup in `src/routes/index.tsx`, so homepage picks are changed in that markup, not in the catalog.
- Imported subpages get working cookie banner and phone menu via the shared useSupplyShell hook called in each route, so captured markup stays untouched.
- Visitor auth uses Firebase Auth (Google + email/password) with one root AccountProvider listener; profiles live in Firestore (`profiles/{uid}`) and are created on signup or first Google sign-in; the public signin route renders account/profile controls after sign-in.
- Sign-in validates its return URL and handles social/email callbacks on the public signin page before returning after session validation; free section copy intent travels in the section URL and reopens assistant choices without an automatic clipboard write.
- Stripe checkout records purchases in Firestore via the Admin SDK; server functions require a Firebase ID token. Catalog MCP at `/mcp` verifies Firebase ID tokens (metadata at `/.well-known/oauth-protected-resource`); tools read only the shared catalog, never private profiles or licensed source.
- Assistant copy destinations share validated reference-prompt generation; clipboard completion must be awaited before displaying success.
- Templates/Sections listings use the shared CatalogBrowser (reads catalog.json, favorites in localStorage 'supply-favorites' by product name) so search/filter/favorites stay in one place and match homepage hearts.
