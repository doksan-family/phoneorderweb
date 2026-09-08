"use client";

import type { AdminProductSummary } from "@/entities/product/api/admin";
import type { Product } from "@/entities/product/model/types";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { useProductForm } from "../model/useProductForm";
import { ProductBadgeFields } from "./ProductBadgeFields";
import { ProductBasicFields } from "./ProductBasicFields";
import { ProductColorFields } from "./ProductColorFields";
import { ProductFormActions } from "./ProductFormActions";
import { ProductImageFields } from "./ProductImageFields";
import { ProductInstallmentField } from "./ProductInstallmentField";
import { ProductPricingEntryList } from "./ProductPricingEntryList";
import { ProductStatusFields } from "./ProductStatusFields";
import { ProductVariantFields } from "./ProductVariantFields";

type ProductFormProps = {
  /** 있으면 수정 모드 */
  product?: AdminProductSummary;
  order?: number;
  onCancel?: () => void;
  onCreate?: (product: Product) => void;
  onUpdate?: () => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ProductForm({
  product,
  order = 0,
  onCancel,
  onCreate,
  onUpdate,
}: ProductFormProps) {
  const form = useProductForm({ product, order, onCreate, onUpdate });

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      {form.isEdit && !form.draft.pricingEntries.length ? (
        <p className="m-0 rounded-[10px] bg-amber-50 p-3 text-sm font-bold text-amber-700">
          기존 요금 조건을 불러오지 못했습니다. 이대로 저장하면 화면에 보이는
          값으로 전체 교체됩니다.
        </p>
      ) : null}

      <ProductStatusFields
        isFeatured={form.draft.isFeatured}
        onFeaturedChange={(value) => form.update("isFeatured", value)}
      />

      <ProductBasicFields draft={form.draft} onChange={form.update} />

      <label className={fieldClass}>
        요약
        <input
          value={form.draft.summary}
          onChange={(event) => form.update("summary", event.target.value)}
        />
      </label>

      <ProductImageFields
        required={!form.isEdit}
        existingProductImages={form.keptProductImages}
        existingDescriptionImages={form.keptDescriptionImages}
        onExistingProductImagesChange={form.setKeptProductImages}
        onExistingDescriptionImagesChange={form.setKeptDescriptionImages}
        productImages={form.productImages}
        descriptionImages={form.descriptionImages}
        onProductImagesChange={form.setProductImages}
        onDescriptionImagesChange={form.setDescriptionImages}
      />

      <ProductBadgeFields
        values={form.draft.badges}
        onChange={(values) => form.update("badges", values)}
      />

      <ProductColorFields
        values={form.draft.colors}
        onChange={(values) => form.update("colors", values)}
      />

      <ProductVariantFields
        values={form.draft.variants}
        onChange={(values) => form.update("variants", values)}
      />

      <ProductInstallmentField
        values={form.draft.installmentMonths}
        onChange={(values) => form.update("installmentMonths", values)}
      />

      <ProductPricingEntryList
        entries={form.draft.pricingEntries}
        variants={form.draft.variants}
        installmentMonths={form.draft.installmentMonths}
        onChange={(entries) => form.update("pricingEntries", entries)}
      />

      {form.error ? (
        <p className="m-0 text-sm font-bold text-red-600">{form.error}</p>
      ) : null}

      <ProductFormActions
        isEdit={form.isEdit}
        loading={form.loading}
        onCancel={onCancel}
      />
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
