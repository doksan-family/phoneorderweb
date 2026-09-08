"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { DiscountType } from "@/entities/product/model/types";
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
  const discountType = searchParams.get("discountType") ?? "";
  const discountTypeLabel =
    pricing?.discountOptions.find(
      (option) => option.discountType === discountType
    )?.discountTypeLabel ?? "";

  const conditions: ConsultationCondition[] = [
    { label: "색상", value: colorLabel ?? "" },
    { label: "용량", value: capacityLabel ?? "" },
    { label: "가입 유형", value: pricing?.subscriptionTypeLabel ?? "" },
    { label: "요금제", value: pricing?.planName ?? "" },
    { label: "할인 방식", value: discountTypeLabel },
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
    /**
     * 상담 신청 API는 product/pricing/variant/plan/subscription_type을 한 세트로 요구한다.
     * 하나라도 비면 서버가 500을 주므로 아예 보내지 않고 null을 돌려준다.
     */
    payload: buildConsultationPayload({
      product_id: productId,
      pricing_id: pricing?.id || pricingId,
      variant_id: pricing?.variantId ?? "",
      plan_id: pricing?.planId || (searchParams.get("planId") ?? ""),
      subscription_type:
        pricing?.subscriptionType || (searchParams.get("subscriptionType") ?? ""),
      discount_type: isDiscountType(discountType) ? discountType : undefined,
      color_value: colorValue || undefined,
      installment_months: installmentMonths
        ? Number(installmentMonths)
        : undefined,
    }),
  };
}

type ConsultationSelectionPayload = {
  product_id: string;
  pricing_id: string;
  variant_id: string;
  plan_id: string;
  subscription_type: string;
  discount_type?: DiscountType;
  color_value?: string;
  installment_months?: number;
};

function isDiscountType(value: string): value is DiscountType {
  return value === "public_support" || value === "contract_discount";
}

/** 필수 5개가 모두 채워졌을 때만 payload를 만든다. */
export function buildConsultationPayload(
  payload: ConsultationSelectionPayload
): ConsultationSelectionPayload | null {
  const required = [
    payload.product_id,
    payload.pricing_id,
    payload.variant_id,
    payload.plan_id,
    payload.subscription_type,
  ];

  return required.every((value) => value !== "") ? payload : null;
}

/** 상담 신청 기록에 남길 한 줄 요약. */
export function formatConsultationConditions(
  conditions: ConsultationCondition[]
) {
  return conditions
    .map((condition) => `${condition.label} ${condition.value}`)
    .join(" · ");
}
