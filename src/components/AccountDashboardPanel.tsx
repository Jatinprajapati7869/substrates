import { useState } from "react";
import { Button } from "@/components/ui/button";
import { assistantSchema } from "@/lib/assistant-copy";
import type { AccountDashboardView } from "@/lib/account-dashboard";
import { deliverProductPrompt } from "@/lib/deliver.functions";

function UnlockedTemplateRow({ slug, name, image }: { slug: string; name: string; image: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function copyFor(assistant: string) {
    setBusy(true);
    setStatus("");
    try {
      const result = await deliverProductPrompt({
        data: { kind: "template", slug, assistant },
      });
      if (!result.ok) {
        setStatus(
          result.code === "content_missing" ? "Prompt not uploaded yet." : "Could not copy.",
        );
        return;
      }
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(result.text);
      setStatus(`Copied for ${assistant}.`);
    } catch {
      setStatus("Could not copy.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="flex gap-3 rounded-md border border-line/60 p-3" data-testid={`unlock-${slug}`}>
      <img
        src={image}
        alt={name}
        className="h-14 w-20 shrink-0 rounded object-cover"
        width={80}
        height={56}
        loading="lazy"
        decoding="async"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{name}</p>
        <a
          className="text-xs underline text-muted-foreground"
          href={`/templates/${encodeURIComponent(slug)}`}
        >
          View template
        </a>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {assistantSchema.options.map((assistant) => (
            <Button
              key={assistant}
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              disabled={busy}
              onClick={() => copyFor(assistant)}
            >
              Copy for {assistant}
            </Button>
          ))}
        </div>
        {status ? (
          <p role="status" className="mt-2 text-xs text-muted-foreground">
            {status}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function AccountDashboardPanel({
  view,
  billingBusy,
  onManageBilling,
}: {
  view: AccountDashboardView;
  billingBusy: boolean;
  onManageBilling: () => void;
}) {
  const { membership, billing, unlocks, purchases } = view;

  return (
    <div className="mt-4 space-y-6 text-sm text-text" data-testid="account-dashboard">
      <section aria-labelledby="account-membership-heading" data-testid="account-membership">
        <h2 id="account-membership-heading" className="text-[13px] font-semibold text-text">
          Membership
        </h2>
        {membership.hasPlan ? (
          <dl className="mt-2 space-y-1">
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="font-medium">{membership.planName}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Status</dt>
              <dd>{membership.statusLabel}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-muted-foreground" data-testid="account-no-plan">
            No active plan.{" "}
            <a className="underline" href="/pricing">
              See plans
            </a>
          </p>
        )}
        <p className="mt-2 text-muted-foreground">{membership.membershipSummary}</p>
        {membership.showCredits ? (
          <dl
            className="mt-3 space-y-1 rounded-md border border-line/60 p-3"
            data-testid="account-credits"
          >
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Credits left</dt>
              <dd className="font-medium tabular-nums">{membership.creditsRemaining ?? 0}</dd>
            </div>
            {membership.creditsResetLabel ? (
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Credits reset</dt>
                <dd>{membership.creditsResetLabel}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </section>

      <section aria-labelledby="account-library-heading">
        <h2 id="account-library-heading" className="text-[13px] font-semibold text-text">
          Unlocked templates
        </h2>
        {unlocks.length ? (
          <ul className="mt-2 space-y-2" data-testid="account-unlocks-list">
            {unlocks.map((row) => (
              <UnlockedTemplateRow key={row.slug} {...row} />
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-muted-foreground" data-testid="account-unlocks-empty">
            No unlocked templates yet. Spend a credit on a template page or choose a lifetime plan.
          </p>
        )}
      </section>

      <section aria-labelledby="account-purchases-heading">
        <h2 id="account-purchases-heading" className="text-[13px] font-semibold text-text">
          Purchase history
        </h2>
        {purchases.length ? (
          <ul
            className="mt-2 divide-y divide-line/60 rounded-md border border-line/60"
            data-testid="account-purchases"
          >
            {purchases.map((row, index) => (
              <li
                key={`${row.planLabel}-${row.dateLabel}-${index}`}
                className="flex justify-between gap-2 px-3 py-2"
              >
                <span>{row.planLabel}</span>
                <span className="text-muted-foreground tabular-nums">{row.dateLabel}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-muted-foreground" data-testid="account-purchases-empty">
            No purchases recorded yet.
          </p>
        )}
      </section>

      <section aria-labelledby="account-billing-heading">
        <h2 id="account-billing-heading" className="text-[13px] font-semibold text-text">
          Billing
        </h2>
        {billing.canManageBilling ? (
          <Button
            variant="outline"
            className="os-btn-white mt-2 w-full"
            disabled={billingBusy}
            aria-busy={billingBusy}
            data-testid="account-billing"
            onClick={onManageBilling}
          >
            {billingBusy ? "Opening…" : "Manage billing"}
          </Button>
        ) : (
          <p className="mt-2 text-muted-foreground" data-testid="account-billing-unavailable">
            {billing.unavailableReason}
          </p>
        )}
      </section>
    </div>
  );
}
