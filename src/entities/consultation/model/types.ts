export type ConsultationStatus = "접수" | "상담중" | "완료" | "보류";

export type TextField = "name" | "phone" | "productId" | "password";

export type ConsultationRequest = {
  id: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
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
