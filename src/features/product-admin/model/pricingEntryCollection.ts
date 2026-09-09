import type { AdminPlan } from "@/entities/plan/api/admin";
import type { DiscountType, ProductPricingEntryDraft } from "./types";

export function entryCarrier(entry: ProductPricingEntryDraft, plans: AdminPlan[]) {
  return entry.carrierCode || plans.find((plan) => plan.id === entry.planId)?.carrier_code || "unassigned";
}

export function groupPricingEntries(entries: ProductPricingEntryDraft[], plans: AdminPlan[], carrier: string) {
  const groups = new Map<string, { id: string; name: string; entries: ProductPricingEntryDraft[] }>();
  for (const entry of entries) {
    if (entryCarrier(entry, plans) !== carrier) continue;
    const id = entry.planId || entry.id;
    const group = groups.get(id) ?? {
      id, name: plans.find((plan) => plan.id === entry.planId)?.name || (entry.planId ? "목록에 없는 요금제" : "요금제 미선택"), entries: [],
    };
    group.entries.push(entry);
    groups.set(id, group);
  }
  return [...groups.values()];
}

export function createPricingEntries(
  entries: ProductPricingEntryDraft[], plans: AdminPlan[], discounts: DiscountType[],
  createEmpty: () => ProductPricingEntryDraft, template?: ProductPricingEntryDraft,
) {
  const occupied = new Set(entries.map((entry) => entry.planId));
  const additions: ProductPricingEntryDraft[] = [];
  for (const plan of plans) {
    if (occupied.has(plan.id) || !discounts.length) continue;
    const empty = createEmpty();
    additions.push({
      ...(template ? structuredClone(template) : empty), id: empty.id,
      planId: plan.id, carrierCode: plan.carrier_code, availableDiscountTypes: [...discounts],
    });
    occupied.add(plan.id);
  }

  return additions;
}

export const pricingDiscountLabels: Record<DiscountType, string> = {
  public_support: "공시지원금", contract_discount: "선택약정",
};
