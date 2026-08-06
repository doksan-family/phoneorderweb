import type { ProductCreatePayload } from "@/entities/product/api/admin";

/** 등록과 수정이 함께 쓰는 payload 검증. 문제가 있으면 던진다. */
export function validateProductPayload(payload: ProductCreatePayload) {
  if (!payload.variants.length) {
    throw new Error("상품 옵션은 1개 이상 필요합니다.");
  }
  if (payload.variants.some((variant) => !variant.storage_value)) {
    throw new Error("상품 옵션의 저장용량은 필수입니다.");
  }
  if (
    hasDuplicatedStorageValues(payload.variants.map((item) => item.storage_value))
  ) {
    throw new Error("상품 옵션의 저장용량은 중복될 수 없습니다.");
  }
  if (!payload.plan_ids.length) {
    throw new Error("요금제는 1개 이상 선택해야 합니다.");
  }
  if (!payload.subscription_types.length) {
    throw new Error("가입유형은 1개 이상 선택해야 합니다.");
  }
  if (!payload.installment_month_options.length) {
    throw new Error("할부 개월은 1개 이상 선택해야 합니다.");
  }
  if (hasInvalidOverrideReference(payload)) {
    throw new Error(
      "가격 예외조건은 선택한 저장용량, 요금제, 가입유형 안에서만 설정할 수 있습니다."
    );
  }
}

function hasDuplicatedStorageValues(values: string[]) {
  return new Set(values).size !== values.length;
}

function hasInvalidOverrideReference(payload: ProductCreatePayload) {
  const storageValues = new Set(
    payload.variants.map((item) => item.storage_value)
  );
  const planIds = new Set(payload.plan_ids);
  const subscriptionTypes = new Set(payload.subscription_types);

  return payload.pricing_overrides.some((override) => {
    if (override.storage_value && !storageValues.has(override.storage_value)) return true;
    if (override.plan_id && !planIds.has(override.plan_id)) return true;
    return (
      !!override.subscription_type &&
      !subscriptionTypes.has(override.subscription_type)
    );
  });
}
