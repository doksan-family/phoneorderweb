import type { Product } from "@/entities/product/model/types";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";

type AdminProductListProps = {
  items: Product[];
  onDelete: (id: string) => void;
  onToggleVisible: (id: string) => void;
};

const btnSecondary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950";
const btnGhost =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-transparent bg-transparent px-4 text-sm font-bold text-red-600 transition hover:bg-red-50";

export function AdminProductList({
  items,
  onDelete,
  onToggleVisible,
}: AdminProductListProps) {
  if (!items.length) {
    return <AdminEmptyState message="등록된 상품이 없습니다." />;
  }

  return (
    <div className="grid gap-2.5">
      {items.map((item) => (
        <article
          className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-[14px] max-[900px]:grid-cols-1"
          key={item.id}
        >
          <div className="grid min-w-0 gap-1">
            <strong className="overflow-x-auto whitespace-nowrap">{item.name}</strong>
            <span className="overflow-x-auto whitespace-nowrap text-[0.88rem] leading-[1.65] text-slate-500">
              {item.categoryName} · {item.salePrice.toLocaleString("ko-KR")}원
            </span>
          </div>
          <button className={btnSecondary} onClick={() => onToggleVisible(item.id)} type="button">
            {item.visible ? "노출 중" : "숨김"}
          </button>
          <button className={btnGhost} onClick={() => onDelete(item.id)} type="button">
            삭제
          </button>
        </article>
      ))}
    </div>
  );
}
