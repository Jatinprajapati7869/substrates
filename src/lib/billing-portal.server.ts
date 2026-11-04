import { getEntitlement } from "@/lib/entitlements.server";

export async function createBillingPortalUrl(userId: string) {
  const ent = await getEntitlement(userId);
  const url = ent?.providerCustomerPortalUrl;
  if (!url) {
    return {
      url: null as string | null,
      error:
        "No billing portal yet. Subscribe to Sections or Sections + Templates to manage billing, or use your Lemon Squeezy receipt email.",
    };
  }
  return { url, error: null as string | null };
}
