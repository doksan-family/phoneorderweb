import { Skeleton } from "@/shared/ui/Skeleton";

export function EstimateBodySkeleton() {
  return (
    <div role="status" aria-label="견적 계산 중" className="grid gap-3.5">
      <span className="sr-only">선택한 조건의 견적을 계산하고 있습니다.</span>
      <Skeleton className="h-7 w-44 rounded-full" />
      <div className="grid gap-[9px]">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="flex h-5 items-center justify-between gap-3">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        ))}
      </div>
      <div className="flex h-14 items-center justify-between gap-3 rounded-xl bg-[var(--brand-primary-soft)] px-3.5">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-7 w-28 rounded" />
      </div>
      <Skeleton className="ml-auto h-3 w-44 rounded" />
      <div className="grid gap-3 rounded-xl border-2 border-slate-100 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>
        <Skeleton className="ml-auto h-3 w-36 rounded" />
      </div>
      <Skeleton className="ml-auto h-3.5 w-40 rounded" />
    </div>
  );
}
