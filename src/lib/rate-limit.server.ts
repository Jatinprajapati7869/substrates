/**
 * In-memory sliding-window rate limiter. Limits are per runtime instance only;
 * a shared store (e.g. Redis/Upstash) is the upgrade when horizontal scale matters.
 */

export type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

export const RECOMMEND_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 20,
  windowMs: 10 * 60 * 1000,
};

const buckets = new Map<string, number[]>();

export function clearRateLimitStoreForTests(): void {
  buckets.clear();
}

export function slidingWindowConsume(
  key: string,
  config: RateLimitConfig = RECOMMEND_RATE_LIMIT,
  nowMs = Date.now(),
): boolean {
  const windowStart = nowMs - config.windowMs;
  const prior = buckets.get(key) ?? [];
  const inWindow = prior.filter((t) => t > windowStart);
  if (inWindow.length >= config.maxRequests) {
    buckets.set(key, inWindow);
    return false;
  }
  inWindow.push(nowMs);
  buckets.set(key, inWindow);
  return true;
}

export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
