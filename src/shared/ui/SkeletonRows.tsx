import { Skeleton } from "./Skeleton";

type SkeletonRowsProps = {
  count?: number;
  /** 왼쪽 정사각 썸네일 자리를 그릴지 */
  withThumbnail?: boolean;
};

/** 어드민 목록 행 자리표시. 실제 행과 같은 높이·간격을 쓴다. */
export function SkeletonRows({ count = 4, withThumbnail = true }: SkeletonRowsProps) {
  return (
    <div className="grid gap-2.5">
      {Array.from({ length: count }, (_, index) => (
        <div
          className="flex items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-3.5"
          key={index}
        >
          {withThumbnail ? <Skeleton className="size-14 shrink-0 rounded-lg" /> : null}
          <div className="grid min-w-0 flex-1 gap-2">
            <Skeleton className="h-3.5 w-2/5 max-w-64" />
            <Skeleton className="h-2.5 w-3/5 max-w-96" />
          </div>
          <Skeleton className="h-10 w-20 shrink-0 rounded-[10px] max-[900px]:hidden" />
        </div>
      ))}
    </div>
  );
}
