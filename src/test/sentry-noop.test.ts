import { describe, expect, it } from "vitest";
import { captureServerException, isSentryServerEnabled } from "@/lib/sentry.server";

describe("sentry server without DSN", () => {
  it("is a no-op when SENTRY_DSN is unset", () => {
    expect(isSentryServerEnabled()).toBe(false);
    expect(() => captureServerException(new Error("ignored"))).not.toThrow();
  });
});
