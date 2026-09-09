import { ProductBadgeFields } from "./ProductBadgeFields";
import { ProductStatusFields } from "./ProductStatusFields";
import { ProductBasicFields } from "./ProductBasicFields";
import { ProductColorFields } from "./ProductColorFields";
import { ProductFormSection } from "./ProductFormSection";
import { ProductFormPresentation } from "./ProductFormPresentation";
import { ProductInstallmentField } from "./ProductInstallmentField";
import { ProductPricingEntryList } from "./ProductPricingEntryList";
import { ProductVariantFields } from "./ProductVariantFields";
import type { useProductForm } from "../model/useProductForm";

type ProductFormPanelsProps = {
  form: ReturnType<typeof useProductForm>;
  step: number;
};
const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ProductFormPanels({ form, step }: ProductFormPanelsProps) {
  return (
    <>
      <div hidden={step !== 0} data-product-step="0">
        <div className="grid items-start gap-5 min-[1100px]:grid-cols-[minmax(0,1fr)_390px]">
          <div className="grid min-w-0 gap-5">
            <ProductFormSection title="기본 정보" description="상품명과 분류부터 입력하세요. 상품명은 필수입니다.">
              <ProductBasicFields draft={form.draft} onChange={form.update} />
              <label className={fieldClass}>
                요약 <span className="text-xs font-normal text-slate-400">선택 · 상품을 소개하는 짧은 문구</span>
                <input value={form.draft.summary} placeholder="예: 가벼운 무게, 오래가는 배터리"
                  onChange={(event) => form.update("summary", event.target.value)} />
              </label>
            </ProductFormSection>
            <ProductFormSection title="노출 설정" description="홈 추천 상품 노출과 상품 카드에 표시할 배지를 설정하세요.">
              <ProductStatusFields
                isFeatured={form.draft.isFeatured}
                onFeaturedChange={(value) => form.update("isFeatured", value)}
              />
              <ProductBadgeFields
                values={form.draft.badges}
                onChange={(values) => form.update("badges", values)}
              />
            </ProductFormSection>
          </div>
          <ProductFormPresentation form={form} />
        </div>
      </div>
      <div hidden={step !== 1} data-product-step="1">
        <ProductFormSection title="판매 옵션" description="용량별 출고가, 색상, 할부 개월을 설정한 뒤 요금 조건을 입력하세요.">
          <ProductVariantFields
            values={form.draft.variants}
            onChange={(values) => form.update("variants", values)}
          />
          <ProductColorFields
            values={form.draft.colors}
            onChange={(values) => form.update("colors", values)}
          />
          <ProductInstallmentField
            values={form.draft.installmentMonths}
            onChange={(values) => form.update("installmentMonths", values)}
          />
        </ProductFormSection>
      </div>
      <div hidden={step !== 2} data-product-step="2">
        <ProductFormSection title="요금 조건" description="판매 옵션을 기준으로 지원금과 월 예상 납부금을 확인하세요.">
          <ProductPricingEntryList
            entries={form.draft.pricingEntries}
            variants={form.draft.variants}
            installmentMonths={form.draft.installmentMonths}
            onChange={(entries) => form.update("pricingEntries", entries)}
          />
        </ProductFormSection>
      </div>
    </>
  );
}
