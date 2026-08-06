import { Skeleton } from "./Skeleton";

/** ProductCard와 같은 뼈대. 로딩 중 레이아웃이 튀지 않게 높이를 맞춘다. */
export function ProductCardSkeleton() {
  return (
    <article
      aria-hidden
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3">
        <Skeleton className="h-2.5 w-2/5" />
        <Skeleton className="h-3.5 w-11/12" />
        <Skeleton className="h-3.5 w-3/5" />
        <div className="mt-auto grid gap-1.5 border-t border-slate-100 pt-2">
          <Skeleton className="h-2.5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="mt-2.5 h-9 w-full rounded-[10px]" />
      </div>
    </article>
  );
}
