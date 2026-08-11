"use client";

import type {
  PublicFaq,
  PublicNotice,
} from "@/entities/content/model/customerCenterTypes";
import { AdminFaqForm } from "@/features/customer-center-admin/ui/AdminFaqForm";
import { AdminNoticeForm } from "@/features/customer-center-admin/ui/AdminNoticeForm";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";

type AdminContentDialogsProps = {
  label: string;
  isNotice: boolean;
  isCreateOpen: boolean;
  editingNotice?: PublicNotice;
  editingFaq?: PublicFaq;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
};

const dialogWidthClass = "w-[min(620px,100%)]";

export function AdminContentDialogs({
  label,
  isNotice,
  isCreateOpen,
  editingNotice,
  editingFaq,
  onCloseCreate,
  onCloseEdit,
}: AdminContentDialogsProps) {
  return (
    <>
      {isCreateOpen ? (
        <AdminCreateDialog
          title={`${label} 등록`}
          widthClassName={dialogWidthClass}
          onClose={onCloseCreate}
        >
          {isNotice ? (
            <AdminNoticeForm onSaved={onCloseCreate} />
          ) : (
            <AdminFaqForm onSaved={onCloseCreate} />
          )}
        </AdminCreateDialog>
      ) : null}
      {editingNotice || editingFaq ? (
        <AdminCreateDialog
          title={`${label} 수정`}
          widthClassName={dialogWidthClass}
          onClose={onCloseEdit}
        >
          {editingNotice ? (
            <AdminNoticeForm
              key={editingNotice.id}
              notice={editingNotice}
              onSaved={onCloseEdit}
            />
          ) : null}
          {editingFaq ? (
            <AdminFaqForm
              faq={editingFaq}
              key={editingFaq.id}
              onSaved={onCloseEdit}
            />
          ) : null}
        </AdminCreateDialog>
      ) : null}
    </>
  );
}
