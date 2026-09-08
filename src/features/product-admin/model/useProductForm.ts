"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import type {
  AdminProductImage,
  AdminProductSummary,
} from "@/entities/product/api/admin";
import { adminProductsQueryKey } from "@/entities/product/model/queries";
import type { Product } from "@/entities/product/model/types";
import { submitCreate, submitUpdate } from "./productApi";
import { createEmptyProductDraft } from "./productDraft";
import { createProductDraftFromProduct } from "./productDraftFromProduct";
import type { ProductDraft } from "./types";

type UseProductFormParams = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  product?: AdminProductSummary;
  order: number;
  onCreate?: (product: Product) => void;
  onUpdate?: () => void;
};

export function useProductForm({
  product,
  order,
  onCreate,
  onUpdate,
}: UseProductFormParams) {
  const queryClient = useQueryClient();
  const isEdit = Boolean(product);

  const [draft, setDraft] = useState<ProductDraft>(() =>
    product ? createProductDraftFromProduct(product) : createEmptyProductDraft()
  );
  const [productImages, setProductImages] = useState<File[]>([]);
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const [keptProductImages, setKeptProductImages] = useState<AdminProductImage[]>(
    () => product?.productImages ?? []
  );
  const [keptDescriptionImages, setKeptDescriptionImages] = useState<
    AdminProductImage[]
  >(() => product?.descriptionImages ?? []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // mouseup과 click이 연달아 제출을 걸어도 한 번만 보낸다.
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function invalidate() {
    await queryClient.invalidateQueries({ queryKey: ["public-products"] });
    await queryClient.invalidateQueries({ queryKey: adminProductsQueryKey });
    if (product) {
      await queryClient.invalidateQueries({
        queryKey: ["admin-product-detail", product.id],
      });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    if (!productImages.length && !keptProductImages.length) {
      setError("상품 이미지는 1개 이상 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (product) {
        await submitUpdate({
          productId: product.id,
          draft,
          productImages,
          descriptionImages,
          keptProductImages,
          keptDescriptionImages,
          originalProductImages: product.productImages,
          originalDescriptionImages: product.descriptionImages,
        });
        await invalidate();
        onUpdate?.();
      } else {
        const created = await submitCreate({
          draft,
          productImages,
          descriptionImages,
          order,
        });
        await invalidate();
        if (created) onCreate?.(created);
        setDraft(createEmptyProductDraft());
        setProductImages([]);
        setDescriptionImages([]);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEdit
            ? "상품 수정에 실패했습니다."
            : "상품 등록에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    draft,
    error,
    descriptionImages,
    isEdit,
    keptDescriptionImages,
    keptProductImages,
    loading,
    productImages,
    submit,
    setDescriptionImages,
    setKeptDescriptionImages,
    setKeptProductImages,
    setProductImages,
    update,
  };
}
