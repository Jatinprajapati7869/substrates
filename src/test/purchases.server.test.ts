import { describe, expect, it } from "vitest";
import { isCheckoutSessionPaid } from "@/lib/purchases.server";

describe("Stripe checkout session payment gate", () => {
  it("rejects complete sessions that are not paid", () => {
    expect(isCheckoutSessionPaid({ payment_status: "unpaid" })).toBe(false);
    expect(isCheckoutSessionPaid({ payment_status: "no_payment_required" })).toBe(false);
  });

  it("accepts paid sessions only", () => {
    expect(isCheckoutSessionPaid({ payment_status: "paid" })).toBe(true);
  });
});
