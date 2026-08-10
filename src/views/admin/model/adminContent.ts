import type {
  PublicFaq,
  PublicNotice,
} from "@/entities/content/model/customerCenterTypes";

export type AdminContentType = "공지" | "FAQ";

/** 공지·FAQ를 한 목록 컴포넌트로 그리기 위한 공통 행 모델. */
export type AdminContentItem = {
  id: string;
  title: string;
  body: string;
  isPublished: boolean;
  /** FAQ 분류명. 공지에는 없다. */
  category?: string;
};

/** 화면 제목·버튼 문구에 쓰는 유형별 표기. */
export const contentTypeLabel: Record<AdminContentType, string> = {
  공지: "공지사항",
  FAQ: "FAQ",
};

export function toContentItemFromNotice(notice: PublicNotice): AdminContentItem {
  return {
    id: notice.id,
    title: notice.title,
    body: notice.content,
    isPublished: notice.is_published,
  };
}

export function toContentItemFromFaq(faq: PublicFaq): AdminContentItem {
  return {
    id: faq.id,
    title: faq.question,
    body: faq.answer,
    isPublished: faq.is_published,
    category: faq.category,
  };
}
