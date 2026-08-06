import type { AdminPlan } from "@/entities/plan/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import { ProductPlanOption } from "./ProductPlanOption";

const selectAllClass =
  "cursor-pointer rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[0.72rem] font-bold text-slate-600 transition hover:bg-[var(--brand-primary-soft)]";

type ProductPlanSelectProps = {
  plans: AdminPlan[];
  values: string[];
  onChange: (values: string[]) => void;
};

/** 요금제가 통신사별로 섞이면 고르기 어려워 통신사 3열로 나눠 보여준다. */
export function ProductPlanSelect({
  plans,
  values,
  onChange,
}: ProductPlanSelectProps) {
  function toggle(planId: string) {
    onChange(
      values.includes(planId)
        ? values.filter((item) => item !== planId)
        : [...values, planId]
    );
  }

  /** 해당 통신사 요금제를 한 번에 켜고 끈다. 다른 통신사 선택은 건드리지 않는다. */
  function toggleCarrier(carrierPlans: AdminPlan[], allSelected: boolean) {
    const carrierPlanIds = carrierPlans.map((plan) => plan.id);
    const rest = values.filter((value) => !carrierPlanIds.includes(value));

    onChange(allSelected ? rest : [...rest, ...carrierPlanIds]);
  }

  if (!plans.length) {
    return (
      <div className="grid gap-2 text-sm font-bold text-slate-700">
        <span>요금제</span>
        <span className="rounded-lg border border-dashed border-slate-200 px-3 py-2 text-slate-400">
          등록된 요금제가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="grid gap-2 text-sm font-bold text-slate-700">
      <span>요금제</span>
      <div className="grid grid-cols-3 items-start gap-2 max-[900px]:grid-cols-1">
        {carrierOptions.map((carrier) => {
          const carrierPlans = plans.filter(
            (plan) => plan.carrier_code === carrier.value
          );
          const selectedCount = carrierPlans.filter((plan) =>
            values.includes(plan.id)
          ).length;

          return (
            <section className="grid content-start gap-1.5" key={carrier.value}>
              <header className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                <span className="text-[0.85rem]">{carrier.label}</span>
                <span className="flex items-center gap-2 text-[0.75rem] text-slate-400">
                  {selectedCount}/{carrierPlans.length}
                  {carrierPlans.length ? (
                    <button
                      className={selectAllClass}
                      type="button"
                      onClick={() =>
                        toggleCarrier(
                          carrierPlans,
                          selectedCount === carrierPlans.length
                        )
                      }
                    >
                      {selectedCount === carrierPlans.length ? "해제" : "전체"}
                    </button>
                  ) : null}
                </span>
              </header>
              {carrierPlans.length ? (
                carrierPlans.map((plan) => (
                  <ProductPlanOption
                    key={plan.id}
                    plan={plan}
                    selected={values.includes(plan.id)}
                    onToggle={toggle}
                  />
                ))
              ) : (
                <span className="text-[0.8rem] text-slate-400">요금제 없음</span>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
