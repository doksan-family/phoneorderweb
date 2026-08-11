"use client";

import { useDragReorder } from "@/shared/lib/useDragReorder";
import type { AdminContentItem } from "../model/adminContent";
import { AdminContentRow } from "./AdminContentRow";

type AdminContentListProps = {
  items: AdminContentItem[];
  label: string;
  isDeleting: boolean;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  /** 드래그로 바뀐 전체 순서. 첫 항목이 노출 순서 1이다. */
  onReorder: (items: AdminContentItem[]) => void;
};

export function AdminContentList({
  items,
  label,
  isDeleting,
  onDelete,
  onSelect,
  onReorder,
}: AdminContentListProps) {
  const { getRowProps } = useDragReorder(items, onReorder);

  return (
    <div className="grid gap-2.5">
      {items.map((item, index) => (
        <AdminContentRow
          drag={getRowProps(index)}
          isDeleting={isDeleting}
          item={item}
          key={item.id}
          label={label}
          onDelete={() => onDelete(item.id)}
          onSelect={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}
