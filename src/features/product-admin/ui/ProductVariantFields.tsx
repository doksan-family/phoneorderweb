import { Plus } from "lucide-react";
import { createEmptyVariant } from "../model/productDraft";
import type { ProductVariantDraft } from "../model/types";
import { ProductVariantRow } from "./ProductVariantRow";

type ProductVariantFieldsProps = {
  values: ProductVariantDraft[];
  onChange: (values: ProductVariantDraft[]) => void;
};

const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950";

export function ProductVariantFields({
  values,
  onChange,
}: ProductVariantFieldsProps) {
  function addVariant() {
    onChange([...values, createEmptyVariant()]);
  }

  function updateVariant(id: string, next: Partial<ProductVariantDraft>) {
    onChange(values.map((item) => (item.id === id ? { ...item, ...next } : item)));
  }

  function deleteVariant(id: string) {
    if (values.length <= 1) return;
    onChange(values.filter((item) => item.id !== id));
  }

  return (
    <section className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-700">저장용량 · 출고가</span>
        <button className={iconButtonClass} type="button" onClick={addVariant}>
          <Plus size={18} aria-hidden="true" />
          <span className="sr-only">저장용량 추가</span>
        </button>
      </div>
      <div className="grid gap-2.5">
        {values.map((variant) => (
          <ProductVariantRow
            canDelete={values.length > 1}
            key={variant.id}
            variant={variant}
            onDelete={deleteVariant}
            onUpdate={updateVariant}
          />
        ))}
      </div>
    </section>
  );
}
