import { Skeleton } from "@/shared/ui/Skeleton";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5";

/** 실제 대시보드와 같은 격자로 자리를 잡아 로딩 후 레이아웃이 튀지 않게 한다. */
export function AdminOverviewSkeleton() {
  return (
    <div className="grid gap-3.5">
      <div className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {Array.from({ length: 4 }, (_, index) => (
          <div className={`${cardClass} grid gap-2.5`} key={index}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-2.5 w-24" />
          </div>
        ))}
      </div>

      <div className={cardClass}>
        <Skeleton className="mb-3.5 h-3.5 w-28" />
        <Skeleton className="h-44 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1">
        {Array.from({ length: 2 }, (_, index) => (
          <div className={`${cardClass} grid gap-2.5`} key={index}>
            <Skeleton className="mb-1 h-3.5 w-24" />
            {Array.from({ length: 5 }, (_, row) => (
              <Skeleton className="h-8 w-full" key={row} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
