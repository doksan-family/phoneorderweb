import Image from "next/image";
import type { AdminProductSummary } from "@/entities/product/api/admin";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { StatusBadge } from "@/shared/ui/StatusBadge";

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
};

const btnSecondary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-[var(--brand-primary-soft)] hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60";
const btnGhost =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-transparent bg-transparent px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60";

export function AdminProductList({
  items,
  isPending,
  isMutating,
  error,
  onDeactivate,
  onToggleActive,
  onSelect,
}: AdminProductListProps) {
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
      {items.map((item) => (
        <article
          className="grid grid-cols-[56px_1fr_auto_auto] items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-[14px] max-[900px]:grid-cols-[56px_1fr]"
          key={item.id}
        >
          <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-slate-100">
            {item.thumbnailUrl ? (
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="56px"
                src={item.thumbnailUrl}
              />
            ) : null}
          </div>
          <button
            className="grid min-w-0 cursor-pointer gap-1 border-0 bg-transparent p-0 text-left"
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
          <StatusBadge
            active={item.isActive}
            activeLabel="노출 중"
            inactiveLabel="숨김"
          />
          <button
            className={item.isActive ? btnGhost : btnSecondary}
            disabled={isMutating}
            onClick={() =>
              item.isActive
                ? onDeactivate(item.id)
                : onToggleActive(item.id, item.isActive)
            }
            type="button"
          >
            {item.isActive ? "숨기기" : "노출하기"}
          </button>
        </article>
      ))}
    </div>
  );
}

function formatPrice(price: number | null) {
  return price === null ? "" : `${price.toLocaleString("ko-KR")}원`;
}
