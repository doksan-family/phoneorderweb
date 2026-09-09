"use client";

import { useState } from "react";
import type { AdminProductSummary } from "@/entities/product/api/admin";
import { ALL_DISCOUNT_TYPES, DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";
import { carrierOptions } from "@/entities/plan/model/carriers";
import { buildPricingEntries } from "../model/productPricingPrefill";
import { usePricingPreview } from "../model/usePricingPreview";
import { ProductPricingPreview } from "./ProductPricingPreview";

type AdminProductDetailPricingProps = { product: AdminProductSummary };

export function AdminProductDetailPricing({ product }: AdminProductDetailPricingProps) {
  const preview = usePricingPreview(true);
  const entries = buildPricingEntries(product);
  const [planId, setPlanId] = useState("");
  const [discountId, setDiscountId] = useState("");
  const selected = entries.find((entry) => entry.planId === planId) ?? entries[0];
  const discounts = ALL_DISCOUNT_TYPES.filter((type) => selected?.availableDiscountTypes.includes(type) || Object.values(selected?.conditionOverrides ?? {}).some((cells) => Object.values(cells).some((cell) => cell.availableDiscountTypes?.includes(type))));
  const discount = discounts.find((type) => type === discountId) ?? discounts[0];
  const plan = preview.plans.find((item) => item.id === selected?.planId);
  const variants = product.variants.map((variant) => ({ id: variant.storage_value, storageValue: variant.storage_value, releasePrice: variant.release_price }));

  return (
    <section className="grid gap-4 rounded-xl border border-slate-200 p-4">
      <div>
        <h3 className="m-0 text-base font-extrabold text-slate-950">요금제 · 할인 적용 가격</h3>
        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">저장된 조건과 현재 가격 정책으로 계산한 예상 금액입니다. 가입유형·용량·할인 방식을 바꿔 확인하세요.</p>
      </div>
      {preview.isLoading ? <p role="status" className="m-0 text-sm text-slate-500">요금제와 가격 정책을 불러오는 중입니다.</p>
        : preview.plansError || preview.policyError ? <p role="alert" className="m-0 text-sm text-red-600">요금제 또는 가격 정책을 불러오지 못해 금액을 표시할 수 없습니다.</p>
        : !selected ? <p className="m-0 text-sm text-slate-500">등록된 요금 조건이 없습니다.</p> : (
          <>
            <label className="grid gap-2 text-sm font-bold text-slate-700">등록된 요금제 ({entries.length}개)
              <select value={selected.planId} onChange={(event) => setPlanId(event.target.value)}>
                {entries.map((entry) => {
                  const item = preview.plans.find((candidate) => candidate.id === entry.planId);
                  const carrier = carrierOptions.find((candidate) => candidate.value === item?.carrier_code)?.label ?? item?.carrier_code;
                  return <option key={entry.id} value={entry.planId}>{item ? `${carrier} · ${item.name} · 월 ${item.monthly_fee.toLocaleString("ko-KR")}원${item.is_active === false ? " (비활성)" : ""}` : `조회할 수 없는 요금제 (${entry.planId})`}</option>;
                })}
              </select>
            </label>
            <div className="flex flex-wrap gap-2" aria-label="미리 볼 할인 방식">
              {discounts.map((type) => <button key={type} type="button" aria-pressed={discount === type}
                className={`min-h-10 rounded-lg border px-4 text-sm font-bold ${discount === type ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600"}`}
                onClick={() => setDiscountId(type)}>{DISCOUNT_LABELS[type]}</button>)}
            </div>
            {!plan ? <p className="m-0 text-sm text-slate-500">요금제 정보를 찾을 수 없어 할인 가격을 계산할 수 없습니다.</p>
              : !variants.length || !product.installmentMonthOptions.length || !selected.subscriptionTypes.length ? <p className="m-0 text-sm text-slate-500">용량·가입유형·할부 개월 정보가 부족해 가격을 계산할 수 없습니다.</p>
              : discount ? <ProductPricingPreview key={selected.planId} entry={selected} discountType={discount} variants={variants} months={[...product.installmentMonthOptions].sort((a, b) => a - b)} preview={preview} /> : null}
          </>
        )}
    </section>
  );
}
