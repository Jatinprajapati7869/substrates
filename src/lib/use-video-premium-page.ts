import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getMyEntitlement } from "@/lib/checkout.functions";

/** Hides `[data-video-member-only]` blocks on premium style demo pages when the visitor lacks video access. */
export function useVideoPremiumPageLock(isPremiumStyle: boolean) {
  const fetchEnt = useServerFn(getMyEntitlement);
  const [access, setAccess] = useState(false);
  const [ready, setReady] = useState(!isPremiumStyle);

  useEffect(() => {
    if (!isPremiumStyle) return;
    let active = true;
    void (async () => {
      try {
        const ent = await fetchEnt();
        if (active) setAccess(Boolean(ent.videoSkillsActive));
      } catch {
        if (active) setAccess(false);
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [fetchEnt, isPremiumStyle]);

  useEffect(() => {
    if (!isPremiumStyle || !ready || access) return;
    document.querySelectorAll("[data-video-member-only]").forEach((el) => {
      el.setAttribute("hidden", "");
    });
  }, [access, isPremiumStyle, ready]);
}
