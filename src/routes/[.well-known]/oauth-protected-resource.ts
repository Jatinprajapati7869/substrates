import { createFileRoute } from "@tanstack/react-router";
import { tanstackOAuthMetadataHandler } from "@/lib/mcp-server/handlers.server";

export const Route = createFileRoute("/.well-known/oauth-protected-resource")({
  server: {
    handlers: {
      ANY: tanstackOAuthMetadataHandler,
    },
  },
});
