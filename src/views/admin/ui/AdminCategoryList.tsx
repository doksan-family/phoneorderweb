"use client";

import type { AdminProductCategory } from "@/entities/product/api/categories";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { useDragReorder } from "@/shared/lib/useDragReorder";
import { AdminCategoryRow } from "./AdminCategoryRow";

type AdminCategoryListProps = {
  items: AdminProductCategory[];
  isPending: boolean;
  isMutating: boolean;
  error: Error | null;
  onToggleActive: (code: string, isActive: boolean) => void;
  onToggleMainMenu: (code: string, showInMainMenu: boolean) => void;
  onSelect: (code: string) => void;
  onReorder: (items: AdminProductCategory[]) => void;
};

export function AdminCategoryList({
  items,
  isPending,
  isMutating,
  error,
  onToggleActive,
  onToggleMainMenu,
  onSelect,
  onReorder,
}: AdminCategoryListProps) {
  const { getRowProps } = useDragReorder(items, onReorder);

  if (error) {
    return (
      <AdminEmptyState message={`카테고리를 불러오지 못했습니다. ${error.message}`} />
    );
  }

  if (isPending) {
    return <SkeletonRows withThumbnail={false} />;
  }

  if (!items.length) {
    return <AdminEmptyState message="등록된 카테고리가 없습니다." />;
  }

  return (
    <div className="grid gap-2.5">
      {items.map((item, index) => (
        <AdminCategoryRow
          drag={getRowProps(index)}
          isMutating={isMutating}
          item={item}
          key={item.code}
          onSelect={onSelect}
          onToggleActive={onToggleActive}
          onToggleMainMenu={onToggleMainMenu}
        />
      ))}
    </div>
  );
}
