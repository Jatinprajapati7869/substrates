import { createFileRoute } from "@tanstack/react-router";
import { buildSitemapXml, collectSitemapPaths } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemapXml(collectSitemapPaths()), {
          status: 200,
          headers: { "content-type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
