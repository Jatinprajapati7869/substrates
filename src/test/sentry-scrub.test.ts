import { describe, expect, it } from "vitest";
import {
  scrubEventForSentry,
  scrubHttpHeaders,
  scrubRequestData,
  scrubSensitiveRecord,
} from "@/lib/sentry-scrub";

describe("sentry scrubber", () => {
  it("removes authorization, cookie, and email fields from headers and payloads", () => {
    const headers = scrubHttpHeaders({
      authorization: "Bearer secret-token",
      cookie: "session=abc",
      "content-type": "application/json",
    });
    expect(headers["authorization"]).toBe("[Filtered]");
    expect(headers["cookie"]).toBe("[Filtered]");
    expect(headers["content-type"]).toBe("application/json");

    const body = scrubRequestData({
      email: "user@example.com",
      plan: "sections",
      nested: { Authorization: "Basic x", ok: true },
    });
    expect(body).toEqual({
      email: "[Filtered]",
      plan: "sections",
      nested: { Authorization: "[Filtered]", ok: true },
    });

    const event = scrubEventForSentry({
      user: { id: "u1", email: "user@example.com", username: "member" },
      request: {
        headers: { Authorization: "Bearer x", Cookie: "a=b" },
        cookies: { session: "abc" },
        data: { email: "user@example.com", message: "hello" },
      },
    });
    expect(event.user?.email).toBeUndefined();
    expect(event.request?.headers?.Authorization).toBe("[Filtered]");
    expect(event.request?.headers?.Cookie).toBe("[Filtered]");
    expect(event.request?.cookies?.session).toBe("[Filtered]");
    expect(event.request?.data).toEqual({ email: "[Filtered]", message: "hello" });
  });

  it("scrubs keys case-insensitively", () => {
    expect(scrubSensitiveRecord({ Email: "a@b.co", token: "t" })).toEqual({
      Email: "[Filtered]",
      token: "[Filtered]",
    });
    expect(scrubSensitiveRecord({ OPENAI_API_KEY: "sk-x", FIREBASE_PRIVATE_KEY: "pem" })).toEqual({
      OPENAI_API_KEY: "[Filtered]",
      FIREBASE_PRIVATE_KEY: "[Filtered]",
    });
  });
});
