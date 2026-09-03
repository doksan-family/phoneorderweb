import Image from "next/image";
import type { ProductEstimate } from "@/entities/product/model/types";
import type { Product } from "@/entities/product/model/types";
import type { ConsultationCondition } from "../model/useConsultationSelection";

type ConsultationSelectionSummaryProps = {
  product: Product;
  conditions: ConsultationCondition[];
  estimate: ProductEstimate | null;
};

/** 상세에서 고른 상품과 조건. 값은 상담 기록에도 함께 저장된다. */
export function ConsultationSelectionSummary({
  product,
  conditions,
  estimate,
}: ConsultationSelectionSummaryProps) {
  return (
    <section className="brand-card grid content-start gap-4 p-5">
      <span className="text-[0.78rem] font-bold text-[var(--brand-primary-strong)]">
        선택한 상담 조건
      </span>

      <div className="flex items-center gap-3.5">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            alt={product.imageAlt}
            className="object-cover"
            fill
            sizes="80px"
            src={product.imageUrl}
          />
        </div>
        <div className="grid min-w-0 gap-1">
          <strong className="text-[0.98rem] leading-[1.35] text-slate-950">
            {product.name}
          </strong>
          {product.summary ? (
            <span className="line-clamp-2 text-[0.8rem] leading-[1.5] text-slate-500">
              {product.summary}
            </span>
          ) : null}
        </div>
      </div>

      {conditions.length ? (
        <dl className="m-0 grid gap-2 border-t border-slate-100 pt-3.5">
          {conditions.map((condition) => (
            <div
              className="flex items-baseline justify-between gap-3"
              key={condition.label}
            >
              <dt className="text-[0.78rem] text-slate-500">{condition.label}</dt>
              <dd className="m-0 text-[0.85rem] font-bold text-slate-950">
                {condition.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {estimate ? (
        <div className="flex items-baseline justify-between gap-3 rounded-xl bg-[var(--brand-primary-soft)] px-3.5 py-3">
          <span className="text-[0.8rem] font-bold text-slate-700">
            월 예상 납부 금액
          </span>
          <strong className="text-[1.15rem] font-extrabold text-[var(--brand-primary-strong)]">
            {estimate.estimatedMonthlyPayment.toLocaleString("ko-KR")}원
          </strong>
        </div>
      ) : (
        <p className="m-0 text-[0.8rem] leading-[1.6] text-slate-500">
          견적은 상담 시 안내드립니다.
        </p>
      )}
    </section>
  );
}
