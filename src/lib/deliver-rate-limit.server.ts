import type { RateLimitConfig } from "./rate-limit.server";
import { slidingWindowConsume } from "./rate-limit.server";

export const DELIVER_RATE_LIMIT: RateLimitConfig = {
  maxRequests: Number(process.env["DELIVER_RATE_LIMIT"] ?? 30),
  windowMs: 60 * 60 * 1000,
};

export function consumeDeliverRateLimit(userId: string, nowMs = Date.now()): boolean {
  return slidingWindowConsume(`deliver:uid:${userId}`, DELIVER_RATE_LIMIT, nowMs);
}
