"use client";

import { useEffect, useState } from "react";
import {
  deleteAdminBanner,
  fetchAdminBanners,
  updateAdminBanner,
} from "@/entities/banner/api/admin";
import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerCreateModal } from "@/features/admin/ui/AdminBannerCreateModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelBaseClass } from "@/shared/ui/adminPanelStyles";
import { AdminBannerList } from "./AdminBannerList";

export function AdminHeroBannerPanel() {
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  function loadBanners() {
    setLoading(true);
    setLoadError(false);
    fetchAdminBanners()
      .then((data) => {
        setBanners(data);
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let alive = true;
    fetchAdminBanners()
      .then((data) => {
        if (alive) setBanners(data);
      })
      .catch(() => {
        if (alive) setLoadError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  function handleCreated(banner: AdminBanner) {
    setBanners((prev) => [...prev, banner]);
  }

  function handleUpdated(updated: AdminBanner) {
    setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setEditingId(null);
  }

  function toggleEdit(id: string) {
    setEditingId((prev) => (prev === id ? null : id));
  }

  async function handleReorder(next: AdminBanner[]) {
    const previous = banners;
    const ordered = next.map((b, index) => ({ ...b, display_order: index + 1 }));
    setBanners(ordered);

    const changed = ordered.filter(
      (b) =>
        previous.find((o) => o.id === b.id)?.display_order !== b.display_order
    );
    try {
      await Promise.all(
        changed.map((b) =>
          updateAdminBanner(b.id, { display_order: b.display_order })
        )
      );
    } catch {
      fetchAdminBanners().then(setBanners);
    }
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
    <div className="relative flex flex-1 flex-col">
      <section className={`${adminFullPanelBaseClass} flex flex-col overflow-hidden p-6 pb-24`}>
        <h2 className="m-0 mb-4 shrink-0 text-base font-extrabold text-slate-950">등록된 배너</h2>
        <div className="grid content-start gap-2.5 overflow-y-auto flex-1 pr-1">
          {loadError ? (
            <div className="grid justify-items-start gap-2 py-6">
              <p className="m-0 text-sm text-slate-500">
                배너를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
              </p>
              <button
                className="text-sm font-bold text-[var(--brand-primary-strong)] underline"
                type="button"
                onClick={loadBanners}
              >
                다시 시도
              </button>
            </div>
          ) : (
            <AdminBannerList
              banners={banners}
              deletingId={deletingId}
              editingId={editingId}
              loading={loading}
              onCancelEdit={() => setEditingId(null)}
              onDelete={handleDelete}
              onReorder={handleReorder}
              onToggleEdit={toggleEdit}
              onUpdated={handleUpdated}
            />
          )}
        </div>
      </section>

      <FloatingActionButton
        label="배너 등록"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen ? (
        <AdminBannerCreateModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={handleCreated}
        />
      ) : null}
    </div>
  );
}
