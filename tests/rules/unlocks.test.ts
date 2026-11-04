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

describe("Firestore rules — unlocks", () => {
  const unlockA = `${USER_A}_template-slug`;
  const unlockB = `${USER_B}_template-slug`;

  it("denies unauthenticated read", async () => {
    await seedDoc(`unlocks/${unlockA}`, { slug: "template-slug" });
    const ctx = rulesTestEnvironment().unauthenticatedContext();
    await assertFails(getDoc(doc(ctx.firestore(), "unlocks", unlockA)));
  });

  it("allows owner read when doc id is uid prefix", async () => {
    await seedDoc(`unlocks/${unlockA}`, { slug: "template-slug" });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertSucceeds(getDoc(doc(ctx.firestore(), "unlocks", unlockA)));
  });

  it("denies read of another user's unlock doc id", async () => {
    await seedDoc(`unlocks/${unlockB}`, { slug: "template-slug" });
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(getDoc(doc(ctx.firestore(), "unlocks", unlockB)));
  });

  it("denies client write", async () => {
    const ctx = rulesTestEnvironment().authenticatedContext(USER_A);
    await assertFails(setDoc(doc(ctx.firestore(), "unlocks", unlockA), { slug: "x" }));
  });
});
