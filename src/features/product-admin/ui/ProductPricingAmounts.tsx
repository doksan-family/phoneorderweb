import { subscriptionTypeLabel } from "@/shared/config/subscription";
import { copySubscriptionPricing } from "../model/copySubscriptionPricing";
import { pricingEntryCondition } from "../model/pricingEntryCondition";
import type { ProductPricingEntryDraft, ProductVariantDraft } from "../model/types";
import { ProductNullableNumberField } from "./ProductNullableNumberField";
import { ProductDiscountFields } from "./ProductDiscountFields";

type ProductPricingAmountsProps = {
  entry: ProductPricingEntryDraft;
  variants: ProductVariantDraft[];
  onUpdate: (next: Partial<ProductPricingEntryDraft>) => void;
};

export function ProductPricingAmounts({ entry, variants, onUpdate }: ProductPricingAmountsProps) {
  return (
    <div className="@container min-w-0">
      <div className={`grid items-start gap-4 ${entry.subscriptionTypes.length > 1 ? "@min-[560px]:grid-cols-2" : ""}`}>
        {entry.subscriptionTypes.map((sub) => (
          <fieldset key={sub} className="grid min-w-0 gap-3 rounded-lg border border-slate-200 p-3">
            <legend className="px-1 text-sm font-bold">{subscriptionTypeLabel(sub)}</legend>
            {(sub === "number_transfer" || sub === "device_change") && entry.subscriptionTypes.includes(sub === "number_transfer" ? "device_change" : "number_transfer") ? (
              <div className="grid gap-1.5">
                <button type="button" className="min-h-10 rounded-lg border border-slate-300 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => onUpdate(copySubscriptionPricing(entry, sub === "number_transfer" ? "device_change" : "number_transfer", sub))}>
                  {sub === "number_transfer" ? "기기변경" : "번호이동"} 값 가져오기
                </button>
                <p className="m-0 text-xs leading-relaxed text-slate-500">이쪽 지원금과 용량별 개별 설정을 복사한 값으로 교체합니다.</p>
              </div>
            ) : null}
            <ProductNullableNumberField label="추가 지원금 · 모든 용량 공통" value={entry.rebateBySubType[sub] ?? null}
              onChange={(value) => {
                const overrides = structuredClone(entry.conditionOverrides ?? {});
                Object.values(overrides[sub] ?? {}).forEach((cell) => { delete cell.rebateAmount; });
                onUpdate({ rebateBySubType: { ...entry.rebateBySubType, [sub]: value }, conditionOverrides: overrides });
              }} />
            <p className="m-0 text-xs text-slate-500">추가 지원금은 두 할인 방식이 공유하며, 실제 적용 여부는 가격 정책을 따릅니다.</p>
            {variants.map((variant) => {
              const storage = variant.storageValue;
              const condition = pricingEntryCondition(entry, sub, storage);
              const custom = entry.conditionOverrides?.[sub]?.[storage];
              return (
                <div key={variant.id} className="grid gap-2 border-t border-slate-100 pt-3">
                  {condition.availableDiscountTypes.includes("public_support") ? (
                    <ProductNullableNumberField label={`${storage} 공시지원금`} value={condition.publicSupportAmount}
                      onChange={(value) => onUpdate({ publicSupportBySubType: { ...entry.publicSupportBySubType, [sub]: { ...entry.publicSupportBySubType[sub], [storage]: value } } })} />
                  ) : <span className="text-sm font-bold">{storage} · 선택약정</span>}
                  <div>
                    <p className="m-0 text-xs text-slate-500">{storage} 개별 설정{custom && Object.keys(custom).length ? " · 적용 중" : " · 선택"}</p>
                    <div className="mt-2 grid gap-2 rounded-lg bg-slate-50 p-3">
                      <label className="flex items-center gap-2 text-xs"><input className="h-4 w-4" type="checkbox" checked={condition.isActive}
                        onChange={(event) => onUpdate({ conditionOverrides: { ...entry.conditionOverrides, [sub]: { ...entry.conditionOverrides?.[sub], [storage]: { ...custom, isActive: event.target.checked } } } })} />이 용량·가입유형 판매</label>
                      <ProductDiscountFields values={condition.availableDiscountTypes} onChange={(values) => onUpdate({ conditionOverrides: { ...entry.conditionOverrides, [sub]: { ...entry.conditionOverrides?.[sub], [storage]: { ...custom, availableDiscountTypes: values } } } })} />
                      <ProductNullableNumberField label={`${storage} 추가 지원금`} value={condition.rebateAmount}
                        onChange={(value) => onUpdate({ conditionOverrides: { ...entry.conditionOverrides, [sub]: { ...entry.conditionOverrides?.[sub], [storage]: { ...custom, rebateAmount: value } } } })} />
                    </div>
                  </div>
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>
    </div>
  );
}
