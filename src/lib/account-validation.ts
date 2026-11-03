import { z } from "zod";

export const emailSchema = z.string().trim().email("Enter a valid email address.").max(255);
export const passwordSchema = z.string().min(8, "Use at least 8 characters.").max(128);
export const displayNameSchema = z.string().trim().min(1, "Enter your display name.").max(100);
export function safeReturnPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u001f\u007f]/.test(value)) return "/";
  try {
    const url = new URL(value, "https://app.invalid");
    if (url.origin !== "https://app.invalid" || url.pathname.startsWith("//") || url.pathname.startsWith("/signin") || url.pathname.startsWith("/reset-password")) return "/";
    return url.pathname + url.search + url.hash;
  } catch { return "/"; }
}

export function signInCallbackPath(value: unknown) {
  const next = safeReturnPath(value);
  return next === "/" ? "/signin" : `/signin?next=${encodeURIComponent(next)}`;
}