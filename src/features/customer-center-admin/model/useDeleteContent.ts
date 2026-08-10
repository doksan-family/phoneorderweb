"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminCustomerCenter } from "@/entities/content/api/adminCustomerCenter";

/** 공지·FAQ 삭제. 성공하면 어드민 목록과 공개 목록을 함께 갱신한다. */
export function useDeleteContent(resource: "notices" | "faqs") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminCustomerCenter(resource, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`admin-${resource}`] });
      await queryClient.invalidateQueries({ queryKey: [`public-${resource}`] });
    },
  });
}
