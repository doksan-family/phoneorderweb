"use client";

import { useMemo, useState } from "react";
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
import { InfiniteScrollSentinel } from "@/shared/ui/InfiniteScrollSentinel";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ReviewsView() {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(reviewQueryOptions.publicInfiniteList());
  const [openedReviewId, setOpenedReviewId] = useState("");
  const [tab, setTab] = useState<ReviewListTab>("photo");
  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );
  const visibleReviews = useMemo(
    () => filterReviewsByTab(reviews, tab),
    [reviews, tab]
  );

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="구매 후기" title="먼저 개통한 고객님들 이야기" description="실제 상담을 통해 개통한 고객분들이 남겨주신 후기입니다." />
      {!isPending && !reviews.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">등록된 후기가 없습니다.</p>
      ) : null}
      {reviews.length ? (
        <ReviewListTabs reviews={reviews} value={tab} onChange={setTab} />
      ) : null}
      {reviews.length && !visibleReviews.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">
          {tab === "photo"
            ? "사진이 등록된 후기가 아직 없습니다."
            : "사진 없이 등록된 후기가 아직 없습니다."}
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

      {reviews.length ? (
        <InfiniteScrollSentinel
          onReach={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <p className="m-0 pt-6 text-center text-[0.85rem] text-slate-400">
              더 불러오는 중…
            </p>
          ) : null}
        </InfiniteScrollSentinel>
      ) : null}

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
