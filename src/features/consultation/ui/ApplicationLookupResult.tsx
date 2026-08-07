import {
  formatConsultationDateTime,
  statusLabel,
  statusToneClass,
} from "@/entities/consultation/model/status";
import type { ConsultationRequest } from "@/entities/consultation/model/types";

type ApplicationLookupResultProps = {
  item: ConsultationRequest;
};

const mutedClass = "text-[0.82rem] text-slate-500";

/** 조회된 신청 1건. 신청 당시 스냅샷 조건과 견적을 그대로 보여준다. */
export function ApplicationLookupResult({ item }: ApplicationLookupResultProps) {
  const quote = item.quote;

  return (
    <article className="mt-3 grid gap-3 rounded-xl border border-slate-200 bg-white p-[18px]">
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <strong className="text-[1.02rem] text-slate-950">
            {item.productName}
          </strong>
          <span className={mutedClass}>
            {item.applicationNumber ? `${item.applicationNumber} · ` : ""}
            {formatConsultationDateTime(item.createdAt)}
          </span>
        </div>
        <span
          className={`brand-pill shrink-0 px-2.5 py-1 text-[0.75rem] ${statusToneClass[item.status]}`}
        >
          {statusLabel[item.status]}
        </span>
      </div>

      {quote?.conditions.length ? (
        <dl className="m-0 grid gap-1.5 rounded-lg bg-slate-50 p-3.5">
          {quote.conditions.map((condition) => (
            <div
              className="grid grid-cols-[68px_minmax(0,1fr)] items-baseline gap-3"
              key={condition.label}
            >
              <dt className={mutedClass}>{condition.label}</dt>
              <dd className="m-0 text-[0.88rem] font-bold text-slate-950">
                {condition.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {quote?.monthlyPayment ? (
        <div className="grid gap-1 border-t border-slate-100 pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.88rem] font-bold text-slate-700">
              예상 월 납부액
            </span>
            <strong className="text-[1.1rem] text-slate-950">
              {formatWon(quote.monthlyPayment)}
            </strong>
          </div>
          <span className={mutedClass}>
            {[
              quote.monthlyDevicePayment
                ? `기기 ${formatWon(quote.monthlyDevicePayment)}`
                : null,
              quote.planMonthlyFee
                ? `요금제 ${formatWon(quote.planMonthlyFee)}`
                : null,
            ]
              .filter(Boolean)
              .join(" + ")}
          </span>
          <span className={mutedClass}>
            신청 당시 기준 예상 금액이며 실제 금액은 상담에서 확정됩니다.
          </span>
        </div>
      ) : null}
    </article>
  );
}

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}
