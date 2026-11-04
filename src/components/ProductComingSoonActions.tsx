import { Button } from "@/components/ui/button";

export const COMING_SOON_STATUS =
  "Full rebuild prompt is not published yet. You can still browse previews and details.";

export function ProductComingSoonActions() {
  return (
    <Button className="os-btn-dark" disabled aria-disabled>
      Coming soon
    </Button>
  );
}
