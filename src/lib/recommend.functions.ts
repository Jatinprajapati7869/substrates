import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { catalog, fallbackRelated, findProduct, type Product } from "./catalog";
import { consumeRecommendRateLimit } from "./recommend-rate-limit.server";

const recommendInput = z.object({
  kind: z.enum(["template", "section"]),
  slug: z.string().min(1).max(120),
});

export function assertCatalogProduct(input: { kind: Product["kind"]; slug: string }): Product {
  const data = recommendInput.parse(input);
  const product = findProduct(data.kind, data.slug);
  if (!product) throw new Error("Unknown product");
  return product;
}

/** Public seam for tests and the getRelatedProducts server function. */
export async function relatedProductsResponse(
  data: { kind: Product["kind"]; slug: string },
  request: Request,
): Promise<{ items: Product[]; ai: boolean }> {
  const product = assertCatalogProduct(data);

  if (!(await consumeRecommendRateLimit(request))) {
    return { items: fallbackRelated(product), ai: false };
  }

  try {
    const { aiRelatedSlugs } = await import("./recommend.server");
    const keys = await aiRelatedSlugs(product, 4);
    const items = keys
      .map((k) => {
        const [kind, slug] = k.split(":");
        return catalog.find((p) => p.kind === kind && p.slug === slug && p.slug !== product.slug);
      })
      .filter((p, i, arr): p is Product => !!p && arr.indexOf(p) === i)
      .slice(0, 4);
    if (items.length >= 2) return { items, ai: true };
  } catch (error) {
    console.error("AI recommendations failed", error);
  }
  return { items: fallbackRelated(product), ai: false };
}

export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((input: { kind: Product["kind"]; slug: string }) => {
    assertCatalogProduct(input);
    return recommendInput.parse(input);
  })
  .handler(async ({ data }) => relatedProductsResponse(data, getRequest()));
