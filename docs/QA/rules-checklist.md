# Firestore rules checklist (S6)

Automated `@firebase/rules-unit-testing` is **not** in this repo (adding it needs explicit approval). Run these steps manually with the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) before each rules change ships.

## Setup (once)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. From repo root: `firebase init emulators` (Firestore only) if `firebase.json` is not configured yet.
3. Start emulators: `firebase emulators:start --only firestore`
4. In the Emulator UI or with the REST API, create two test users (uid `user-a`, `user-b`) and obtain ID tokens (Auth emulator or custom tokens).

## S6 — purchases isolation

| Step | Action                                                        | Expected |
| ---- | ------------------------------------------------------------- | -------- |
| 1    | As **user-a**, read `purchases/{id}` where `userId == user-a` | Allow    |
| 2    | As **user-a**, read `purchases/{id}` where `userId == user-b` | Deny     |
| 3    | As **user-a**, create/update/delete any `purchases/*`         | Deny     |

## Profile billing fields (S6 / checkout hardening)

| Step | Action                                                               | Expected |
| ---- | -------------------------------------------------------------------- | -------- |
| 4    | As **user-a**, create `profiles/user-a` with `{ displayName: "A" }`  | Allow    |
| 5    | As **user-a**, update profile to set `stripeCustomerId: "cus_x"`     | Deny     |
| 6    | As **user-a**, create profile with `stripeCustomerId` on first write | Deny     |

## Entitlements and unlocks (read own only)

| Step | Action                                             | Expected |
| ---- | -------------------------------------------------- | -------- |
| 7    | As **user-a**, read `entitlements/user-a`          | Allow    |
| 8    | As **user-a**, read `entitlements/user-b`          | Deny     |
| 9    | As **user-a**, write any `entitlements/*`          | Deny     |
| 10   | As **user-a**, read `unlocks/user-a_template-slug` | Allow    |
| 11   | As **user-a**, read `unlocks/user-b_template-slug` | Deny     |
| 12   | As **user-a**, write any `unlocks/*`               | Deny     |

## Server-only collections

| Step | Action                                                                                  | Expected       |
| ---- | --------------------------------------------------------------------------------------- | -------------- |
| 13   | As **user-a**, read or write `product_content/any-slug`                                 | Deny           |
| 14   | As **user-a**, read or write `stripe_events/evt_1`                                      | Deny           |
| 15   | As **user-a**, read/write a random top-level collection not listed in `firestore.rules` | Deny (default) |

## Deploy

After emulator checks pass on the branch you merge:

```bash
firebase deploy --only firestore:rules
```

Confirm production rules match `firestore.rules` in the deployed commit.
