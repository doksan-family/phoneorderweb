"use client";

import type { AdminProductSummary } from "@/entities/product/api/admin";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { useDragReorder } from "@/shared/lib/useDragReorder";
import { AdminProductRow } from "./AdminProductRow";

type AdminProductListProps = {
  items: AdminProductSummary[];
  isPending: boolean;
  isMutating: boolean;
  error: Error | null;
  /** 노출 중인 상품을 감춘다(DELETE) */
  onDeactivate: (id: string) => void;
  /** 감춰진 상품을 다시 노출한다(PATCH) */
  onToggleActive: (id: string, isActive: boolean) => void;
  onSelect: (id: string) => void;
  /** 드래그로 바뀐 전체 순서. 첫 항목이 노출 순서 1이다. */
  onReorder: (items: AdminProductSummary[]) => void;
};

export function AdminProductList({
  items,
  isPending,
  isMutating,
  error,
  onDeactivate,
  onToggleActive,
  onSelect,
  onReorder,
}: AdminProductListProps) {
  const { getRowProps } = useDragReorder(items, onReorder);

  if (error) {
    return <AdminEmptyState message={`상품을 불러오지 못했습니다. ${error.message}`} />;
  }

  if (isPending) {
    return <SkeletonRows />;
  }

  if (!items.length) {
    return <AdminEmptyState message="등록된 상품이 없습니다." />;
  }

  return (
    <div className="grid gap-2.5">
      {items.map((item, index) => (
        <AdminProductRow
          drag={getRowProps(index)}
          isMutating={isMutating}
          item={item}
          key={item.id}
          onDeactivate={onDeactivate}
          onSelect={onSelect}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
