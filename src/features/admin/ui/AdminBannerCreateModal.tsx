"use client";

import type { AdminBanner } from "@/entities/banner/model/types";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { AdminBannerForm } from "./AdminBannerForm";

type AdminBannerCreateModalProps = {
  onClose: () => void;
  onCreated: (banner: AdminBanner) => void;
};

export function AdminBannerCreateModal({
  onClose,
  onCreated,
}: AdminBannerCreateModalProps) {
  function handleCreated(banner: AdminBanner) {
    onCreated(banner);
    onClose();
  }

  return (
    <AdminCreateDialog
      title="배너 등록"
      widthClassName="w-[min(760px,100%)]"
      onClose={onClose}
    >
      <AdminBannerForm onCreated={handleCreated} />
    </AdminCreateDialog>
  );
}
