import { resolveStripeCustomerId } from "@/lib/purchases.server";
import { createBillingPortalSession } from "@/lib/stripe.server";

export async function createBillingPortalUrl(userId: string, returnOrigin: string) {
  const customerId = await resolveStripeCustomerId(userId);
  if (!customerId) {
    return {
      url: null as string | null,
      error: "No billing account yet. Complete a checkout first.",
    };
  }
  const url = await createBillingPortalSession(customerId, `${returnOrigin}/signin`);
  return { url, error: null as string | null };
}
