import { useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { startCheckout, startVideoCheckout } from "@/lib/checkout.functions";
import {
  checkoutResumePath,
  videoCheckoutResumePath,
  type PlanId,
  type VideoPlanId,
} from "@/lib/plans";
import { useAccount } from "@/lib/account-context";
import { CheckoutSummaryContext } from "@/components/CheckoutSummaryProvider";

export function CheckoutButton({
  plan,
  className,
  style,
  children,
}: {
  plan: PlanId;
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const { user, loading } = useAccount();
  const router = useRouter();
  const start = useServerFn(startCheckout);
  const summary = useContext(CheckoutSummaryContext);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resumed = useRef(false);

  async function goStripeDirect() {
    setBusy(true);
    const r = await start({ data: { plan } });
    if (r.url) window.location.assign(r.url);
    else {
      setError(r.error ?? "Checkout failed.");
      setBusy(false);
    }
  }

  async function go() {
    setError("");
    if (!user) {
      void router.navigate({
        href: `/signin?next=${encodeURIComponent(checkoutResumePath(plan))}`,
      });
      return;
    }
    if (summary) {
      summary.beginCheckout(plan);
      return;
    }
    await goStripeDirect();
  }

  useEffect(() => {
    if (loading || !user || resumed.current) return;
    if (new URLSearchParams(window.location.search).get("checkout") === plan) {
      resumed.current = true;
      void go();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, plan]);

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => void go()}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? "Opening checkout…" : children}
      </button>
      {error && (
        <p role="alert" style={{ marginTop: 8, fontSize: 13, color: "#b42318" }}>
          {error}
        </p>
      )}
    </>
  );
}

export function CheckoutCancelledNote() {
  const [show, setShow] = useState(false);
  useEffect(
    () => setShow(new URLSearchParams(window.location.search).get("checkout") === "cancelled"),
    [],
  );
  if (!show) return null;
  return (
    <p role="status" style={{ textAlign: "center", padding: "12px", fontSize: 14 }}>
      Checkout cancelled — you weren't charged.
    </p>
  );
}

export function VideoCheckoutButton({
  plan,
  className,
  style,
  children,
  disabled,
  title,
}: {
  plan: VideoPlanId;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
  title?: string;
}) {
  const { user, loading } = useAccount();
  const router = useRouter();
  const start = useServerFn(startVideoCheckout);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resumed = useRef(false);

  async function go() {
    setError("");
    if (!user) {
      void router.navigate({
        href: `/signin?next=${encodeURIComponent(videoCheckoutResumePath(plan))}`,
      });
      return;
    }
    setBusy(true);
    const r = await start({ data: { plan } });
    if (r.url) window.location.assign(r.url);
    else {
      setError(r.error ?? "Checkout failed.");
      setBusy(false);
    }
  }

  useEffect(() => {
    if (loading || !user || resumed.current) return;
    if (new URLSearchParams(window.location.search).get("checkout") === plan) {
      resumed.current = true;
      void go();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, plan]);

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => void go()}
        disabled={disabled || busy}
        aria-busy={busy}
        title={title}
      >
        {busy ? "Opening checkout…" : children}
      </button>
      {error && (
        <p role="alert" style={{ marginTop: 8, fontSize: 13, color: "#b42318" }}>
          {error}
        </p>
      )}
    </>
  );
}
