"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { ProductPickerDetail } from "./ProductPickerDetail";
import { ProductPickerList } from "./ProductPickerList";

type ProductPickerModalProps = {
  onClose: () => void;
};

/**
 * 상담 페이지에서 상품을 고르는 모달.
 * 목록 → 상세(조건 선택) 두 단계를 한 모달 안에서 처리한다.
 */
export function ProductPickerModal({ onClose }: ProductPickerModalProps) {
  const { data: categories = [] } = useQuery(
    productCategoryQueryOptions.publicList()
  );
  // 선택 전이거나 목록이 아직 없으면 첫 번째 카테고리를 기본값으로 쓴다.
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const categoryId = selectedCategoryId || categories[0]?.code || "";
  const [productId, setProductId] = useState("");

  return (
    <AdminCreateDialog
      title={productId ? "상담 조건 선택" : "상품 고르기"}
      widthClassName="w-[min(880px,100%)]"
      heightClassName="h-[min(720px,calc(100dvh_-_40px))]"
      onClose={onClose}
    >
      {productId ? (
        <ProductPickerDetail
          productId={productId}
          onBack={() => setProductId("")}
          onSelect={onClose}
        />
      ) : (
        <ProductPickerList
          categories={categories}
          categoryId={categoryId}
          onCategoryChange={setSelectedCategoryId}
          onSelect={setProductId}
        />
      )}
    </AdminCreateDialog>
  );
}
