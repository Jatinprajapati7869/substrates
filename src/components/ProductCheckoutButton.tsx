/* eslint-disable react-refresh/only-export-components -- resume path helper for sign-in flow */
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { startTemplateCheckout } from "@/lib/checkout.functions";
import { isDeliverable } from "@/lib/content-manifest";
import { useAccount } from "@/lib/account-context";
import { Button } from "@/components/ui/button";
import { ProductComingSoonActions } from "@/components/ProductComingSoonActions";

/** Path a visitor returns to after signing in so the template purchase resumes. */
export function templateResumePath(slug: string) {
  return `/templates/${encodeURIComponent(slug)}?buy=1`;
}

export function ProductCheckoutButton({ slug }: { slug: string }) {
  const { user, loading } = useAccount();
  const router = useRouter();
  const start = useServerFn(startTemplateCheckout);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resumed = useRef(false);
  const deliverable = isDeliverable(slug);

  async function go() {
    setError("");
    if (!user) {
      void router.navigate({
        href: `/signin?next=${encodeURIComponent(templateResumePath(slug))}`,
      });
      return;
    }
    setBusy(true);
    const r = await start({ data: { slug } });
    if (r.url) window.location.assign(r.url);
    else {
      setError(r.error ?? "Checkout failed.");
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!deliverable || loading || !user || resumed.current) return;
    if (new URLSearchParams(window.location.search).get("buy") === "1") {
      resumed.current = true;
      void go();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliverable, loading, user, slug]);

  if (!deliverable) {
    return <ProductComingSoonActions />;
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button className="os-btn-dark" onClick={go} disabled={busy} aria-busy={busy}>
        {busy ? "Opening checkout…" : "Get template"}
      </Button>
      {error && (
        <p role="alert" className="max-w-xs text-right text-[12px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
