"use client";

import type { AdminLegalDocument } from "@/entities/legal-document/api/admin";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { DocumentForm } from "./DocumentForm";

type DocumentFormModalProps = {
  document?: AdminLegalDocument;
  onClose: () => void;
};

export function DocumentFormModal({ document, onClose }: DocumentFormModalProps) {
  return (
    <AdminCreateDialog
      title={document ? "약관 수정" : "약관 등록"}
      widthClassName="w-[min(720px,100%)]"
      onClose={onClose}
    >
      <DocumentForm document={document} onCancel={onClose} onSaved={onClose} />
    </AdminCreateDialog>
  );
}
