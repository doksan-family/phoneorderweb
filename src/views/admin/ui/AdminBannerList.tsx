import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { IconDeleteButton } from "@/shared/ui/IconDeleteButton";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { StatusBadge } from "@/shared/ui/StatusBadge";

type AdminBannerListProps = {
  banners: AdminBanner[];
  deletingId: string | null;
  editingId: string | null;
  loading: boolean;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onToggleEdit: (id: string) => void;
  onUpdated: (banner: AdminBanner) => void;
};

const btnSecondary =
  "inline-flex items-center justify-center min-h-[34px] border border-slate-200 rounded-lg px-3.5 text-sm font-bold transition-all bg-white text-slate-700 hover:bg-[var(--brand-primary-soft)] hover:text-slate-950";

export function AdminBannerList({
  banners,
  deletingId,
  editingId,
  loading,
  onCancelEdit,
  onDelete,
  onToggleEdit,
  onUpdated,
}: AdminBannerListProps) {
  if (loading) return <SkeletonRows count={3} />;
  if (!banners.length) {
    return <AdminEmptyState fill message="등록된 배너가 없습니다." />;
  }

  return banners.map((banner) => (
    <div key={banner.id}>
      <article className="flex items-center justify-between gap-4 p-3.5 border border-slate-200 rounded-[10px] bg-white">
        <div className="grid gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <strong className="truncate text-sm">{banner.title}</strong>
            <StatusBadge
              active={banner.is_active}
              activeLabel="노출"
              inactiveLabel="숨김"
            />
          </div>
          <span className="text-slate-400 text-[0.8rem]">
            {banner.type} · {banner.start_at ?? "무제한"} ~{" "}
            {banner.end_at ?? "무제한"}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            className={btnSecondary}
            type="button"
            onClick={() => onToggleEdit(banner.id)}
          >
            {editingId === banner.id ? "닫기" : "수정"}
          </button>
          <IconDeleteButton
            disabled={deletingId === banner.id}
            label="배너 삭제"
            targetName={banner.title}
            onClick={() => onDelete(banner.id)}
          />
        </div>
      </article>
      {editingId === banner.id ? (
        <AdminBannerEditForm
          banner={banner}
          onCancel={onCancelEdit}
          onUpdated={onUpdated}
        />
      ) : null}
    </div>
  ));
}
