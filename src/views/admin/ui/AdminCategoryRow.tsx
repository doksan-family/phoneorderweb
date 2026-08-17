"use client";

import type { AdminProductCategory } from "@/entities/product/api/categories";
import { DragHandle } from "@/shared/ui/DragHandle";
import { VisibilityToggle } from "@/shared/ui/VisibilityToggle";
import type { DragRowProps } from "@/shared/lib/useDragReorder";

type AdminCategoryRowProps = {
  item: AdminProductCategory;
  isMutating: boolean;
  drag: DragRowProps;
  onToggleActive: (code: string, isActive: boolean) => void;
  onToggleMainMenu: (code: string, showInMainMenu: boolean) => void;
  onSelect: (code: string) => void;
};

export function AdminCategoryRow({
  item,
  isMutating,
  drag,
  onToggleActive,
  onToggleMainMenu,
  onSelect,
}: AdminCategoryRowProps) {
  return (
    <article
      className={`grid grid-cols-[24px_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-[10px] border bg-white p-[14px] max-[900px]:grid-cols-[24px_minmax(0,1fr)] ${
        drag.isDropTarget
          ? "border-(--brand-primary) shadow-[0_0_0_3px_var(--brand-primary-shadow)]"
          : "border-slate-200"
      } ${drag.isDragging ? "opacity-40" : ""}`}
      draggable={drag.draggable}
      onDragEnd={drag.onDragEnd}
      onDragOver={drag.onDragOver}
      onDragStart={drag.onDragStart}
      onDrop={drag.onDrop}
    >
      <DragHandle label={item.name || item.code} onGrab={drag.onHandleGrab} />
      <button
        className="grid min-w-0 gap-1 border-0 bg-transparent p-0 text-left"
        onClick={() => onSelect(item.code)}
        type="button"
      >
        <strong className="overflow-hidden text-ellipsis whitespace-nowrap underline-offset-4 hover:underline">
          {item.name}
        </strong>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.88rem] text-slate-500">
          {item.code} · 상품 {item.active_product_count}/{item.product_count}
        </span>
      </button>
      <button
        className="justify-self-start whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.78rem] font-bold text-slate-600 transition hover:bg-[var(--brand-primary-soft)] disabled:cursor-not-allowed disabled:opacity-50 max-[900px]:col-span-2 max-[900px]:justify-self-end"
        disabled={isMutating}
        type="button"
        onClick={() => onToggleMainMenu(item.code, item.show_in_main_menu)}
      >
        {item.show_in_main_menu ? "메인메뉴 노출중" : "메인메뉴 비노출"}
      </button>
      <VisibilityToggle
        active={item.is_active}
        disabled={isMutating}
        label={`${item.name} 노출`}
        onChange={() => onToggleActive(item.code, item.is_active)}
      />
    </article>
  );
}
