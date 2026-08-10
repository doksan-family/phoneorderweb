/** reviews Storage에 저장된 후기 이미지. 화면 출력은 image_url을 쓴다. */
export type PublicReviewImage = {
  id: string;
  image_path: string;
  image_url: string;
  alt: string | null;
  display_order: number;
};

export type PublicReview = {
  id: string;
  product_id: string | null;
  product_name: string | null;
  title: string;
  content: string;
  author_name: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  /** 한국 시간 "YYYY-MM-DD HH:mm". 공개된 적 없으면 null. */
  published_at: string | null;
  images: PublicReviewImage[];
};

/** 관리자 응답도 같은 DTO다. 비공개 후기는 is_published=false로 내려온다. */
export type AdminReview = PublicReview;

export type PublicReviewPage = {
  items: PublicReview[];
  total: number;
  limit: number;
  offset: number;
};

export type PublicReviewListResponse = {
  ok: boolean;
  data: PublicReviewPage;
};

/** id를 넘긴 요청은 페이지 대신 후기 한 건을 반환한다. */
export type PublicReviewDetailResponse = {
  ok: boolean;
  data: PublicReview;
};
