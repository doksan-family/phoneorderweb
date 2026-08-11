"use client";

import { updateAdminReview } from "@/entities/review/api/admin";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import type { AdminReview } from "@/entities/review/model/types";
import { useListReorder } from "@/shared/lib/useListReorder";

export function useReviewReorder(onSettled: () => void) {
  return useListReorder<AdminReview>({
    queryKey: reviewQueryOptions.adminList().queryKey,
    getId: (item) => item.id,
    applyOrder: (item, order) => ({ ...item, display_order: order }),
    // image_files를 안 보내면 기존 이미지는 그대로 유지된다.
    save: (id, order) => updateAdminReview(id, { display_order: order }),
    onSettled,
  });
}
