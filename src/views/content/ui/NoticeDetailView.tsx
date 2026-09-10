"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";

type NoticeDetailViewProps = {
  noticeId: string;
};

export function NoticeDetailView({ noticeId }: NoticeDetailViewProps) {
  const { data: notice, isPending, isError } = useQuery(
    customerCenterQueryOptions.noticeDetail(noticeId)
  );

  return (
    <main className="site-container pt-14 pb-20">
      <Link
        className="text-[0.85rem] font-bold text-slate-400 transition hover:text-slate-700"
        href="/notices"
      >
        ← 공지사항 목록
      </Link>

      {isPending ? (
        <p className="mt-6 text-[0.9rem] text-slate-400">불러오는 중…</p>
      ) : isError || !notice ? (
        <p className="mt-6 text-[0.9rem] text-slate-500">
          공지사항을 찾을 수 없습니다.
        </p>
      ) : (
        <article className="mt-5 border-b border-slate-200 pb-8">
          <span className="text-[0.75rem] font-bold text-[var(--brand-primary-strong)]">
            {notice.is_pinned ? "고정 · " : ""}
            {notice.published_at ?? notice.created_at}
          </span>
          <h1 className="m-0 mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-slate-950">
            {notice.title}
          </h1>
          <p className="m-0 mt-6 whitespace-pre-line text-[0.92rem] leading-[1.75] text-slate-700">
            {notice.content}
          </p>
        </article>
      )}
    </main>
  );
}
