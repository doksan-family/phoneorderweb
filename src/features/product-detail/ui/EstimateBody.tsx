import type { ProductEstimate } from "@/entities/product/model/types";

type EstimateBodyProps = {
  estimate: ProductEstimate;
};

export function EstimateBody({ estimate }: EstimateBodyProps) {
  return (
    <>
      <dl className="m-0 grid gap-[9px]">
        <EstimateLine label="출고가" value={estimate.originalPrice} />
        <EstimateLine label="판매가" value={estimate.salePrice} />
        <EstimateLine label="단말기 가격" value={estimate.devicePrice} />
        <EstimateLine label="통신사 지원금" value={estimate.carrierSupport} negative />
        <EstimateLine label="추가 지원금" value={estimate.storeSupport} negative />
        <EstimateLine label="요금제 월정액" value={estimate.planMonthlyFee} />
        <EstimateLine label="월 요금 할인" value={estimate.monthlyPlanDiscount} negative />
        <EstimateLine label="월 통신 요금" value={estimate.monthlyPlanPrice} />
        <EstimateLine
          label={`월 할부금 (${estimate.installmentMonths}개월)`}
          value={estimate.monthlyInstallment}
        />
      </dl>
      <div className="mt-3.5 flex items-baseline justify-between gap-3 rounded-xl bg-[var(--brand-primary-soft)] px-3.5 py-3">
        <span className="text-[0.85rem] font-bold text-slate-700">
          월 예상 납부 금액
        </span>
        <strong className="text-[1.35rem] font-extrabold text-[var(--brand-primary-strong)]">
          {estimate.monthlyTotal.toLocaleString("ko-KR")}원
        </strong>
      </div>
    </>
  );
}

function EstimateLine({
  label,
  value,
  negative = false,
}: {
  label: string;
  value: number;
  negative?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3 text-[0.78rem] text-slate-500">
      <dt>{label}</dt>
      <dd className="m-0 font-semibold text-slate-950">
        {negative && value > 0 ? "-" : ""}
        {value.toLocaleString("ko-KR")}원
      </dd>
    </div>
  );
}
