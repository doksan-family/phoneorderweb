import type { PublicProductDetail } from "@/entities/product/api/public";
import type { ProductDetailProfile } from "./types";
import {
  getDefaultPricingOption,
  mapDiscountOptions,
  mapEstimate,
  mapPricingOptions,
} from "./publicProductProfileEstimate";
import {
  mapCapacities,
  mapCarriers,
  mapColors,
  mapSubscriptionTypes,
} from "./publicProductProfileOptions";

/** API 응답이 없을 때 쓰는 빈 프로필. 목업 값을 화면에 내보내지 않는다. */
export const emptyProductDetailProfile: ProductDetailProfile = {
  colors: [],
  capacities: [],
  currentCarriers: [],
  joiningCarriers: [],
  plans: [],
  discounts: [],
  subscriptionTypes: [],
  pricingOptions: [],
  discountOptions: [],
  estimate: null,
  detailTabs: { modelInfo: [], cautions: [] },
};

export function mapPublicProductDetailToProfile(
  detail: PublicProductDetail
): ProductDetailProfile {
  const pricing = getDefaultPricingOption(detail);

  return {
    ...emptyProductDetailProfile,
    colors: mapColors(detail.colors),
    capacities: mapCapacities(detail),
    currentCarriers: [],
    joiningCarriers: mapCarriers(detail),
    plans: [],
    discounts: [],
    detailTabs: { modelInfo: [], cautions: [] },
    subscriptionTypes: mapSubscriptionTypes(detail),
    pricingOptions: mapPricingOptions(detail),
    discountOptions: pricing ? mapDiscountOptions(pricing.discount_options) : [],
    estimate: pricing ? mapEstimate(pricing) : null,
  };
}
