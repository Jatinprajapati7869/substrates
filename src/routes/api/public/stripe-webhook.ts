import { createFileRoute } from "@tanstack/react-router";
import { getServerEnv } from "@/lib/env.server";
import { processStripeWebhook } from "@/lib/stripe-webhook.server";

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let secret: string;
        try {
          secret = getServerEnv("stripe").STRIPE_WEBHOOK_SECRET;
        } catch {
          return new Response("Not configured", { status: 503 });
        }
        const body = await request.text();
        const result = await processStripeWebhook(
          body,
          request.headers.get("stripe-signature"),
          secret,
        );
        return new Response(result.body, { status: result.status });
      },
    },
  },
});
