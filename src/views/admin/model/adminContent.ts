import { faqs, notices, reviews } from "@/entities/content/model/mock-content";

export type AdminContentType = "후기" | "공지" | "FAQ";

export type AdminContentItem = {
  id: string;
  title: string;
  body: string;
  type: AdminContentType;
  visible: boolean;
};

export type AdminContentCreateInput = {
  title: string;
  type: AdminContentType;
};

/** 화면 제목·버튼 문구에 쓰는 유형별 표기. */
export const contentTypeLabel: Record<AdminContentType, string> = {
  후기: "구매후기",
  공지: "공지사항",
  FAQ: "FAQ",
};

export const initialContentItems: AdminContentItem[] = [
  ...reviews.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.content,
    type: "후기" as const,
    visible: item.visible,
  })),
  ...notices.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.content,
    type: "공지" as const,
    visible: item.visible,
  })),
  ...faqs.map((item) => ({
    id: item.id,
    title: item.question,
    body: item.answer,
    type: "FAQ" as const,
    visible: item.visible,
  })),
];
