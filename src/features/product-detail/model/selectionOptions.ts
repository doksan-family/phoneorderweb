import type {
  ProductDetailProfile,
  ProductInstallmentOption,
  ProductOption,
  ProductPlanOption,
  ProductPricingOption,
} from "@/entities/product/model/types";

export {
  getAvailableCarriers,
  getAvailableSubscriptions,
  getMatchedPricing,
} from "./selectionFilters";

export function mapPlansFromPricing(options: ProductPricingOption[]): ProductPlanOption[] {
  const plans = new Map<string, ProductPlanOption>();
  options.forEach((option) => {
    if (plans.has(option.planId)) return;
    plans.set(option.planId, {
      id: option.planId,
      label: option.planName,
      monthlyPrice: option.planMonthlyPrice,
      benefits: [option.subscriptionTypeLabel, `월 예상 ${option.estimate.monthlyTotal.toLocaleString("ko-KR")}원`],
    });
  });

  return Array.from(plans.values());
}

export function mapInstallmentOptions(
  options: ProductInstallmentOption[]
): ProductOption[] {
  const months = new Set<number>();

  return options
    .filter((option) => option.months > 0)
    .sort((first, second) => first.months - second.months)
    .filter((option) => {
      if (months.has(option.months)) return false;
      months.add(option.months);
      return true;
    })
    .map((option) => {
      return { id: String(option.months), label: `${option.months}개월` };
    });
}

export function getSubscriptionOptions(profile: ProductDetailProfile) {
  if (profile.subscriptionTypes?.length) return profile.subscriptionTypes;
  // API가 가입 유형을 안 주면 임의 목록을 채우지 않고 비운다.
  return profile.pricingOptions?.length
    ? mapSubscriptionsFromPricing(profile.pricingOptions)
    : [];
}

export function getSelectedId(options: { id: string }[], currentId: string) {
  if (options.some((option) => option.id === currentId)) return currentId;
  return options[0]?.id ?? "";
}

function mapSubscriptionsFromPricing(options: ProductPricingOption[]) {
  const subscriptionOptions = new Map<string, ProductOption>();
  options.forEach((option) => {
    if (subscriptionOptions.has(option.subscriptionType)) return;
    subscriptionOptions.set(option.subscriptionType, {
      id: option.subscriptionType,
      label: option.subscriptionTypeLabel,
    });
  });
  return Array.from(subscriptionOptions.values());
}
