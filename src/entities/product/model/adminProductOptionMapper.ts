import type {
  ProductCreateColorInput,
  ProductCreatePricingOverrideInput,
  ProductCreateVariantInput,
} from "@/entities/product/api/types";
import { getBoolean, getNumber, getString, getStringArray, toRecord } from "./adminProductValue";

/**
 * 수정 폼 prefill에 쓰는 옵션/요금 정보.
 * 응답에 없는 항목은 빈 배열이며, 이때는 PATCH에서 아예 보내지 않아 기존 값이 유지된다.
 */
export function mapAdminProductOptions(item: Record<string, unknown>) {
  return {
    variants: mapRows(item.variants).map(mapVariant).filter((row) => row.storage_value),
    colors: mapRows(item.colors).map(mapColor).filter((row) => row.label),
    planIds: mapPlanIds(item),
    subscriptionTypes: getStringArray(item.subscription_types),
    installmentMonthOptions: mapNumbers(item.installment_month_options),
    pricingOverrides: mapRows(item.pricing_overrides).map(mapPricingOverride),
  };
}

function mapRows(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];

  return value
    .map(toRecord)
    .filter((row): row is Record<string, unknown> => row !== null);
}

function mapNumbers(value: unknown): number[] {
  if (!Array.isArray(value)) return [];

  return value
    .map(getNumber)
    .filter((item): item is number => item !== null);
}

/** 요금제는 plan_ids로 오기도 하고 plans 배열 안의 plan_id로 오기도 한다. */
function mapPlanIds(item: Record<string, unknown>): string[] {
  const direct = getStringArray(item.plan_ids);
  if (direct.length) return direct;

  return mapRows(item.plans)
    .map((row) => getString(row.plan_id) || getString(row.id))
    .filter(Boolean);
}

function mapVariant(row: Record<string, unknown>, index: number): ProductCreateVariantInput {
  return {
    storage_value: getString(row.storage_value),
    release_price:
      getNumber(row.release_price) ?? getNumber(row.original_price) ?? 0,
    display_order: getNumber(row.display_order) ?? index,
    is_active: getBoolean(row.is_active) ?? true,
  };
}

function mapColor(row: Record<string, unknown>, index: number): ProductCreateColorInput {
  const colorHex = getString(row.color_hex) || getString(row.value);

  return {
    label: getString(row.label) || getString(row.color_name),
    value: getString(row.value) || colorHex,
    color_hex: colorHex || null,
    display_order: getNumber(row.display_order) ?? index,
    is_active: getBoolean(row.is_active) ?? true,
  };
}

function mapPricingOverride(
  row: Record<string, unknown>,
  index: number
): ProductCreatePricingOverrideInput {
  return {
    storage_value: getString(row.storage_value) || undefined,
    plan_id: getString(row.plan_id) || undefined,
    subscription_type: getString(row.subscription_type) || undefined,
    public_support_amount: getNumber(row.public_support_amount) ?? undefined,
    rebate_amount: getNumber(row.rebate_amount) ?? undefined,
    priority: getNumber(row.priority) ?? 0,
    display_order: getNumber(row.display_order) ?? index,
    is_active: getBoolean(row.is_active) ?? true,
  };
}
