import { describe, expect, it, vi, beforeEach } from "vitest";
import { createBillingPortalUrl } from "@/lib/billing-portal.server";

vi.mock("@/lib/purchases.server", () => ({
  resolveStripeCustomerId: vi.fn(),
}));

vi.mock("@/lib/stripe.server", () => ({
  createBillingPortalSession: vi.fn(),
}));

import { resolveStripeCustomerId } from "@/lib/purchases.server";
import { createBillingPortalSession } from "@/lib/stripe.server";

describe("S7 billing portal", () => {
  beforeEach(() => {
    vi.mocked(resolveStripeCustomerId).mockReset();
    vi.mocked(createBillingPortalSession).mockReset();
  });

  it("returns a portal URL when the user has a Stripe customer", async () => {
    vi.mocked(resolveStripeCustomerId).mockResolvedValue("cus_test");
    vi.mocked(createBillingPortalSession).mockResolvedValue(
      "https://billing.stripe.com/session/test",
    );

    const result = await createBillingPortalUrl("user-1", "https://substrates.app");
    expect(result.error).toBeNull();
    expect(result.url).toBe("https://billing.stripe.com/session/test");
    expect(createBillingPortalSession).toHaveBeenCalledWith(
      "cus_test",
      "https://substrates.app/signin",
    );
  });

  it("returns a clear error when no customer exists", async () => {
    vi.mocked(resolveStripeCustomerId).mockResolvedValue(null);
    const result = await createBillingPortalUrl("user-1", "https://substrates.app");
    expect(result.url).toBeNull();
    expect(result.error).toContain("No billing account");
    expect(createBillingPortalSession).not.toHaveBeenCalled();
  });
});
