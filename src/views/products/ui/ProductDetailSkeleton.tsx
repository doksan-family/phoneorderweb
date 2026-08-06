import { Skeleton } from "@/shared/ui/Skeleton";

/** 상품 상세 첫 화면 자리표시. 갤러리와 우측 정보 영역을 실제 배치대로 잡는다. */
export function ProductDetailSkeleton() {
  return (
    <main className="site-container pt-10 pb-[112px]">
      <section className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6">
        <div className="grid gap-3">
          <Skeleton className="aspect-square w-[420px] max-w-full rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton className="size-16 rounded-lg" key={index} />
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex gap-1.5">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-[14px]" />
        </div>
      </section>
    </main>
  );
}
