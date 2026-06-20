import Link from "next/link";
import type { ProductEstimate } from "@/entities/product/model/types";

type EstimatePanelProps = {
  productId: string;
  estimate: ProductEstimate;
};

export function EstimatePanel({ productId, estimate }: EstimatePanelProps) {
  return (
    <aside className="estimate-panel">
      <div className="estimate-panel__benefit">
        <span>총 상담 혜택</span>
        <strong>{(estimate.carrierSupport + estimate.storeSupport).toLocaleString("ko-KR")}원</strong>
      </div>
      <EstimateLine label="월 통신요금" value={estimate.monthlyPlanPrice} />
      <EstimateLine
        label={`월 할부금 (${estimate.installmentMonths}개월)`}
        value={estimate.monthlyInstallment}
      />
      <div className="estimate-panel__total">
        <span>월 예상납부금액</span>
        <strong>{estimate.monthlyTotal.toLocaleString("ko-KR")}원</strong>
      </div>
      <p>{estimate.note}</p>
      <Link className="button button--primary" href={`/consultation?productId=${productId}`}>
        상담 신청하기
      </Link>
    </aside>
  );
}

function EstimateLine({ label, value }: { label: string; value: number }) {
  return (
    <dl className="estimate-line">
      <dt>{label}</dt>
      <dd>{value.toLocaleString("ko-KR")}원</dd>
    </dl>
  );
}
