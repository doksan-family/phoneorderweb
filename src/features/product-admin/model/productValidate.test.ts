import assert from "node:assert/strict";
import { test } from "node:test";
import type { ProductDraft } from "./types";
import { validateDraft, validateProductBasics, validateProductOptions, validateProductPricing } from "./productValidate.ts";

function draft(): ProductDraft {
  return {
    categoryCode: "phone", brand: "삼성", name: "테스트 상품", summary: "",
    badges: [], isFeatured: false, colors: [], installmentMonths: [24],
    variants: [{ id: "v1", storageValue: "256GB", releasePrice: 1000000 }],
    pricingEntries: [{
      id: "p1", carrierCode: "SKT", planId: "plan1",
      availableDiscountTypes: ["public_support", "contract_discount"], subscriptionTypes: ["number_transfer"],
      publicSupportBySubType: { number_transfer: { "256GB": 0 } },
      rebateBySubType: {},
    }],
  };
}

test("기본 정보 단계에서는 아직 입력하지 않은 판매 옵션과 요금을 요구하지 않는다", () => {
  const value = { ...draft(), variants: [], pricingEntries: [] };
  assert.doesNotThrow(() => validateProductBasics(value));
  assert.throws(() => validateDraft(value), /저장용량/);
  assert.throws(() => validateProductBasics({ ...value, name: " " }), /상품명/);
});

test("판매 옵션 단계에서 중복 용량, 출고가, 할부 개월을 검사한다", () => {
  const value = draft();
  assert.doesNotThrow(() => validateProductOptions({ ...value, pricingEntries: [] }));
  assert.throws(() => validateProductOptions({ ...value, variants: [...value.variants, ...value.variants] }), /중복/);
  assert.throws(() => validateProductOptions({ ...value, variants: [{ ...value.variants[0], releasePrice: 0 }] }), /출고가/);
  assert.throws(() => validateProductOptions({ ...value, installmentMonths: [] }), /할부/);
});

test("최종 검사는 앞 단계 누락과 허용 방식 미선택을 거부하고 기본 지원금 0원을 허용한다", () => {
  const value = draft();
  assert.doesNotThrow(() => validateDraft(value));
  assert.throws(() => validateDraft({ ...value, categoryCode: "" }), /카테고리/);
  assert.throws(() => validateProductPricing({ ...value, pricingEntries: [] }), /요금 조건/);
  value.pricingEntries[0].publicSupportBySubType = {};
  assert.doesNotThrow(() => validateDraft(value));
  value.pricingEntries[0].availableDiscountTypes = [];
  assert.throws(() => validateDraft(value), /허용 할인 방식/);
});
