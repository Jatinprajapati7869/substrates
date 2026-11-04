import { describe, expect, it } from "vitest";
import type { Firestore } from "firebase-admin/firestore";
import type { EntitlementDoc } from "@/lib/entitlements.types";
import { spendCreditTransaction, unlockDocId } from "@/lib/spend-credit.server";

type DocStore = Map<string, Record<string, unknown>>;

class MockRef {
  constructor(public path: string) {}
}

function mockDb(initial: DocStore): Firestore {
  const store = initial;
  const db = {
    collection(name: string) {
      return {
        doc(id: string) {
          return new MockRef(`${name}/${id}`);
        },
        where() {
          return this;
        },
        limit() {
          return this;
        },
        get: async () => ({ empty: true, docs: [] }),
      };
    },
    runTransaction(fn: (tx: unknown) => Promise<unknown>) {
      const tx = {
        async get(ref: MockRef) {
          const data = store.get(ref.path);
          return { exists: data !== undefined, data: () => data };
        },
        set(ref: MockRef, data: Record<string, unknown>, opts?: { merge?: boolean }) {
          if (opts?.merge && store.has(ref.path)) {
            store.set(ref.path, { ...store.get(ref.path), ...data });
          } else {
            store.set(ref.path, data);
          }
        },
      };
      return fn(tx);
    },
  };
  return db as unknown as Firestore;
}

describe("S19 spendCredit transaction", () => {
  it("S19 rejects zero credits", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections",
          creditsRemaining: 0,
          templateAccess: "credits",
          unlimitedTemplates: false,
        } satisfies Partial<EntitlementDoc>,
      ],
    ]);
    const result = await spendCreditTransaction(mockDb(store), "user-1", "daylight");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("no_credits");
  });

  it("S19 double spend is idempotent", async () => {
    const unlockPath = `unlocks/${unlockDocId("user-1", "daylight")}`;
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections-templates",
          creditsRemaining: 2,
          templateAccess: "credits",
          unlimitedTemplates: false,
        },
      ],
      [unlockPath, { userId: "user-1", slug: "daylight", source: "credit" }],
    ]);
    const result = await spendCreditTransaction(mockDb(store), "user-1", "daylight");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.alreadyUnlocked).toBe(true);
  });

  it("S19 lifetime unlocks without spending credits", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "lifetime",
          creditsRemaining: null,
          templateAccess: "all",
          unlimitedTemplates: true,
        },
      ],
    ]);
    const result = await spendCreditTransaction(mockDb(store), "user-1", "daylight");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.creditsRemaining).toBeNull();
      expect(store.get(`unlocks/${unlockDocId("user-1", "daylight")}`)?.["source"]).toBe(
        "lifetime",
      );
    }
  });

  it("S19 rejects refunded entitlements", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "lifetime",
          status: "refunded",
          creditsRemaining: null,
          templateAccess: "all",
          unlimitedTemplates: true,
        },
      ],
    ]);
    const result = await spendCreditTransaction(mockDb(store), "user-1", "daylight");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("no_entitlement");
  });
});
