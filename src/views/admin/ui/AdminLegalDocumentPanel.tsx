"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  deleteAdminLegalDocument,
  type AdminLegalDocument,
} from "@/entities/legal-document/api/admin";
import {
  adminLegalDocumentsQueryKey,
  legalDocumentQueryOptions,
} from "@/entities/legal-document/model/queries";
import { DocumentFormModal } from "@/features/legal-document-admin/ui/DocumentFormModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { AdminLegalDocumentList } from "./AdminLegalDocumentList";

export function AdminLegalDocumentPanel() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<AdminLegalDocument | null>(
    null
  );
  const { data, error, isPending } = useQuery(
    legalDocumentQueryOptions.adminList()
  );

  function refetchDocuments() {
    return queryClient.invalidateQueries({
      queryKey: adminLegalDocumentsQueryKey,
    });
  }

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminLegalDocument(id),
    onSuccess: refetchDocuments,
  });

  function handleDelete(document: AdminLegalDocument) {
    if (!window.confirm(`"${document.title}" 약관을 삭제하시겠습니까?`)) return;
    deleteMutation.mutate(document.id);
  }

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      {deleteMutation.error ? (
        <p className="m-0 text-sm font-bold text-red-600">
          {deleteMutation.error.message}
        </p>
      ) : null}

      <AdminLegalDocumentList
        error={error}
        isMutating={deleteMutation.isPending}
        isPending={isPending}
        items={data ?? []}
        onDelete={handleDelete}
        onEdit={setEditingDocument}
      />

      {editingDocument ? (
        <DocumentFormModal
          document={editingDocument}
          onClose={() => setEditingDocument(null)}
        />
      ) : null}

      <FloatingActionButton label="약관 등록" onClick={() => setIsCreateOpen(true)} />

      {isCreateOpen ? (
        <DocumentFormModal onClose={() => setIsCreateOpen(false)} />
      ) : null}
    </section>
  );
}
