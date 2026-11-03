import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type Product } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAccount } from "@/lib/account-context";
import { getProductDeliveryMeta } from "@/lib/deliver.functions";
import { spendCredit } from "@/lib/credits.functions";
import { ProductCheckoutButton } from "@/components/ProductCheckoutButton";
import { FullPromptAssistantMenu } from "@/components/FullPromptAssistantMenu";

function templateSignInPath(slug: string) {
  return `/signin?next=${encodeURIComponent(`/templates/${encodeURIComponent(slug)}?copy=1`)}`;
}

function proSectionSignInPath(slug: string) {
  return `/signin?next=${encodeURIComponent(`/sections/${encodeURIComponent(slug)}?copy=1`)}`;
}

export function ProductDeliveryActions({
  product,
  resumeCopy = false,
}: {
  product: Product;
  resumeCopy?: boolean;
}) {
  const { user } = useAccount();
  const queryClient = useQueryClient();
  const proSection = product.kind === "section" && product.tier === "pro";
  const isTemplate = product.kind === "template";
  const needsMeta = !!user && (proSection || isTemplate);

  const metaQuery = useQuery({
    queryKey: ["delivery-meta", product.kind, product.slug, user?.uid],
    queryFn: () => getProductDeliveryMeta({ data: { kind: product.kind, slug: product.slug } }),
    enabled: needsMeta,
  });

  const [fullCopyOpen, setFullCopyOpen] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [unlockBusy, setUnlockBusy] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [resumeDismissed, setResumeDismissed] = useState(false);

  const meta = metaQuery.data?.ok ? metaQuery.data : null;

  useEffect(() => {
    if (resumeDismissed || !resumeCopy || !user) return;
    if (isTemplate && meta?.templateUnlocked) setFullCopyOpen(true);
    if (proSection && meta?.proSectionAccess) setFullCopyOpen(true);
  }, [
    resumeCopy,
    resumeDismissed,
    user,
    isTemplate,
    proSection,
    meta?.templateUnlocked,
    meta?.proSectionAccess,
  ]);

  async function confirmUnlock() {
    setUnlockBusy(true);
    setUnlockError("");
    try {
      const result = await spendCredit({ data: { slug: product.slug } });
      if (!result.ok) {
        setUnlockError(result.error ?? "Could not unlock.");
        return;
      }
      setUnlockOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["delivery-meta", product.kind, product.slug],
      });
      setFullCopyOpen(true);
    } finally {
      setUnlockBusy(false);
    }
  }

  if (product.kind === "section" && product.tier !== "pro") {
    return null;
  }

  if (proSection) {
    return (
      <>
        {!user && (
          <Button asChild className="os-btn-dark">
            <a href={proSectionSignInPath(product.slug)}>Sign in to copy</a>
          </Button>
        )}
        {user && metaQuery.isPending && (
          <Button className="os-btn-dark" disabled>
            Loading…
          </Button>
        )}
        {user && meta?.proSectionAccess && (
          <Button className="os-btn-dark" onClick={() => setFullCopyOpen(true)}>
            Copy section — Pro
          </Button>
        )}
        {user && !metaQuery.isPending && !meta?.proSectionAccess && (
          <Button asChild className="os-btn-dark">
            <Link to="/pricing">View Pro plans</Link>
          </Button>
        )}
        {fullCopyOpen && (
          <FullPromptAssistantMenu
            product={product}
            close={() => {
              setFullCopyOpen(false);
              setResumeDismissed(true);
            }}
          />
        )}
      </>
    );
  }

  if (isTemplate) {
    return (
      <>
        {!user && (
          <Button asChild className="os-btn-dark">
            <a href={templateSignInPath(product.slug)}>Sign in to copy</a>
          </Button>
        )}
        {user && metaQuery.isPending && (
          <Button className="os-btn-dark" disabled>
            Loading…
          </Button>
        )}
        {user && meta?.templateUnlocked && (
          <Button className="os-btn-dark" onClick={() => setFullCopyOpen(true)}>
            Copy template
          </Button>
        )}
        {user && meta && !meta.templateUnlocked && meta.canSpendCredit && (
          <Button className="os-btn-dark" onClick={() => setUnlockOpen(true)}>
            Unlock with 1 credit
          </Button>
        )}
        {user && meta && !meta.templateUnlocked && !meta.canSpendCredit && (
          <Button asChild className="os-btn-dark">
            <Link to="/pricing">View plans</Link>
          </Button>
        )}
        {typeof product.priceUsd === "number" && product.priceUsd > 0 && (
          <ProductCheckoutButton slug={product.slug} />
        )}
        <AlertDialog open={unlockOpen} onOpenChange={setUnlockOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlock {product.name}?</AlertDialogTitle>
              <AlertDialogDescription>
                This uses 1 credit; you have {meta?.creditsRemaining ?? 0} left this period. Unlocks
                are permanent.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {unlockError && <p className="text-sm text-destructive">{unlockError}</p>}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={unlockBusy}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={unlockBusy}
                onClick={(e) => {
                  e.preventDefault();
                  void confirmUnlock();
                }}
              >
                {unlockBusy ? "Unlocking…" : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {fullCopyOpen && (
          <FullPromptAssistantMenu
            product={product}
            close={() => {
              setFullCopyOpen(false);
              setResumeDismissed(true);
            }}
          />
        )}
      </>
    );
  }

  return null;
}
