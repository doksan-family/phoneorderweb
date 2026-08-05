export type AdminTab =
  | "applications"
  | "catalog"
  | "content"
  | "banner"
  | "plans";

export const adminNavItems: Array<{ id: AdminTab; label: string }> = [
  { id: "applications", label: "상담 신청" },
  { id: "banner", label: "홈 배너" },
  { id: "catalog", label: "상품 관리" },
  { id: "plans", label: "요금제 관리" },
  { id: "content", label: "콘텐츠 관리" },
];
