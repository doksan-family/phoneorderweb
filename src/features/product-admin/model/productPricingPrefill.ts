import type { AdminProductSummary } from "@/entities/product/api/admin";
import type { ProductCreatePricingOverrideInput } from "@/entities/product/api/types";
import { availableDiscountTypes } from "../../../entities/product/model/discountTypes.ts";
import type { ProductPricingEntryDraft } from "./types";

/** 규칙의 우선순위와 구체성을 적용한 후 요금제당 한 항목으로 복원한다. */
export function buildPricingEntries(product: Pick<AdminProductSummary, "planIds" | "subscriptionTypes" | "variants" | "pricingOverrides">): ProductPricingEntryDraft[] {
  const planIds = [...new Set([...product.planIds, ...product.pricingOverrides.flatMap((row) => row.plan_id ? [row.plan_id] : [])])];
  const rules = product.pricingOverrides
    .map((row, index) => ({ row, index }))
    .sort((a, b) => (a.row.priority ?? 0) - (b.row.priority ?? 0) || specificity(a.row) - specificity(b.row) || a.index - b.index);
  return planIds.map((planId, index) => {
    const entry: ProductPricingEntryDraft = {
      id: `entry-${index}`, carrierCode: "", planId,
      availableDiscountTypes: availableDiscountTypes(),
      subscriptionTypes: [...product.subscriptionTypes], publicSupportBySubType: {}, rebateBySubType: {}, conditionOverrides: {},
    };
    for (const sub of entry.subscriptionTypes) {
      entry.publicSupportBySubType[sub] = {};
      entry.conditionOverrides![sub] = {};
      for (const variant of product.variants) {
        const storage = variant.storage_value;
        let isActive = true;
        let support = 0;
        let rebate = 0;
        let discounts = availableDiscountTypes();
        for (const { row } of rules) {
          if ((row.plan_id && row.plan_id !== planId) || (row.subscription_type && row.subscription_type !== sub) || (row.storage_value && row.storage_value !== storage)) continue;
          if (row.is_active !== undefined) isActive = row.is_active;
          if (row.public_support_amount != null) support = row.public_support_amount;
          if (row.rebate_amount != null) rebate = row.rebate_amount;
          discounts = availableDiscountTypes(row.available_discount_types);
        }
        entry.publicSupportBySubType[sub][storage] = support;
        entry.rebateBySubType[sub] ??= rebate;
        entry.conditionOverrides![sub][storage] = { availableDiscountTypes: discounts, rebateAmount: rebate, ...(isActive ? {} : { isActive }) };
      }
    }
    const conditions = Object.values(entry.conditionOverrides!).flatMap(Object.values);
    const first = conditions[0];
    if (first?.availableDiscountTypes) entry.availableDiscountTypes = [...first.availableDiscountTypes];
    // 공통값과 같은 셀은 개별 설정에서 제거하여 일반 입력을 간결하게 유지한다.
    for (const [sub, cells] of Object.entries(entry.conditionOverrides!)) {
      for (const [storage, cell] of Object.entries(cells)) {
        if (cell.availableDiscountTypes?.join() === entry.availableDiscountTypes.join()) delete cell.availableDiscountTypes;
        if (cell.rebateAmount === entry.rebateBySubType[sub]) delete cell.rebateAmount;
        if (!Object.keys(cell).length) delete cells[storage];
      }
    }
    return entry;
  });
}

function specificity(row: ProductCreatePricingOverrideInput) {
  return Number(Boolean(row.plan_id)) + Number(Boolean(row.subscription_type)) + Number(Boolean(row.storage_value));
}
