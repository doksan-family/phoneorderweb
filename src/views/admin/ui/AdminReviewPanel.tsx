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
import { AdminReviewRow } from "./AdminReviewRow";

export function AdminReviewPanel() {
  const { data, error, isPending } = useQuery(reviewQueryOptions.adminList());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const queryClient = useQueryClient();
  const reviews = data?.items ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteAdminReview,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminReviewsQueryKey }),
  });

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

      <div className="grid gap-2.5">
        {reviews.map((review) => (
          <AdminReviewRow
            isDeleting={deleteMutation.isPending}
            key={review.id}
            review={review}
            onDelete={() => deleteMutation.mutate(review.id)}
            onSelect={() => setEditingReview(review)}
          />
        ))}
      </div>

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
