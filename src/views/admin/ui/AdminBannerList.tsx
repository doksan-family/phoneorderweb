"use client";

import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminBannerEditForm } from "@/features/admin/ui/AdminBannerEditForm";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { useDragReorder } from "@/shared/lib/useDragReorder";
import { AdminBannerRow } from "./AdminBannerRow";

type AdminBannerListProps = {
  banners: AdminBanner[];
  deletingId: string | null;
  editingId: string | null;
  loading: boolean;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onToggleEdit: (id: string) => void;
  onUpdated: (banner: AdminBanner) => void;
  /** 드래그로 바뀐 전체 순서. 첫 항목이 노출 순서 1이다. */
  onReorder: (banners: AdminBanner[]) => void;
};

export function AdminBannerList({
  banners,
  deletingId,
  editingId,
  loading,
  onCancelEdit,
  onDelete,
  onToggleEdit,
  onUpdated,
  onReorder,
}: AdminBannerListProps) {
  const { getRowProps, registerContainer, onContainerDragOver } = useDragReorder(
    banners,
    onReorder
  );

  if (loading) return <SkeletonRows count={3} />;
  if (!banners.length) {
    return <AdminEmptyState fill message="등록된 배너가 없습니다." />;
  }

  return (
    <div
      className="grid content-start gap-2.5"
      ref={registerContainer}
      onDragOver={onContainerDragOver}
    >
      {banners.map((banner, index) => (
        <div key={banner.id}>
          <AdminBannerRow
            banner={banner}
            drag={getRowProps(index)}
            isDeleting={deletingId === banner.id}
            isEditing={editingId === banner.id}
            onDelete={onDelete}
            onToggleEdit={onToggleEdit}
          />
          {editingId === banner.id ? (
            <AdminBannerEditForm
              banner={banner}
              onCancel={onCancelEdit}
              onUpdated={onUpdated}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
