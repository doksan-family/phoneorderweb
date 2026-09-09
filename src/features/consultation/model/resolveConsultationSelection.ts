import type { ProductDetailProfile } from "@/entities/product/model/types";
import { resolvePricingSelection } from "../../../entities/product/model/pricingSelection.ts";

type Search = { get: (name: string) => string | null };

/** URL의 오래되거나 조작된 선택값을 다른 요금 조건으로 조용히 대체하지 않는다. */
export function resolveConsultationSelection(profile: ProductDetailProfile | undefined, search: Search) {
  if (!profile || profile.canApplyForConsultation === false) return null;
  const options = profile.pricingOptions ?? [];
  const pricingId = search.get("pricingId");
  const planId = search.get("planId");
  const variantId = search.get("variantId");
  const sub = search.get("subscriptionType");
  const pricing = pricingId ? options.find((option) => option.id === pricingId)
    : planId || variantId || sub ? options.find((option) => (!planId || option.planId === planId) && (!variantId || option.variantId === variantId) && (!sub || option.subscriptionType === sub))
    : options.find((option) => option.id === profile.defaultSelection?.pricingId) ?? options[0];
  if (!pricing || (planId && planId !== pricing.planId) || (variantId && variantId !== pricing.variantId) || (sub && sub !== pricing.subscriptionType)) return null;
  const color = search.get("colorValue");
  if (color && !profile.colors.some((option) => option.id === color)) return null;
  const discount = search.get("discountType");
  const months = search.get("installmentMonths");
  if (discount && !pricing.availableDiscountTypes.some((type) => type === discount)) return null;
  const resolved = resolvePricingSelection(pricing, discount ?? profile.defaultSelection?.discountType ?? "", months ?? String(profile.defaultSelection?.installmentMonths ?? ""));
  if (months && String(resolved.installmentMonths) !== months) return null;
  if (!resolved.request) return null;
  return { pricing, color: color || undefined, ...resolved };
}
