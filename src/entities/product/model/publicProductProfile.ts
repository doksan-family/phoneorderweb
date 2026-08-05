import type { PublicProductDetail } from "@/entities/product/api/public";
import type { ProductDetailProfile } from "./types";
import {
  getDefaultPricingOption,
  mapEstimate,
  mapPricingOptions,
} from "./publicProductProfileEstimate";
import {
  mapCapacities,
  mapCarriers,
  mapColors,
  mapSubscriptionTypes,
} from "./publicProductProfileOptions";

export function mapPublicProductDetailToProfile(
  detail: PublicProductDetail,
  fallback: ProductDetailProfile
): ProductDetailProfile {
  const pricing = getDefaultPricingOption(detail);

  // fallback(목업)에서 넘어오는 값이 화면에 노출되지 않도록
  // API가 내려주지 않는 항목은 명시적으로 비운다.
  return {
    ...fallback,
    colors: mapColors(detail.colors),
    capacities: mapCapacities(detail),
    currentCarriers: [],
    joiningCarriers: mapCarriers(detail),
    plans: [],
    discounts: [],
    detailTabs: { modelInfo: [], cautions: [] },
    subscriptionTypes: mapSubscriptionTypes(detail),
    pricingOptions: mapPricingOptions(detail, fallback),
    estimate: pricing ? mapEstimate(pricing, fallback) : fallback.estimate,
  };
}
