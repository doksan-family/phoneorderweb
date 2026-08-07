import assert from "node:assert/strict";
import { test } from "node:test";
import { mapConsultations } from "./mapper.ts";

const item = {
  id: "c1",
  name: "홍길동",
  phone: "010-1234-5678",
  status: "consulting",
  created_at: "2026-08-06T01:00:00Z",
  quote_snapshot: {
    product_id: "p1",
    product_name: "갤럭시 S26",
    storage_value: "256GB",
    color_label: "스페이스 블랙",
    carrier_name: "SKT",
    plan_name: "5GX 프라임",
    installment_months: 24,
  },
};

test("응답 래핑 형태와 상관없이 같은 결과를 낸다", () => {
  const expected = mapConsultations([item]);

  assert.equal(expected.length, 1);
  assert.deepEqual(mapConsultations(item), expected);
  assert.deepEqual(mapConsultations({ ok: true, data: [item] }), expected);
  assert.deepEqual(mapConsultations({ ok: true, data: item }), expected);
  assert.deepEqual(mapConsultations({ items: [item] }), expected);
  // 관리자 목록: data 안에 items가 중첩된다
  assert.deepEqual(
    mapConsultations({
      ok: true,
      data: { items: [item], total: 1, limit: 20, offset: 0 },
    }),
    expected
  );
  assert.deepEqual(mapConsultations({ consultations: [item] }), expected);
});

test("스냅샷을 조건 요약으로 합치고 상태 코드를 검증한다", () => {
  const [mapped] = mapConsultations([item]);

  assert.equal(mapped.productName, "갤럭시 S26");
  assert.equal(
    mapped.conditions,
    "스페이스 블랙 · 256GB · SKT · 5GX 프라임 · 할부 24개월"
  );
  assert.equal(mapped.status, "consulting");
  // 모르는 상태 코드와 스냅샷 없는 신청도 화면이 깨지지 않아야 한다
  const [fallback] = mapConsultations([{ id: "c2", status: "unknown" }]);
  assert.equal(fallback.status, "pending");
  assert.equal(fallback.productName, "상품 미지정");
  assert.equal(fallback.conditions, undefined);
});

test("id 없는 항목과 빈 응답은 걸러낸다", () => {
  assert.deepEqual(mapConsultations([{ name: "이름만" }]), []);
  // id가 없어도 신청 번호가 있으면 살린다(공개 조회 응답)
  const [byNumber] = mapConsultations([
    { application_number: "CS-20260806-2C4D228B", name: "홍길동" },
  ]);
  assert.equal(byNumber.id, "CS-20260806-2C4D228B");
  assert.deepEqual(mapConsultations({ ok: true, data: null }), []);
});

test("조회 응답의 견적 스냅샷을 조건 목록과 금액으로 편다", () => {
  const [mapped] = mapConsultations({
    ok: true,
    data: [
      {
        application_number: "CS-20260806-2C4D228B",
        product_name: "Galaxy Z Fold 8",
        status: "contacted",
        created_at: "2026-08-06 21:35",
        quote_snapshot: {
          product_name: "Galaxy Z Fold 8",
          storage_value: "256GB",
          carrier_name: "SKT",
          plan_name: "59요금제",
          subscription_type_label: "번호이동",
          installment_months: 12,
          monthly_device_payment: 9260,
          discounted_plan_monthly_fee: 59000,
          estimated_monthly_payment: 68260,
          total_benefit_amount: 1000000,
        },
      },
    ],
  });

  assert.equal(mapped.id, "CS-20260806-2C4D228B");
  assert.equal(mapped.status, "contacted");
  assert.deepEqual(mapped.quote?.conditions, [
    { label: "용량", value: "256GB" },
    { label: "통신사", value: "SKT" },
    { label: "가입 유형", value: "번호이동" },
    { label: "요금제", value: "59요금제" },
    { label: "할부", value: "12개월" },
  ]);
  assert.equal(mapped.quote?.monthlyPayment, 68260);
  // 색상 없는 신청도 한 줄 요약이 깨지지 않는다
  assert.equal(
    mapped.conditions,
    "256GB · SKT · 번호이동 · 59요금제 · 할부 12개월"
  );
});
