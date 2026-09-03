"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { calcEstimate } from "@/entities/pricing-policy/model/calc";
import { pricingPolicyQueryOptions } from "@/entities/pricing-policy/model/queries";
import type { ProductEstimate } from "@/entities/product/model/types";
import type { ProductPricingEntryDraft } from "./types";

/**
 * 가격 계산 정책 조회 API와 요금제 목록을 읽어
 * 관리자 폼에서 칸별 월 납부금 미리보기를 계산한다.
 */
export function usePricingPreview() {
  const plansQuery = useQuery(planQueryOptions.adminList());
  const policyQuery = useQuery(pricingPolicyQueryOptions.admin());

  const planFeeById = useMemo(() => {
    const map = new Map<string, number>();
    (plansQuery.data ?? []).forEach((plan) => map.set(plan.id, plan.monthly_fee));
    return map;
  }, [plansQuery.data]);

  function estimate(
    entry: ProductPricingEntryDraft,
    subscriptionType: string,
    storageValue: string,
    releasePrice: number,
    installmentMonths: number
  ): ProductEstimate | null {
    if (!policyQuery.data) return null;

    const byStorage = entry.publicSupportBySubType[subscriptionType] ?? {};
    return calcEstimate(
      {
        releasePrice,
        planMonthlyFee: planFeeById.get(entry.planId) ?? 0,
        discountType: entry.discountType,
        publicSupportAmount:
          entry.discountType === "public_support"
            ? byStorage[storageValue] ?? 0
            : null,
        rebateAmount: entry.rebateBySubType[subscriptionType] ?? null,
        installmentMonths,
      },
      policyQuery.data
    );
  }

  return {
    estimate,
    planFeeById,
    plans: plansQuery.data ?? [],
    policy: policyQuery.data ?? null,
    policyError: policyQuery.error,
    isLoading: plansQuery.isPending || policyQuery.isPending,
  };
}
