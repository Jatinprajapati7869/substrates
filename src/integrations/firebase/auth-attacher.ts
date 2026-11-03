import { createMiddleware } from "@tanstack/react-start";
import { getClientAuth } from "./client";

export const attachFirebaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  const user = getClientAuth().currentUser;
  const token = user ? await user.getIdToken() : null;
  return next({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
});
