import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { getClientAuth } from "@/integrations/firebase/client";

const AccountContext = createContext<{ user: User | null; loading: boolean; signOut: () => Promise<void> }>({
  user: null,
  loading: true,
  signOut: async () => {},
});
export const useAccount = () => useContext(AccountContext);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    const auth = getClientAuth();
    const unsubscribe = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setLoading(false);
      void router.invalidate();
      void queryClient.invalidateQueries();
    });
    return () => unsubscribe();
  }, [router, queryClient]);
  useEffect(() => {
    const update = () =>
      document.querySelectorAll<HTMLAnchorElement>('a[href="/signin"], a[data-account-link]').forEach((link) => {
        const original = link.dataset["accountOriginal"] || link.textContent?.trim() || "Sign in";
        link.dataset["accountOriginal"] = original;
        if (!/^(Sign in|Log in|Account)$/i.test(original)) return;
        link.dataset["accountLink"] = "true";
        const text = user ? "Account" : original;
        if (link.textContent !== text) link.textContent = text;
      });
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [user]);
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await firebaseSignOut(getClientAuth());
    setUser(null);
    await router.navigate({ to: "/signin", replace: true });
  }
  return <AccountContext.Provider value={{ user, loading, signOut }}>{children}</AccountContext.Provider>;
}
