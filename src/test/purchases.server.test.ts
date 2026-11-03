import { describe, expect, it } from "vitest";

export function isOrderCheckoutPaid(payload: { paid: boolean }): boolean {
  return payload.paid === true;
}

describe("checkout purchase payment gate", () => {
  it("rejects checkout payloads that are not paid", () => {
    expect(isOrderCheckoutPaid({ paid: false })).toBe(false);
  });

  it("accepts paid checkout payloads only", () => {
    expect(isOrderCheckoutPaid({ paid: true })).toBe(true);
  });
});
