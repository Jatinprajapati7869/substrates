import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { confirmCheckout, getMyEntitlement } from "@/lib/checkout.functions";
import { useAccount } from "@/lib/account-context";
import { PLANS, VIDEO_PLANS, isPlanId, isVideoPlanId, type PlanId } from "@/lib/plans";
import { checkoutSuccessPrimaryAction } from "@/lib/checkout-summary";
import { confirmMembershipAfterPayment } from "@/lib/checkout-success-flow";
import { withPublicPageHead } from "@/lib/seo";

export const Route = createFileRoute("/checkout-success")({
  head: () =>
    withPublicPageHead("/checkout-success", [
      { title: "Payment received — Substrates" },
      { name: "description", content: "Your Substrates purchase is confirmed." },
      { property: "og:title", content: "Payment received — Substrates" },
      { property: "og:description", content: "Your Substrates purchase is confirmed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ]),
  component: Success,
});

type Phase = "waiting_auth" | "payment" | "confirming" | "confirmed" | "fail";

function Success() {
  const { user, loading } = useAccount();
  const confirm = useServerFn(confirmCheckout);
  const fetchEntitlement = useServerFn(getMyEntitlement);
  const [phase, setPhase] = useState<Phase>("waiting_auth");
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const id = new URLSearchParams(window.location.search).get("plan");
    if (!user || !id) {
      setPhase("fail");
      return;
    }

    setPhase("payment");
    void (async () => {
      const outcome = await confirmMembershipAfterPayment(
        () => confirm({ data: { plan: id } }),
        async () => {
          setPhase("confirming");
          const ent = await fetchEntitlement();
          return {
            active: ent.active,
            plan: ent.plan,
            videoSkillsActive: ent.videoSkillsActive,
            videoSkillsPlan: ent.videoSkillsPlan,
          };
        },
      );
      setPlan(outcome.plan);
      if (outcome.status === "confirmed") setPhase("confirmed");
      else if (outcome.status === "confirming_timeout") setPhase("confirmed");
      else setPhase("fail");
    })();
  }, [loading, user, confirm, fetchEntitlement]);

  const planId = plan && isPlanId(plan) ? (plan as PlanId) : null;
  const primary = planId ? checkoutSuccessPrimaryAction(planId) : null;

  return (
    <main className="mx-auto max-w-lg px-5 py-[15vh] text-center text-text">
      {phase === "waiting_auth" || phase === "payment" ? (
        <>
          <h1 className="text-2xl font-semibold">Confirming your payment…</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            This usually takes a few seconds.
          </p>
        </>
      ) : null}
      {phase === "confirming" ? (
        <>
          <h1 className="text-2xl font-semibold">Still confirming your membership…</h1>
          <p className="mt-3 text-[15px] text-muted-foreground" role="status">
            Waiting for your account to update. This can take up to 30 seconds.
          </p>
        </>
      ) : null}
      {phase === "confirmed" && (
        <>
          <h1 className="text-3xl font-semibold">Thanks, you&apos;re in.</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {plan?.startsWith("template:")
              ? "Your template purchase is complete."
              : plan && isVideoPlanId(plan)
                ? `Your ${VIDEO_PLANS[plan].name} membership is active.`
                : planId
                  ? `Your ${PLANS[planId].name} plan is active.`
                  : "Your purchase is complete."}
          </p>
        </>
      )}
      {phase === "fail" && (
        <>
          <h1 className="text-2xl font-semibold">We couldn&apos;t confirm this payment</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Make sure you&apos;re signed in to the account you paid with. If you were charged, it
            will show on your account shortly.
          </p>
        </>
      )}
      {(phase === "confirmed" || phase === "fail") && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/signin"
            className="os-btn-dark inline-flex rounded-full px-5 py-2.5 text-[14px] font-medium"
          >
            Your account
          </Link>
          {primary && phase === "confirmed" && (
            <Link
              to={primary.to}
              className="os-btn-white inline-flex rounded-full border border-line px-5 py-2.5 text-[14px] font-medium"
            >
              {primary.label}
            </Link>
          )}
          {plan && isVideoPlanId(plan) && phase === "confirmed" && (
            <Link
              to="/videos"
              className="os-btn-white inline-flex rounded-full border border-line px-5 py-2.5 text-[14px] font-medium"
            >
              Browse video skills
            </Link>
          )}
          <Link
            to="/"
            className="text-[14px] text-muted-foreground underline-offset-2 hover:underline"
          >
            Back to home
          </Link>
        </div>
      )}
    </main>
  );
}
