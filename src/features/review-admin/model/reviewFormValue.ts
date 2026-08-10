import type {
  AdminReviewCreatePayload,
  AdminReviewUpdatePayload,
} from "@/entities/review/api/admin";
import type { AdminReview } from "@/entities/review/model/types";

export type AdminReviewFormValue = {
  productId: string;
  title: string;
  content: string;
  authorName: string;
  rating: number;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  imageFiles: File[];
};

export const MAX_REVIEW_IMAGE_BYTES = 10 * 1024 * 1024;

/** 빈 문자열은 서버 검증에 걸리므로 값이 있는 필드만 payload에 담는다. */
export function toReviewCreatePayload(
  value: AdminReviewFormValue
): AdminReviewCreatePayload {
  return {
    product_id: value.productId || undefined,
    title: value.title.trim(),
    content: value.content.trim(),
    author_name: value.authorName.trim(),
    rating: value.rating,
    is_featured: value.isFeatured,
    is_published: value.isPublished,
    display_order: value.displayOrder,
    image_files: value.imageFiles.length ? value.imageFiles : undefined,
  };
}

export const emptyReviewFormValue: AdminReviewFormValue = {
  productId: "",
  title: "",
  content: "",
  authorName: "",
  rating: 5,
  isFeatured: false,
  isPublished: false,
  displayOrder: 0,
  imageFiles: [],
};

/** 수정 폼 prefill. 기존 이미지는 폼 값이 아니라 별도 상태로 다룬다. */
export function toReviewFormValue(review: AdminReview): AdminReviewFormValue {
  return {
    productId: review.product_id ?? "",
    title: review.title,
    content: review.content,
    authorName: review.author_name,
    rating: review.rating,
    isFeatured: review.is_featured,
    isPublished: review.is_published,
    displayOrder: review.display_order,
    imageFiles: [],
  };
}

/** 이미지는 파일로 따로 실어 보내므로 여기서는 텍스트 필드만 만든다. */
export function toReviewUpdatePayload(
  value: AdminReviewFormValue
): AdminReviewUpdatePayload {
  return {
    // 빈 문자열은 상품 연결 해제를 뜻한다
    product_id: value.productId,
    title: value.title.trim(),
    content: value.content.trim(),
    author_name: value.authorName.trim(),
    rating: value.rating,
    is_featured: value.isFeatured,
    is_published: value.isPublished,
    display_order: value.displayOrder,
  };
}

/** 파일당 10MB 제한. 초과분은 서버가 거부하므로 보내기 전에 막는다. */
export function findOversizedImage(files: File[]) {
  return files.find((file) => file.size > MAX_REVIEW_IMAGE_BYTES);
}
