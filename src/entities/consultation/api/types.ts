import type { DiscountType } from "@/entities/product/api/public";
import type { ConsultationStatus } from "../model/types";

/** POST /functions/v1/public-consultations 본문 */
export type ConsultationCreatePayload = {
  name: string;
  phone: string;
  password: string;
  privacy_agreed: true;
  marketing_agreed: boolean;
  product_id?: string;
  pricing_id?: string;
  variant_id?: string;
  plan_id?: string;
  subscription_type?: string;
  /** 공시지원금 또는 선택약정. 생략하면 서버가 공시지원금으로 계산한다. */
  discount_type?: DiscountType;
  color_value?: string;
  installment_months?: number;
  request_message?: string;
};

/** POST /functions/v1/public-consultation-lookup 본문 */
export type ConsultationLookupPayload = {
  name: string;
  phone: string;
  password: string;
  privacy_agreed: true;
};

/** GET /functions/v1/admin-consultations 쿼리 파라미터 */
export type FetchAdminConsultationsParams = {
  status?: ConsultationStatus;
  phone?: string;
  limit?: number;
  offset?: number;
};

/** PATCH /functions/v1/admin-consultations?id= 본문 (부분 수정) */
export type ConsultationUpdatePayload = {
  status?: ConsultationStatus;
  admin_memo?: string | null;
};

/**
 * 명세가 additionalProperties로만 정의되어 있어 필드를 낙관적으로 받는다.
 * 실제 사용 값은 mapper에서 좁힌다.
 */
export type ConsultationQuoteSnapshot = {
  product_id?: string;
  product_name?: string;
  storage_value?: string | null;
  color_label?: string | null;
  plan_name?: string | null;
  carrier_name?: string | null;
  subscription_type?: string | null;
  installment_months?: number | null;
  subscription_type_label?: string | null;
  discount_type?: string | null;
  discount_type_label?: string | null;
  device_price?: number | null;
  monthly_device_payment?: number | null;
  discounted_plan_monthly_fee?: number | null;
  total_benefit_amount?: number | null;
  estimated_monthly_payment?: number | null;
};

export type ConsultationResponseItem = {
  id?: string;
  application_number?: string;
  name?: string;
  phone?: string;
  status?: string;
  created_at?: string;
  admin_memo?: string | null;
  privacy_agreed?: boolean;
  marketing_agreed?: boolean;
  request_message?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  quote_snapshot?: ConsultationQuoteSnapshot | null;
  selected_options?: Record<string, unknown> | null;
};

/** 목록 응답은 `{ ok, data: { items, total, limit, offset } }` 형태로 내려온다. */
export type ConsultationListPage = {
  items: ConsultationResponseItem[];
  total?: number;
  limit?: number;
  offset?: number;
};

export type ConsultationListWrapper = {
  ok?: boolean;
  data?:
    | ConsultationResponseItem
    | ConsultationResponseItem[]
    | ConsultationListPage
    | null;
  items?: ConsultationResponseItem[];
  consultations?: ConsultationResponseItem[];
  total?: number;
};

/** 단건/목록/래핑 여부가 엔드포인트마다 달라 모든 형태를 받아 둔다. */
export type ConsultationApiResponse =
  | ConsultationResponseItem
  | ConsultationResponseItem[]
  | ConsultationListWrapper;
