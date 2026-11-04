/* eslint-disable react-refresh/only-export-components -- context hook + provider */
import { createContext, useContext, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { startCheckout } from "@/lib/checkout.functions";
import { checkoutSummaryForPlan } from "@/lib/checkout-summary";
import {
  planCheckoutShowsTemplateAvailability,
  templateAvailabilitySummaryLine,
} from "@/lib/content-manifest";
import type { PlanId } from "@/lib/plans";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CheckoutSummaryContextValue = {
  beginCheckout: (plan: PlanId) => void;
};

const CheckoutSummaryContext = createContext<CheckoutSummaryContextValue | null>(null);

export { CheckoutSummaryContext };

export function useCheckoutSummary() {
  const ctx = useContext(CheckoutSummaryContext);
  if (!ctx) throw new Error("CheckoutSummaryProvider required");
  return ctx;
}

export function CheckoutSummaryProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const start = useServerFn(startCheckout);

  async function confirmStripe() {
    if (!plan) return;
    setBusy(true);
    setError("");
    const r = await start({ data: { plan } });
    if (r.url) window.location.assign(r.url);
    else {
      setError(r.error ?? "Checkout failed.");
      setBusy(false);
    }
  }

  const summary = plan ? checkoutSummaryForPlan(plan) : null;

  return (
    <CheckoutSummaryContext.Provider value={{ beginCheckout: setPlan }}>
      {children}
      {summary && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open && !busy) setPlan(null);
          }}
        >
          <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-lg border border-line bg-surface text-text">
            <DialogTitle className="text-xl font-semibold">Review your plan</DialogTitle>
            <DialogDescription className="text-[13px] text-muted-foreground">
              Confirm before you continue to secure payment.
            </DialogDescription>
            <div className="mt-4 rounded-lg border border-line bg-surface-sunken p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Plan
              </p>
              <p className="mt-1 text-lg font-semibold">{summary.planName}</p>
              <p className="mt-1 text-[15px] font-semibold">
                {summary.priceLabel}
                <span className="ml-1 text-[13px] font-normal text-muted-foreground">
                  {summary.billingLabel}
                </span>
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
              {summary.includes.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden="true" className="text-text">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {plan && planCheckoutShowsTemplateAvailability(plan) ? (
              <p
                className="mt-3 text-[13px] text-muted-foreground"
                data-testid="checkout-template-availability"
              >
                {templateAvailabilitySummaryLine()}
              </p>
            ) : null}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {summary.previews.map((item) => (
                <figure
                  key={item.slug}
                  className="overflow-hidden rounded-md border border-line bg-surface"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={240}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <figcaption className="truncate px-2 py-1 text-[11px] text-muted-foreground">
                    {item.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                className="os-btn-dark flex-1"
                disabled={busy}
                aria-busy={busy}
                onClick={() => void confirmStripe()}
              >
                {busy ? "Opening checkout…" : "Continue to payment"}
              </Button>
              <Button
                variant="outline"
                className="os-btn-white"
                disabled={busy}
                onClick={() => setPlan(null)}
              >
                Back
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </CheckoutSummaryContext.Provider>
  );
}
