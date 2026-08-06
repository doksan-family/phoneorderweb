import { Skeleton } from "@/shared/ui/Skeleton";
import { carrierOptions } from "../model/planDraft";

/** 통신사 3열 목록 자리표시. */
export function AdminPlanListSkeleton() {
  return (
    <div className="grid grid-cols-3 items-start gap-3 max-[900px]:grid-cols-1">
      {carrierOptions.map((carrier) => (
        <section className="grid content-start gap-2.5" key={carrier.value}>
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="size-7 rounded-lg" />
          </div>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              className="grid gap-2 rounded-[10px] border border-slate-200 bg-white p-3.5"
              key={index}
            >
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-2.5 w-4/5" />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
