# Firestore rules checklist (S6)

**Automated:** `npm run test:rules` (Firestore emulator + `@firebase/rules-unit-testing`). Tests live under `tests/rules/` — one file per collection in `firestore.rules`. CI job: **`firestore-rules`** in `.github/workflows/ci.yml`.

**Requires Java (JDK 21+)** for the emulator (`firebase-tools` requirement). Default `npm test` does not run rules tests.

## Run locally

```bash
npm run test:rules
```

If Java is missing, the command fails with a JVM error — install [Eclipse Temurin](https://adoptium.net/) and retry.

## What the tests cover

| Area | File | Allow | Deny |
| ---- | ---- | ----- | ---- |
| Profiles (owner read/create/update; no `billingCustomerId`; no cross-user read) | `profiles.test.ts` | ✓ | ✓ |
| Purchases (read own by `userId`; no client write) | `purchases.test.ts` | ✓ | ✓ |
| Entitlements (owner read only) | `entitlements.test.ts` | ✓ | ✓ |
| Unlocks (read own doc id prefix; no write) | `unlocks.test.ts` | ✓ | ✓ |
| `product_content` (no client access) | `product_content.test.ts` | — | ✓ |
| `billing_processed_events` (no client access) | `billing_processed_events.test.ts` | — | ✓ |
| Default deny on unknown paths | `catchall.test.ts` | — | ✓ |

Each collection rule includes at least one **allow** test where the rules permit access, and **deny** tests elsewhere. Every file includes an **unauthenticated read denied** case where reads exist in rules.

## Manual spot-check (optional)

Use the [Emulator UI](https://firebase.google.com/docs/emulator-suite) only if debugging a failing test. Normal workflow: fix `firestore.rules`, run `npm run test:rules`, merge, then deploy (see below).

## Deploy (production)

After automated tests pass on the branch you merge:

```bash
firebase deploy --only firestore:rules
```

See **`docs/runbooks/firebase.md`** for project setup, authorized domains, Spark quotas, and quota exhaustion.

Confirm production rules match `firestore.rules` in the deployed commit.

## Branch protection (human)

In GitHub → **Settings** → **Branches** → protection on `main`: require status check **`firestore-rules`** (in addition to **`verify`**).
