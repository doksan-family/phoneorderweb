"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 새 순서대로 정렬된 항목. order는 저장돼 있는 현재 display_order다. */
export type ReorderInput = { id: string; order: number };

/** 목록 응답이 배열인 화면과 { items } 페이지인 화면을 함께 받는다. */
type ListCache<T> = T[] | { items: T[] };

type ListReorderConfig<T> = {
  /** 낙관적 갱신 대상 캐시 키 */
  queryKey: readonly unknown[];
  getId: (item: T) => string;
  applyOrder: (item: T, order: number) => T;
  /** 순서가 바뀐 항목만 호출된다. */
  save: (id: string, order: number) => Promise<unknown>;
  onSettled: () => void;
};

/**
 * 드래그로 정해진 순서를 display_order(1부터)로 저장한다.
 * 캐시를 먼저 바꿔 요청이 끝날 때까지 목록이 되돌아가 보이지 않게 한다.
 * 정렬은 화면이 display_order로 하므로 여기서는 값만 바꾼다.
 */
export function useListReorder<T>({
  queryKey,
  getId,
  applyOrder,
  save,
  onSettled,
}: ListReorderConfig<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (next: ReorderInput[]) => {
      const changed = next
        .map((item, index) => ({ id: item.id, order: index + 1, prev: item.order }))
        .filter((item) => item.prev !== item.order);

      return Promise.all(changed.map((item) => save(item.id, item.order)));
    },
    onMutate: (next: ReorderInput[]) => {
      const orders = new Map(next.map((item, index) => [item.id, index + 1]));

      queryClient.setQueryData<ListCache<T>>(queryKey, (previous) => {
        if (!previous) return previous;

        const apply = (item: T) => {
          const order = orders.get(getId(item));
          return order === undefined ? item : applyOrder(item, order);
        };

        return Array.isArray(previous)
          ? previous.map(apply)
          : { ...previous, items: previous.items.map(apply) };
      });
    },
    onSettled,
  });
}
