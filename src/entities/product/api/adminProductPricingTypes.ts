import type { DiscountType } from "./types";
import type { ProductEstimate } from "@/entities/product/model/types";

/**
 * 관리자 상품 상세(AdminProductResponse)의 pricing_options 파싱 결과.
 * 서버가 계산해 준 조합별 견적을 그대로 담고, 빠진 값은 화면에서 가격 정책으로 보완한다.
 */

export type AdminPricingInstallment = {
  months: number;
  estimate: ProductEstimate;
  /** true면 서버 discount_options에서 온 값, false면 화면에서 가격 정책으로 계산한 추정치. */
  fromServer: boolean;
};

export type AdminPricingDiscount = {
  discountType: DiscountType;
  discountTypeLabel: string;
  installments: AdminPricingInstallment[];
};

/** 서버 discount_summary. 관리 화면에 바로 띄우는 할인 금액 요약. */
export type AdminPricingSummary = {
  publicSupportAmount: number;
  contractDiscountRate: number;
  monthlyContractDiscountAmount: number;
  rebateAmount: number;
};

export type AdminPricingOption = {
  id: string;
  storageValue: string;
  releasePrice: number;
  carrierName: string;
  planId: string;
  planName: string;
  planMonthlyFee: number;
  planDescription: string[];
  planDataAmount: string;
  planCallText: string;
  subscriptionType: string;
  subscriptionTypeLabel: string;
  availableDiscountTypes: DiscountType[];
  publicSupportAmount: number;
  rebateAmount: number;
  summary: AdminPricingSummary | null;
  /** discount_options에서 온 계산 결과. 비어 있으면 화면에서 채운다. */
  discounts: AdminPricingDiscount[];
  isActive: boolean;
};
