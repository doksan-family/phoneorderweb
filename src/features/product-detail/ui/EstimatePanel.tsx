import Link from "next/link";
import type { ProductEstimate } from "@/entities/product/model/types";

type EstimatePanelProps = {
  productId: string;
  estimate: ProductEstimate;
};

export function EstimatePanel({ productId, estimate }: EstimatePanelProps) {
  return (
    <aside className="sticky top-[144px] grid gap-3 p-4 border border-slate-200 rounded-xl bg-white max-[900px]:static max-[900px]:w-full">
      <div className="grid gap-1 rounded-[10px] p-[14px] bg-[#fff7ed]">
        <span>총 상담 혜택</span>
        <strong className="text-red-600 text-[1.8rem] font-black">{(estimate.carrierSupport + estimate.storeSupport).toLocaleString("ko-KR")}원</strong>
      </div>
      <EstimateLine label="월 통신요금" value={estimate.monthlyPlanPrice} />
      <EstimateLine
        label={`월 할부금 (${estimate.installmentMonths}개월)`}
        value={estimate.monthlyInstallment}
      />
      <div className="grid gap-1 rounded-[10px] p-[14px] bg-blue-50">
        <span>월 예상납부금액</span>
        <strong className="text-blue-900 text-[1.5rem] font-black">{estimate.monthlyTotal.toLocaleString("ko-KR")}원</strong>
      </div>
      <p className="text-slate-500">{estimate.note}</p>
      <Link
        className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900"
        href={`/consultation?productId=${productId}`}
      >
        상담 신청하기
      </Link>
    </aside>
  );
}

function EstimateLine({ label, value }: { label: string; value: number }) {
  return (
    <dl className="flex justify-between gap-3 m-0 py-3 border-b border-slate-200">
      <dt className="text-slate-500">{label}</dt>
      <dd className="m-0 font-extrabold">{value.toLocaleString("ko-KR")}원</dd>
    </dl>
  );
}
