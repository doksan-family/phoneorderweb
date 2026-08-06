"use client";

import { useState } from "react";
import { pickerFilters } from "../model/pickerFilters";
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
  const [categoryId, setCategoryId] = useState(pickerFilters[0].id);
  const [productId, setProductId] = useState("");

  return (
    <AdminCreateDialog
      title={productId ? "상담 조건 선택" : "상품 고르기"}
      widthClassName="w-[min(880px,100%)]"
      heightClassName="h-[min(720px,calc(100vh_-_40px))]"
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
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          onSelect={setProductId}
        />
      )}
    </AdminCreateDialog>
  );
}
