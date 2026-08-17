"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { AdminProductSummary } from "@/entities/product/api/adminProductTypes";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import {
  adminFieldClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";

type ReviewProductSelectProps = {
  products: AdminProductSummary[];
  value: string;
  onChange: (productId: string) => void;
};

export function ReviewProductSelect({
  products,
  value,
  onChange,
}: ReviewProductSelectProps) {
  const [categoryCode, setCategoryCode] = useState("");
  const { data } = useQuery(productCategoryQueryOptions.adminList());
  const categories = (data ?? [])
    .filter((category) => category.is_active)
    .sort((first, second) => first.display_order - second.display_order);
  const visibleProducts = categoryCode
    ? products.filter((product) => product.categoryCode === categoryCode)
    : products;

  function changeCategory(nextCode: string) {
    setCategoryCode(nextCode);
    const stillVisible = products.some(
      (product) =>
        product.id === value && (!nextCode || product.categoryCode === nextCode)
    );
    if (!stillVisible) onChange("");
  }

  return (
    <div className={twoColumnFieldGridClass}>
      <label className={adminFieldClass}>
        상품 카테고리
        <select
          value={categoryCode}
          onChange={(event) => changeCategory(event.target.value)}
        >
          <option value="">전체 카테고리</option>
          {categories.map((category) => (
            <option key={category.code} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className={adminFieldClass}>
        연결 상품
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">상품 공통 후기</option>
          {visibleProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
