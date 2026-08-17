"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import { ReviewDetailModal } from "@/features/review-detail/ui/ReviewDetailModal";
import { PageHeader } from "@/shared/ui/PageHeader";
import { ReviewImagePlaceholder } from "@/shared/ui/ReviewImagePlaceholder";
import { ReviewRating } from "@/shared/ui/ReviewRating";

export function ReviewsView() {
  const { data, isPending } = useQuery(reviewQueryOptions.publicList());
  const [openedReviewId, setOpenedReviewId] = useState("");
  const reviews = data?.items ?? [];

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="구매 후기" title="먼저 개통한 고객님들 이야기" description="실제 상담을 통해 개통한 고객분들이 남겨주신 후기입니다." />
      {!isPending && !reviews.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">등록된 후기가 없습니다.</p>
      ) : null}
      <section className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        {reviews.map((review, index) => {
          const cover = review.images[0];
          return (
            <button
              className="brand-card grid overflow-hidden text-left"
              key={review.id}
              type="button"
              onClick={() => setOpenedReviewId(review.id)}
            >
              {cover ? (
                <div className="relative h-[170px] w-full bg-slate-100">
                  <Image
                    alt={cover.alt ?? ""}
                    className="object-cover"
                    fill
                    // 첫 줄 카드는 화면에 바로 보이므로 지연 없이 받는다
                    priority={index < 3}
                    sizes="(max-width: 900px) 92vw, 30vw"
                    src={cover.image_url}
                  />
                </div>
              ) : (
                <ReviewImagePlaceholder className="h-[170px] w-full" />
              )}
              <div className="p-[18px]">
                <span className="text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
                  {review.published_at ?? ""}
                </span>
                <h2 className="m-0 mt-1 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
                  {review.title}
                </h2>
                <ReviewRating
                  className="mt-1 text-[var(--brand-primary-strong)]"
                  rating={review.rating}
                />
                <p className="m-0 mt-1.5 text-[0.86rem] leading-[1.6] text-slate-500">
                  {review.content}
                </p>
                <p className="m-0 mt-3 text-[0.78rem] text-slate-400">
                  {review.author_name}
                  {review.product_name ? ` · ${review.product_name}` : ""}
                </p>
              </div>
            </button>
          );
        })}
      </section>

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
