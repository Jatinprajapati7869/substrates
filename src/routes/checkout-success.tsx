import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { confirmCheckout } from "@/lib/checkout.functions";
import { useAccount } from "@/lib/account-context";
import { PLANS, isPlanId } from "@/lib/plans";

export const Route = createFileRoute("/checkout-success")({
  head: () => ({
    meta: [
      { title: "Payment received — Substrates" },
      { name: "description", content: "Your Substrates purchase is confirmed." },
      { property: "og:title", content: "Payment received — Substrates" },
      { property: "og:description", content: "Your Substrates purchase is confirmed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

function Success() {
  const { user, loading } = useAccount();
  const confirm = useServerFn(confirmCheckout);
  const [state, setState] = useState<"checking" | "ok" | "fail">("checking");
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const id = new URLSearchParams(window.location.search).get("session_id");
    if (!user || !id) { setState("fail"); return; }
    void confirm({ data: { sessionId: id } }).then((r) => { setPlan(r.plan); setState(r.ok ? "ok" : "fail"); });
  }, [loading, user, confirm]);

  return (
    <main style={{ maxWidth: 520, margin: "15vh auto", padding: 24, textAlign: "center", fontFamily: "inherit" }}>
      {state === "checking" && <h1>Confirming your payment…</h1>}
      {state === "ok" && (
        <>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>Thanks, you're in.</h1>
          <p>{plan?.startsWith("template:") ? "Your template purchase is complete." : <>Your {plan && isPlanId(plan) ? PLANS[plan].name : ""} plan is active.</>} You can see it on your account page.</p>
        </>
      )}
      {state === "fail" && (
        <>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>We couldn't confirm this payment</h1>
          <p>Make sure you're signed in to the account you paid with. If you were charged, it will show on your account shortly.</p>
        </>
      )}
      <p style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center" }}>
        <Link to="/signin">Your account</Link>
        <Link to="/">Back to home</Link>
      </p>
    </main>
  );
}
