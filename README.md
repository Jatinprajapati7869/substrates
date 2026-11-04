# Substrates

Template and section marketplace — TanStack Start, Firebase Auth, Firestore, Stripe.

- **Site:** [https://substrates.app](https://substrates.app)
- **Support:** jatin@substrates.app
- **Repo:** you are here

## Develop

```bash
npm install
cp .env.example .env   # fill Firebase + Stripe
npm run dev            # http://localhost:8080
npm test
npm run build
npm run check:vendors   # fails if @lovable.dev or @supabase appears in package manifests
```

## Deploy

See [docs/runbooks/connectors-github-vercel-heroku.md](docs/runbooks/connectors-github-vercel-heroku.md) for GitHub → Vercel → domain → Stripe webhook.

Product context: [PRODUCT.md](PRODUCT.md). Project docs, workflow, and Cursor prompts: [docs/README.md](docs/README.md).
