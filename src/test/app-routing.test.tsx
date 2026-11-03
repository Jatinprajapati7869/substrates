import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { catalog, productPrice } from "@/lib/catalog";
import { readFileSync } from "node:fs";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("opens all four video demos and video pricing outside the captured listings", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const slug of ["kiln", "organic", "rays", "small-details"]) {
      const matches = router.matchRoutes(`/videos/${slug}`);
      expect(matches.at(-1)?.routeId).toBe(`/videos_/${slug}`);
      expect(matches.map(match => match.routeId)).not.toContain("/videos");
    }
    const pricing = router.matchRoutes("/pricing/videos");
    expect(pricing.at(-1)?.routeId).toBe("/pricing_/videos");
    expect(pricing.map(match => match.routeId)).not.toContain("/pricing");
  });
  it("opens all 19 listed guides outside the Guides listing and placeholder", () => {
    const listing = readFileSync("src/routes/guides.tsx", "utf8");
    const paths = [...listing.matchAll(/href="(\/guides\/[^" ]+)"/g)].flatMap(match => match[1] ? [match[1]] : []);
    expect(new Set(paths).size).toBe(19);
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of paths) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).toBe(path.replace("/guides/", "/guides_/"));
      expect(matches.map(match => match.routeId)).not.toContain("/guides");
      expect(matches.at(-1)?.routeId).not.toBe("/$");
    }
  });
  it("opens every catalog product outside the listing page layout", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const product of catalog) {
      const prefix = product.kind === "template" ? "templates" : "sections";
      const matches = router.matchRoutes(`/${prefix}/${product.slug}`);
      expect(matches.at(-1)?.routeId).toBe(`/${prefix}_/$slug`);
      expect(matches.map(m => m.routeId)).not.toContain(`/${prefix}`);
    }
  });
  it("uses source prices and does not call Pro sections free", () => {
    const daylight = catalog.find(p => p.kind === "template" && p.slug === "daylight");
    const pro = catalog.find(p => p.kind === "section" && p.slug === "portfolio-jewelcase");
    const free = catalog.find(p => p.kind === "section" && p.slug === "signal");
    expect(daylight).toBeDefined(); expect(pro).toBeDefined(); expect(free).toBeDefined();
    if (!daylight || !pro || !free) throw new Error("Catalog fixtures missing");
    expect(productPrice(daylight)).toBe(`$${daylight.priceUsd}`);
    expect(productPrice(pro)).toBe("Included with Pro membership");
    expect(productPrice(free)).toBe("Free");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
