import { ProductPricingComparison } from "./ProductPricingComparison";
import { useState } from "react";
import { subscriptionTypeLabel } from "@/shared/config/subscription";
import type { DiscountType } from "@/entities/product/model/types";
import type { ProductPricingEntryDraft, ProductVariantDraft } from "../model/types";
import type { usePricingPreview } from "../model/usePricingPreview";
export function ProductPricingPreview({
  entry,
  discountType,
  variants,
  months,
  preview,
  subscriptionType,
}: {
  entry: ProductPricingEntryDraft;
  discountType: DiscountType;
  variants: ProductVariantDraft[];
  months: number[];
  preview: ReturnType<typeof usePricingPreview>;
  /** 지정하면 내부 가입유형 select를 숨기고 이 값을 쓴다(카드 상단 토글에서 제어). */
  subscriptionType?: string;
}) {
  const subTypes = entry.subscriptionTypes;
  const [subType, setSubType] = useState(subTypes[0] ?? "");
  const [storageId, setStorageId] = useState(variants[0]?.id ?? "");

  // 선택값이 현재 목록에 없으면(가입유형·용량이 바뀐 경우) 첫 값을 쓴다.
  const activeSub =
    subscriptionType !== undefined
      ? subscriptionType
      : subTypes.includes(subType)
        ? subType
        : subTypes[0] ?? "";
  const variant =
    variants.find((item) => item.id === storageId) ?? variants[0];

  const rows =
    preview.policy && variant && activeSub
      ? months.map((month) => ({
          month,
          comparison: preview.compare(
            entry,
            activeSub,
            variant.storageValue,
            variant.releasePrice,
            month,
            discountType
          ),
        }))
      : [];
  const first = rows[0]?.comparison;

  return (
    <div className="grid gap-1.5 rounded-md bg-slate-50 px-3 py-2.5 text-[0.76rem] text-slate-500">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-slate-700">월 예상 납부금</span>
        <div className="flex gap-1.5">
          {subscriptionType === undefined && subTypes.length > 1 ? (
            <select
              className="h-8 min-w-24 rounded border border-slate-200 bg-white px-2 py-0 text-[0.74rem] leading-normal text-slate-700"
              value={activeSub}
              onChange={(event) => setSubType(event.target.value)}
            >
              {subTypes.map((sub) => (
                <option key={sub} value={sub}>
                  {subscriptionTypeLabel(sub)}
                </option>
              ))}
            </select>
          ) : null}
          {variants.length > 1 && variant ? (
            <select
              className="h-8 min-w-24 rounded border border-slate-200 bg-white px-2 py-0 text-[0.74rem] leading-normal text-slate-700"
              value={variant.id}
              onChange={(event) => setStorageId(event.target.value)}
            >
              {variants.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.storageValue}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>

      {preview.policyError ? (
        <p className="m-0 text-[0.74rem] font-bold text-red-500">
          가격 정책을 불러오지 못해 미리보기를 계산할 수 없습니다.
        </p>
      ) : !preview.policy ? (
        <p className="m-0 text-[0.74rem] text-slate-400">
          가격 정책을 불러오는 중…
        </p>
      ) : null}

      {preview.policy && !first ? <p className="m-0 text-xs text-slate-500">이 용량·가입유형에서는 선택한 할인 방식을 사용할 수 없습니다.</p> : null}
      {first ? <ProductPricingComparison rows={rows} /> : null}
    </div>
  );
}
