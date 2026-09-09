"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { productQueryOptions } from "@/entities/product/model/queries";
import { productQuoteQueryOptions } from "@/entities/product/model/quoteQueries";
import { DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";
import { resolveConsultationSelection } from "./resolveConsultationSelection";

export type ConsultationCondition = { label: string; value: string };

export function useConsultationSelection() {
  const search = useSearchParams();
  const productId = search.get("productId") ?? "";
  const detail = useQuery({ ...productQueryOptions.publicDetail(productId), enabled: productId !== "" });
  const selected = resolveConsultationSelection(detail.data?.profile, search);
  const canApply = detail.data?.product.canApplyForConsultation !== false;
  const quote = useQuery(productQuoteQueryOptions(canApply ? selected?.request ?? null : null));
  const profile = detail.data?.profile;
  const pricing = selected?.pricing;
  const serverPayload = selected && canApply && !detail.isError && !quote.isError ? quote.data?.consultationPayload : undefined;
  const payload = serverPayload ? {
    product_id: serverPayload.productId, pricing_id: serverPayload.pricingId,
    variant_id: serverPayload.variantId, plan_id: serverPayload.planId,
    subscription_type: serverPayload.subscriptionType,
    discount_type: serverPayload.discountType, installment_months: serverPayload.installmentMonths,
    color_value: selected?.color,
  } : null;
  const conditions: ConsultationCondition[] = [
    { label: "색상", value: profile?.colors.find((color) => color.id === selected?.color)?.label ?? "" },
    { label: "용량", value: profile?.capacities.find((capacity) => capacity.id === pricing?.variantId)?.label ?? "" },
    { label: "가입 유형", value: pricing?.subscriptionTypeLabel ?? "" },
    { label: "요금제", value: pricing?.planName ?? "" },
    { label: "할인 방식", value: selected?.discountType ? DISCOUNT_LABELS[selected.discountType] : "" },
    { label: "할부", value: serverPayload?.installmentMonths ? `${serverPayload.installmentMonths}개월` : "" },
  ].filter((condition) => condition.value !== "");
  return {
    conditions, payload, productId, product: detail.data?.product,
    estimate: payload ? quote.data?.estimate ?? null : null,
    isPending: Boolean(productId) && (detail.isPending || Boolean(selected) && quote.isPending),
    error: detail.error?.message ?? quote.error?.message ?? (productId && detail.data && (!selected || !canApply) ? "현재 선택할 수 없는 상품 조건입니다. 상품과 요금 조건을 다시 선택해 주세요." : ""),
    retry: () => { void detail.refetch(); if (selected) void quote.refetch(); },
  };
}
