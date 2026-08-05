"use client";

import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import type { AdminContentCreateInput } from "../model/adminContent";
import { ContentCreateForm } from "./ContentCreateForm";

type ContentCreateModalProps = {
  onClose: () => void;
  onCreate: (input: AdminContentCreateInput) => void;
};

export function ContentCreateModal({
  onClose,
  onCreate,
}: ContentCreateModalProps) {
  function handleCreate(input: AdminContentCreateInput) {
    onCreate(input);
    onClose();
  }

  return (
    <AdminCreateDialog
      title="콘텐츠 등록"
      widthClassName="w-[min(620px,100%)]"
      onClose={onClose}
    >
      <ContentCreateForm onCancel={onClose} onCreate={handleCreate} />
    </AdminCreateDialog>
  );
}
