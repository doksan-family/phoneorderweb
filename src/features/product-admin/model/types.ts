import type { DiscountType } from "@/entities/product/model/types";

export type { DiscountType };

export type ProductBadge = string;

export type ProductColorDraft = {
  id: string;
  label: string;
  /** #RRGGBB. 프론트 색상 value로도 그대로 쓴다. */
  colorHex: string;
};

export type ProductVariantDraft = {
  id: string;
  storageValue: string;
  /** 저장용량별 단말기 출고가. 판매가는 서버가 정책으로 계산한다. */
  releasePrice: number;
};

/**
 * 관리자가 하나씩 추가하는 요금 조건.
 * 카드 하나 = (통신사, 요금제, 할인방식) 고정, 그 안에서 가입유형 × 용량별로 금액을 나눠 담는다.
 * carrierCode는 요금제 목록을 좁히기 위한 UI 전용 값이며 서버로 보내지 않는다.
 * (pricing_overrides에는 통신사 필드가 없고 plan_id가 통신사를 결정한다)
 */
export type ProductPricingEntryDraft = {
  id: string;
  carrierCode: string;
  planId: string;
  discountType: DiscountType;
  /** 이 조건이 적용될 가입유형 (number_transfer / device_change) */
  subscriptionTypes: string[];
  /**
   * 가입유형 → (용량 → 공시지원금). 가입유형·용량마다 공시지원금이 다르므로 2단계로 나눈다.
   * 선택약정 방식이면 사용하지 않는다.
   */
  publicSupportBySubType: Record<string, Record<string, number | null>>;
  /** 가입유형 → 리베이트 금액. 번호이동과 기기변경의 리베이트가 보통 다르다. */
  rebateBySubType: Record<string, number | null>;
};

export type ProductDraft = {
  categoryCode: string;
  brand: string;
  name: string;
  summary: string;
  badges: ProductBadge[];
  isFeatured: boolean;
  colors: ProductColorDraft[];
  variants: ProductVariantDraft[];
  /** 고객이 상품 상세에서 고를 수 있는 할부 개월 */
  installmentMonths: number[];
  pricingEntries: ProductPricingEntryDraft[];
};
