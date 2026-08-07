/** admin-consultations API가 쓰는 상태 코드 그대로 사용한다. */
export type ConsultationStatus =
  | "pending"
  | "contacted"
  | "consulting"
  | "completed"
  | "cancelled";

export type TextField = "name" | "phone" | "password";

export type ConsultationRequest = {
  id: string;
  /** 고객에게 안내되는 신청 번호(CS-YYYYMMDD-XXXXXXXX). */
  applicationNumber?: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
  /** 상품 상세에서 고른 조건 요약. 직접 신청하면 비어 있다. */
  conditions?: string;
  adminMemo?: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  createdAt: string;
  status: ConsultationStatus;
  /** 신청 당시 견적 스냅샷. 조회 화면에서 금액을 그대로 보여준다. */
  quote?: ConsultationQuote;
};

export type ConsultationQuote = {
  /** 라벨-값 쌍으로 그대로 렌더한다. 값이 없는 항목은 담지 않는다. */
  conditions: Array<{ label: string; value: string }>;
  monthlyPayment?: number;
  monthlyDevicePayment?: number;
  planMonthlyFee?: number;
  totalBenefit?: number;
};
