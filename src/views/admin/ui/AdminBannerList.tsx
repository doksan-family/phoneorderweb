import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";

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
  "inline-flex items-center justify-center min-h-[34px] border border-slate-200 rounded-lg px-3.5 cursor-pointer text-sm font-bold transition-all bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950";
const btnGhost =
  "inline-flex items-center justify-center min-h-[34px] border-0 rounded-lg px-3 cursor-pointer text-sm font-bold transition-all bg-transparent text-red-500 hover:text-red-700";

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
  if (loading) return <AdminEmptyState fill message="불러오는 중..." />;
  if (!banners.length) {
    return <AdminEmptyState fill message="등록된 배너가 없습니다." />;
  }

  return banners.map((banner) => (
    <div key={banner.id}>
      <article className="flex items-center justify-between gap-4 p-3.5 border border-slate-200 rounded-[10px] bg-white">
        <div className="grid gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <strong className="truncate text-sm">{banner.title}</strong>
            <span className={getStatusClass(banner.is_active)}>
              {banner.is_active ? "활성" : "비활성"}
            </span>
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
          <button
            className={btnGhost}
            disabled={deletingId === banner.id}
            type="button"
            onClick={() => onDelete(banner.id)}
          >
            {deletingId === banner.id ? "삭제 중..." : "삭제"}
          </button>
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

function getStatusClass(isActive: boolean) {
  const base = "shrink-0 rounded-full px-2.5 py-0.5 text-[0.72rem] font-bold";
  return isActive ? `${base} bg-green-100 text-green-700` : `${base} bg-slate-100 text-slate-500`;
}
