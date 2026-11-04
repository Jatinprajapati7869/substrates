export type EntitlementStatus = "active" | "past_due" | "canceled" | "refunded";

export type SectionAccess = "free" | "pro";
export type TemplateAccess = "none" | "credits" | "all";

export type EntitlementDoc = {
  plan: string;
  status: EntitlementStatus;
  creditsRemaining: number | null;
  creditsPeriodStart: Date | null;
  creditsPeriodEnd: Date | null;
  unlimitedTemplates?: boolean;
  sectionAccess: SectionAccess;
  templateAccess: TemplateAccess;
  billingCustomerId?: string | null;
  billingSubscriptionId?: string | null;
  providerCustomerPortalUrl?: string | null;
  /** Video skills product — independent of template plan (D16). */
  videoSkillsStatus?: EntitlementStatus;
  videoSkillsPlan?: string | null;
  videoSkillsPeriodEnd?: Date | null;
  videoBillingSubscriptionId?: string | null;
  updatedAt: Date;
};

export type UnlockDoc = {
  userId: string;
  slug: string;
  source: "credit" | "lifetime";
  createdAt: Date;
};
