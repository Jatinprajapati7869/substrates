import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Firestore } from "firebase-admin/firestore";
import type { EntitlementDoc } from "@/lib/entitlements.types";
import { FIXTURE_LEAK_MARKER, FIXTURE_PRODUCT_BODY } from "@/lib/delivery-fixtures.server";
import {
  deliverProductPromptWithDeps,
  type DeliverDeps,
  productDeliveryMetaWithDeps,
} from "@/lib/deliver-product-prompt.server";
import { unlockDocId } from "@/lib/spend-credit.server";
import { rebrandDeliveredBody } from "@/lib/delivery-content.server";
import { clearRateLimitStoreForTests } from "@/lib/rate-limit.server";
import { DELIVERY_RESPONSE_HEADERS } from "@/lib/delivery-headers.server";

type DocStore = Map<string, Record<string, unknown>>;

class MockRef {
  constructor(public path: string) {}
}

function mockDb(store: DocStore): Firestore {
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

function depsFromStore(store: DocStore): DeliverDeps {
  const db = mockDb(store);
  return {
    getEntitlement: async (userId) => {
      const data = store.get(`entitlements/${userId}`);
      return (data as EntitlementDoc | undefined) ?? null;
    },
    hasUnlock: async (userId, slug) => store.has(`unlocks/${unlockDocId(userId, slug)}`),
    getProductBody: async (docId) => {
      const data = store.get(`product_content/${docId}`);
      return typeof data?.["body"] === "string" ? (data["body"] as string) : null;
    },
    consumeRateLimit: () => true,
  };
}

describe("S8 deliverProductPrompt", () => {
  it("delivers entitled pro section with rebrand", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections",
          status: "active",
          sectionAccess: "pro",
          templateAccess: "credits",
          creditsRemaining: 1,
        } satisfies Partial<EntitlementDoc>,
      ],
      ["product_content/portfolio-jewelcase", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "section",
      "portfolio-jewelcase",
      "Cursor",
      depsFromStore(store),
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.text).toContain("In Cursor, apply the following rebuild specification");
      expect(result.text).toContain(FIXTURE_LEAK_MARKER);
      expect(result.text).not.toContain("Oversight Supply");
      expect(result.text).toContain("Substrates");
    }
  });

  it("rejects wrong plan for pro section", async () => {
    const store: DocStore = new Map([
      ["product_content/portfolio-jewelcase", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "section",
      "portfolio-jewelcase",
      "Cursor",
      depsFromStore(store),
    );
    expect(result).toEqual({ ok: false, code: "not_entitled" });
  });

  it("rejects unknown slug", async () => {
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "not-a-real-slug-xyz",
      "Cursor",
      depsFromStore(new Map()),
    );
    expect(result).toEqual({ ok: false, code: "unknown_product" });
  });

  it("rejects unknown assistant", async () => {
    const store: DocStore = new Map([
      ["entitlements/user-1", { plan: "sections", status: "active", sectionAccess: "pro" }],
      ["product_content/portfolio-jewelcase", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "section",
      "portfolio-jewelcase",
      "NotAnAssistant",
      depsFromStore(store),
    );
    expect(result).toEqual({ ok: false, code: "unknown_assistant" });
  });

  it("delivers template when unlock exists without active subscription", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections",
          status: "canceled",
          sectionAccess: "pro",
          templateAccess: "credits",
          creditsRemaining: 0,
        },
      ],
      [`unlocks/${unlockDocId("user-1", "daylight")}`, { userId: "user-1", slug: "daylight" }],
      ["product_content/daylight", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "Claude Code",
      depsFromStore(store),
    );
    expect(result.ok).toBe(true);
  });

  it("rejects template without credit or unlock", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections",
          status: "active",
          templateAccess: "credits",
          creditsRemaining: 2,
        },
      ],
      ["product_content/daylight", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "Cursor",
      depsFromStore(store),
    );
    expect(result).toEqual({ ok: false, code: "not_entitled" });
  });

  it("delivers template for lifetime without unlock doc", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "lifetime",
          status: "active",
          templateAccess: "all",
          unlimitedTemplates: true,
          creditsRemaining: null,
        },
      ],
      ["product_content/daylight", { body: FIXTURE_PRODUCT_BODY }],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "v0",
      depsFromStore(store),
    );
    expect(result.ok).toBe(true);
  });

  it("returns content_missing when Firestore body absent", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        { plan: "lifetime", status: "active", templateAccess: "all", unlimitedTemplates: true },
      ],
    ]);
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "Cursor",
      depsFromStore(store),
    );
    expect(result).toEqual({ ok: false, code: "content_missing" });
  });

  it("rate limits repeated delivery", async () => {
    clearRateLimitStoreForTests();
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        { plan: "lifetime", status: "active", templateAccess: "all", unlimitedTemplates: true },
      ],
      ["product_content/daylight", { body: "short body" }],
    ]);
    const base = depsFromStore(store);
    let count = 0;
    const deps: DeliverDeps = {
      ...base,
      consumeRateLimit: () => {
        count += 1;
        return count <= 1;
      },
    };
    const first = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "Cursor",
      deps,
    );
    const second = await deliverProductPromptWithDeps(
      "user-1",
      "template",
      "daylight",
      "Cursor",
      deps,
    );
    expect(first.ok).toBe(true);
    expect(second).toEqual({ ok: false, code: "rate_limited" });
  });

  it("free section uses reference_only gate", async () => {
    const result = await deliverProductPromptWithDeps(
      "user-1",
      "section",
      "signal",
      "Cursor",
      depsFromStore(new Map()),
    );
    expect(result).toEqual({ ok: false, code: "reference_only" });
  });

  it("rebrand helper replaces Oversight Supply", () => {
    expect(rebrandDeliveredBody("Hero — Oversight Supply")).toBe("Hero — Substrates");
  });

  it("delivery cache headers forbid shared caching", () => {
    expect(DELIVERY_RESPONSE_HEADERS["Cache-Control"]).toContain("no-store");
    expect(DELIVERY_RESPONSE_HEADERS.Vary).toBe("Authorization");
  });

  it("meta reflects unlock and credits for templates", async () => {
    const store: DocStore = new Map([
      [
        "entitlements/user-1",
        {
          plan: "sections-templates",
          status: "active",
          templateAccess: "credits",
          creditsRemaining: 2,
        },
      ],
    ]);
    const meta = await productDeliveryMetaWithDeps(
      "user-1",
      "template",
      "daylight",
      depsFromStore(store),
    );
    expect(meta?.canSpendCredit).toBe(true);
    expect(meta?.templateUnlocked).toBe(false);
    expect(meta?.creditsRemaining).toBe(2);
  });
});

describe("S8 fixture leak marker", () => {
  it("is not referenced from client route or component sources", () => {
    const roots = ["src/routes", "src/components"];
    const files: string[] = [];
    for (const root of roots) {
      const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
          const path = join(dir, name);
          if (statSync(path).isDirectory()) walk(path);
          else if (/\.(tsx|ts)$/.test(name)) files.push(path);
        }
      };
      walk(root);
    }
    for (const file of files) {
      expect(readFileSync(file, "utf8")).not.toContain(FIXTURE_LEAK_MARKER);
    }
  });
});
