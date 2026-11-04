import { describe, it } from "vitest";
import {
  USER_A,
  USER_B,
  assertFails,
  assertSucceeds,
  doc,
  getDoc,
  rulesTestEnvironment,
  seedDoc,
  setDoc,
} from "./helpers";

describe("Firestore rules — entitlements", () => {
  it("denies unauthenticated read", async () => {
    await seedDoc(`entitlements/${USER_A}`, { plan: "sections" });
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "entitlements", USER_A)));
  });

  it("allows owner read", async () => {
    await seedDoc(`entitlements/${USER_A}`, { plan: "sections" });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertSucceeds(getDoc(doc(ctx.firestore(), "entitlements", USER_A)));
  });

  it("denies cross-user read", async () => {
    await seedDoc(`entitlements/${USER_B}`, { plan: "sections" });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "entitlements", USER_B)));
  });

  it("denies client write", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "entitlements", USER_A), { plan: "lifetime" }));
  });
});
