import { describe, it } from "vitest";
import {
  USER_A,
  USER_B,
  assertFails,
  assertSucceeds,
  deleteDoc,
  doc,
  getDoc,
  rulesTestEnvironment,
  seedDoc,
  setDoc,
  updateDoc,
} from "./helpers";

describe("Firestore rules — purchases", () => {
  it("denies unauthenticated read", async () => {
    await seedDoc("purchases/p1", { userId: USER_A });
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "purchases", "p1")));
  });

  it("allows owner read when userId matches auth", async () => {
    await seedDoc("purchases/p1", { userId: USER_A, amount: 100 });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertSucceeds(getDoc(doc(ctx.firestore(), "purchases", "p1")));
  });

  it("denies read when userId field is missing", async () => {
    await seedDoc("purchases/p1", { amount: 100 });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "purchases", "p1")));
  });

  it("denies read when userId is another user", async () => {
    await seedDoc("purchases/p1", { userId: USER_B });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "purchases", "p1")));
  });

  it("denies client create", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "purchases", "new"), { userId: USER_A }));
  });

  it("denies client update", async () => {
    await seedDoc("purchases/p1", { userId: USER_A });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(updateDoc(doc(ctx.firestore(), "purchases", "p1"), { userId: USER_A }));
  });

  it("denies client delete", async () => {
    await seedDoc("purchases/p1", { userId: USER_A });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(deleteDoc(doc(ctx.firestore(), "purchases", "p1")));
  });
});
