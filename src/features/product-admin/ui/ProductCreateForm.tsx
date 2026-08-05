"use client";
import type { Product } from "@/entities/product/model/types";
import { useProductCreateForm } from "../model/useProductCreateForm";
import { ProductBadgeFields } from "./ProductBadgeFields";
import { ProductBasicFields } from "./ProductBasicFields";
import { ProductColorFields } from "./ProductColorFields";
import { ProductFormActions } from "./ProductFormActions";
import { ProductImageFields } from "./ProductImageFields";
import { ProductPricingBaseFields } from "./ProductPricingBaseFields";
import { ProductPricingOverrideFields } from "./ProductPricingOverrideFields";
import { ProductStatusFields } from "./ProductStatusFields";
import { ProductVariantFields } from "./ProductVariantFields";

type ProductCreateFormProps = {
  order: number;
  onCancel?: () => void;
  onCreate: (product: Product) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ProductCreateForm({ order, onCancel, onCreate }: ProductCreateFormProps) {
  const form = useProductCreateForm({ order, onCreate });

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <ProductStatusFields
        isFeatured={form.draft.is_featured}
        onFeaturedChange={(value) => form.update("is_featured", value)}
      />
      <ProductBasicFields draft={form.draft} onChange={form.update} />
      <ProductImageFields
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
      <ProductPricingBaseFields
        installmentMonthOptionsValue={form.draft.installmentMonthOptions}
        planIds={form.draft.planIds}
        subscriptionTypes={form.draft.subscriptionTypes}
        onInstallmentMonthsChange={(values) =>
          form.update("installmentMonthOptions", values)
        }
        onPlanIdsChange={(values) => form.update("planIds", values)}
        onSubscriptionTypesChange={(values) =>
          form.update("subscriptionTypes", values)
        }
      />
      <ProductPricingOverrideFields
        planIds={form.draft.planIds}
        values={form.draft.pricingOverrides}
        storageValues={form.draft.variants.map((variant) => variant.storageValue)}
        onChange={(values) => form.update("pricingOverrides", values)}
      />
      <div className="grid gap-2.5">
        <label className={fieldClass}>
          요약
          <input
            value={form.draft.summary}
            onChange={(event) => form.update("summary", event.target.value)}
          />
        </label>
      </div>
      {form.error ? <p className="m-0 text-sm font-bold text-red-600">{form.error}</p> : null}
      <ProductFormActions loading={form.loading} onCancel={onCancel} />
    </form>
  );
}
