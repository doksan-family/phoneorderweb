"use client";

import Image from "next/image";
import type { AdminReview } from "@/entities/review/model/types";
import type { DragRowProps } from "@/shared/lib/useDragReorder";
import { DragHandle } from "@/shared/ui/DragHandle";
import { IconDeleteButton } from "@/shared/ui/IconDeleteButton";
import { ReviewRating } from "@/shared/ui/ReviewRating";
import { StatusBadge } from "@/shared/ui/StatusBadge";

type AdminReviewRowProps = {
  review: AdminReview;
  isDeleting: boolean;
  drag: DragRowProps;
  onDelete: () => void;
  onSelect: () => void;
};

export function AdminReviewRow({
  review,
  isDeleting,
  drag,
  onDelete,
  onSelect,
}: AdminReviewRowProps) {
  const cover = review.images[0];

  return (
    <article
      className={`flex items-center gap-3.5 rounded-[10px] border bg-white p-3.5 text-left transition hover:bg-slate-50 ${
        drag.isDropTarget ? "border-(--brand-primary) shadow-[0_0_0_3px_var(--brand-primary-shadow)]" : "border-slate-200 hover:border-slate-300"
      } ${drag.isDragging ? "opacity-40" : ""}`}
      draggable={drag.draggable}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onDragEnd={drag.onDragEnd}
      onDragOver={drag.onDragOver}
      onDragStart={drag.onDragStart}
      onDrop={drag.onDrop}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <DragHandle label={review.title} onGrab={drag.onHandleGrab} />
      {cover ? (
        <Image
          alt={cover.alt ?? ""}
          className="size-14 shrink-0 rounded-lg bg-slate-100 object-cover"
          height={56}
          src={cover.image_url}
          width={56}
        />
      ) : null}
      <div className="grid min-w-0 flex-1 gap-1">
        <div className="flex items-center gap-2">
          <strong className="truncate text-sm">{review.title}</strong>
          <StatusBadge
            active={review.is_published}
            activeLabel="공개"
            inactiveLabel="비공개"
          />
          {review.is_featured ? (
            <span className="brand-pill bg-slate-100 px-2.5 py-1 text-[0.75rem] text-slate-500">
              추천
            </span>
          ) : null}
        </div>
        <ReviewRating
          className="text-[var(--brand-primary-strong)]"
          rating={review.rating}
        />
        <span className="truncate text-[0.88rem] leading-[1.65] text-slate-500">
          {review.content}
        </span>
        <span className="text-[0.8rem] text-slate-400">
          {review.author_name}
          {review.product_name ? ` · ${review.product_name}` : ""}
          {review.published_at ? ` · ${review.published_at}` : ""}
        </span>
      </div>
      {/* 행 클릭은 수정 열기라 삭제 버튼까지 번지지 않게 막는다 */}
      <div onClick={(event) => event.stopPropagation()}>
        <IconDeleteButton
          disabled={isDeleting}
          label="후기 삭제"
          targetName={review.title}
          onClick={onDelete}
        />
      </div>
    </article>
  );
}
