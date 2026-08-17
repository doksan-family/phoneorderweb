"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import {
  createAdminProductCategory,
  updateAdminProductCategory,
  type AdminProductCategory,
} from "@/entities/product/api/categories";
import { adminProductCategoriesQueryKey } from "@/entities/product/model/categoryQueries";
import {
  createCategoryPayload,
  createCategoryUpdatePayload,
  createEmptyCategoryDraft,
} from "./categoryDraft";
import type { AdminCategoryDraft } from "./types";

const CODE_PATTERN = /^[a-z0-9][a-z0-9_]{1,49}$/;

type UseCategoryFormParams = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  category?: AdminProductCategory;
  nextOrder?: number;
  onSaved?: (category: AdminProductCategory) => void;
};

export function useCategoryForm({
  category,
  nextOrder = 0,
  onSaved,
}: UseCategoryFormParams = {}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<AdminCategoryDraft>(() =>
    category
      ? {
          code: category.code,
          name: category.name,
          displayOrder: category.display_order,
          isActive: category.is_active,
          showInMainMenu: category.show_in_main_menu,
        }
      : createEmptyCategoryDraft(nextOrder)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof AdminCategoryDraft>(
    key: K,
    value: AdminCategoryDraft[K]
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    if (!draft.name.trim()) {
      setError("카테고리명은 필수입니다.");
      return;
    }
    if (!category && !CODE_PATTERN.test(draft.code.trim())) {
      setError(
        "코드는 영문 소문자/숫자로 시작하고 소문자, 숫자, 밑줄만 사용할 수 있습니다."
      );
      return;
    }

    setLoading(true);
    setError("");
    try {
      const saved = category
        ? await updateAdminProductCategory(
            category.code,
            createCategoryUpdatePayload(draft)
          )
        : await createAdminProductCategory(createCategoryPayload(draft));
      await queryClient.invalidateQueries({
        queryKey: adminProductCategoriesQueryKey,
      });
      if (!category) setDraft(createEmptyCategoryDraft(nextOrder));
      onSaved?.(saved);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : category
            ? "카테고리 수정에 실패했습니다."
            : "카테고리 등록에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return { draft, error, isEdit: Boolean(category), loading, submit, update };
}
