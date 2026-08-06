export type ConsultationStatus = "접수" | "상담중" | "완료" | "보류";

export type TextField = "name" | "phone" | "password";

export type ConsultationRequest = {
  id: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
  /** 상품 상세에서 고른 조건 요약. 직접 신청하면 비어 있다. */
  conditions?: string;
  password: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  createdAt: string;
  status: ConsultationStatus;
};

export type ConsultationInput = Omit<
  ConsultationRequest,
  "id" | "createdAt" | "status"
>;
