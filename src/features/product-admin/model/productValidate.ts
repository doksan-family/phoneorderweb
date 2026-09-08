import type { ProductDraft } from "./types";

/** 등록·수정 공통 draft 검증. 문제가 있으면 사용자용 메시지로 던진다. */
export function validateDraft(draft: ProductDraft) {
  if (!draft.categoryCode) throw new Error("카테고리를 선택해 주세요.");
  if (!draft.name.trim()) throw new Error("상품명을 입력해 주세요.");

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

  if (!draft.pricingEntries.length) {
    throw new Error("요금 조건을 1개 이상 추가해 주세요.");
  }
  draft.pricingEntries.forEach((entry, index) => {
    const label = `요금 조건 ${index + 1}`;
    if (!entry.planId) throw new Error(`${label}: 통신사와 요금제를 선택해 주세요.`);
    if (!entry.subscriptionTypes.length) {
      throw new Error(`${label}: 가입유형을 1개 이상 선택해 주세요.`);
    }

    entry.subscriptionTypes.forEach((sub) => {
      const subLabel = `${label} (${sub === "number_transfer" ? "번호이동" : "기기변경"})`;

      if (entry.discountType === "public_support") {
        const byStorage = entry.publicSupportBySubType[sub] ?? {};
        const amounts = draft.variants.map(
          (variant) => byStorage[variant.storageValue] ?? null
        );
        if (amounts.every((amount) => amount === null)) {
          throw new Error(`${subLabel}: 용량별 공시지원금을 입력해 주세요.`);
        }
        if (amounts.some((a) => a !== null && !isNonNegativeInteger(a))) {
          throw new Error(`${subLabel}: 공시지원금은 0 이상의 정수여야 합니다.`);
        }
      }

      const rebate = entry.rebateBySubType[sub] ?? null;
      if (rebate !== null && !isNonNegativeInteger(rebate)) {
        throw new Error(`${subLabel}: 추가 지원금은 0 이상의 정수여야 합니다.`);
      }
    });
  });
}

function isNonNegativeInteger(value: number) {
  return Number.isInteger(value) && value >= 0;
}
