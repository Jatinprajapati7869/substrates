import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentReference,
} from "firebase/firestore";

export const RULES_PROJECT_ID = "demo-substrates-rules";

export const USER_A = "user-a";
export const USER_B = "user-b";

let testEnv: RulesTestEnvironment | undefined;

export async function initRulesTestEnvironment(): Promise<RulesTestEnvironment> {
  testEnv = await initializeTestEnvironment({
    projectId: RULES_PROJECT_ID,
    firestore: {
      rules: readFileSync(resolve(process.cwd(), "firestore.rules"), "utf8"),
    },
  });
  return testEnv;
}

export function rulesTestEnvironment(): RulesTestEnvironment {
  if (!testEnv) {
    throw new Error("Rules test environment not initialized");
  }
  return testEnv;
}

export async function resetRulesFirestore(): Promise<void> {
  await rulesTestEnvironment().clearFirestore();
}

export async function destroyRulesTestEnvironment(): Promise<void> {
  await testEnv?.cleanup();
  testEnv = undefined;
}

export async function seedDoc(path: string, data: Record<string, unknown>): Promise<void> {
  await rulesTestEnvironment().withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), path), data);
  });
}

export {
  assertFails,
  assertSucceeds,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentReference,
};
