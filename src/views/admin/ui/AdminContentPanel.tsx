"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { AdminFaqForm } from "@/features/customer-center-admin/ui/AdminFaqForm";
import { AdminNoticeForm } from "@/features/customer-center-admin/ui/AdminNoticeForm";
import { useDeleteContent } from "@/features/customer-center-admin/model/useDeleteContent";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import type { AdminContentType } from "../model/adminContent";
import {
  contentTypeLabel,
  toContentItemFromFaq,
  toContentItemFromNotice,
} from "../model/adminContent";
import { AdminContentRow } from "./AdminContentRow";

type AdminContentPanelProps = {
  type: AdminContentType;
};

export function AdminContentPanel({ type }: AdminContentPanelProps) {
  const isNotice = type === "공지";
  const label = contentTypeLabel[type];
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // 훅은 조건부로 못 부르므로 둘 다 걸어 두고 해당 유형만 활성화한다
  const noticesQuery = useQuery({
    ...customerCenterQueryOptions.adminNotices(),
    enabled: isNotice,
  });
  const faqsQuery = useQuery({
    ...customerCenterQueryOptions.adminFaqs(),
    enabled: !isNotice,
  });
  const { data, error, isPending } = isNotice ? noticesQuery : faqsQuery;
  const items = isNotice
    ? (noticesQuery.data?.items ?? []).map(toContentItemFromNotice)
    : (faqsQuery.data?.items ?? []).map(toContentItemFromFaq);

  const [editingId, setEditingId] = useState("");
  const editingNotice = noticesQuery.data?.items.find((item) => item.id === editingId);
  const editingFaq = faqsQuery.data?.items.find((item) => item.id === editingId);
  const deleteMutation = useDeleteContent(isNotice ? "notices" : "faqs");

  return (
    <section className={adminFullPanelWithFabClass}>
      {data ? (
        <p className="mb-7 text-sm font-bold text-slate-400">총 {data.total}건</p>
      ) : null}

      {isPending ? <SkeletonRows count={3} /> : null}
      {error ? (
        <AdminEmptyState
          message={`${label}을(를) 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`}
        />
      ) : null}
      {!isPending && !error && !items.length ? (
        <AdminEmptyState message={`등록된 ${label}이(가) 없습니다.`} />
      ) : null}

      {deleteMutation.error ? (
        <AdminEmptyState
          message={`${label}을(를) 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.`}
        />
      ) : null}

      <div className="grid gap-2.5">
        {items.map((item) => (
          <AdminContentRow
            isDeleting={deleteMutation.isPending}
            item={item}
            key={item.id}
            label={label}
            onDelete={() => deleteMutation.mutate(item.id)}
            onSelect={() => setEditingId(item.id)}
          />
        ))}
      </div>

      <FloatingActionButton
        label={`${label} 등록`}
        onClick={() => setIsCreateOpen(true)}
      />
      {isCreateOpen ? (
        <AdminCreateDialog
          title={`${label} 등록`}
          widthClassName="w-[min(620px,100%)]"
          onClose={() => setIsCreateOpen(false)}
        >
          {isNotice ? (
            <AdminNoticeForm onSaved={() => setIsCreateOpen(false)} />
          ) : (
            <AdminFaqForm onSaved={() => setIsCreateOpen(false)} />
          )}
        </AdminCreateDialog>
      ) : null}
      {editingNotice || editingFaq ? (
        <AdminCreateDialog
          title={`${label} 수정`}
          widthClassName="w-[min(620px,100%)]"
          onClose={() => setEditingId("")}
        >
          {editingNotice ? (
            <AdminNoticeForm
              key={editingNotice.id}
              notice={editingNotice}
              onSaved={() => setEditingId("")}
            />
          ) : null}
          {editingFaq ? (
            <AdminFaqForm
              faq={editingFaq}
              key={editingFaq.id}
              onSaved={() => setEditingId("")}
            />
          ) : null}
        </AdminCreateDialog>
      ) : null}
    </section>
  );
}
