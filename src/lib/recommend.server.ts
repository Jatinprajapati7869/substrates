import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { catalog, type Product } from "./catalog";

const MODEL = process.env["OPENAI_MODEL"] ?? "gpt-4o-mini";

export async function aiRelatedSlugs(product: Product, count: number): Promise<string[]> {
  const apiKey = process.env["OPENAI_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured");
  const provider = createOpenAI({ apiKey });
  const candidates = catalog
    .filter((p) => p.slug !== product.slug)
    .map((p) => `${p.kind}:${p.slug} | ${p.name} | ${p.category}${p.subcategory ? " / " + p.subcategory : ""} | ${p.description.slice(0, 140)}`)
    .join("\n");
  const result = streamText({
    model: provider(MODEL),
    system:
      "You recommend related website templates and sections from a catalog. Pick items a buyer of the given product would also like (similar industry, style or use). Reply with JSON only.",
    messages: [
      {
        role: "user",
        content: `Product: ${product.kind}:${product.slug} | ${product.name} | ${product.category} | ${product.description}\n\nCatalog (kind:slug | name | category | description):\n${candidates}\n\nReturn {"items": ["kind:slug", ...]} with exactly ${count} entries from the catalog.`,
      },
    ],
    maxRetries: 0,
  });
  const text = await result.text;
  const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) as { items?: unknown };
  return Array.isArray(json.items) ? json.items.filter((s): s is string => typeof s === "string") : [];
}
