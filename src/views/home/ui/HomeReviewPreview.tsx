"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HOME_REVIEW_PARAMS,
  reviewQueryOptions,
} from "@/entities/review/model/queries";
import { ReviewDetailModal } from "@/features/review-detail/ui/ReviewDetailModal";
import { ReviewRating } from "@/shared/ui/ReviewRating";

export function HomeReviewPreview() {
  const { data } = useQuery(reviewQueryOptions.publicList(HOME_REVIEW_PARAMS));
  const [openedReviewId, setOpenedReviewId] = useState("");
  const reviews = data?.items ?? [];

  return (
    <div className="grid grid-cols-2 gap-3 max-[900px]:grid-cols-1">
      {reviews.map((review) => (
        <button
          className="rounded-2xl border border-slate-200 bg-slate-50 p-[18px] text-left transition hover:bg-[var(--brand-primary-soft)]"
          key={review.id}
          type="button"
          onClick={() => setOpenedReviewId(review.id)}
        >
          <strong className="block text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
            {review.title}
          </strong>
          <ReviewRating
            className="mt-1.5 text-[var(--brand-primary-strong)]"
            rating={review.rating}
          />
          <p className="m-0 mt-2 text-[0.86rem] leading-[1.55] text-slate-700">
            {review.content}
          </p>
          <p className="m-0 mt-3 text-[0.75rem] font-bold text-[var(--brand-primary-strong)]">
            {review.author_name}
            {review.published_at ? ` · ${review.published_at}` : ""}
          </p>
        </button>
      ))}

      {openedReviewId ? (
        <ReviewDetailModal
          reviewId={openedReviewId}
          initialReview={reviews.find((review) => review.id === openedReviewId)}
          onClose={() => setOpenedReviewId("")}
        />
      ) : null}
    </div>
  );
}
