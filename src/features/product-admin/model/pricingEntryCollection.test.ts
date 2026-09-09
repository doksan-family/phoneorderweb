import assert from "node:assert/strict";
import { test } from "node:test";
import type { AdminPlan } from "@/entities/plan/api/admin";
import type { ProductPricingEntryDraft } from "./types";
import { createPricingEntries, entryCarrier, groupPricingEntries } from "./pricingEntryCollection.ts";

let sequence = 0;
function empty(): ProductPricingEntryDraft {
  return { id: `entry-${++sequence}`, carrierCode: "", planId: "", availableDiscountTypes: ["public_support", "contract_discount"],
    subscriptionTypes: ["number_transfer"], publicSupportBySubType: {}, rebateBySubType: {} };
}
const plans: AdminPlan[] = Array.from({ length: 17 }, (_, index) => ({
  id: `plan-${index}`, name: `요금제 ${index}`, carrier_code: index < 9 ? "skt" : "kt", monthly_fee: 50000,
}));

test("개수 제한 없이 여러 요금제와 두 할인 방식을 생성하고 중복 조합은 건너뛴다", () => {
  const entries = createPricingEntries([], plans, ["public_support", "contract_discount"], empty);
  assert.equal(entries.length, 17);
  assert.equal(new Set(entries.map((entry) => entry.id)).size, 17);
  assert.equal(createPricingEntries(entries, plans, ["public_support", "contract_discount"], empty).length, 0);
  const partial = createPricingEntries([entries[0]], [plans[0], plans[0]], ["public_support", "contract_discount"], empty);
  assert.equal(partial.length, 0);
  assert.deepEqual(entries[0].availableDiscountTypes, ["public_support", "contract_discount"]);
});

test("통신사별로 분리하고 같은 요금제의 할인 방식은 하나의 그룹으로 묶는다", () => {
  const entries = createPricingEntries([], plans, ["public_support", "contract_discount"], empty);
  assert.equal(groupPricingEntries(entries, plans, "skt").length, 9);
  assert.equal(groupPricingEntries(entries, plans, "kt").length, 8);
  assert.equal(groupPricingEntries(entries, plans, "skt")[0].entries.length, 1);
  assert.equal(groupPricingEntries(entries.slice(1), plans, "skt")[0].entries.length, 1);
});

test("복제 시 금액과 가입유형을 보존하되 수정은 원본과 다른 복제본에 영향을 주지 않는다", () => {
  const template = { ...empty(), publicSupportBySubType: { number_transfer: { "256GB": 100000 } }, rebateBySubType: { number_transfer: 50000 } };
  const copies = createPricingEntries([], plans.slice(0, 2), template.availableDiscountTypes, empty, template);
  assert.equal(copies[0].publicSupportBySubType.number_transfer["256GB"], 100000);
  assert.equal(copies[0].rebateBySubType.number_transfer, 50000);
  copies[0].publicSupportBySubType.number_transfer["256GB"] = 1;
  copies[0].rebateBySubType.number_transfer = 1;
  copies[0].subscriptionTypes.push("device_change");
  assert.equal(template.publicSupportBySubType.number_transfer["256GB"], 100000);
  assert.equal(copies[1].publicSupportBySubType.number_transfer["256GB"], 100000);
  assert.equal(template.rebateBySubType.number_transfer, 50000);
  assert.deepEqual(template.subscriptionTypes, ["number_transfer"]);
});

test("기존 조건의 통신사를 요금제로 복원하고 미지정·삭제된 요금제도 목록에서 유지한다", () => {
  assert.equal(entryCarrier({ ...empty(), planId: plans[0].id }, plans), "skt");
  const missing = { ...empty(), planId: "deleted" };
  const groups = groupPricingEntries([missing, empty()], plans, "unassigned");
  assert.equal(groups.length, 2);
  assert.equal(groups[0].entries[0], missing);
});
