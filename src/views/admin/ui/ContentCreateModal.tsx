"use client";

import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import type { AdminContentType } from "../model/adminContent";
import { contentTypeLabel } from "../model/adminContent";
import { ContentCreateForm } from "./ContentCreateForm";

type ContentCreateModalProps = {
  type: AdminContentType;
  onClose: () => void;
  onCreate: (title: string) => void;
};

export function ContentCreateModal({
  type,
  onClose,
  onCreate,
}: ContentCreateModalProps) {
  function handleCreate(title: string) {
    onCreate(title);
    onClose();
  }

  return (
    <AdminCreateDialog
      title={`${contentTypeLabel[type]} 등록`}
      widthClassName="w-[min(620px,100%)]"
      onClose={onClose}
    >
      <ContentCreateForm
        type={type}
        onCancel={onClose}
        onCreate={handleCreate}
      />
    </AdminCreateDialog>
  );
}
