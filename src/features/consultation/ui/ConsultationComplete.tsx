import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

type ConsultationCompleteProps = {
  productName: string;
  /** 서버가 발급한 신청 번호(CS-YYYYMMDD-XXXXXXXX). 없으면 안내를 생략한다. */
  applicationNumber?: string;
};

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] px-5 text-sm font-bold bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]";
const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function ConsultationComplete({
  productName,
  applicationNumber,
}: ConsultationCompleteProps) {
  return (
    <section className="brand-card mx-auto grid max-w-[520px] justify-items-center gap-4 p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]">
        <CheckCircle2 size={28} aria-hidden />
      </span>

      <div className="grid gap-1.5">
        <h2 className="m-0 text-[1.15rem] font-extrabold tracking-[-0.02em] text-slate-950">
          상담 신청이 접수되었습니다
        </h2>
        <p className="m-0 text-[0.88rem] leading-[1.6] text-slate-500">
          {productName ? `${productName} · ` : ""}담당자가 조건을 확인한 뒤 1영업일
          이내 연락드립니다.
        </p>
      </div>

      {applicationNumber ? (
        <div className="grid w-full gap-1 rounded-xl bg-slate-50 px-4 py-3.5">
          <span className="text-[0.72rem] font-bold text-slate-400">신청번호</span>
          <strong className="font-mono text-[1rem] tracking-[0.02em] text-slate-950">
            {applicationNumber}
          </strong>
          <span className="text-[0.75rem] leading-[1.5] text-slate-400">
            신청 내역 조회 시 필요하니 기억해 두세요.
          </span>
        </div>
      ) : null}

      <div className="mt-1 grid w-full grid-cols-2 gap-2 max-[480px]:grid-cols-1">
        <Link className={primaryButtonClass} href="/applications">
          신청 내역 조회
        </Link>
        <Link className={secondaryButtonClass} href="/">
          홈으로
        </Link>
      </div>
    </section>
  );
}
