import { useEffect } from "react";

const COOKIE_KEY = "supply-cookie-choice";

/** Makes the captured shell (cookie banner, phone navigation) work on imported pages. */
export function useSupplyShell() {
  useEffect(() => {
    const banner = () => document.querySelector<HTMLElement>('[aria-label="Cookie preferences"]');
    if (localStorage.getItem(COOKIE_KEY)) banner()?.setAttribute("hidden", "");

    const aside = () => document.querySelector<HTMLElement>("aside");
    const openBtn = () => document.querySelector<HTMLElement>('button[aria-label="Open navigation"]');
    let backdrop: HTMLDivElement | null = null;

    const setNav = (open: boolean) => {
      const a = aside();
      if (!a) return;
      openBtn()?.setAttribute("aria-expanded", String(open));
      if (open) {
        Object.assign(a.style, { display: "block", zIndex: "61", width: "248px", paddingRight: "0" });
        backdrop = document.createElement("div");
        Object.assign(backdrop.style, { position: "fixed", inset: "0", zIndex: "60", background: "rgba(0,0,0,.25)" });
        backdrop.setAttribute("data-supply-backdrop", "");
        document.body.appendChild(backdrop);
        document.body.style.overflow = "hidden";
      } else {
        a.removeAttribute("style");
        backdrop?.remove();
        backdrop = null;
        document.body.style.overflow = "";
      }
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest("button");
      if (btn && btn.closest('[aria-label="Cookie preferences"]')) {
        const choice = btn.textContent?.trim();
        if (choice === "Accept" || choice === "Decline") {
          localStorage.setItem(COOKIE_KEY, choice);
          banner()?.setAttribute("hidden", "");
        }
        return;
      }
      if (btn?.getAttribute("aria-label") === "Open navigation") return setNav(!backdrop);
      if (t.hasAttribute("data-supply-backdrop")) return setNav(false);
      if (backdrop && t.closest("aside a")) setNav(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && backdrop) setNav(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      setNav(false);
    };
  }, []);
}
