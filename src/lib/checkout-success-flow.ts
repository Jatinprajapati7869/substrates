import { isPlanId, isVideoPlanId } from "./plans";
import {
  pollEntitlementActive,
  pollVideoSkillsActive,
  type EntitlementPollSnapshot,
} from "./checkout-summary";

export type CheckoutSuccessStatus = "fail" | "confirmed" | "confirming_timeout";

export async function confirmMembershipAfterPayment(
  confirm: () => Promise<{ ok: boolean; plan: string | null }>,
  fetchEntitlement: () => Promise<EntitlementPollSnapshot>,
  options?: { intervalMs?: number; timeoutMs?: number; sleep?: (ms: number) => Promise<void> },
): Promise<{ status: CheckoutSuccessStatus; plan: string | null }> {
  const confirmed = await confirm();
  if (!confirmed.ok || !confirmed.plan) return { status: "fail", plan: confirmed.plan };

  if (confirmed.plan.startsWith("template:")) {
    return { status: "confirmed", plan: confirmed.plan };
  }

  if (isVideoPlanId(confirmed.plan)) {
    const pollOptions: {
      intervalMs: number;
      timeoutMs: number;
      sleep?: (ms: number) => Promise<void>;
    } = {
      intervalMs: options?.intervalMs ?? 2000,
      timeoutMs: options?.timeoutMs ?? 30_000,
    };
    if (options?.sleep) pollOptions.sleep = options.sleep;
    const poll = await pollVideoSkillsActive(fetchEntitlement, confirmed.plan, pollOptions);
    if (poll === "confirmed") return { status: "confirmed", plan: confirmed.plan };
    return { status: "confirming_timeout", plan: confirmed.plan };
  }

  if (!isPlanId(confirmed.plan)) return { status: "fail", plan: confirmed.plan };

  const pollOptions: {
    intervalMs: number;
    timeoutMs: number;
    sleep?: (ms: number) => Promise<void>;
  } = {
    intervalMs: options?.intervalMs ?? 2000,
    timeoutMs: options?.timeoutMs ?? 30_000,
  };
  if (options?.sleep) pollOptions.sleep = options.sleep;

  const poll = await pollEntitlementActive(fetchEntitlement, confirmed.plan, pollOptions);

  if (poll === "confirmed") return { status: "confirmed", plan: confirmed.plan };
  return { status: "confirming_timeout", plan: confirmed.plan };
}
