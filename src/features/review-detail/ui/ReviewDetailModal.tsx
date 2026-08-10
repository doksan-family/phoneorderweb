"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import type { PublicReview } from "@/entities/review/model/types";
import { ReviewRating } from "@/shared/ui/ReviewRating";
import { ReviewImageGallery } from "./ReviewImageGallery";

type ReviewDetailModalProps = {
  reviewId: string;
  initialReview?: PublicReview;
  onClose: () => void;
};

/** 대표 이미지와 후기 문구를 위아래로 나눠 보여주는 모달. */
export function ReviewDetailModal({
  reviewId,
  initialReview,
  onClose,
}: ReviewDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: review, isPending } = useQuery({
    ...reviewQueryOptions.publicDetail(reviewId),
    initialData: initialReview,
  });

  // ESC와 backdrop 처리는 <dialog>가 해주므로 열기/스크롤 잠금만 직접 한다.
  useEffect(() => {
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      aria-label="구매 후기 상세"
      className="m-auto bg-transparent p-0 backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <article className="isolate grid w-[min(560px,92vw)] overflow-hidden rounded-3xl border border-white/25 bg-white/12 shadow-[0_18px_50px_rgba(15,23,42,0.45)]">
        <div className="relative">
          <ReviewImageGallery key={reviewId} images={review?.images ?? []} />
          <button
            aria-label="후기 닫기"
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-slate-950/30 bg-slate-950/70 text-white shadow-md backdrop-blur-md transition hover:bg-slate-950/85"
            type="button"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={16} />
          </button>

        </div>

        <div className="max-h-[40dvh] overflow-y-auto rounded-b-3xl border-t border-white/20 bg-slate-950/55 p-5 text-white backdrop-blur-xl">
          {review ? (
            <>
              <ReviewRating className="text-white" rating={review.rating} />
              <h2 className="m-0 mt-2 text-[1.15rem] font-extrabold tracking-[-0.02em]">
                {review.title}
              </h2>
              <p className="m-0 mt-2.5 text-[0.9rem] leading-[1.65] whitespace-pre-line text-white/90">
                {review.content}
              </p>
              <p className="m-0 mt-4 text-[0.75rem] text-white/70">
                {review.author_name}
                {review.product_name ? ` · ${review.product_name}` : ""}
                {review.published_at ? ` · ${review.published_at}` : ""}
              </p>
            </>
          ) : (
            <p className="m-0 text-[0.9rem] text-white/80">
              {isPending ? "후기를 불러오는 중입니다." : "후기를 찾을 수 없습니다."}
            </p>
          )}
        </div>
      </article>
    </dialog>
  );
}
