"use client";

import { useEffect, useState } from "react";
import { deleteAdminBanner, fetchAdminBanners } from "@/entities/banner/api/admin";
import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminBannerForm } from "@/features/admin/ui/AdminBannerForm";

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
    <section className="admin-panel">
      <div className="section__header">
        <p className="eyebrow">Banner</p>
        <h2>배너 관리</h2>
      </div>
      <AdminBannerForm onCreated={handleCreated} />
      <div className="admin-table">
        {loading ? (
          <p style={{ color: "var(--muted)" }}>불러오는 중...</p>
        ) : banners.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>등록된 배너가 없습니다.</p>
        ) : (
          banners.map((banner) => (
            <div key={banner.id}>
              <article className="admin-row">
                <div>
                  <strong>{banner.title}</strong>
                  <span>
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
                    className="button button--secondary"
                    type="button"
                    onClick={() =>
                      setEditingId((prev) => (prev === banner.id ? null : banner.id))
                    }
                  >
                    {editingId === banner.id ? "닫기" : "수정"}
                  </button>
                  <button
                    className="button button--ghost"
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
