import { Button } from "@/components/ui/button";
import { Code2, Hammer } from "lucide-react";
export function AssistantCopyOptions() {
  return (
    <>
      <Button
        variant="ghost"
        role="menuitem"
        title="Copy section for Codex"
        className="h-11 w-full justify-start text-text"
      >
        <Code2 />
        Codex
      </Button>
      <Button
        variant="ghost"
        role="menuitem"
        title="Copy section for grokbuild"
        className="h-11 w-full justify-start text-text"
      >
        <Hammer />
        grokbuild
      </Button>
    </>
  );
}
