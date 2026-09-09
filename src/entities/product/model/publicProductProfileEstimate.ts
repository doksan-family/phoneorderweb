import { availableDiscountTypes, isDiscountType } from "./discountTypes.ts";
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
import { isSelectableSubscriptionType } from "../../../shared/config/subscription.ts";
import {
  mapConsultationPayload,
  mapQuoteToEstimate,
} from "./publicProductQuoteMapper.ts";

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
    id: option.pricing_id || option.id || "",
    availableDiscountTypes: availableDiscountTypes(option.available_discount_types),
    variantId: option.variant_id || option.product_variant_id || "",
    carrierId: option.carrier_id || option.carrier_code || option.carrier_name,
    planId: option.plan_id,
    planName: option.plan_name,
    planMonthlyPrice: option.plan_monthly_fee,
    subscriptionType: option.subscription_type,
    subscriptionTypeLabel: option.subscription_type_label,
    publicSupportAmount: option.public_support_amount ?? 0,
    rebateAmount: option.rebate_amount ?? 0,
    estimate: mapEstimate(option),
    installmentOptions: mapInstallmentOptions(option),
    discountOptions: mapPricingDiscountOptions(option),
    consultationPayload: mapConsultationPayload(option.consultation_payload),
  }));
}

export function getDefaultPricingOption(detail: PublicProductDetail) {
  const options = (detail.pricing_options ?? []).filter((option) =>
    isSelectableSubscriptionType(option.subscription_type)
  );
  if (!options.length) return undefined;
  const defaultId = detail.default_selection?.pricing_id ?? detail.consultation_payload?.pricing_id;
  const defaultVariantId = detail.default_selection?.variant_id ?? detail.default_variant?.id;
  return (
    options.find((option) => option.pricing_id === defaultId) ??
    options.find((option) => option.variant_id === defaultVariantId) ??
    options[0]
  );
}

export function getDefaultConsultationSelection(detail: PublicProductDetail) {
  const pricing = getDefaultPricingOption(detail);
  if (!pricing) return undefined;
  const selection = detail.default_selection;
  const base = detail.consultation_payload?.pricing_id === pricing.pricing_id
    ? detail.consultation_payload : pricing.consultation_payload;
  const type = selection?.discount_type;
  const months = selection?.installment_months;
  return mapConsultationPayload({
    product_id: detail.id, pricing_id: pricing.pricing_id,
    variant_id: pricing.variant_id, plan_id: pricing.plan_id,
    subscription_type: pricing.subscription_type,
    discount_type: typeof type === "string" && isDiscountType(type) ? type : base?.discount_type ?? pricing.quote.discount_type,
    installment_months: typeof months === "number" && months > 0 ? months : base?.installment_months ?? pricing.quote.installment_months,
    color_value: typeof selection?.color_value === "string" ? selection.color_value : base?.color_value,
  });
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

export function mapPricingDiscountOptions(option: PublicProductPricingOption) {
  const allowed = availableDiscountTypes(option.available_discount_types);
  const options = mapDiscountOptions(option.discount_options).filter((item) => allowed.includes(item.discountType));
  const type = option.quote.discount_type;
  if (!options.length && type && allowed.includes(type)) {
    return [{ discountType: type, discountTypeLabel: option.quote.discount_type_label || type,
      estimate: mapEstimate(option), installmentOptions: mapInstallmentOptions(option) }];
  }
  return options;
}
