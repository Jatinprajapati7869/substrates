import { RECOMMEND_RATE_LIMIT, slidingWindowConsume } from "./rate-limit.server";

export function consumeMcpRateLimit(clientId: string, nowMs = Date.now()): boolean {
  return slidingWindowConsume(`mcp:uid:${clientId}`, RECOMMEND_RATE_LIMIT, nowMs);
}
