import { useQuery } from "@tanstack/react-query";
import { productQuoteQueryOptions } from "@/entities/product/model/quoteQueries";
import { resolvePricingSelection } from "@/entities/product/model/pricingSelection";
import { useState } from "react";
import type {
  ProductDetailProfile,
} from "@/entities/product/model/types";
import {
  getAvailableCarriers,
  getAvailableSubscriptions,
  getMatchedPricing,
  getSelectedId,
  getSubscriptionOptions,
  mapPlansFromPricing,
} from "./selectionOptions";

export function useProductDetailSelection(profile: ProductDetailProfile) {
  const [colorId, setColorId] = useState(profile.defaultSelection?.colorValue ?? profile.colors[0]?.id ?? "");
  const [capacityId, setCapacityId] = useState(profile.defaultSelection?.variantId ?? profile.capacities[0]?.id ?? "");
  const [carrierId, setCarrierId] = useState(profile.pricingOptions?.find((option) => option.id === profile.defaultSelection?.pricingId)?.carrierId ?? profile.joiningCarriers[0]?.id ?? "");
  const [saleTypeId, setSaleTypeId] = useState(profile.defaultSelection?.subscriptionType ?? getSubscriptionOptions(profile)[0]?.id ?? "");
  const [planId, setPlanId] = useState(profile.defaultSelection?.planId ?? profile.plans[0]?.id ?? "");
  const [discountTypeId, setDiscountTypeId] = useState(profile.defaultSelection?.discountType ?? "");
  const [installmentId, setInstallmentId] = useState(String(profile.defaultSelection?.installmentMonths ?? ""));
  const pricingOptions = profile.pricingOptions ?? [];
  const selectedColorId = getSelectedId(profile.colors, colorId);
  const selectedCapacityId = getSelectedId(profile.capacities, capacityId);
  const subscriptionOptions = getAvailableSubscriptions(
    getSubscriptionOptions(profile),
    pricingOptions,
    selectedCapacityId
  );
  const selectedSaleTypeId = getSelectedId(subscriptionOptions, saleTypeId);
  const carrierOptions = getAvailableCarriers(
    profile.joiningCarriers,
    pricingOptions,
    selectedCapacityId,
    selectedSaleTypeId
  );
  const selectedCarrierId = getSelectedId(carrierOptions, carrierId);
  const matchedPricing = getMatchedPricing(
    pricingOptions,
    selectedCapacityId,
    selectedSaleTypeId,
    selectedCarrierId
  );
  // 요금제는 통신사에 종속되므로 선택된 통신사의 요금제만 노출한다.
  const planOptions = pricingOptions.length
    ? mapPlansFromPricing(matchedPricing)
    : profile.plans;
  const selectedPlanId = getSelectedId(planOptions, planId);
  const selectedPricing =
    matchedPricing.find((option) => option.planId === selectedPlanId) ??
    matchedPricing[0];
  const selectedPlan =
    planOptions.find((plan) => plan.id === selectedPlanId) ?? planOptions[0];

  const resolved = resolvePricingSelection(selectedPricing, discountTypeId, installmentId);
  const request = profile.canApplyForConsultation === false ? null : resolved.request;
  const quote = useQuery(productQuoteQueryOptions(request));
  const consultationPayload = request && !quote.isError ? quote.data?.consultationPayload : undefined;

  return {
    carrierOptions,
    consultationPayload,
    discountTypeOptions: resolved.discountTypeOptions,
    estimate: request && !quote.isError ? quote.data?.estimate ?? null : null,
    quotePending: Boolean(request) && quote.isPending,
    quoteError: quote.error?.message,
    retryQuote: () => quote.refetch(),
    installmentOptions: resolved.installmentOptions,
    planOptions,
    selectedCapacityId,
    selectedCarrierId,
    selectedColorId,
    selectedDiscountTypeId: resolved.discountType ?? "",
    selectedInstallmentId: String(resolved.installmentMonths ?? ""),
    selectedPlan,
    selectedPlanId,
    selectedSaleTypeId,
    setCapacityId,
    setCarrierId,
    setColorId,
    setDiscountTypeId,
    setInstallmentId,
    setPlanId,
    setSaleTypeId,
    subscriptionOptions,
  };
}
