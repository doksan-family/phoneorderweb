"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateAdminProductCategory } from "@/entities/product/api/categories";
import {
  adminProductCategoriesQueryKey,
  productCategoryQueryOptions,
} from "@/entities/product/model/categoryQueries";
import { CategoryFormModal } from "@/features/category-admin/ui/CategoryFormModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { useCategoryReorder } from "../model/useCategoryReorder";
import { AdminCategoryList } from "./AdminCategoryList";

export function AdminCategoryPanel() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const { data, error, isPending } = useQuery(
    productCategoryQueryOptions.adminList()
  );
  const categories = [...(data ?? [])].sort(
    (first, second) => first.display_order - second.display_order
  );

  function refetchCategories() {
    return queryClient.invalidateQueries({
      queryKey: adminProductCategoriesQueryKey,
    });
  }

  const toggleActive = useMutation({
    mutationFn: ({ code, isActive }: { code: string; isActive: boolean }) =>
      updateAdminProductCategory(code, { is_active: !isActive }),
    onSuccess: refetchCategories,
  });

  const toggleMainMenu = useMutation({
    mutationFn: ({
      code,
      showInMainMenu,
    }: {
      code: string;
      showInMainMenu: boolean;
    }) =>
      updateAdminProductCategory(code, {
        show_in_main_menu: !showInMainMenu,
      }),
    onSuccess: refetchCategories,
  });

  const reorder = useCategoryReorder(refetchCategories);

  const mutationError =
    toggleActive.error ?? toggleMainMenu.error ?? reorder.error;
  const selected = categories.find((item) => item.code === selectedCode);

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      {mutationError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          {mutationError.message}
        </p>
      ) : null}

      <AdminCategoryList
        error={error}
        isMutating={toggleActive.isPending || toggleMainMenu.isPending}
        isPending={isPending}
        items={categories}
        onReorder={(next) =>
          reorder.mutate(
            next.map((item) => ({ id: item.code, order: item.display_order }))
          )
        }
        onSelect={setSelectedCode}
        onToggleActive={(code, isActive) =>
          toggleActive.mutate({ code, isActive })
        }
        onToggleMainMenu={(code, showInMainMenu) =>
          toggleMainMenu.mutate({ code, showInMainMenu })
        }
      />

      {selectedCode ? (
        <CategoryFormModal category={selected} onClose={() => setSelectedCode("")} />
      ) : null}

      <FloatingActionButton
        label="카테고리 등록"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen ? (
        <CategoryFormModal
          nextOrder={categories.length}
          onClose={() => setIsCreateOpen(false)}
        />
      ) : null}
    </section>
  );
}
