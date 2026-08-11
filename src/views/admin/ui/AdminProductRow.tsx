"use client";

import Image from "next/image";
import type { AdminProductSummary } from "@/entities/product/api/admin";
import { DragHandle } from "@/shared/ui/DragHandle";
import { VisibilityToggle } from "@/shared/ui/VisibilityToggle";
import type { DragRowProps } from "@/shared/lib/useDragReorder";

type AdminProductRowProps = {
  item: AdminProductSummary;
  isMutating: boolean;
  drag: DragRowProps;
  onDeactivate: (id: string) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onSelect: (id: string) => void;
};

export function AdminProductRow({
  item,
  isMutating,
  drag,
  onDeactivate,
  onToggleActive,
  onSelect,
}: AdminProductRowProps) {
  return (
    <article
      className={`grid grid-cols-[24px_56px_minmax(0,1fr)_auto] items-center gap-3 rounded-[10px] border bg-white p-[14px] max-[900px]:grid-cols-[24px_56px_minmax(0,1fr)] ${
        drag.isDropTarget ? "border-(--brand-primary) shadow-[0_0_0_3px_var(--brand-primary-shadow)]" : "border-slate-200"
      } ${drag.isDragging ? "opacity-40" : ""}`}
      draggable={drag.draggable}
      onDragEnd={drag.onDragEnd}
      onDragOver={drag.onDragOver}
      onDragStart={drag.onDragStart}
      onDrop={drag.onDrop}
    >
      <DragHandle label={item.name || item.id} onGrab={drag.onHandleGrab} />
      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-slate-100">
        {item.thumbnailUrl ? (
          <Image alt="" className="object-cover" fill sizes="56px" src={item.thumbnailUrl} />
        ) : null}
      </div>
      <button
        className="grid min-w-0 gap-1 border-0 bg-transparent p-0 text-left"
        onClick={() => onSelect(item.id)}
        type="button"
      >
        <strong className="overflow-hidden text-ellipsis whitespace-nowrap underline-offset-4 hover:underline">
          {item.name || item.id}
        </strong>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.88rem] text-slate-500">
          {[item.categoryName || item.categoryCode, formatPrice(item.salePrice)]
            .filter(Boolean)
            .join(" · ") || "—"}
        </span>
      </button>
      <VisibilityToggle
        active={item.isActive}
        disabled={isMutating}
        label={`${item.name || item.id} 노출`}
        onChange={() =>
          item.isActive ? onDeactivate(item.id) : onToggleActive(item.id, item.isActive)
        }
      />
    </article>
  );
}

function formatPrice(price: number | null) {
  return price === null ? "" : `${price.toLocaleString("ko-KR")}원`;
}
