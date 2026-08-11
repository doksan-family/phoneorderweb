"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { useDeleteContent } from "@/features/customer-center-admin/model/useDeleteContent";
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
import { useContentReorder } from "../model/useContentReorder";
import { AdminContentDialogs } from "./AdminContentDialogs";
import { AdminContentList } from "./AdminContentList";

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
  // 드래그 순서와 화면 순서를 맞추려면 목록이 항상 display_order 순이어야 한다.
  const items = (
    isNotice
      ? (noticesQuery.data?.items ?? []).map(toContentItemFromNotice)
      : (faqsQuery.data?.items ?? []).map(toContentItemFromFaq)
  ).sort((first, second) => first.displayOrder - second.displayOrder);

  const [editingId, setEditingId] = useState("");
  const editingNotice = noticesQuery.data?.items.find((item) => item.id === editingId);
  const editingFaq = faqsQuery.data?.items.find((item) => item.id === editingId);
  const resource = isNotice ? "notices" : "faqs";
  const deleteMutation = useDeleteContent(resource);
  const reorder = useContentReorder(resource);

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

      <AdminContentList
        isDeleting={deleteMutation.isPending}
        items={items}
        label={label}
        onDelete={(id) => deleteMutation.mutate(id)}
        onReorder={(next) =>
          reorder.mutate(
            next.map((item) => ({ id: item.id, order: item.displayOrder }))
          )
        }
        onSelect={setEditingId}
      />

      <FloatingActionButton
        label={`${label} 등록`}
        onClick={() => setIsCreateOpen(true)}
      />
      <AdminContentDialogs
        editingFaq={editingFaq}
        editingNotice={editingNotice}
        isCreateOpen={isCreateOpen}
        isNotice={isNotice}
        label={label}
        onCloseCreate={() => setIsCreateOpen(false)}
        onCloseEdit={() => setEditingId("")}
      />
    </section>
  );
}
