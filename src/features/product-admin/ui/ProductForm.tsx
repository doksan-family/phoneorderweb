"use client";

import type { AdminProductSummary } from "@/entities/product/api/admin";
import type { Product } from "@/entities/product/model/types";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { ProductFormPanels } from "./ProductFormPanels";
import { ProductFormSteps } from "./ProductFormSteps";
import { useProductFormSteps } from "../model/useProductFormSteps";
import { useProductForm } from "../model/useProductForm";
import { ProductFormActions } from "./ProductFormActions";

type ProductFormProps = {
  /** 있으면 수정 모드 */
  product?: AdminProductSummary;
  order?: number;
  onCancel?: () => void;
  onCreate?: (product: Product) => void;
  onUpdate?: () => void;
};



export function ProductForm({
  product,
  order = 0,
  onCancel,
  onCreate,
  onUpdate,
}: ProductFormProps) {
  const form = useProductForm({ product, order, onCreate, onUpdate });

  const { step, error, formRef, goTo, submit } = useProductFormSteps(form);

  return (
    <form ref={formRef} noValidate className="grid gap-4" onSubmit={submit}>
      {form.isEdit && !form.draft.pricingEntries.length ? (
        <p className="m-0 rounded-[10px] bg-amber-50 p-3 text-sm font-bold text-amber-700">
          기존 요금 조건을 불러오지 못했습니다. 이대로 저장하면 화면에 보이는
          값으로 전체 교체됩니다.
        </p>
      ) : null}

      <ProductFormSteps step={step} onChange={goTo} disabled={form.loading} />
      <ProductFormPanels form={form} step={step} />

      <div className="sticky -bottom-5 z-10 -mx-5 -mb-5 grid gap-2 border-t border-slate-200 bg-white px-5 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.04)]">
        {error || form.error ? (
          <p role="alert" className="m-0 text-sm font-bold text-red-600">{error || form.error}</p>
        ) : null}

        <ProductFormActions
          step={step}
          onBack={() => goTo(step - 1)}
          isEdit={form.isEdit}
          loading={form.loading}
          onCancel={onCancel}
        />
      </div>
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
