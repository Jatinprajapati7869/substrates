import { describe, expect, it } from "vitest";
import { findProduct } from "@/lib/catalog";
import {
  absoluteUrl,
  buildRobotsTxt,
  buildSitemapXml,
  collectSitemapPaths,
  productPageHead,
} from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/brand";

describe("sitemap", () => {
  it("lists a known catalog slug and excludes /api/", () => {
    const paths = collectSitemapPaths();
    expect(paths).toContain("/templates/aerials");
    expect(paths.some((p) => p.startsWith("/api"))).toBe(false);
    expect(paths).not.toContain("/signin");
  });

  it("builds valid xml with production origin", () => {
    const xml = buildSitemapXml(["/templates/aerials"]);
    expect(xml).toContain(`${SITE_ORIGIN}/templates/aerials`);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });
});

describe("robots.txt", () => {
  it("allows crawl, disallows api and signin, references sitemap", () => {
    const body = buildRobotsTxt();
    expect(body).toMatch(/Allow:\s*\//);
    expect(body).toContain("Disallow: /api/");
    expect(body).toContain("Disallow: /signin");
    expect(body).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
  });
});

describe("product page head", () => {
  it("includes canonical and open graph tags", () => {
    const product = findProduct("template", "aerials");
    expect(product).toBeTruthy();
    const head = productPageHead(product!, "/templates/aerials");
    expect(head.links).toEqual([{ rel: "canonical", href: absoluteUrl("/templates/aerials") }]);
    const canonical = head.links?.[0]?.href;
    expect(canonical).toBe("https://substrates.app/templates/aerials");

    const titles = head.meta?.filter((m) => "property" in m && m.property === "og:title");
    expect(titles?.length).toBeGreaterThan(0);
    expect(head.meta?.some((m) => "property" in m && m.property === "og:image")).toBe(true);
    expect(head.meta?.some((m) => "name" in m && m.name === "twitter:card")).toBe(true);
    expect(head.scripts?.[0]?.type).toBe("application/ld+json");
    const json = JSON.parse(String(head.scripts?.[0]?.children));
    expect(json.name).toBe("Aerials");
    expect(json["@type"]).toBe("Product");
    expect(json.aggregateRating).toBeUndefined();
  });
});
