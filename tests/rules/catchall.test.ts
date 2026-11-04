import { describe, it } from "vitest";
import { USER_A, assertFails, doc, getDoc, rulesTestEnvironment, setDoc } from "./helpers";

describe("Firestore rules — default deny", () => {
  it("denies unauthenticated read on unknown collection", async () => {
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "widgets", "w1")));
  });

  it("denies authenticated read on unknown collection", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "widgets", "w1")));
  });

  it("denies authenticated write on unknown collection", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "widgets", "w1"), { x: 1 }));
  });
});
