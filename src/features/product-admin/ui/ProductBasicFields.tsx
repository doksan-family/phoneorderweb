import { productCategories } from "@/entities/product/model/mock-products";
import type { ProductDraft } from "../model/types";

type ProductDraftChange = <K extends keyof ProductDraft>(
  key: K,
  value: ProductDraft[K]
) => void;

type ProductBasicFieldsProps = {
  draft: ProductDraft;
  onChange: ProductDraftChange;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const grid2 = "grid grid-cols-2 gap-2.5 max-[900px]:grid-cols-1";

export function ProductBasicFields({
  draft,
  onChange,
}: ProductBasicFieldsProps) {
  function changeCategory(categoryCode: string) {
    const category = productCategories.find((item) => item.id === categoryCode);

    onChange("category_code", categoryCode);
    if (category) onChange("brand", category.name);
  }

  return (
    <>
      <div className={grid2}>
        <label className={fieldClass}>
          카테고리
          <select
            value={draft.category_code}
            onChange={(event) => changeCategory(event.target.value)}
          >
            {productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className={fieldClass}>
          브랜드
          <input
            required
            value={draft.brand}
            onChange={(event) => onChange("brand", event.target.value)}
          />
        </label>
      </div>
      <label className={fieldClass}>
        상품명
        <input
          required
          value={draft.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
      </label>
    </>
  );
}
