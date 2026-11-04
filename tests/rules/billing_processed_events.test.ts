import { describe, it } from "vitest";
import { USER_A, assertFails, doc, getDoc, rulesTestEnvironment, seedDoc, setDoc } from "./helpers";

describe("Firestore rules — billing_processed_events", () => {
  it("denies unauthenticated read", async () => {
    await seedDoc("billing_processed_events/evt_1", { at: 1 });
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "billing_processed_events", "evt_1")));
  });

  it("denies authenticated read", async () => {
    await seedDoc("billing_processed_events/evt_1", { at: 1 });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "billing_processed_events", "evt_1")));
  });

  it("denies authenticated write", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "billing_processed_events", "evt_1"), { at: 1 }));
  });
});
