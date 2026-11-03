import { createFileRoute } from "@tanstack/react-router";
import { buildHealthPayload } from "@/lib/health.server";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: () => {
        const body = buildHealthPayload();
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      },
    },
  },
});
