import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/recommend-rate-limit.server", () => ({
  consumeRecommendRateLimit: vi.fn(),
}));

vi.mock("@/lib/recommend.server", () => ({
  aiRelatedSlugs: vi.fn(),
}));

import { consumeRecommendRateLimit } from "@/lib/recommend-rate-limit.server";
import { aiRelatedSlugs } from "@/lib/recommend.server";
import { assertCatalogProduct, relatedProductsResponse } from "@/lib/recommend.functions";

describe("relatedProductsResponse", () => {
  beforeEach(() => {
    vi.mocked(consumeRecommendRateLimit).mockReset();
    vi.mocked(aiRelatedSlugs).mockReset();
    vi.mocked(consumeRecommendRateLimit).mockResolvedValue(true);
    vi.mocked(aiRelatedSlugs).mockResolvedValue(["section:signal", "section:orbit"]);
  });

  it("S14 rejects unknown catalog slugs before OpenAI", () => {
    expect(() => assertCatalogProduct({ kind: "template", slug: "not-in-catalog-xyz" })).toThrow(
      /Unknown product/,
    );
    expect(aiRelatedSlugs).not.toHaveBeenCalled();
  });

  it("S14 returns same-category fallback when rate limited", async () => {
    vi.mocked(consumeRecommendRateLimit).mockResolvedValue(false);
    const result = await relatedProductsResponse(
      { kind: "template", slug: "daylight" },
      new Request("http://127.0.0.1/templates/daylight"),
    );
    expect(result.ai).toBe(false);
    expect(result.items.length).toBeGreaterThan(0);
    expect(aiRelatedSlugs).not.toHaveBeenCalled();
  });
});
