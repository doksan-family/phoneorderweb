import type {
  PublicProductDetail,
  PublicProductPricingOption,
} from "@/entities/product/api/public";
import type { ProductPricingOption } from "./types";
import {
  mapConsultationPayload,
  mapQuoteToEstimate,
} from "./publicProductQuoteMapper";

export function mapEstimate(option: PublicProductPricingOption) {
  return mapQuoteToEstimate(option.quote);
}

export function mapPricingOptions(
  detail: PublicProductDetail
): ProductPricingOption[] {
  if (!detail.pricing_options?.length) return [];

  return detail.pricing_options.map((option) => ({
    id: option.pricing_id,
    variantId: option.variant_id,
    carrierId: option.carrier_id,
    planId: option.plan_id,
    planName: option.plan_name,
    planMonthlyPrice: option.plan_monthly_fee,
    subscriptionType: option.subscription_type,
    subscriptionTypeLabel: option.subscription_type_label,
    estimate: mapEstimate(option),
    installmentOptions: mapInstallmentOptions(option),
    consultationPayload: mapConsultationPayload(option.consultation_payload),
  }));
}

export function getDefaultPricingOption(detail: PublicProductDetail) {
  if (!detail.pricing_options?.length) return undefined;
  const defaultVariantId = detail.default_variant?.id;
  return (
    detail.pricing_options.find((option) => option.variant_id === defaultVariantId) ??
    detail.pricing_options[0]
  );
}

function mapInstallmentOptions(option: PublicProductPricingOption) {
  if (option.installment_options?.length) {
    return option.installment_options.map((installment) => ({
      consultationPayload: mapConsultationPayload(installment.consultation_payload),
      estimate: mapQuoteToEstimate(installment.quote),
      months: installment.installment_months,
    }));
  }

  return [
    {
      consultationPayload: mapConsultationPayload(option.consultation_payload),
      estimate: mapEstimate(option),
      months: option.quote.installment_months,
    },
  ];
}
