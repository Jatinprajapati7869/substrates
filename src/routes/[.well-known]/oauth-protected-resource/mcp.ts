import { createFileRoute } from "@tanstack/react-router";
import { tanstackOAuthMetadataHandler } from "@/lib/mcp-server/handlers.server";

export const Route = createFileRoute("/.well-known/oauth-protected-resource/mcp")({
  server: {
    handlers: {
      ANY: tanstackOAuthMetadataHandler,
    },
  },
});
