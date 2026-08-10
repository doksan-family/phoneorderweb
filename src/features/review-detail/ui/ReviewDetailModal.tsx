"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import { ReviewRating } from "@/shared/ui/ReviewRating";

const navButtonClass =
  "absolute top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/35 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/20";

type ReviewDetailModalProps = {
  reviewId: string;
  /** 화면에 떠 있는 목록 순서. 모달 안에서 이전·다음으로 이동한다. */
  reviewIds: string[];
  onClose: () => void;
  onSelect: (reviewId: string) => void;
};

/** 대표 이미지와 후기 문구를 위아래로 나눠 보여주는 모달. */
export function ReviewDetailModal({
  reviewId,
  reviewIds,
  onClose,
  onSelect,
}: ReviewDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: review, isPending } = useQuery(
    reviewQueryOptions.publicDetail(reviewId)
  );
  const cover = review?.images[0];
  const index = reviewIds.indexOf(reviewId);
  const previousId = index > 0 ? reviewIds[index - 1] : undefined;
  const nextId = index >= 0 ? reviewIds[index + 1] : undefined;

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
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && previousId) onSelect(previousId);
        if (event.key === "ArrowRight" && nextId) onSelect(nextId);
      }}
    >
      <article className="isolate grid w-[min(560px,92vw)] overflow-hidden rounded-3xl border border-white/25 bg-white/12 shadow-[0_18px_50px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        {/* backdrop-blur가 걸린 부모의 overflow-hidden은 브라우저에 따라 모서리를 못 자른다. 자식에도 라운드를 준다. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-slate-900/40">
          {cover ? (
            <Image
              alt={cover.alt ?? ""}
              className="object-contain"
              fill
              sizes="560px"
              src={cover.image_url}
            />
          ) : null}

          <button
            aria-label="후기 닫기"
            className="absolute top-4 right-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/35"
            type="button"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={16} />
          </button>

          <button
            aria-label="이전 후기"
            className={`${navButtonClass} left-4`}
            disabled={!previousId}
            type="button"
            onClick={() => previousId && onSelect(previousId)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="다음 후기"
            className={`${navButtonClass} right-4`}
            disabled={!nextId}
            type="button"
            onClick={() => nextId && onSelect(nextId)}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="max-h-[40dvh] overflow-y-auto rounded-b-3xl border-t border-white/20 p-5 text-white">
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
