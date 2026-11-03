import { getAdminAuth } from "@/integrations/firebase/admin.server";
import {
  clientIpFromRequest,
  RECOMMEND_RATE_LIMIT,
  slidingWindowConsume,
} from "./rate-limit.server";

export async function recommendRateLimitKey(request: Request): Promise<string> {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length).trim();
    if (token) {
      try {
        const decoded = await (await getAdminAuth()).verifyIdToken(token);
        if (decoded.uid) return `uid:${decoded.uid}`;
      } catch {
        // Fall back to IP when token is invalid or admin is unavailable.
      }
    }
  }
  return `ip:${clientIpFromRequest(request)}`;
}

export async function consumeRecommendRateLimit(request: Request): Promise<boolean> {
  const key = await recommendRateLimitKey(request);
  return slidingWindowConsume(key, RECOMMEND_RATE_LIMIT);
}
