import type { EntitlementDoc } from "./entitlements.types";

/** Video skills access is independent of template plan fields (S22). */
export function hasVideoSkillsAccess(ent: EntitlementDoc | null | undefined): boolean {
  if (!ent?.videoSkillsStatus) return false;
  if (ent.videoSkillsStatus === "refunded" || ent.videoSkillsStatus === "past_due") return false;
  const end = ent.videoSkillsPeriodEnd;
  if (end && end.getTime() <= Date.now()) return false;
  if (ent.videoSkillsStatus === "active") return true;
  if (ent.videoSkillsStatus === "canceled" && end && end.getTime() > Date.now()) return true;
  return false;
}
