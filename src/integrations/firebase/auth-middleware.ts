import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAdminAuth } from "./admin.server";

export const requireFirebaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const request = getRequest();
  const authHeader = request?.headers?.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No authorization header provided");
  }
  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) throw new Error("Unauthorized: No token provided");

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    if (!decoded.uid) throw new Error("Unauthorized: No user ID in token");
    return next({
      context: {
        userId: decoded.uid,
        claims: decoded,
        email: decoded.email,
      },
    });
  } catch {
    throw new Error("Unauthorized: Invalid token");
  }
});
