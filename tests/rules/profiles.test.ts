import { describe, it } from "vitest";
import {
  USER_A,
  USER_B,
  assertFails,
  assertSucceeds,
  doc,
  getDoc,
  rulesTestEnvironment,
  setDoc,
  updateDoc,
} from "./helpers";

describe("Firestore rules — profiles", () => {
  it("denies unauthenticated read", async () => {
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "profiles", USER_A)));
  });

  it("allows owner read", async () => {
    await setDoc(
      doc(rulesTestEnvironment().authenticatedContext(USER_A).firestore(), "profiles", USER_A),
      { displayName: "A" },
    );
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertSucceeds(getDoc(doc(ctx.firestore(), "profiles", USER_A)));
  });

  it("denies cross-user read", async () => {
    await setDoc(
      doc(rulesTestEnvironment().authenticatedContext(USER_A).firestore(), "profiles", USER_A),
      { displayName: "A" },
    );
    const ctx = rulesTestEnvironment().authenticatedContext(USER_B);
    await assertFails(getDoc(doc(ctx.firestore(), "profiles", USER_A)));
  });

  it("allows owner create without billing fields", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertSucceeds(setDoc(doc(ctx.firestore(), "profiles", USER_A), { displayName: "A" }));
  });

  it("denies create with legacy stripeCustomerId", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(
      setDoc(doc(ctx.firestore(), "profiles", USER_A), {
        displayName: "A",
        stripeCustomerId: "cus_legacy",
      }),
    );
  });

  it("denies create on another user's profile doc", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "profiles", USER_B), { displayName: "B" }));
  });

  it("denies update on another user's profile doc", async () => {
    await setDoc(
      doc(rulesTestEnvironment().authenticatedContext(USER_B).firestore(), "profiles", USER_B),
      { displayName: "B" },
    );
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(
      updateDoc(doc(ctx.firestore(), "profiles", USER_B), { displayName: "Hacked" }),
    );
  });

  it("denies create with billingCustomerId", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(
      setDoc(doc(ctx.firestore(), "profiles", USER_A), {
        displayName: "A",
        billingCustomerId: "cus_x",
      }),
    );
  });

  it("allows owner update of allowed fields", async () => {
    const owner = rulesTestEnvironment().authenticatedContext(USER_A);
    await setDoc(doc(owner.firestore(), "profiles", USER_A), { displayName: "A" });
    await assertSucceeds(
      updateDoc(doc(owner.firestore(), "profiles", USER_A), { displayName: "A2" }),
    );
  });

  it("denies update that sets billingCustomerId", async () => {
    const owner = rulesTestEnvironment().authenticatedContext(USER_A);
    await setDoc(doc(owner.firestore(), "profiles", USER_A), { displayName: "A" });
    await assertFails(
      updateDoc(doc(owner.firestore(), "profiles", USER_A), {
        billingCustomerId: "cus_x",
      }),
    );
  });
});
