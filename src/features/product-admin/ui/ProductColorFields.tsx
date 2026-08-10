import { Plus } from "lucide-react";
import { createEmptyColor } from "../model/productDraft";
import type { ProductColorDraft } from "../model/types";
import { ProductColorRow } from "./ProductColorRow";

type ProductColorFieldsProps = {
  values: ProductColorDraft[];
  onChange: (values: ProductColorDraft[]) => void;
};

const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40";

export function ProductColorFields({
  values,
  onChange,
}: ProductColorFieldsProps) {
  function addColor() {
    onChange([...values, createEmptyColor()]);
  }

  function updateColor(id: string, nextColor: Partial<ProductColorDraft>) {
    onChange(
      values.map((color) =>
        color.id === id ? { ...color, ...nextColor } : color
      )
    );
  }

  function deleteColor(id: string) {
    onChange(values.filter((color) => color.id !== id));
  }

  return (
    <section className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-700">색상</span>
        <button className={iconButtonClass} type="button" onClick={addColor}>
          <Plus size={18} aria-hidden="true" />
          <span className="sr-only">색상 추가</span>
        </button>
      </div>
      <div className="grid gap-2.5">
        {values.map((color) => (
          <ProductColorRow
            color={color}
            key={color.id}
            onDelete={deleteColor}
            onUpdate={updateColor}
          />
        ))}
      </div>
    </section>
  );
}
