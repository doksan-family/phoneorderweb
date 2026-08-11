"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAdminReview } from "@/entities/review/api/admin";
import {
  adminReviewsQueryKey,
  reviewQueryOptions,
} from "@/entities/review/model/queries";
import type { AdminReview } from "@/entities/review/model/types";
import { AdminReviewForm } from "@/features/review-admin/ui/AdminReviewForm";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { useReviewReorder } from "../model/useReviewReorder";
import { AdminReviewList } from "./AdminReviewList";

export function AdminReviewPanel() {
  const { data, error, isPending } = useQuery(reviewQueryOptions.adminList());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const queryClient = useQueryClient();
  // 드래그 순서와 화면 순서를 맞추려면 목록이 항상 display_order 순이어야 한다.
  const reviews = [...(data?.items ?? [])].sort(
    (first, second) => first.display_order - second.display_order
  );

  function refetchReviews() {
    return queryClient.invalidateQueries({ queryKey: adminReviewsQueryKey });
  }

  const deleteMutation = useMutation({
    mutationFn: deleteAdminReview,
    onSuccess: refetchReviews,
  });

  const reorder = useReviewReorder(refetchReviews);

  return (
    <section className={adminFullPanelWithFabClass}>
      {data ? (
        <p className="mb-7 text-sm font-bold text-slate-400">총 {data.total}건</p>
      ) : null}

      {isPending ? <SkeletonRows count={3} /> : null}
      {error ? (
        <AdminEmptyState message="후기를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." />
      ) : null}
      {!isPending && !error && !reviews.length ? (
        <AdminEmptyState message="등록된 구매후기가 없습니다." />
      ) : null}

      {deleteMutation.error ? (
        <AdminEmptyState message="후기를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요." />
      ) : null}

      <AdminReviewList
        isDeleting={deleteMutation.isPending}
        items={reviews}
        onDelete={(id) => deleteMutation.mutate(id)}
        onReorder={(next) =>
          reorder.mutate(
            next.map((item) => ({ id: item.id, order: item.display_order }))
          )
        }
        onSelect={setEditingReview}
      />

      <FloatingActionButton
        label="구매후기 등록"
        onClick={() => setIsCreateOpen(true)}
      />
      {isCreateOpen ? (
        <AdminCreateDialog
          title="구매후기 등록"
          widthClassName="w-[min(760px,100%)]"
          onClose={() => setIsCreateOpen(false)}
        >
          <AdminReviewForm onSaved={() => setIsCreateOpen(false)} />
        </AdminCreateDialog>
      ) : null}
      {editingReview ? (
        <AdminCreateDialog
          title="구매후기 수정"
          widthClassName="w-[min(760px,100%)]"
          onClose={() => setEditingReview(null)}
        >
          <AdminReviewForm
            key={editingReview.id}
            review={editingReview}
            onSaved={() => setEditingReview(null)}
          />
        </AdminCreateDialog>
      ) : null}
    </section>
  );
}
