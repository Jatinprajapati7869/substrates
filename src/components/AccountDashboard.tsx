import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import type { AccountDashboardView } from "@/lib/account-dashboard";
import { getAccountDashboard } from "@/lib/account.functions";
import { openBillingPortal } from "@/lib/checkout.functions";
import { AccountDashboardPanel } from "@/components/AccountDashboardPanel";

export function AccountDashboard({
  disabled,
  onError,
}: {
  disabled: boolean;
  onError: (message: string) => void;
}) {
  const load = useServerFn(getAccountDashboard);
  const openPortal = useServerFn(openBillingPortal);
  const [view, setView] = useState<AccountDashboardView | null>(null);
  const [billingBusy, setBillingBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void load()
      .then((data) => {
        if (active) setView(data);
      })
      .catch(() => {
        if (active) onError("Could not load your account. Please refresh.");
      });
    return () => {
      active = false;
    };
    // onError is stable enough for a one-shot load; avoid refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once on mount
  }, [load]);

  if (!view)
    return (
      <p className="mt-3 text-sm text-muted-foreground" role="status">
        Loading account…
      </p>
    );

  return (
    <AccountDashboardPanel
      view={view}
      billingBusy={billingBusy || disabled}
      onManageBilling={async () => {
        setBillingBusy(true);
        onError("");
        try {
          const { url, error } = await openPortal();
          if (url) window.location.href = url;
          else onError(error ?? "Billing portal unavailable.");
        } catch {
          onError("Billing portal unavailable.");
        } finally {
          setBillingBusy(false);
        }
      }}
    />
  );
}
