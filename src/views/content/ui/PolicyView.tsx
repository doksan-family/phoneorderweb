import { MarketingConsentNotice } from "@/shared/ui/MarketingConsentNotice";
import { PageHeader } from "@/shared/ui/PageHeader";

type PolicyViewProps = {
  type: "terms" | "privacy";
};

export function PolicyView({ type }: PolicyViewProps) {
  const isTerms = type === "terms";

  return (
    <main className="page-main">
      <PageHeader
        eyebrow={isTerms ? "Terms" : "Privacy"}
        title={isTerms ? "이용약관" : "개인정보처리방침"}
        description="운영 전 법률 검토가 필요한 기본 안내 영역입니다."
      />
      <section className="policy-box">
        <h2>{isTerms ? "서비스 이용 안내" : "개인정보 수집 및 이용 안내"}</h2>
        <p>
          상담 신청, 신청 내역 조회, 고객 응대를 위해 필요한 최소 정보를
          수집합니다. 실제 운영 전 사업자 정보, 보관 기간, 위탁 처리, 파기 절차를
          확정해야 합니다.
        </p>
      </section>
      <MarketingConsentNotice />
    </main>
  );
}
