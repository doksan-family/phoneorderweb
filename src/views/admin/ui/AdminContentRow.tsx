"use client";

import { IconDeleteButton } from "@/shared/ui/IconDeleteButton";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import type { AdminContentItem } from "../model/adminContent";

type AdminContentRowProps = {
  item: AdminContentItem;
  label: string;
  isDeleting: boolean;
  onDelete: () => void;
  onSelect: () => void;
};

export function AdminContentRow({
  item,
  label,
  isDeleting,
  onDelete,
  onSelect,
}: AdminContentRowProps) {
  return (
    <article
      className="flex cursor-pointer items-center gap-3.5 rounded-[10px] border border-slate-200 bg-white p-[14px] text-left transition hover:border-slate-300 hover:bg-slate-50"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="grid min-w-0 flex-1 gap-1">
        <div className="flex items-center gap-2">
          <strong className="truncate text-sm">{item.title}</strong>
          <StatusBadge
            active={item.isPublished}
            activeLabel="공개"
            inactiveLabel="비공개"
          />
          {item.category ? (
            <span className="brand-pill bg-slate-100 px-2.5 py-1 text-[0.75rem] text-slate-500">
              {item.category}
            </span>
          ) : null}
        </div>
        <span className="truncate text-[0.88rem] leading-[1.65] text-slate-500">
          {item.body}
        </span>
      </div>
      {/* 행 클릭은 수정 열기라 삭제 버튼까지 번지지 않게 막는다 */}
      <div onClick={(event) => event.stopPropagation()}>
        <IconDeleteButton
          disabled={isDeleting}
          label={`${label} 삭제`}
          targetName={item.title}
          onClick={onDelete}
        />
      </div>
    </article>
  );
}
