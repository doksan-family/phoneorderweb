"use client";

import type { AdminReview } from "@/entities/review/model/types";
import { useDragReorder } from "@/shared/lib/useDragReorder";
import { AdminReviewRow } from "./AdminReviewRow";

type AdminReviewListProps = {
  items: AdminReview[];
  isDeleting: boolean;
  onDelete: (id: string) => void;
  onSelect: (review: AdminReview) => void;
  /** 드래그로 바뀐 전체 순서. 첫 항목이 노출 순서 1이다. */
  onReorder: (items: AdminReview[]) => void;
};

export function AdminReviewList({
  items,
  isDeleting,
  onDelete,
  onSelect,
  onReorder,
}: AdminReviewListProps) {
  const { getRowProps } = useDragReorder(items, onReorder);

  return (
    <div className="grid gap-2.5">
      {items.map((review, index) => (
        <AdminReviewRow
          drag={getRowProps(index)}
          isDeleting={isDeleting}
          key={review.id}
          review={review}
          onDelete={() => onDelete(review.id)}
          onSelect={() => onSelect(review)}
        />
      ))}
    </div>
  );
}
