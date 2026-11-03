import { createFileRoute } from "@tanstack/react-router";
import { recordSession, verifyStripeSignature } from "@/lib/stripe.server";

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_WEBHOOK_SECRET"];
        if (!secret) return new Response("Not configured", { status: 503 });
        const body = await request.text();
        if (!(await verifyStripeSignature(body, request.headers.get("stripe-signature"), secret))) {
          return new Response("Invalid signature", { status: 401 });
        }
        const event = JSON.parse(body) as { type: string; data: { object: any } };
        if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
          await recordSession(event.data.object);
        }
        return new Response("ok");
      },
    },
  },
});
