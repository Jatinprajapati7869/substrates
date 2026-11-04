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
    <p
      role="status"
      style={{
        textAlign: "center",
        padding: "12px 16px",
        fontSize: 14,
        color: "#4b5563",
        background: "#f3f4f6",
        margin: 0,
      }}
    >
      Checkout cancelled — you were not charged. Pick a plan below when you are ready.
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
  checkoutAvailable = true,
}: {
  plan: VideoPlanId;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
  title?: string;
  /** When false, show Coming soon and block checkout (missing video variant env). */
  checkoutAvailable?: boolean;
}) {
  const { user, loading } = useAccount();
  const router = useRouter();
  const start = useServerFn(startVideoCheckout);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resumed = useRef(false);

  async function go() {
    setError("");
    if (!checkoutAvailable) return;
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
    if (loading || !user || resumed.current || !checkoutAvailable) return;
    if (new URLSearchParams(window.location.search).get("checkout") === plan) {
      resumed.current = true;
      void go();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, plan, checkoutAvailable]);

  const blocked = disabled || !checkoutAvailable;
  const label = !checkoutAvailable ? "Coming soon" : busy ? "Opening checkout…" : children;

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => void go()}
        disabled={blocked || busy}
        aria-busy={busy}
        title={!checkoutAvailable ? "Video checkout will open when billing is configured." : title}
      >
        {label}
      </button>
      {error && (
        <p role="alert" style={{ marginTop: 8, fontSize: 13, color: "#b42318" }}>
          {error}
        </p>
      )}
    </>
  );
}
