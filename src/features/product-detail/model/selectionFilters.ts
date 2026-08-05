import type {
  ProductOption,
  ProductPricingOption,
} from "@/entities/product/model/types";

export function getAvailableSubscriptions(
  options: ProductOption[],
  pricingOptions: ProductPricingOption[],
  variantId: string
) {
  if (!pricingOptions.length || !variantId) return options;
  const availableIds = new Set(
    pricingOptions
      .filter((option) => option.variantId === variantId)
      .map((option) => option.subscriptionType)
  );
  return filterOptions(options, availableIds);
}

export function getAvailableCarriers(
  options: ProductOption[],
  pricingOptions: ProductPricingOption[],
  variantId: string,
  subscriptionType: string
) {
  if (!pricingOptions.length || !variantId || !subscriptionType) return options;
  const availableIds = new Set(
    pricingOptions
      .filter((option) => isVariantSubscription(option, variantId, subscriptionType))
      .map((option) => option.carrierId)
  );
  return filterOptions(options, availableIds);
}

export function getMatchedPricing(
  options: ProductPricingOption[],
  variantId: string,
  subscriptionType: string,
  carrierId: string
) {
  return options.filter((option) => {
    return (
      isVariantSubscription(option, variantId, subscriptionType) &&
      option.carrierId === carrierId
    );
  });
}

function filterOptions(options: ProductOption[], availableIds: Set<string>) {
  if (!availableIds.size) return options;
  return options.filter((option) => availableIds.has(option.id));
}

function isVariantSubscription(
  option: ProductPricingOption,
  variantId: string,
  subscriptionType: string
) {
  return option.variantId === variantId && option.subscriptionType === subscriptionType;
}
