"use client";

import { pricingEntryCondition } from "./pricingEntryCondition";
import type { DiscountType } from "./types";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { pricingPreviewComparison } from "./pricingPreviewComparison";
import { pricingPolicyQueryOptions } from "@/entities/pricing-policy/model/queries";
import type { ProductPricingEntryDraft } from "./types";

/**
 * 가격 계산 정책 조회 API와 요금제 목록을 읽어
 * 관리자 폼에서 칸별 월 납부금 미리보기를 계산한다.
 */
export function usePricingPreview(includeInactive = false) {
  const plansQuery = useQuery(planQueryOptions.adminList(includeInactive ? { includeInactive: true } : {}));
  const policyQuery = useQuery(pricingPolicyQueryOptions.admin());

  const planFeeById = useMemo(() => {
    const map = new Map<string, number>();
    (plansQuery.data ?? []).forEach((plan) => map.set(plan.id, plan.monthly_fee));
    return map;
  }, [plansQuery.data]);

  function compare(
    entry: ProductPricingEntryDraft,
    subscriptionType: string,
    storageValue: string,
    releasePrice: number,
    installmentMonths: number,
    discountType: DiscountType
  ) {
    if (!policyQuery.data || !planFeeById.has(entry.planId)) return null;

    const condition = pricingEntryCondition(entry, subscriptionType, storageValue);
    if (!condition.isActive || !condition.availableDiscountTypes.includes(discountType)) return null;
    return pricingPreviewComparison(
      {
        releasePrice,
        planMonthlyFee: planFeeById.get(entry.planId) ?? 0,
        discountType,
        publicSupportAmount:
          discountType === "public_support"
            ? condition.publicSupportAmount ?? 0
            : null,
        rebateAmount: condition.rebateAmount,
        installmentMonths,
      },
      policyQuery.data
    );
  }

  return {
    compare,
    planFeeById,
    plans: plansQuery.data ?? [],
    policy: policyQuery.data ?? null,
    policyError: policyQuery.error,
    plansError: plansQuery.error,
    isLoading: plansQuery.isPending || policyQuery.isPending,
  };
}
