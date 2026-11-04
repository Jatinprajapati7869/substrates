import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { catalog, findProduct } from "@/lib/catalog";
import {
  countCatalogTemplates,
  countDeliverableTemplates,
  isDeliverable,
  planCheckoutShowsTemplateAvailability,
  templateAvailabilitySummaryLine,
} from "@/lib/content-manifest";
import { filterProducts } from "@/components/CatalogBrowser";
import { templateCheckoutGate } from "@/lib/checkout.functions";
import { spendCreditTransaction } from "@/lib/spend-credit.server";
import { productPageHead } from "@/lib/seo";
import { ProductComingSoonActions } from "@/components/ProductComingSoonActions";
import { ProductDeliveryActions } from "@/components/ProductDeliveryActions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("P32 isDeliverable", () => {
  it("is false for catalog slugs not in the manifest", () => {
    expect(isDeliverable("daylight")).toBe(false);
    expect(countDeliverableTemplates()).toBe(0);
    expect(countCatalogTemplates()).toBeGreaterThan(0);
    expect(templateAvailabilitySummaryLine()).toMatch(/^0 of \d+ templates available now$/);
  });
});

describe("P32 filterProducts available now", () => {
  it("returns nothing when availableOnly is on and manifest is empty", () => {
    const templates = catalog.filter((p) => p.kind === "template");
    const all = filterProducts(templates, {
      query: "",
      category: "",
      platform: "",
      savedOnly: false,
      availableOnly: false,
      favorites: [],
    });
    const filtered = filterProducts(templates, {
      query: "",
      category: "",
      platform: "",
      savedOnly: false,
      availableOnly: true,
      favorites: [],
    });
    expect(all.length).toBeGreaterThan(0);
    expect(filtered).toHaveLength(0);
  });
});

describe("P32 spendCreditTransaction", () => {
  it("rejects non-deliverable slug without spending credits", async () => {
    const store = new Map<string, Record<string, unknown>>([
      [
        "entitlements/user-1",
        {
          plan: "sections-templates",
          creditsRemaining: 2,
          templateAccess: "credits",
          unlimitedTemplates: false,
          status: "active",
        },
      ],
    ]);
    const db = {
      collection(name: string) {
        return {
          doc(id: string) {
            return { path: `${name}/${id}` };
          },
        };
      },
      runTransaction(fn: (tx: unknown) => Promise<unknown>) {
        const tx = {
          async get(ref: { path: string }) {
            const data = store.get(ref.path);
            return { exists: data !== undefined, data: () => data };
          },
          set(ref: { path: string }, data: Record<string, unknown>) {
            store.set(ref.path, data as never);
          },
        };
        return fn(tx);
      },
    };
    const result = await spendCreditTransaction(db as never, "user-1", "daylight");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("not_available_yet");
    expect(store.get("entitlements/user-1")?.["creditsRemaining"]).toBe(2);
    expect(store.has("unlocks/user-1_daylight")).toBe(false);
  });
});

describe("P32 template checkout gate", () => {
  it("blocks checkout before billing for non-deliverable templates", () => {
    expect(templateCheckoutGate("daylight")).toBe("not_available_yet");
  });
});

describe("P32 product UI coming soon", () => {
  it("renders disabled Coming soon on cards/actions", () => {
    render(<ProductComingSoonActions />);
    const btn = screen.getByRole("button", { name: "Coming soon" });
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("ProductDeliveryActions shows Coming soon for undeliverable template", () => {
    const product = findProduct("template", "daylight");
    expect(product).toBeTruthy();
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={client}>
        <ProductDeliveryActions product={product!} />
      </QueryClientProvider>,
    );
    expect(screen.getByRole("button", { name: "Coming soon" }).hasAttribute("disabled")).toBe(true);
    expect(screen.queryByRole("button", { name: /Unlock/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /Get template/i })).toBeNull();
  });
});

describe("P32 non-deliverable product pages stay public", () => {
  it("keeps indexable head metadata for a gated template", () => {
    const product = findProduct("template", "daylight");
    expect(product).toBeTruthy();
    const head = productPageHead(product!, "/templates/daylight");
    expect(JSON.stringify(head)).toMatch(/daylight/i);
    expect(JSON.stringify(head)).toMatch(/title/i);
  });
});

describe("P32 checkout summary availability", () => {
  it("shows availability line only for lifetime plan checkout", () => {
    expect(planCheckoutShowsTemplateAvailability("lifetime")).toBe(true);
    expect(planCheckoutShowsTemplateAvailability("sections")).toBe(false);
  });
});
