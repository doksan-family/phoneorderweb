/** GET /functions/v1/public-customer-center/notices 응답 DTO. */
export type PublicNotice = {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_published: boolean;
  display_order: number;
  /** 한국 시간 "YYYY-MM-DD HH:mm". 공개된 적 없으면 null. */
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** GET /functions/v1/public-customer-center/faqs 응답 DTO. */
export type PublicFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CustomerCenterPage<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type CustomerCenterListResponse<T> = {
  ok: boolean;
  data: CustomerCenterPage<T>;
};

/** 등록·수정 응답은 페이지 대신 항목 한 건을 돌려준다. */
export type CustomerCenterDetailResponse<T> = {
  ok: boolean;
  data: T;
};
