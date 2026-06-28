"use client";

import { useEffect, useState } from "react";
import { deleteAdminBanner, fetchAdminBanners } from "@/entities/banner/api/admin";
import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminBannerForm } from "@/features/admin/ui/AdminBannerForm";

const btnSecondary =
  "inline-flex items-center justify-center min-h-[34px] border border-slate-200 rounded-lg px-3.5 cursor-pointer text-sm font-bold transition-all bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700";

const btnGhost =
  "inline-flex items-center justify-center min-h-[34px] border-0 rounded-lg px-3 cursor-pointer text-sm font-bold transition-all bg-transparent text-red-500 hover:text-red-700";

export function AdminHeroBannerPanel() {
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminBanners()
      .then(setBanners)
      .finally(() => setLoading(false));
  }, []);

  function handleCreated(banner: AdminBanner) {
    setBanners((prev) => [...prev, banner]);
  }

  function handleUpdated(updated: AdminBanner) {
    setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("배너를 삭제하시겠습니까?")) return;
    setDeletingId(id);
    try {
      await deleteAdminBanner(id);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      if (editingId === id) setEditingId(null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid grid-cols-[360px_1fr] gap-6 items-stretch max-[900px]:grid-cols-1">
      {/* 목록 */}
      <section className="flex flex-col overflow-hidden border border-slate-200 rounded-xl bg-white p-6">
        <h2 className="m-0 mb-4 shrink-0 text-base font-extrabold text-slate-950">등록된 배너</h2>
        <div className="grid content-start gap-2.5 overflow-y-auto flex-1 pr-1">
          {loading ? (
            <p className="text-slate-500 text-sm">불러오는 중...</p>
          ) : banners.length === 0 ? (
            <p className="text-slate-500 text-sm">등록된 배너가 없습니다.</p>
          ) : (
            banners.map((banner) => (
              <div key={banner.id}>
                <article className="flex items-center justify-between gap-4 p-3.5 border border-slate-200 rounded-[10px] bg-white">
                  <div className="grid gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="truncate text-sm">{banner.title}</strong>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.72rem] font-bold ${banner.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {banner.is_active ? "활성" : "비활성"}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[0.8rem]">
                      {banner.type} · {banner.start_at ?? "무제한"} ~ {banner.end_at ?? "무제한"}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      className={btnSecondary}
                      type="button"
                      onClick={() =>
                        setEditingId((prev) => (prev === banner.id ? null : banner.id))
                      }
                    >
                      {editingId === banner.id ? "닫기" : "수정"}
                    </button>
                    <button
                      className={btnGhost}
                      type="button"
                      disabled={deletingId === banner.id}
                      onClick={() => handleDelete(banner.id)}
                    >
                      {deletingId === banner.id ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                </article>
                {editingId === banner.id && (
                  <AdminBannerEditForm
                    banner={banner}
                    onUpdated={handleUpdated}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* 등록 */}
      <div className="sticky top-[90px]">
        <AdminBannerForm onCreated={handleCreated} />
      </div>
    </div>
  );
}
