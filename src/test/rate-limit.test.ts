import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearRateLimitStoreForTests,
  RECOMMEND_RATE_LIMIT,
  slidingWindowConsume,
} from "@/lib/rate-limit.server";

beforeEach(() => {
  clearRateLimitStoreForTests();
});

afterEach(() => {
  clearRateLimitStoreForTests();
});

describe("S14 recommend rate limiter", () => {
  it("allows requests inside the sliding window", () => {
    const key = "ip:127.0.0.1";
    const start = 1_000_000;
    for (let i = 0; i < RECOMMEND_RATE_LIMIT.maxRequests; i++) {
      expect(slidingWindowConsume(key, RECOMMEND_RATE_LIMIT, start + i)).toBe(true);
    }
    expect(
      slidingWindowConsume(key, RECOMMEND_RATE_LIMIT, start + RECOMMEND_RATE_LIMIT.maxRequests),
    ).toBe(false);
  });

  it("opens capacity again after the window elapses", () => {
    const key = "uid:test";
    const t0 = 5_000_000;
    for (let i = 0; i < RECOMMEND_RATE_LIMIT.maxRequests; i++) {
      expect(slidingWindowConsume(key, RECOMMEND_RATE_LIMIT, t0 + i * 100)).toBe(true);
    }
    expect(
      slidingWindowConsume(key, RECOMMEND_RATE_LIMIT, t0 + RECOMMEND_RATE_LIMIT.maxRequests * 100),
    ).toBe(false);
    const afterWindow = t0 + RECOMMEND_RATE_LIMIT.windowMs + 1;
    expect(slidingWindowConsume(key, RECOMMEND_RATE_LIMIT, afterWindow)).toBe(true);
  });
});
