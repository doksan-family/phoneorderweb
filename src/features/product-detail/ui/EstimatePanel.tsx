import Link from "next/link";
import type {
  ProductConsultationPayload,
  ProductEstimate,
} from "@/entities/product/model/types";
import { EstimateBody } from "./EstimateBody";

type EstimatePanelProps = {
  colorValue: string;
  consultationPayload?: ProductConsultationPayload;
  productId: string;
  /** API 견적이 없으면 null. 준비 중 안내를 보여준다. */
  estimate: ProductEstimate | null;
  /** 상담 페이지 안 모달에서 쓸 때는 목록 링크를 감춘다. */
  hideBackLink?: boolean;
  /** 상담 신청 링크를 눌렀을 때 추가로 할 일 (모달 닫기 등) */
  onConsultationSelect?: () => void;
};

export function EstimatePanel({
  colorValue,
  consultationPayload,
  productId,
  estimate,
  hideBackLink,
  onConsultationSelect,
}: EstimatePanelProps) {
  const consultationHref = getConsultationHref(
    productId,
    consultationPayload,
    colorValue
  );

  return (
    <div className="grid gap-3">
      <section className="brand-card p-5">
        <h3 className="m-0 mb-3.5 text-[0.92rem] font-extrabold text-slate-950">
          예상 견적
        </h3>
        {estimate ? (
          <EstimateBody estimate={estimate} />
        ) : (
          <p className="m-0 text-[0.85rem] leading-[1.7] text-slate-500">
            견적 준비 중입니다. 조건이 확정되지 않아 금액을 계산할 수 없습니다.
            <br />
            상담을 신청하시면 담당자가 실구매가를 안내드립니다.
          </p>
        )}
      </section>

      {estimate ? (
        <p className="m-0 text-[0.78rem] leading-[1.6] text-slate-500">
          {estimate.note}
        </p>
      ) : null}

      <Link
        className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] px-6 text-[0.95rem] font-bold bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]"
        href={consultationHref}
        onClick={onConsultationSelect}
      >
        이 조건으로 상담 신청하기
      </Link>
      {hideBackLink ? null : (
        <Link
          className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-slate-300 px-6 text-[0.88rem] font-bold text-slate-700 transition hover:bg-[var(--brand-primary-soft)] hover:text-slate-950"
          href="/products"
        >
          목록으로 돌아가기
        </Link>
      )}
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
  if (payload?.discountType) {
    search.set("discountType", payload.discountType);
  }
  if (payload?.installmentMonths !== undefined) {
    search.set("installmentMonths", String(payload.installmentMonths));
  }
  if (colorValue) search.set("colorValue", colorValue);

  return `/consultation?${search.toString()}`;
}
