import {
  pricingLifetimePlanHeadline,
  pricingMembershipChipLine,
  pricingSectionsPlanHeadline,
  pricingTemplatesPlanHeadline,
  proSectionAvailabilityOnPricingLine,
  templateAvailabilityOnPricingLine,
} from "@/lib/public-claims";

export function PricingMembershipChip() {
  return <span data-testid="pricing-membership-chip">{pricingMembershipChipLine()}</span>;
}

export function PricingSectionsPlanHeadline() {
  return <span data-testid="pricing-sections-plan-headline">{pricingSectionsPlanHeadline()}</span>;
}

export function PricingTemplatesPlanHeadline() {
  return (
    <span data-testid="pricing-templates-plan-headline">{pricingTemplatesPlanHeadline()}</span>
  );
}

export function PricingLifetimePlanHeadline() {
  return <span data-testid="pricing-lifetime-plan-headline">{pricingLifetimePlanHeadline()}</span>;
}

export function PricingTemplateAvailabilityLine() {
  return (
    <p
      className="mt-2 text-[12px] leading-snug text-[var(--text-secondary)]"
      data-testid="pricing-template-availability"
    >
      {templateAvailabilityOnPricingLine()}
    </p>
  );
}

export function PricingProSectionAvailabilityLine() {
  return (
    <p
      className="mt-2 text-[12px] leading-snug text-[var(--text-secondary)]"
      data-testid="pricing-pro-section-availability"
    >
      {proSectionAvailabilityOnPricingLine()}
    </p>
  );
}
