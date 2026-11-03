import { createServerFn } from "@tanstack/react-start";
import { catalog, fallbackRelated, findProduct, type Product } from "./catalog";

export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((input: { kind: Product["kind"]; slug: string }) => input)
  .handler(async ({ data }) => {
    const product = findProduct(data.kind, data.slug);
    if (!product) return { items: [] as Product[], ai: false };
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
  });
