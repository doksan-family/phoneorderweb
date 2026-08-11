"use client";

import { useQueryClient } from "@tanstack/react-query";
import { updateAdminPlan, type AdminPlan } from "@/entities/plan/api/admin";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { useListReorder } from "@/shared/lib/useListReorder";

/**
 * 요금제는 통신사 열 안에서만 순서를 바꾼다.
 * display_order는 통신사별로 1부터 매겨진다.
 */
export function usePlanReorder() {
  const queryClient = useQueryClient();

  return useListReorder<AdminPlan>({
    queryKey: planQueryOptions.adminList({ includeInactive: true }).queryKey,
    getId: (item) => item.id,
    applyOrder: (item, order) => ({ ...item, display_order: order }),
    save: (id, order) => updateAdminPlan(id, { display_order: order }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] }),
  });
}
