import { useState } from "react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import { subscriptionOptions } from "../model/productDraft";
import { ALL_DISCOUNT_TYPES, DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";
import type { DiscountType, ProductPricingEntryDraft, ProductVariantDraft } from "../model/types";
import type { usePricingPreview } from "../model/usePricingPreview";
import { ProductDiscountFields } from "./ProductDiscountFields";
import { ProductPricingAmounts } from "./ProductPricingAmounts";
import { ProductPricingPreview } from "./ProductPricingPreview";

type ProductPricingEntryCardProps = {
  entry: ProductPricingEntryDraft;
  index: number;
  plans: AdminPlan[];
  variants: ProductVariantDraft[];
  installmentMonths: number[];
  preview: ReturnType<typeof usePricingPreview>;
  onUpdate: (id: string, next: Partial<ProductPricingEntryDraft>) => void;
  onDelete: (id: string) => void;
};
const fieldClass = "grid min-w-0 gap-2 text-sm font-bold text-slate-700";

export function ProductPricingEntryCard({ entry, index, plans, variants, installmentMonths, preview, onUpdate, onDelete }: ProductPricingEntryCardProps) {
  const [previewType, setPreviewType] = useState<DiscountType>("public_support");
  const carrier = entry.carrierCode || plans.find((plan) => plan.id === entry.planId)?.carrier_code || "";
  const update = (next: Partial<ProductPricingEntryDraft>) => onUpdate(entry.id, next);
  const available = ALL_DISCOUNT_TYPES.filter((type) => entry.availableDiscountTypes.includes(type) || Object.values(entry.conditionOverrides ?? {}).some((cells) => Object.values(cells).some((cell) => cell.availableDiscountTypes?.includes(type))));
  const activePreview = available.includes(previewType) ? previewType : available[0];

  function changeDiscounts(values: DiscountType[]) {
    const overrides = structuredClone(entry.conditionOverrides ?? {});
    Object.values(overrides).forEach((cells) => Object.values(cells).forEach((cell) => { delete cell.availableDiscountTypes; }));
    update({ availableDiscountTypes: values, conditionOverrides: overrides });
  }

  return (
    <div className="grid gap-5 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <strong className="text-sm">요금제 {index + 1} · {plans.find((plan) => plan.id === entry.planId)?.name || "요금제 선택"}</strong>
        <button type="button" className="shrink-0 p-2 text-xs font-bold text-red-600" onClick={() => onDelete(entry.id)}>요금제 삭제</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={fieldClass}>통신사
          <select value={carrier} onChange={(event) => update({ carrierCode: event.target.value, planId: "" })}>
            <option value="">통신사 선택</option>
            {carrierOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className={fieldClass}>요금제
          <select value={entry.planId} onChange={(event) => update({ planId: event.target.value, carrierCode: carrier })}>
            <option value="">요금제 선택</option>
            {plans.filter((plan) => plan.carrier_code === carrier).map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
          </select>
        </label>
      </div>
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-1 text-sm font-bold">고객이 선택할 수 있는 할인 방식</legend>
        <ProductDiscountFields values={entry.availableDiscountTypes} onChange={changeDiscounts} />
        <p className="m-0 text-xs leading-relaxed text-slate-500">둘 다 허용해도 견적에는 하나만 적용됩니다. 변경하면 모든 가입유형·용량에 적용됩니다.</p>
      </fieldset>
      <div data-pricing-subscriptions className={`${fieldClass} scroll-mt-24`}>가입유형
        <div className="flex flex-wrap gap-2">
          {subscriptionOptions.map((option) => <button key={option.value} type="button" aria-pressed={entry.subscriptionTypes.includes(option.value)}
            className={`rounded-lg border px-3 py-2 ${entry.subscriptionTypes.includes(option.value) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"}`}
            onClick={() => update({ subscriptionTypes: entry.subscriptionTypes.includes(option.value) ? entry.subscriptionTypes.filter((value) => value !== option.value) : [...entry.subscriptionTypes, option.value] })}>{option.label}</button>)}
        </div>
      </div>
      <ProductPricingAmounts entry={entry} variants={variants} onUpdate={update} />
      {entry.planId && entry.subscriptionTypes.length > 0 && activePreview ? (
        <section className="grid gap-2">
          <label className={fieldClass}>미리 볼 할인 방식
            <select value={activePreview} onChange={(event) => setPreviewType(event.target.value as DiscountType)}>
              {available.map((type) => <option key={type} value={type}>{DISCOUNT_LABELS[type]}</option>)}
            </select>
          </label>
          <ProductPricingPreview entry={entry} discountType={activePreview} variants={variants} months={[...installmentMonths].sort((a, b) => a - b)} preview={preview} />
        </section>
      ) : null}
    </div>
  );
}
