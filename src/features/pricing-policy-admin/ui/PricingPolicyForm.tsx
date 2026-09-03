"use client";

import {
  adminCheckboxClass,
  adminErrorClass,
  adminFieldClass,
  adminInlineFieldClass,
  primaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { usePricingPolicyForm } from "../model/usePricingPolicyForm";

const sectionTitleClass = "m-0 text-base font-black text-slate-950";
const sectionClass =
  "grid gap-3 rounded-[14px] border border-slate-200 bg-white p-5";

export function PricingPolicyForm() {
  const form = usePricingPolicyForm();

  if (form.loadError) {
    return (
      <p className={adminErrorClass}>
        가격 계산 정책을 불러오지 못했습니다. {form.loadError.message}
      </p>
    );
  }

  if (form.isPending || !form.draft) {
    return <SkeletonRows count={2} withThumbnail={false} />;
  }

  const draft = form.draft;

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>가격 계산 정책</h3>
        <p className="m-0 text-[0.82rem] leading-[1.6] text-slate-500">
          여기서 바꾼 값은 모든 상품 견적에 즉시 공통 적용됩니다. 할부 계산식은{" "}
          <strong>{form.calculationMethod}</strong> 방식만 지원합니다.
        </p>
        <div className={twoColumnFieldGridClass}>
          <label className={adminFieldClass}>
            선택약정 할인율 (%)
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={draft.contract_discount_rate}
              onChange={(event) =>
                form.update(
                  "contract_discount_rate",
                  Number(event.target.value)
                )
              }
            />
          </label>
          <label className={adminFieldClass}>
            할부 연이율 (%)
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={draft.installment_annual_rate}
              onChange={(event) =>
                form.update(
                  "installment_annual_rate",
                  Number(event.target.value)
                )
              }
            />
          </label>
        </div>
        <label className={adminInlineFieldClass}>
          <input
            className={adminCheckboxClass}
            type="checkbox"
            checked={draft.rebate_applies_to_public_support}
            onChange={(event) =>
              form.update(
                "rebate_applies_to_public_support",
                event.target.checked
              )
            }
          />
          공시지원금 방식에서 리베이트를 출고가에서 차감
        </label>
        <label className={adminInlineFieldClass}>
          <input
            className={adminCheckboxClass}
            type="checkbox"
            checked={draft.rebate_applies_to_contract_discount}
            onChange={(event) =>
              form.update(
                "rebate_applies_to_contract_discount",
                event.target.checked
              )
            }
          />
          선택약정 방식에서 리베이트를 출고가에서 차감
        </label>
        {form.updatedAt ? (
          <p className="m-0 text-[0.78rem] text-slate-400">
            마지막 수정: {form.updatedAt}
          </p>
        ) : null}
      </section>

      {form.error ? <p className={adminErrorClass}>{form.error}</p> : null}
      {form.saved ? (
        <p className="m-0 text-sm font-bold text-emerald-600">저장되었습니다.</p>
      ) : null}

      <button className={primaryButtonClass} disabled={form.loading} type="submit">
        저장
      </button>
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
