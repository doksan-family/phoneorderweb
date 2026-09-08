import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import type {
  DiscountType,
  ProductEstimate,
} from "@/entities/product/model/types";
import { subscriptionTypeLabel } from "@/shared/config/subscription";
import { subscriptionOptions } from "../model/productDraft";
import type {
  ProductPricingEntryDraft,
  ProductVariantDraft,
} from "../model/types";
import type { usePricingPreview } from "../model/usePricingPreview";
import { ProductNullableNumberField } from "./ProductNullableNumberField";

type ProductPricingEntryCardProps = {
  entry: ProductPricingEntryDraft;
  index: number;
  plans: AdminPlan[];
  variants: ProductVariantDraft[];
  installmentMonths: number[];
  preview: ReturnType<typeof usePricingPreview>;
  onUpdate: (id: string, next: Partial<ProductPricingEntryDraft>) => void;
  onDelete: (id: string) => void;
};

const fieldClass = "grid gap-1.5 text-[0.82rem] font-bold text-slate-700";
const discountTypes: { value: DiscountType; label: string }[] = [
  { value: "public_support", label: "공시지원금" },
  { value: "contract_discount", label: "선택약정" },
];
const toggleBase =
  "inline-flex h-9 items-center rounded-md border px-3 text-[0.82rem] font-bold transition";
const toggleOn =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const toggleOff = "border-slate-200 bg-white text-slate-500";

/** 숫자만 남긴 0 이상 정수. 비면 null. */
function toAmount(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

export function ProductPricingEntryCard({
  entry,
  index,
  plans,
  variants,
  installmentMonths,
  preview,
  onUpdate,
  onDelete,
}: ProductPricingEntryCardProps) {
  // 통신사 코드는 저장하지 않은 프리필에서는 요금제로부터 유추한다.
  const carrierCode =
    entry.carrierCode ||
    plans.find((plan) => plan.id === entry.planId)?.carrier_code ||
    "";
  const carrierPlans = plans.filter((plan) => plan.carrier_code === carrierCode);

  const step1 = Boolean(carrierCode);
  const step2 = step1 && Boolean(entry.planId);
  const step3 = step2 && entry.subscriptionTypes.length > 0;
  const months = [...installmentMonths].sort((a, b) => a - b);

  function selectCarrier(nextCarrier: string) {
    onUpdate(entry.id, { carrierCode: nextCarrier, planId: "" });
  }

  function selectPlan(planId: string) {
    const plan = plans.find((item) => item.id === planId);
    onUpdate(entry.id, { planId, carrierCode: plan?.carrier_code ?? carrierCode });
  }

  function toggleSubType(sub: string) {
    const next = entry.subscriptionTypes.includes(sub)
      ? entry.subscriptionTypes.filter((value) => value !== sub)
      : [...entry.subscriptionTypes, sub];
    onUpdate(entry.id, { subscriptionTypes: next });
  }

  function setSupport(sub: string, storageValue: string, value: number | null) {
    onUpdate(entry.id, {
      publicSupportBySubType: {
        ...entry.publicSupportBySubType,
        [sub]: {
          ...(entry.publicSupportBySubType[sub] ?? {}),
          [storageValue]: value,
        },
      },
    });
  }

  function setRebate(sub: string, value: number | null) {
    onUpdate(entry.id, {
      rebateBySubType: { ...entry.rebateBySubType, [sub]: value },
    });
  }

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.78rem] font-bold text-slate-400">
          요금 조건 {index + 1}
        </span>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-md bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950"
          onClick={() => onDelete(entry.id)}
        >
          <Trash2 size={15} aria-hidden="true" />
          <span className="sr-only">요금 조건 삭제</span>
        </button>
      </div>

      <label className={fieldClass}>
        1. 통신사
        <select
          value={carrierCode}
          onChange={(event) => selectCarrier(event.target.value)}
        >
          <option value="">통신사 선택</option>
          {carrierOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {step1 ? (
        <label className={fieldClass}>
          2. 요금제
          <select
            value={entry.planId}
            onChange={(event) => selectPlan(event.target.value)}
          >
            <option value="">요금제 선택</option>
            {carrierPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} · 월 {plan.monthly_fee.toLocaleString("ko-KR")}원
              </option>
            ))}
          </select>
          {carrierPlans.length === 0 ? (
            <span className="text-[0.72rem] font-medium text-amber-600">
              이 통신사에 등록된 요금제가 없습니다. 요금제 관리에서 먼저
              등록하세요.
            </span>
          ) : null}
        </label>
      ) : null}

      {step2 ? (
        <div className={fieldClass}>
          3. 가입유형
          <div className="flex gap-2">
            {subscriptionOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${toggleBase} ${
                  entry.subscriptionTypes.includes(option.value)
                    ? toggleOn
                    : toggleOff
                }`}
                onClick={() => toggleSubType(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step3 ? (
        <div className={fieldClass}>
          4. 할인 방식
          <div className="flex gap-2">
            {discountTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`${toggleBase} ${
                  entry.discountType === type.value ? toggleOn : toggleOff
                }`}
                onClick={() => onUpdate(entry.id, { discountType: type.value })}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step3
        ? entry.subscriptionTypes.map((sub) => (
            <fieldset
              key={sub}
              className="grid gap-2 rounded-md border border-slate-200 p-3"
            >
              <legend className="px-1 text-[0.8rem] font-bold text-[var(--brand-primary-strong)]">
                {subscriptionTypeLabel(sub)}
              </legend>

              {entry.discountType === "public_support" ? (
                <div className="grid gap-1.5">
                  <span className="text-[0.76rem] font-bold text-slate-500">
                    용량별 공시지원금
                  </span>
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="grid grid-cols-[minmax(0,1fr)_140px] items-center gap-2 max-[560px]:grid-cols-1"
                    >
                      <span className="text-[0.76rem] font-medium text-slate-500">
                        {variant.storageValue}
                        <span className="ml-1.5 text-slate-400">
                          출고가 {variant.releasePrice.toLocaleString("ko-KR")}원
                        </span>
                      </span>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="0"
                        className="h-9 rounded border border-slate-200 px-2 text-sm"
                        value={amountText(
                          entry.publicSupportBySubType[sub]?.[variant.storageValue]
                        )}
                        onChange={(event) =>
                          setSupport(
                            sub,
                            variant.storageValue,
                            toAmount(event.target.value)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <ProductNullableNumberField
                label="추가 지원금"
                value={entry.rebateBySubType[sub] ?? null}
                onChange={(value) => setRebate(sub, value)}
              />
            </fieldset>
          ))
        : null}

      {step3 ? (
        <EntryPreview
          entry={entry}
          variants={variants}
          months={months}
          preview={preview}
        />
      ) : null}
    </div>
  );
}

function amountText(value: number | null | undefined) {
  return value == null ? "" : String(value);
}

function EntryPreview({
  entry,
  variants,
  months,
  preview,
}: {
  entry: ProductPricingEntryDraft;
  variants: ProductVariantDraft[];
  months: number[];
  preview: ReturnType<typeof usePricingPreview>;
}) {
  const subTypes = entry.subscriptionTypes;
  const [subType, setSubType] = useState(subTypes[0] ?? "");
  const [storageId, setStorageId] = useState(variants[0]?.id ?? "");

  // 선택값이 현재 목록에 없으면(가입유형·용량이 바뀐 경우) 첫 값을 쓴다.
  const activeSub = subTypes.includes(subType) ? subType : subTypes[0] ?? "";
  const variant =
    variants.find((item) => item.id === storageId) ?? variants[0];

  const isPublicSupport = entry.discountType === "public_support";
  const discountExRebate = (est: ProductEstimate) =>
    est.appliedPublicSupportAmount +
    est.monthlyPlanDiscount * est.installmentMonths;

  const rows =
    preview.policy && variant && activeSub
      ? months.map((month) => ({
          month,
          estimate: preview.estimate(
            entry,
            activeSub,
            variant.storageValue,
            variant.releasePrice,
            month
          ),
        }))
      : [];
  const first = rows[0]?.estimate;

  return (
    <div className="grid gap-1.5 rounded-md bg-slate-50 px-3 py-2.5 text-[0.76rem] text-slate-500">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-slate-700">월 예상 납부금</span>
        <div className="flex gap-1.5">
          {subTypes.length > 1 ? (
            <select
              className="h-8 min-w-24 rounded border border-slate-200 bg-white px-2 py-0 text-[0.74rem] leading-normal text-slate-700"
              value={activeSub}
              onChange={(event) => setSubType(event.target.value)}
            >
              {subTypes.map((sub) => (
                <option key={sub} value={sub}>
                  {subscriptionTypeLabel(sub)}
                </option>
              ))}
            </select>
          ) : null}
          {variants.length > 1 && variant ? (
            <select
              className="h-8 min-w-24 rounded border border-slate-200 bg-white px-2 py-0 text-[0.74rem] leading-normal text-slate-700"
              value={variant.id}
              onChange={(event) => setStorageId(event.target.value)}
            >
              {variants.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.storageValue}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>

      {preview.policyError ? (
        <p className="m-0 text-[0.74rem] font-bold text-red-500">
          가격 정책을 불러오지 못해 미리보기를 계산할 수 없습니다.
        </p>
      ) : !preview.policy ? (
        <p className="m-0 text-[0.74rem] text-slate-400">
          가격 정책을 불러오는 중…
        </p>
      ) : null}

      {first ? (
        <div className="flex justify-between">
          <span>할부 원금</span>
          <span className="font-semibold text-slate-900">
            {first.deviceInstallmentPrincipal.toLocaleString("ko-KR")}원
          </span>
        </div>
      ) : null}
      {first ? (
        <div className="flex justify-between">
          <span>월 통신요금</span>
          <span className="font-semibold text-slate-900">
            {first.discountedPlanMonthlyFee.toLocaleString("ko-KR")}원
          </span>
        </div>
      ) : null}
      {isPublicSupport && first ? (
        <div className="flex justify-between">
          <span>총 할인금액 (추가 지원금 제외)</span>
          <span className="font-semibold text-emerald-600">
            {discountExRebate(first).toLocaleString("ko-KR")}원
          </span>
        </div>
      ) : null}
      <div className="mt-0.5 border-t border-slate-200 pt-1.5" />
      {rows.map(({ month, estimate }) =>
        estimate ? (
          <div key={month} className="grid gap-0.5">
            <div className="flex justify-between">
              <span>{month}개월 총 월 납부금</span>
              <span className="font-bold text-[var(--brand-primary-strong)]">
                {estimate.estimatedMonthlyPayment.toLocaleString("ko-KR")}원
              </span>
            </div>
            {!isPublicSupport ? (
              <div className="flex justify-between text-[0.72rem]">
                <span>└ 총 할인금액 (추가 지원금 제외)</span>
                <span className="font-semibold text-emerald-600">
                  {discountExRebate(estimate).toLocaleString("ko-KR")}원
                </span>
              </div>
            ) : null}
          </div>
        ) : null
      )}
    </div>
  );
}
