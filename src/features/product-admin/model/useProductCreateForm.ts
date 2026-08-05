"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import type { Product } from "@/entities/product/model/types";
import { createEmptyProductDraft } from "./productDraft";
import { submitProduct } from "./productSubmit";
import type { ProductDraft } from "./types";

type UseProductCreateFormParams = {
  order: number;
  onCreate: (product: Product) => void;
};

export function useProductCreateForm({
  order,
  onCreate,
}: UseProductCreateFormParams) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<ProductDraft>(() => createEmptyProductDraft());
  const [productImages, setProductImages] = useState<File[]>([]);
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!productImages.length) {
      setError("상품 이미지는 1개 이상 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await submitProduct({
        descriptionImages,
        draft,
        onCreate,
        order,
        productImages,
      });
      await queryClient.invalidateQueries({ queryKey: ["public-products"] });
      setDraft(createEmptyProductDraft());
      setProductImages([]);
      setDescriptionImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "상품 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return {
    draft,
    error,
    descriptionImages,
    loading,
    productImages,
    submit,
    setDescriptionImages,
    setProductImages,
    update,
  };
}
