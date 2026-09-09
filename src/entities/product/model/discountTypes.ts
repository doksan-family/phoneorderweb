import type { DiscountType } from "../api/types";

export const ALL_DISCOUNT_TYPES: DiscountType[] = ["public_support", "contract_discount"];
export const DISCOUNT_LABELS: Record<DiscountType, string> = {
  public_support: "공시지원금", contract_discount: "선택약정",
};
export function isDiscountType(value: string): value is DiscountType {
  return value === "public_support" || value === "contract_discount";
}

/** 구버전 응답에서 필드가 생략되면 두 방식을 허용한다. 명시된 제한은 유지한다. */
export function availableDiscountTypes(values?: readonly string[] | null): DiscountType[] {
  return values == null ? [...ALL_DISCOUNT_TYPES] : [...new Set(values.filter(isDiscountType))];
}
