/** 감사 로그는 개발자가 아닌 운영자가 보므로 코드값을 우리말로 바꿔서 보여준다. */
export const auditActionLabel: Record<string, string> = {
  CREATE: "등록",
  UPDATE: "수정",
  DELETE: "삭제",
  UPLOAD_IMAGE: "이미지 업로드",
};

export const auditResourceLabel: Record<string, string> = {
  banner: "홈 배너",
  banner_image: "배너 이미지",
  plan: "요금제",
  consultation: "상담 신청",
  review: "구매후기",
  notice: "공지사항",
  faq: "FAQ",
  product: "상품",
};

const auditFieldLabel: Record<string, string> = {
  status: "처리 상태",
  admin_memo: "관리자 메모",
  title: "제목",
  content: "내용",
  question: "질문",
  answer: "답변",
  category: "분류",
  is_published: "공개 여부",
  is_active: "판매 여부",
  is_pinned: "상단 고정",
  is_featured: "추천 노출",
  display_order: "노출 순서",
  name: "이름",
  phone: "연락처",
  author_name: "작성자",
  rating: "별점",
  product_id: "연결 상품",
  plan_id: "연결 요금제",
  release_price: "출고가",
  public_support_amount: "공시지원금",
  rebate_amount: "리베이트",
  contract_discount_rate: "선택약정 할인율",
  installment_annual_rate: "할부 연이율",
  rebate_applies_to_public_support: "공시지원 리베이트 적용",
  rebate_applies_to_contract_discount: "선택약정 리베이트 적용",
  link_url: "연결 주소",
  cta_label: "버튼 문구",
  start_at: "노출 시작일",
  end_at: "노출 종료일",
  type: "종류",
  images: "이미지",
  description: "설명",
  summary: "요약",
};

export function auditFieldNames(fields: string[]) {
  return fields.map((field) => auditFieldLabel[field] ?? field).join(", ");
}

/** "공지사항 수정"처럼 한 줄로 읽히게 만든다. */
export function describeAuditAction(action: string, resourceType: string) {
  const resource = auditResourceLabel[resourceType] ?? resourceType;
  const verb = auditActionLabel[action];
  return verb ? `${resource} ${verb}` : `${resource} ${action}`;
}

/** "2026-08-09 14:30:15" -> "8월 9일 14:30" */
export function formatAuditTime(createdAt: string) {
  const matched = /^\d{4}-(\d{2})-(\d{2})[ T](\d{2}:\d{2})/.exec(createdAt);
  if (!matched) return createdAt;

  const [, month, day, time] = matched;
  return `${Number(month)}월 ${Number(day)}일 ${time}`;
}
