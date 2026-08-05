"use client";

import { useEffect, useState } from "react";
import { deleteAdminBanner, fetchAdminBanners } from "@/entities/banner/api/admin";
import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerCreateModal } from "@/features/admin/ui/AdminBannerCreateModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelBaseClass } from "@/shared/ui/adminPanelStyles";
import { AdminBannerList } from "./AdminBannerList";

export function AdminHeroBannerPanel() {
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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

  function toggleEdit(id: string) {
    setEditingId((prev) => (prev === id ? null : id));
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
          <AdminBannerList
            banners={banners}
            deletingId={deletingId}
            editingId={editingId}
            loading={loading}
            onCancelEdit={() => setEditingId(null)}
            onDelete={handleDelete}
            onToggleEdit={toggleEdit}
            onUpdated={handleUpdated}
          />
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
