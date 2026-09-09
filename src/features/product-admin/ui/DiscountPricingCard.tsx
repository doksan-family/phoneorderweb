import type { ReactNode } from "react";
import { DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";
import type { DiscountType } from "@/entities/product/model/types";

type DiscountPricingCardProps = {
  discountType: DiscountType;
  /** 서버 계산이 아니라 화면에서 추정한 값이면 "추정" 등으로 표시. */
  note?: string;
  children: ReactNode;
};

/** 공시지원금 / 선택약정을 색으로 구분해 담는 카드. 관리자 요금 표시 두 곳에서 공유한다. */
const toneByType: Record<DiscountType, { wrap: string; head: string }> = {
  public_support: {
    wrap: "border-sky-200 bg-sky-50/70",
    head: "text-sky-700",
  },
  contract_discount: {
    wrap: "border-violet-200 bg-violet-50/70",
    head: "text-violet-700",
  },
};

export function DiscountPricingCard({
  discountType,
  note,
  children,
}: DiscountPricingCardProps) {
  const tone = toneByType[discountType];

  return (
    <div className={`grid content-start gap-2 rounded-lg border ${tone.wrap} p-3`}>
      <span className={`text-[0.8rem] font-extrabold ${tone.head}`}>
        {DISCOUNT_LABELS[discountType]}
        {note ? (
          <span className="ml-1 font-semibold text-amber-600">{note}</span>
        ) : null}
      </span>
      {children}
    </div>
  );
}
