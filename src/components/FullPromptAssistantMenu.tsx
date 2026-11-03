import { useState } from "react";
import { Button } from "@/components/ui/button";
import { assistantSchema } from "@/lib/assistant-copy";
import { deliverProductPrompt } from "@/lib/deliver.functions";
import type { Product } from "@/lib/catalog";

export function FullPromptAssistantMenu({
  product,
  close,
}: {
  product: Product;
  close: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function copy(assistant: string) {
    setBusy(true);
    setStatus("");
    try {
      const result = await deliverProductPrompt({
        data: { kind: product.kind, slug: product.slug, assistant },
      });
      if (!result.ok) {
        if (result.code === "not_entitled")
          setStatus("Choose a plan or unlock this template first.");
        else if (result.code === "content_missing") setStatus("This prompt is not uploaded yet.");
        else if (result.code === "rate_limited") setStatus("Too many copies. Try again later.");
        else setStatus("Could not copy. Please try again.");
        return;
      }
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(result.text);
      setStatus(`Full prompt copied for ${assistant}.`);
    } catch {
      setStatus("Could not copy. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Copy rebuild prompt"
      className="fixed bottom-6 left-6 right-6 z-[90] mx-auto max-w-sm rounded-lg border border-line bg-surface p-4 text-text shadow-shell"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Copy rebuild prompt</h2>
        <Button variant="ghost" size="icon" aria-label="Close copy options" onClick={close}>
          ×
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {assistantSchema.options.map((assistant) => (
          <Button key={assistant} variant="outline" disabled={busy} onClick={() => copy(assistant)}>
            {assistant}
          </Button>
        ))}
      </div>
      {status && (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          {status}
        </p>
      )}
    </div>
  );
}
