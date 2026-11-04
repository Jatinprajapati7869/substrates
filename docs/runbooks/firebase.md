# Firebase production runbook

Firestore **Auth** and **Firestore** for Substrates. The Node app runs on **Heroku** (not Firebase Hosting). See `docs/ARCHITECTURE.md` and `docs/runbooks/heroku.md`.

## Spark plan (free tier)

1. [Firebase console](https://console.firebase.google.com/) → **Add project** (production name of your choice).
2. Stay on the **Spark** (no-cost) plan unless you need Blaze-only features. Quotas and limits are published by Google; start here:
   - [Firestore quotas and limits](https://firebase.google.com/docs/firestore/quotas)
   - [Spark plan usage limits](https://firebase.google.com/pricing) (see Firestore daily read/write/delete caps on Spark — if numbers differ in your console, **trust the console**)
3. **Authentication** → **Sign-in method** → enable **Google** and **Email/Password**.

## Web app config (client)

Project settings → **Your apps** → Web app → copy into Heroku config vars (and local `.env`):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Server Admin SDK (never in the browser):

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (PEM; on Heroku use `\n` in one line or multiline config var)

## Authorized domains

Authentication → **Settings** → **Authorized domains** → add:

- `substrates.app`
- `www.substrates.app`
- Your Heroku app hostname (e.g. `substrates-production.herokuapp.com`)
- `localhost` (local dev)

## Firestore rules — deploy (operator)

Automated tests live in `tests/rules/` (`npm run test:rules`). **Requires JDK 21+** (current `firebase-tools`); install [Eclipse Temurin 21](https://adoptium.net/).

After tests pass on the branch you merge:

```bash
npm ci
npm run test:rules
firebase login
firebase use <your-production-project-id>
firebase deploy --only firestore:rules
```

Confirm production rules match `firestore.rules` at the deployed Git commit.

**Agents do not deploy rules** without explicit owner approval.

## When Spark quota is hit

Symptoms: client or server Firestore calls fail with **resource-exhausted** / quota errors in logs or browser console.

1. Open Firebase console → **Firestore** → **Usage** (and project **Usage and billing**) to see which limit fired.
2. Short term: stop non-essential reads (heavy listing pages, runaway client listeners), pause load tests, fix retry loops.
3. Medium term: optimize hot paths (cache catalog server-side, avoid N+1 profile reads), add pagination.
4. Long term: move to **Blaze** (pay-as-you-go) if production traffic exceeds Spark caps — plan with owner before upgrading.

Document the incident in your ops notes; no automatic billing change from this repo.

## Local rules tests

```powershell
# Java required: https://adoptium.net/
npm run test:rules
```

Uses `firebase emulators:exec --only firestore` and Vitest (`vitest.rules.config.ts`). Default `npm test` does **not** run rules tests (emulator + Java).

## CI

GitHub Actions job **`firestore-rules`** runs `npm run test:rules` with Temurin **Java 21**. Mark that job **required** in branch protection on `main` (human step — see `docs/WORKFLOW.md`).

## Not verified by this repo (human)

- Rules file deployed to the production Firebase project
- Auth providers enabled on the live project
- Authorized domains saved in production console
