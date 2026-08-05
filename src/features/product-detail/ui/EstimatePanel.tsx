import Link from "next/link";
import type {
  ProductConsultationPayload,
  ProductEstimate,
} from "@/entities/product/model/types";

type EstimatePanelProps = {
  colorValue: string;
  consultationPayload?: ProductConsultationPayload;
  productId: string;
  estimate: ProductEstimate;
};

export function EstimatePanel({
  colorValue,
  consultationPayload,
  productId,
  estimate,
}: EstimatePanelProps) {
  const consultationHref = getConsultationHref(
    productId,
    consultationPayload,
    colorValue
  );

  return (
    <div className="grid gap-3">
      <section className="rounded-2xl bg-slate-950 p-5 text-white">
        <h3 className="m-0 mb-3.5 text-[0.92rem] font-extrabold">예상 견적</h3>
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
        <div className="mt-3.5 flex items-baseline justify-between gap-3 border-t border-white/15 pt-3.5">
          <span className="text-[0.85rem] font-bold">월 예상 납부 금액</span>
          <strong className="text-[1.35rem] font-extrabold text-[var(--brand-accent)]">
            {estimate.monthlyTotal.toLocaleString("ko-KR")}원
          </strong>
        </div>
      </section>

      <p className="m-0 text-[0.78rem] leading-[1.6] text-slate-500">{estimate.note}</p>

      <Link
        className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[var(--brand-primary)] px-6 text-[0.95rem] font-bold text-slate-950 transition hover:bg-[var(--brand-primary-hover)]"
        href={consultationHref}
      >
        이 조건으로 상담 신청하기
      </Link>
      <Link
        className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-slate-300 px-6 text-[0.88rem] font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        href="/products"
      >
        목록으로 돌아가기
      </Link>
    </div>
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
    <div className="flex justify-between gap-3 text-[0.78rem] text-slate-400">
      <dt>{label}</dt>
      <dd className="m-0 font-semibold text-white">
        {negative && value > 0 ? "-" : ""}
        {value.toLocaleString("ko-KR")}원
      </dd>
    </div>
  );
}

function getConsultationHref(
  productId: string,
  payload: ProductConsultationPayload | undefined,
  colorValue: string
) {
  const search = new URLSearchParams({ productId: payload?.productId ?? productId });
  if (payload?.pricingId) search.set("pricingId", payload.pricingId);
  if (payload?.variantId) search.set("variantId", payload.variantId);
  if (payload?.planId) search.set("planId", payload.planId);
  if (payload?.subscriptionType) {
    search.set("subscriptionType", payload.subscriptionType);
  }
  if (payload?.installmentMonths !== undefined) {
    search.set("installmentMonths", String(payload.installmentMonths));
  }
  if (colorValue) search.set("colorValue", colorValue);

  return `/consultation?${search.toString()}`;
}
