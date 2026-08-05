import { useQuery } from "@tanstack/react-query";
import { planQueryOptions } from "@/entities/plan/model/queries";
import {
  installmentMonthOptions,
  subscriptionTypeOptions,
} from "../model/productDraft";
import { ProductMultiChoiceField } from "./ProductMultiChoiceField";
import { ProductPlanSelect } from "./ProductPlanSelect";

type ProductPricingBaseFieldsProps = {
  installmentMonthOptionsValue: number[];
  planIds: string[];
  subscriptionTypes: string[];
  onInstallmentMonthsChange: (values: number[]) => void;
  onPlanIdsChange: (values: string[]) => void;
  onSubscriptionTypesChange: (values: string[]) => void;
};

export function ProductPricingBaseFields({
  installmentMonthOptionsValue,
  planIds,
  subscriptionTypes,
  onInstallmentMonthsChange,
  onPlanIdsChange,
  onSubscriptionTypesChange,
}: ProductPricingBaseFieldsProps) {
  const { data: plans = [] } = useQuery(planQueryOptions.adminList());

  return (
    <section className="grid gap-3 rounded-lg border border-slate-200 p-3">
      <span className="text-sm font-bold text-slate-700">기본 가격 생성 조건</span>
      <ProductPlanSelect
        plans={plans}
        values={planIds}
        onChange={onPlanIdsChange}
      />
      <ProductMultiChoiceField
        label="가입유형"
        options={subscriptionTypeOptions}
        values={subscriptionTypes}
        onChange={onSubscriptionTypesChange}
      />
      <ProductMultiChoiceField
        label="할부 개월"
        options={installmentMonthOptions}
        values={installmentMonthOptionsValue}
        onChange={onInstallmentMonthsChange}
      />
    </section>
  );
}
