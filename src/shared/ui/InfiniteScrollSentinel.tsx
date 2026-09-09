"use client";

import { useEffect, useRef, type ReactNode } from "react";

type InfiniteScrollSentinelProps = {
  /** 뷰포트에 근접하면 호출된다. hasNext·로딩중이 아닐 때만 넘겨받도록 disabled로 제어한다. */
  onReach: () => void;
  disabled?: boolean;
  /** 다음 페이지를 불러오는 중이면 스피너를 보여준다. */
  loading?: boolean;
  /** 스피너 대신 직접 넣을 내용. */
  children?: ReactNode;
};

/**
 * 마지막 항목 근처에 놓는 감지용 요소. IntersectionObserver로 다음 페이지 로딩을 트리거한다.
 */
export function InfiniteScrollSentinel({
  onReach,
  disabled = false,
  loading = false,
  children,
}: InfiniteScrollSentinelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onReachRef = useRef(onReach);

  useEffect(() => {
    onReachRef.current = onReach;
  });

  useEffect(() => {
    if (disabled) return;
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onReachRef.current();
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [disabled]);

  return (
    <div ref={ref}>
      {children ??
        (loading ? (
          <div className="flex justify-center py-4">
            <span
              aria-label="더 불러오는 중"
              className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500"
              role="status"
            />
          </div>
        ) : null)}
    </div>
  );
}
