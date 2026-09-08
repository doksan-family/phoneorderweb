import { PricingPolicyForm } from "@/features/pricing-policy-admin/ui/PricingPolicyForm";
import { adminFullPanelClass } from "@/shared/ui/adminPanelStyles";

export function AdminPricingPolicyPanel() {
  return (
    <section className={`grid gap-5 ${adminFullPanelClass}`}>
      <PricingPolicyForm />
    </section>
  );
}
