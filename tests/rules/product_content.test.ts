import { describe, it } from "vitest";
import { USER_A, assertFails, doc, getDoc, rulesTestEnvironment, seedDoc, setDoc } from "./helpers";

describe("Firestore rules — product_content", () => {
  it("denies unauthenticated read", async () => {
    await seedDoc("product_content/collage", { body: "secret" });
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "product_content", "collage")));
  });

  it("denies authenticated read", async () => {
    await seedDoc("product_content/collage", { body: "secret" });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "product_content", "collage")));
  });

  it("denies authenticated write", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "product_content", "collage"), { body: "x" }));
  });
});
