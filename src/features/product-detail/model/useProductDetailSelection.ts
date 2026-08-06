import { useState } from "react";
import type {
  ProductDetailProfile,
  ProductEstimate,
} from "@/entities/product/model/types";
import {
  getAvailableCarriers,
  getAvailableSubscriptions,
  getMatchedPricing,
  getSelectedId,
  getSubscriptionOptions,
  mapInstallmentOptions,
  mapPlansFromPricing,
} from "./selectionOptions";

export function useProductDetailSelection(profile: ProductDetailProfile) {
  const [colorId, setColorId] = useState(profile.colors[0]?.id ?? "");
  const [capacityId, setCapacityId] = useState(profile.capacities[0]?.id ?? "");
  const [carrierId, setCarrierId] = useState(profile.joiningCarriers[0]?.id ?? "");
  const [saleTypeId, setSaleTypeId] = useState(getSubscriptionOptions(profile)[0]?.id ?? "");
  const [planId, setPlanId] = useState(profile.plans[0]?.id ?? "");
  const [installmentId, setInstallmentId] = useState("");
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
  const installmentOptions = selectedPricing
    ? mapInstallmentOptions(selectedPricing.installmentOptions)
    : [];
  const selectedInstallmentId = getSelectedId(installmentOptions, installmentId);
  const selectedInstallment =
    selectedPricing?.installmentOptions.find((option) => {
      return String(option.months) === selectedInstallmentId;
    }) ?? selectedPricing?.installmentOptions[0];
  const baseConsultationPayload =
    selectedInstallment?.consultationPayload ?? selectedPricing?.consultationPayload;
  const consultationPayload = baseConsultationPayload
    ? {
        ...baseConsultationPayload,
        installmentMonths:
          selectedInstallment?.months ?? baseConsultationPayload.installmentMonths,
      }
    : undefined;

  return {
    carrierOptions,
    consultationPayload,
    estimate: (selectedInstallment?.estimate ??
      selectedPricing?.estimate ??
      profile.estimate) as ProductEstimate | null,
    installmentOptions,
    planOptions,
    selectedCapacityId,
    selectedCarrierId,
    selectedColorId,
    selectedInstallmentId,
    selectedPlan,
    selectedPlanId,
    selectedSaleTypeId,
    setCapacityId,
    setCarrierId,
    setColorId,
    setInstallmentId,
    setPlanId,
    setSaleTypeId,
    subscriptionOptions,
  };
}
