import type { AdminContentType } from "../model/adminContent";

export type AdminTab =
  | "applications"
  | "catalog"
  | "reviews"
  | "notices"
  | "faqs"
  | "banner"
  | "plans";

/** 콘텐츠 탭은 목록/등록 화면을 공유하고 유형만 달라진다. */
export const contentTypeByTab: Partial<Record<AdminTab, AdminContentType>> = {
  reviews: "후기",
  notices: "공지",
  faqs: "FAQ",
};

export const adminNavItems: Array<{ id: AdminTab; label: string }> = [
  { id: "applications", label: "상담 신청" },
  { id: "banner", label: "홈 배너" },
  { id: "catalog", label: "상품 관리" },
  { id: "plans", label: "요금제 관리" },
  { id: "reviews", label: "구매후기 관리" },
  { id: "notices", label: "공지사항 관리" },
  { id: "faqs", label: "FAQ 관리" },
];
