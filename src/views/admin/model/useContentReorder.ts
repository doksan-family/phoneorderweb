"use client";

import {
  updateAdminFaq,
  updateAdminNotice,
} from "@/entities/content/api/adminCustomerCenter";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import type {
  PublicFaq,
  PublicNotice,
} from "@/entities/content/model/customerCenterTypes";
import { useListReorder } from "@/shared/lib/useListReorder";
import { useQueryClient } from "@tanstack/react-query";

/** 공지·FAQ는 응답 타입만 다르고 순서 저장 방식이 같다. */
export function useContentReorder(resource: "notices" | "faqs") {
  const queryClient = useQueryClient();
  const isNotice = resource === "notices";

  return useListReorder<PublicNotice | PublicFaq>({
    queryKey: isNotice
      ? customerCenterQueryOptions.adminNotices().queryKey
      : customerCenterQueryOptions.adminFaqs().queryKey,
    getId: (item) => item.id,
    applyOrder: (item, order) => ({ ...item, display_order: order }),
    save: (id, order) =>
      isNotice
        ? updateAdminNotice(id, { display_order: order })
        : updateAdminFaq(id, { display_order: order }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [`admin-${resource}`] });
      await queryClient.invalidateQueries({ queryKey: [`public-${resource}`] });
    },
  });
}
