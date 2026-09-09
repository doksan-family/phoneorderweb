import type { PublicReview } from "@/entities/review/model/types";

/** 구매 후기 목록을 사진 유무로 가르는 탭. 기본값은 photo. */
export type ReviewListTab = "photo" | "text" | "all";

export const reviewListTabs: ReviewListTab[] = ["photo", "text", "all"];

export const reviewListTabLabel: Record<ReviewListTab, string> = {
  photo: "포토 후기",
  text: "일반 후기",
  all: "전체",
};

export function hasReviewPhoto(review: PublicReview): boolean {
  return review.images.length > 0;
}

export function filterReviewsByTab(
  reviews: PublicReview[],
  tab: ReviewListTab
): PublicReview[] {
  if (tab === "photo") return reviews.filter(hasReviewPhoto);
  if (tab === "text") return reviews.filter((review) => !hasReviewPhoto(review));
  return reviews;
}

export function countReviewsByTab(
  reviews: PublicReview[],
  tab: ReviewListTab
): number {
  return filterReviewsByTab(reviews, tab).length;
}
