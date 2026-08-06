import { ProductCardSkeleton } from "@/shared/ui/ProductCardSkeleton";
import { Skeleton } from "@/shared/ui/Skeleton";

/**
 * 목록은 서버에서 prefetch하므로 RSC 응답을 기다리는 동안 라우팅이 멈춘다.
 * loading 경계가 있어야 클릭 즉시 화면이 바뀐다.
 */
export default function ProductsLoading() {
  return (
    <main className="site-container pt-14 pb-20">
      <div className="mb-[22px] grid gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-2.5">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
