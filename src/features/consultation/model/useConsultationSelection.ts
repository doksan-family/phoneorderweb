"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { productQueryOptions } from "@/entities/product/model/queries";

export type ConsultationCondition = { label: string; value: string };

/**
 * 상품 상세에서 "이 조건으로 상담 신청하기"로 넘어올 때 붙는 쿼리를 읽어
 * 문의 상품과 선택한 조건을 복원한다.
 */
export function useConsultationSelection() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? "";
  const { data } = useQuery({
    ...productQueryOptions.publicDetail(productId),
    enabled: productId !== "",
  });

  const profile = data?.profile;
  const pricingId = searchParams.get("pricingId") ?? "";
  const pricing =
    profile?.pricingOptions?.find((option) => option.id === pricingId) ??
    profile?.pricingOptions?.find(
      (option) => option.planId === searchParams.get("planId")
    );

  const colorValue = searchParams.get("colorValue") ?? "";
  const colorLabel = profile?.colors.find(
    (color) => color.id === colorValue
  )?.label;
  const capacityLabel = profile?.capacities.find(
    (capacity) => capacity.id === pricing?.variantId
  )?.label;
  const installmentMonths = searchParams.get("installmentMonths");

  const conditions: ConsultationCondition[] = [
    { label: "색상", value: colorLabel ?? "" },
    { label: "용량", value: capacityLabel ?? "" },
    { label: "가입 유형", value: pricing?.subscriptionTypeLabel ?? "" },
    { label: "요금제", value: pricing?.planName ?? "" },
    {
      label: "할부",
      value: installmentMonths ? `${installmentMonths}개월` : "",
    },
  ].filter((condition) => condition.value !== "");

  return {
    conditions,
    estimate: pricing?.estimate ?? profile?.estimate ?? null,
    product: data?.product,
    productId,
  };
}

/** 상담 신청 기록에 남길 한 줄 요약. */
export function formatConsultationConditions(
  conditions: ConsultationCondition[]
) {
  return conditions
    .map((condition) => `${condition.label} ${condition.value}`)
    .join(" · ");
}
