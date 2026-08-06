type SkeletonProps = {
  className?: string;
};

/** 로딩 자리표시 블록. 크기는 className으로 정한다. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <span aria-hidden className={`skeleton block ${className}`} />;
}
