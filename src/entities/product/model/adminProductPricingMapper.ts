import type {
  AdminPricingDiscount,
  AdminPricingInstallment,
  AdminPricingOption,
  AdminPricingSummary,
} from "@/entities/product/api/adminProductPricingTypes";
import type { PricingPolicy } from "@/entities/pricing-policy/api/types";
import { availableDiscountTypes, isDiscountType } from "./discountTypes";
import { mapQuoteToEstimate } from "./publicProductQuoteMapper";
import {
  getBoolean,
  getNumber,
  getRecord,
  getString,
  getStringArray,
  toRecord,
} from "./adminProductValue";

function rows(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.map(toRecord).filter((row): row is Record<string, unknown> => row !== null);
}

function mapInstallments(value: unknown): AdminPricingInstallment[] {
  return rows(value)
    .map((row) => {
      const quote = getRecord(row.quote);
      const months = getNumber(row.installment_months) ?? getNumber(quote?.installment_months) ?? 0;
      if (!quote || months <= 0) return null;
      return { months, estimate: mapQuoteToEstimate(quote), fromServer: true };
    })
    .filter((item): item is AdminPricingInstallment => item !== null)
    .sort((first, second) => first.months - second.months);
}

function mapDiscounts(value: unknown): AdminPricingDiscount[] {
  return rows(value)
    .map((row) => {
      const type = getString(row.discount_type);
      if (!isDiscountType(type)) return null;
      const installments = mapInstallments(row.installment_options);
      const quote = getRecord(row.quote);
      if (!installments.length && quote) {
        const months = getNumber(quote.installment_months) ?? 0;
        if (months > 0) {
          installments.push({ months, estimate: mapQuoteToEstimate(quote), fromServer: true });
        }
      }
      if (!installments.length) return null;
      return {
        discountType: type,
        discountTypeLabel: getString(row.discount_type_label) || (type === "public_support" ? "공시지원금" : "선택약정"),
        installments,
      };
    })
    .filter((item): item is AdminPricingDiscount => item !== null);
}

function mapSummary(value: unknown): AdminPricingSummary | null {
  const rec = getRecord(value);
  if (!rec) return null;
  return {
    publicSupportAmount: getNumber(rec.public_support_amount) ?? 0,
    contractDiscountRate: getNumber(rec.contract_discount_rate) ?? 0,
    monthlyContractDiscountAmount: getNumber(rec.monthly_contract_discount_amount) ?? 0,
    rebateAmount: getNumber(rec.rebate_amount) ?? 0,
  };
}

export function mapAdminPricingOptions(item: Record<string, unknown>): AdminPricingOption[] {
  return rows(item.pricing_options).map((row, index) => {
    const plan = getRecord(row.plan);
    return {
      id: getString(row.id) || getString(row.pricing_id) || String(index),
      storageValue: getString(row.storage_value),
      releasePrice: getNumber(row.release_price) ?? 0,
      carrierName: getString(row.carrier_name) || getString(getRecord(row.carrier)?.name),
      planId: getString(row.plan_id) || getString(plan?.id),
      planName: getString(row.plan_name) || getString(plan?.name),
      planMonthlyFee: getNumber(row.plan_monthly_fee) ?? getNumber(plan?.monthly_fee) ?? 0,
      planDescription: getStringArray(plan?.description),
      planDataAmount: getString(plan?.data_amount),
      planCallText: getString(plan?.call_text_description),
      subscriptionType: getString(row.subscription_type),
      subscriptionTypeLabel: getString(row.subscription_type_label),
      availableDiscountTypes: availableDiscountTypes(getStringArray(row.available_discount_types)),
      publicSupportAmount: getNumber(row.public_support_amount) ?? 0,
      rebateAmount: getNumber(row.rebate_amount) ?? 0,
      summary: mapSummary(row.discount_summary),
      discounts: mapDiscounts(row.discount_options),
      isActive: getBoolean(row.is_active) ?? true,
    };
  });
}

export function mapAdminPricingPolicy(item: Record<string, unknown>): PricingPolicy | undefined {
  const rec = getRecord(item.pricing_policy);
  if (!rec) return undefined;
  return {
    contract_discount_rate: getNumber(rec.contract_discount_rate) ?? 0,
    installment_annual_rate: getNumber(rec.installment_annual_rate) ?? 0,
    installment_calculation_method: getString(rec.installment_calculation_method) || "equal_payment",
    rebate_applies_to_public_support: getBoolean(rec.rebate_applies_to_public_support) ?? false,
    rebate_applies_to_contract_discount: getBoolean(rec.rebate_applies_to_contract_discount) ?? false,
    updated_at: getString(rec.updated_at),
  };
}
