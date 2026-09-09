import type { DiscountType } from "@/entities/product/api/types";
import type {
  AdminPricingDiscount,
  AdminPricingOption,
} from "@/entities/product/api/adminProductPricingTypes";
import type { PricingPolicy } from "@/entities/pricing-policy/api/types";
import { calcEstimate } from "@/entities/pricing-policy/model/calc";
import { DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";

/**
 * 서버 discount_options가 있으면 그대로 쓰고, 없으면 가격 정책으로 직접 계산해 채운다.
 * 정책도 없으면 빈 목록(계산 불가)으로 둔다.
 */
export function resolveAdminPricingDiscounts(
  option: AdminPricingOption,
  months: number[],
  policy?: PricingPolicy
): AdminPricingDiscount[] {
  return option.availableDiscountTypes.map((discountType) => {
    const server = option.discounts.find(
      (item) => item.discountType === discountType
    );
    if (server?.installments.length) return server;

    if (!policy || !months.length) {
      return {
        discountType,
        discountTypeLabel: DISCOUNT_LABELS[discountType],
        installments: [],
      };
    }

    return {
      discountType,
      discountTypeLabel: DISCOUNT_LABELS[discountType],
      installments: months.map((monthCount) => ({
        months: monthCount,
        fromServer: false,
        estimate: calcEstimate(
          {
            releasePrice: option.releasePrice,
            planMonthlyFee: option.planMonthlyFee,
            discountType: discountType as DiscountType,
            publicSupportAmount:
              discountType === "public_support" ? option.publicSupportAmount : null,
            rebateAmount: option.rebateAmount,
            installmentMonths: monthCount,
          },
          policy
        ),
      })),
    };
  });
}
