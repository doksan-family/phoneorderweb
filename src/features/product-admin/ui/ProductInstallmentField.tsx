import { installmentOptions } from "../model/productDraft";
import { ProductMultiChoiceField } from "./ProductMultiChoiceField";

type ProductInstallmentFieldProps = {
  values: number[];
  onChange: (values: number[]) => void;
};

export function ProductInstallmentField({
  values,
  onChange,
}: ProductInstallmentFieldProps) {
  return (
    <section className="grid gap-2 rounded-lg border border-slate-200 p-3">
      <ProductMultiChoiceField
        label="할부 개월"
        options={installmentOptions}
        values={values}
        onChange={onChange}
      />
      <span className="text-[0.75rem] text-slate-400">
        고객이 상품 상세에서 고를 수 있는 할부 개월입니다. 미리보기 금액도 이 값으로
        계산합니다.
      </span>
    </section>
  );
}
