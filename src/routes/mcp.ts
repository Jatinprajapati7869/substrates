import { createFileRoute } from "@tanstack/react-router";
import { tanstackMcpHandler } from "@/lib/mcp-server/handlers.server";

export const Route = createFileRoute("/mcp")({
  server: {
    handlers: {
      ANY: tanstackMcpHandler,
    },
  },
});
