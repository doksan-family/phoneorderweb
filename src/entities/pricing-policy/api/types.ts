/** GET /functions/v1/admin-products/pricing-policy 응답 데이터 */
export type PricingPolicy = {
  /** 선택약정 선택 시 월 요금제에 적용하는 할인율(%) */
  contract_discount_rate: number;
  /** 원리금균등 할부 계산에 사용하는 연이율(%) */
  installment_annual_rate: number;
  /** 원리금균등 계산식 식별자. 현재는 equal_payment만 지원. */
  installment_calculation_method: string;
  /** 공시지원금 방식에서 리베이트를 출고가에서 차감할지 여부 */
  rebate_applies_to_public_support: boolean;
  /** 선택약정 방식에서 리베이트를 출고가에서 차감할지 여부 */
  rebate_applies_to_contract_discount: boolean;
  /** 한국 시간 기준 마지막 수정 시각 */
  updated_at: string;
};

export type PricingPolicyResponse = {
  ok: boolean;
  data: PricingPolicy;
};

/**
 * PATCH /functions/v1/admin-products/pricing-policy 본문.
 * 변경할 값만 보낸다(minProperties 1). 변경값은 모든 상품 견적에 즉시 공통 적용된다.
 */
export type PricingPolicyUpdatePayload = {
  contract_discount_rate?: number;
  installment_annual_rate?: number;
  rebate_applies_to_public_support?: boolean;
  rebate_applies_to_contract_discount?: boolean;
};
