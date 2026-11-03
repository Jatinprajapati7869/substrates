import { createFileRoute } from "@tanstack/react-router";
import { getServerEnv } from "@/lib/env.server";
import { lemonSqueezyBillingProvider } from "@/lib/billing/lemonsqueezy-provider";
import {
  createDefaultBillingWebhookDeps,
  processBillingWebhook,
} from "@/lib/billing/process-webhook.server";

export const Route = createFileRoute("/api/public/lemonsqueezy-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let secret: string;
        try {
          secret = getServerEnv("lemonsqueezy").LEMONSQUEEZY_WEBHOOK_SECRET;
        } catch {
          return new Response("Not configured", { status: 503 });
        }
        const body = await request.text();
        const result = await processBillingWebhook(
          lemonSqueezyBillingProvider,
          body,
          request.headers.get("X-Signature"),
          secret,
          createDefaultBillingWebhookDeps(),
        );
        return new Response(result.body, { status: result.status });
      },
    },
  },
});
