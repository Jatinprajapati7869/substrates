import { createServerFn } from "@tanstack/react-start";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { loadAccountDashboardForUser } from "@/lib/account-dashboard.server";

export const getAccountDashboard = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => loadAccountDashboardForUser(context.userId));
