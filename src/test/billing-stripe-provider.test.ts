import { describe, expect, it } from "vitest";
import { mapStripeEventToBillingEvents } from "@/lib/billing/stripe-provider";
import checkoutCompleted from "./fixtures/stripe/checkout.session.completed.json";
import invoicePaid from "./fixtures/stripe/invoice.paid.json";

describe("stripe billing provider mapping", () => {
  it("maps checkout.session.completed to checkout_completed", () => {
    const events = mapStripeEventToBillingEvents(checkoutCompleted as never);
    expect(events).toHaveLength(1);
    expect(events[0]?.type).toBe("checkout_completed");
    expect(events[0]?.eventKey).toBe(checkoutCompleted.id);
    expect(events[0]?.checkoutPayload).toBeTruthy();
  });

  it("maps invoice.paid to subscription_cycle_paid with plan metadata", () => {
    const events = mapStripeEventToBillingEvents(invoicePaid as never);
    expect(events[0]?.type).toBe("subscription_cycle_paid");
    expect(events[0]?.plan).toBe("sections-templates");
    expect(events[0]?.userId).toBe("user-1");
  });
});
