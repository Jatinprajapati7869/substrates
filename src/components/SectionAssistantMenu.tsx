import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copySectionPrompt } from "@/lib/assistant-copy";
export function SectionAssistantMenu({ slug, close }: { slug: string; close: () => void }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  async function copy(assistant: string) {
    setBusy(true);
    setStatus("");
    try {
      await copySectionPrompt(slug, assistant);
      setStatus(`Reference prompt copied for ${assistant}.`);
    } catch {
      setStatus("Could not copy. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      role="dialog"
      aria-label="Copy section prompt"
      className="fixed bottom-6 left-6 right-6 z-[90] mx-auto max-w-sm rounded-lg border border-line bg-surface p-4 text-text shadow-shell"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Copy section prompt</h2>
        <Button variant="ghost" size="icon" aria-label="Close copy options" onClick={close}>
          ×
        </Button>
      </div>
      <Button
        variant="outline"
        className="os-btn-white mt-3 w-full"
        disabled={busy}
        onClick={() => copy("Codex")}
      >
        Copy for Codex
      </Button>
      <Button
        variant="outline"
        className="os-btn-white mt-2 w-full"
        disabled={busy}
        onClick={() => copy("grokbuild")}
      >
        Copy for grokbuild
      </Button>
      {status && (
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      )}
    </div>
  );
}
