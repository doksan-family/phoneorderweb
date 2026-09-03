"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { productBrands } from "@/entities/product/model/mock-products";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
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
  const { data } = useQuery(productCategoryQueryOptions.adminList());
  const categories = (data ?? []).filter((category) => category.is_active);

  // 새 상품 등록 시 카테고리 목록이 늦게 도착하므로, 도착하면 첫 번째 값을 기본 선택한다.
  useEffect(() => {
    if (!draft.categoryCode && categories.length) {
      onChange("categoryCode", categories[0].code);
    }
  }, [categories, draft.categoryCode, onChange]);

  return (
    <>
      <div className={grid2}>
        <label className={fieldClass}>
          카테고리
          <select
            value={draft.categoryCode}
            onChange={(event) => onChange("categoryCode", event.target.value)}
          >
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        {/* 브랜드는 카테고리와 별개다. 카테고리가 "특가"여도 브랜드는 삼성일 수 있다. */}
        <label className={fieldClass}>
          브랜드
          <select
            value={draft.brand}
            onChange={(event) => onChange("brand", event.target.value)}
          >
            {productBrands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
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
