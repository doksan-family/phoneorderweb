import { pricingEntryCondition } from "./pricingEntryCondition.ts";
import { isDiscountType } from "../../../entities/product/model/discountTypes.ts";
import type { ProductDraft } from "./types";

/** 등록·수정 공통 draft 검증. 문제가 있으면 사용자용 메시지로 던진다. */
export function validateDraft(draft: ProductDraft) {
  validateProductBasics(draft);
  validateProductOptions(draft);
  validateProductPricing(draft);
}

export function validateProductBasics(draft: ProductDraft) {
  if (!draft.categoryCode) throw new Error("카테고리를 선택해 주세요.");
  if (!draft.name.trim()) throw new Error("상품명을 입력해 주세요.");
}

export function validateProductOptions(draft: ProductDraft) {
  if (!draft.variants.length) {
    throw new Error("저장용량을 1개 이상 추가해 주세요.");
  }
  const storages = draft.variants.map((variant) => variant.storageValue.trim());
  if (storages.some((value) => !value)) {
    throw new Error("저장용량 이름은 필수입니다.");
  }
  if (new Set(storages).size !== storages.length) {
    throw new Error("저장용량은 중복될 수 없습니다.");
  }
  if (draft.variants.some((variant) => variant.releasePrice <= 0)) {
    throw new Error("모든 저장용량의 출고가를 입력해 주세요.");
  }

  if (!draft.installmentMonths.length) {
    throw new Error("할부 개월을 1개 이상 선택해 주세요.");
  }
}

export function validateProductPricing(draft: Pick<ProductDraft, "pricingEntries" | "variants">) {
  if (!draft.pricingEntries.length) {
    throw new Error("요금 조건을 1개 이상 추가해 주세요.");
  }
  const planIds = draft.pricingEntries.map((entry) => entry.planId).filter(Boolean);
  if (new Set(planIds).size !== planIds.length) throw new Error("같은 요금제는 한 번만 추가해 주세요. 허용 할인 방식은 요금제 안에서 선택합니다.");
  draft.pricingEntries.forEach((entry, index) => {
    const label = `요금제 ${index + 1}`;
    if (!entry.planId) throw new Error(`${label}: 통신사와 요금제를 선택해 주세요.`);
    if (!entry.subscriptionTypes.length) throw new Error(`${label}: 가입유형을 1개 이상 선택해 주세요.`);
    for (const sub of entry.subscriptionTypes) {
      for (const variant of draft.variants) {
        const condition = pricingEntryCondition(entry, sub, variant.storageValue);
        const prefix = `${label} (${sub === "number_transfer" ? "번호이동" : "기기변경"} · ${variant.storageValue})`;
        if (!condition.availableDiscountTypes.length || !condition.availableDiscountTypes.every(isDiscountType)) {
          throw new Error(`${prefix}: 허용 할인 방식을 1개 이상 선택해 주세요.`);
        }
        for (const amount of [condition.publicSupportAmount, condition.rebateAmount]) {
          if (amount !== null && !isNonNegativeInteger(amount)) throw new Error(`${prefix}: 지원금은 0 이상의 정수여야 합니다.`);
        }
      }
    }
  });
}

function isNonNegativeInteger(value: number) {
  return Number.isInteger(value) && value >= 0;
}
