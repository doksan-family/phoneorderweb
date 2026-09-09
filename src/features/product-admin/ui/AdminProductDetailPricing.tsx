"use client";

import type { AdminProductSummary } from "@/entities/product/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import {
  ALL_DISCOUNT_TYPES,
  DISCOUNT_LABELS,
} from "@/entities/product/model/discountTypes";
import type { DiscountType } from "@/entities/product/model/types";
import { buildPricingEntries } from "../model/productPricingPrefill";
import type { ProductPricingEntryDraft } from "../model/types";
import { usePricingPreview } from "../model/usePricingPreview";
import { ProductPricingPreview } from "./ProductPricingPreview";

type AdminProductDetailPricingProps = { product: AdminProductSummary };

/** 조건 오버라이드까지 훑어 이 요금제에서 고를 수 있는 할인 방식을 모은다. */
function entryDiscounts(entry: ProductPricingEntryDraft): DiscountType[] {
  return ALL_DISCOUNT_TYPES.filter(
    (type) =>
      entry.availableDiscountTypes.includes(type) ||
      Object.values(entry.conditionOverrides ?? {}).some((cells) =>
        Object.values(cells).some((cell) =>
          cell.availableDiscountTypes?.includes(type)
        )
      )
  );
}

export function AdminProductDetailPricing({
  product,
}: AdminProductDetailPricingProps) {
  const preview = usePricingPreview(true);
  const entries = buildPricingEntries(product);
  const months = [...product.installmentMonthOptions].sort((a, b) => a - b);
  const variants = product.variants.map((variant) => ({
    id: variant.storage_value,
    storageValue: variant.storage_value,
    releasePrice: variant.release_price,
  }));

  return (
    <section className="grid gap-4 rounded-xl border border-slate-200 p-4">
      <div>
        <h3 className="m-0 text-base font-extrabold text-slate-950">
          요금제 · 할인 적용 가격
        </h3>
        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">
          저장된 조건과 현재 가격 정책으로 계산한 예상 금액입니다. 요금제별로
          공시지원금·선택약정 결과를 함께 보여줍니다.
        </p>
      </div>

      {preview.isLoading ? (
        <p role="status" className="m-0 text-sm text-slate-500">
          요금제와 가격 정책을 불러오는 중입니다.
        </p>
      ) : preview.plansError || preview.policyError ? (
        <p role="alert" className="m-0 text-sm text-red-600">
          요금제 또는 가격 정책을 불러오지 못해 금액을 표시할 수 없습니다.
        </p>
      ) : !entries.length ? (
        <p className="m-0 text-sm text-slate-500">등록된 요금 조건이 없습니다.</p>
      ) : (
        entries.map((entry) => {
          const plan = preview.plans.find((item) => item.id === entry.planId);
          const carrier =
            carrierOptions.find((item) => item.value === plan?.carrier_code)
              ?.label ?? plan?.carrier_code;
          const discounts = entryDiscounts(entry);
          const lackData =
            !plan ||
            !variants.length ||
            !months.length ||
            !entry.subscriptionTypes.length;

          return (
            <div
              className="grid gap-2.5 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
              key={entry.id}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <strong className="font-extrabold text-slate-950">
                  {carrier ? `${carrier} · ` : ""}
                  {plan?.name ?? "조회할 수 없는 요금제"}
                </strong>
                {plan ? (
                  <span className="text-slate-500">
                    월 {plan.monthly_fee.toLocaleString("ko-KR")}원
                    {plan.is_active === false ? " (비활성)" : ""}
                  </span>
                ) : null}
              </div>

              {lackData ? (
                <p className="m-0 text-sm text-slate-500">
                  {plan
                    ? "용량·가입유형·할부 개월 정보가 부족해 가격을 계산할 수 없습니다."
                    : "요금제 정보를 찾을 수 없어 할인 가격을 계산할 수 없습니다."}
                </p>
              ) : (
                <div className="grid gap-3 min-[560px]:grid-cols-2">
                  {discounts.map((type) => (
                    <div className="grid gap-1.5" key={type}>
                      <span className="text-[0.78rem] font-bold text-slate-700">
                        {DISCOUNT_LABELS[type]}
                      </span>
                      <ProductPricingPreview
                        key={`${entry.planId}-${type}`}
                        entry={entry}
                        discountType={type}
                        variants={variants}
                        months={months}
                        preview={preview}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </section>
  );
}
