"use client";

import Image from "next/image";
import type { AdminBanner } from "@/entities/banner/model/types";
import { storagePublicUrl } from "@/shared/lib/supabase/storageUrl";
import { DragHandle } from "@/shared/ui/DragHandle";
import { IconDeleteButton } from "@/shared/ui/IconDeleteButton";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import type { DragRowProps } from "@/shared/lib/useDragReorder";

type AdminBannerRowProps = {
  banner: AdminBanner;
  drag: DragRowProps;
  isEditing: boolean;
  isDeleting: boolean;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const btnSecondary =
  "inline-flex items-center justify-center min-h-[34px] border border-slate-200 rounded-lg px-3.5 text-sm font-bold transition-all bg-white text-slate-700 hover:bg-[var(--brand-primary-soft)] hover:text-slate-950";

export function AdminBannerRow({
  banner,
  drag,
  isEditing,
  isDeleting,
  onToggleEdit,
  onDelete,
}: AdminBannerRowProps) {
  const imageUrl = storagePublicUrl("banners", banner.image_path);

  return (
    <article
      className={`flex items-center justify-between gap-4 rounded-xl border bg-white p-4 ${
        drag.isDropTarget
          ? "border-[var(--brand-primary)] shadow-[0_0_0_3px_var(--brand-primary-shadow)]"
          : "border-slate-200"
      } ${drag.isDragging ? "opacity-40" : ""}`}
      draggable={drag.draggable}
      onDragEnd={drag.onDragEnd}
      onDragOver={drag.onDragOver}
      onDragStart={drag.onDragStart}
      onDrop={drag.onDrop}
    >
      <div className="flex min-w-0 items-center gap-3">
        <DragHandle label={banner.title} onGrab={drag.onHandleGrab} />
        <div className="relative aspect-[16/6] w-52 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 max-[560px]:w-36">
          {imageUrl ? (
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 560px) 144px, 208px"
              src={imageUrl}
            />
          ) : (
            <span className="grid h-full place-items-center text-[0.7rem] text-slate-400">
              이미지 없음
            </span>
          )}
        </div>
        <div className="grid min-w-0 gap-1">
          <div className="flex items-center gap-2">
            <strong className="truncate text-[0.95rem]">{banner.title}</strong>
            <StatusBadge
              active={banner.is_active}
              activeLabel="노출"
              inactiveLabel="숨김"
            />
          </div>
          <span className="text-[0.8rem] text-slate-400">
            {banner.type} · {banner.start_at ?? "무제한"} ~{" "}
            {banner.end_at ?? "무제한"}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          className={btnSecondary}
          type="button"
          onClick={() => onToggleEdit(banner.id)}
        >
          {isEditing ? "닫기" : "수정"}
        </button>
        <IconDeleteButton
          disabled={isDeleting}
          label="배너 삭제"
          targetName={banner.title}
          onClick={() => onDelete(banner.id)}
        />
      </div>
    </article>
  );
}
