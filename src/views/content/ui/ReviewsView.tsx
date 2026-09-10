"use client";

import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import { ReviewDetailModal } from "@/features/review-detail/ui/ReviewDetailModal";
import {
  filterReviewsByTab,
  hasReviewPhoto,
  type ReviewListTab,
} from "@/features/review-list/model/reviewListTab";
import { ReviewListTabs } from "@/features/review-list/ui/ReviewListTabs";
import { ReviewPhotoCard } from "@/features/review-list/ui/ReviewPhotoCard";
import { ReviewTextCard } from "@/features/review-list/ui/ReviewTextCard";
import { dedupeById } from "@/shared/api/pagination";
import { InfiniteScrollSentinel } from "@/shared/ui/InfiniteScrollSentinel";
import { PageHeader } from "@/shared/ui/PageHeader";

const spinner = (
  <div className="flex justify-center py-6">
    <span
      aria-label="불러오는 중"
      className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500"
      role="status"
    />
  </div>
);

export function ReviewsView() {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(reviewQueryOptions.publicInfiniteList());
  const [openedReviewId, setOpenedReviewId] = useState("");
  const [tab, setTab] = useState<ReviewListTab>("photo");

  const reviews = useMemo(
    () => dedupeById(data?.pages.flatMap((page) => page.items) ?? []),
    [data]
  );
  const visibleReviews = useMemo(
    () => filterReviewsByTab(reviews, tab),
    [reviews, tab]
  );

  // 사진/일반 탭은 화면에서 거르므로, 필터가 걸리면 다음 페이지를 끝까지 당겨 온다.
  // (스크롤 sentinel이 짧은 목록에서 계속 재발동하며 스피너가 도는 것을 막는다)
  const isFiltered = tab !== "all";
  useEffect(() => {
    if (isFiltered && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isFiltered, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow="구매 후기"
        title="먼저 개통한 고객님들 이야기"
        description="실제 상담을 통해 개통한 고객분들이 남겨주신 후기입니다."
      />

      {isPending ? spinner : null}

      {isError ? (
        <div className="grid justify-items-start gap-2">
          <p className="m-0 text-[0.9rem] text-slate-500">
            후기를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <button
            className="text-sm font-bold text-[var(--brand-primary-strong)] underline"
            type="button"
            onClick={() => refetch()}
          >
            다시 시도
          </button>
        </div>
      ) : null}

      {!isPending && !isError && !reviews.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">등록된 후기가 없습니다.</p>
      ) : null}

      {reviews.length ? (
        <ReviewListTabs reviews={reviews} value={tab} onChange={setTab} />
      ) : null}

      {reviews.length && !visibleReviews.length && !isFetchingNextPage ? (
        <p className="m-0 text-[0.9rem] text-slate-500">
          {tab === "photo"
            ? "사진이 등록된 후기가 아직 없습니다."
            : tab === "text"
              ? "사진 없이 등록된 후기가 아직 없습니다."
              : "후기가 없습니다."}
        </p>
      ) : null}

      <section className="grid grid-cols-3 items-start gap-4 max-[900px]:grid-cols-1">
        {visibleReviews.map((review, index) =>
          hasReviewPhoto(review) ? (
            <ReviewPhotoCard
              key={review.id}
              review={review}
              priority={index < 3}
              onOpen={setOpenedReviewId}
            />
          ) : (
            <ReviewTextCard
              key={review.id}
              review={review}
              onOpen={setOpenedReviewId}
            />
          )
        )}
      </section>

      {/* 전체 탭만 스크롤 무한 로드. 필터 탭은 위 effect가 끝까지 당겨 온다. */}
      {!isFiltered && reviews.length ? (
        <InfiniteScrollSentinel
          onReach={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          loading={isFetchingNextPage}
        />
      ) : null}
      {isFiltered && isFetchingNextPage ? spinner : null}

      {openedReviewId ? (
        <ReviewDetailModal
          reviewId={openedReviewId}
          initialReview={reviews.find((review) => review.id === openedReviewId)}
          onClose={() => setOpenedReviewId("")}
        />
      ) : null}
    </main>
  );
}
