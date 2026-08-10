import { Trash2 } from "lucide-react";
import { variantStorageOptions } from "../model/productDraft";
import type { ProductVariantDraft } from "../model/types";
import { ProductNumberField } from "./ProductNumberField";

type ProductVariantRowProps = {
  canDelete: boolean;
  variant: ProductVariantDraft;
  onDelete: (id: string) => void;
  onUpdate: (id: string, next: Partial<ProductVariantDraft>) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40";

export function ProductVariantRow({
  canDelete,
  variant,
  onDelete,
  onUpdate,
}: ProductVariantRowProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2.5 max-[900px]:grid-cols-1">
      <label className={fieldClass}>
        저장용량
        <select
          required
          value={variant.storageValue}
          onChange={(event) => onUpdate(variant.id, { storageValue: event.target.value })}
        >
          {variantStorageOptions.map((storageValue) => (
            <option key={storageValue} value={storageValue}>
              {storageValue}
            </option>
          ))}
        </select>
      </label>
      <ProductNumberField
        label="출고가"
        value={variant.originalPrice}
        onChange={(value) => onUpdate(variant.id, { originalPrice: value })}
      />
      <ProductNumberField
        label="판매가"
        value={variant.salePrice}
        onChange={(value) => onUpdate(variant.id, { salePrice: value })}
      />
      <button
        className={`${iconButtonClass} self-end`}
        disabled={!canDelete}
        type="button"
        onClick={() => onDelete(variant.id)}
      >
        <Trash2 size={17} aria-hidden="true" />
        <span className="sr-only">상품 옵션 삭제</span>
      </button>
    </div>
  );
}
