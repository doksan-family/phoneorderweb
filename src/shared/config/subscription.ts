import type { PublicSubscriptionType } from "@/entities/product/api/public";

/**
 * 화면에 노출·선택 가능한 가입유형.
 * 신규가입(new_signup)은 정책상 앱 전체에서 숨긴다.
 */
export const SELECTABLE_SUBSCRIPTION_TYPES = [
  "number_transfer",
  "device_change",
] as const;

export type SelectableSubscriptionType =
  (typeof SELECTABLE_SUBSCRIPTION_TYPES)[number];

export const SUBSCRIPTION_TYPE_LABELS: Record<SelectableSubscriptionType, string> = {
  number_transfer: "번호이동",
  device_change: "기기변경",
};

export function isSelectableSubscriptionType(
  value: string
): value is SelectableSubscriptionType {
  return (SELECTABLE_SUBSCRIPTION_TYPES as readonly string[]).includes(value);
}

/** new_signup을 걸러낸 가입유형 목록만 남긴다. */
export function filterSelectableSubscriptions<T extends { value: string }>(
  options: T[]
): T[] {
  return options.filter((option) => isSelectableSubscriptionType(option.value));
}

export function subscriptionTypeLabel(value: string): string {
  return isSelectableSubscriptionType(value)
    ? SUBSCRIPTION_TYPE_LABELS[value]
    : value;
}

export const SELECTABLE_SUBSCRIPTION_OPTIONS: {
  value: string;
  label: string;
}[] = SELECTABLE_SUBSCRIPTION_TYPES.map((value) => ({
  value,
  label: SUBSCRIPTION_TYPE_LABELS[value],
}));

/** publicBaseTypes의 union과 호환되는지 컴파일 타임 확인용 */
const _typecheck: PublicSubscriptionType = SELECTABLE_SUBSCRIPTION_TYPES[0];
void _typecheck;
