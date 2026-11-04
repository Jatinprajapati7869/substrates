/** Structured billing logs — no emails, tokens, or full API bodies. */
export function logBillingWarn(
  code: string,
  detail: Record<string, string | number | boolean | null | undefined>,
): void {
  const safe: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(detail)) {
    if (v === null || v === undefined) continue;
    safe[k] = v;
  }
  console.warn(`[billing] ${code}`, safe);
}
