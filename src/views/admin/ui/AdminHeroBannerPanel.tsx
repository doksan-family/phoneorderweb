"use client";

import { useEffect, useState } from "react";
import { deleteAdminBanner, fetchAdminBanners } from "@/entities/banner/api/admin";
import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminBannerForm } from "@/features/admin/ui/AdminBannerForm";

const btnSecondary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-slate-200 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-white text-blue-900 hover:border-blue-700 hover:text-blue-700";

const btnGhost =
  "inline-flex items-center justify-center min-h-[48px] border-0 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-transparent text-red-600";

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
    <section className="border border-slate-200 rounded-xl bg-white p-[22px]">
      <div className="mb-7">
        <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">Banner</p>
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">배너 관리</h2>
      </div>
      <AdminBannerForm onCreated={handleCreated} />
      <div className="grid gap-2.5">
        {loading ? (
          <p className="text-slate-500">불러오는 중...</p>
        ) : banners.length === 0 ? (
          <p className="text-slate-500">등록된 배너가 없습니다.</p>
        ) : (
          banners.map((banner) => (
            <div key={banner.id}>
              <article className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center p-[14px] border border-slate-200 rounded-[10px] bg-white max-[900px]:grid-cols-1">
                <div className="grid gap-1">
                  <strong>{banner.title}</strong>
                  <span className="text-slate-500 text-[0.88rem] leading-[1.65]">
                    {banner.type} · {banner.start_at ?? "시작일 없음"} ~{" "}
                    {banner.end_at ?? "종료일 없음"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: banner.is_active ? "#dcfce7" : "#f1f5f9",
                      color: banner.is_active ? "#15803d" : "#64748b",
                    }}
                  >
                    {banner.is_active ? "활성" : "비활성"}
                  </span>
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
  );
}
