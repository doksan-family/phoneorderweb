import type {
  PublicDiscountOption,
  PublicProductDetail,
  PublicProductPricingOption,
} from "@/entities/product/api/public";
import type {
  ProductInstallmentOption,
  ProductPricingOption,
  ProductQuoteDiscountOption,
} from "./types";
import { isSelectableSubscriptionType } from "@/shared/config/subscription";
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

  return detail.pricing_options
    .filter((option) => isSelectableSubscriptionType(option.subscription_type))
    .map((option) => ({
    id: option.pricing_id,
    variantId: option.variant_id,
    carrierId: option.carrier_id,
    planId: option.plan_id,
    planName: option.plan_name,
    planMonthlyPrice: option.plan_monthly_fee,
    subscriptionType: option.subscription_type,
    subscriptionTypeLabel: option.subscription_type_label,
    publicSupportAmount: option.public_support_amount ?? 0,
    rebateAmount: option.rebate_amount ?? 0,
    estimate: mapEstimate(option),
    installmentOptions: mapInstallmentOptions(option),
    discountOptions: mapDiscountOptions(option.discount_options),
    consultationPayload: mapConsultationPayload(option.consultation_payload),
  }));
}

export function getDefaultPricingOption(detail: PublicProductDetail) {
  const options = (detail.pricing_options ?? []).filter((option) =>
    isSelectableSubscriptionType(option.subscription_type)
  );
  if (!options.length) return undefined;
  const defaultVariantId = detail.default_variant?.id;
  return (
    options.find((option) => option.variant_id === defaultVariantId) ??
    options[0]
  );
}

export function mapDiscountOptions(
  options: PublicDiscountOption[] | undefined
): ProductQuoteDiscountOption[] {
  if (!options?.length) return [];

  return options.map((option) => ({
    discountType: option.discount_type,
    discountTypeLabel: option.discount_type_label,
    estimate: mapQuoteToEstimate(option.quote),
    installmentOptions:
      option.installment_options?.map((installment) => ({
        consultationPayload: mapConsultationPayload(
          installment.consultation_payload
        ),
        estimate: mapQuoteToEstimate(installment.quote),
        months: installment.installment_months,
      })) ?? [],
  }));
}

function mapInstallmentOptions(
  option: PublicProductPricingOption
): ProductInstallmentOption[] {
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
      months: option.quote.installment_months ?? 0,
    },
  ];
}
