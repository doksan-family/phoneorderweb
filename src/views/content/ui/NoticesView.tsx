"use client";

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { InfiniteScrollSentinel } from "@/shared/ui/InfiniteScrollSentinel";
import { PageHeader } from "@/shared/ui/PageHeader";

export function NoticesView() {
  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(customerCenterQueryOptions.noticesInfinite());
  const notices = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow="공지사항"
        title="운영 안내 및 공지"
        description="운영 안내와 상품 상담 관련 공지를 확인합니다."
      />
      {!isPending && !notices.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">등록된 공지사항이 없습니다.</p>
      ) : null}
      <section className="grid max-w-[820px] gap-3">
        {notices.map((notice) => (
          <Link
            className="brand-card block p-[18px] transition hover:bg-[var(--brand-primary-soft)] hover:shadow-[0_10px_28px_rgba(21,24,15,0.07)]"
            href={`/notices/${notice.id}`}
            key={notice.id}
          >
            <span className="text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
              {notice.is_pinned ? "고정 · " : ""}
              {notice.published_at ?? notice.created_at}
            </span>
            <strong className="mt-1 block text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
              {notice.title}
            </strong>
            <p className="m-0 mt-1.5 line-clamp-2 text-[0.86rem] leading-[1.6] text-slate-500">
              {notice.content}
            </p>
          </Link>
        ))}
        {notices.length ? (
          <InfiniteScrollSentinel
            onReach={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            loading={isFetchingNextPage}
          />
        ) : null}
      </section>
    </main>
  );
}
