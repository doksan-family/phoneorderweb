import { MarketingConsentNotice } from "@/shared/ui/MarketingConsentNotice";
import { PageHeader } from "@/shared/ui/PageHeader";

type PolicyViewProps = {
  type: "terms" | "privacy";
};

export function PolicyView({ type }: PolicyViewProps) {
  const isTerms = type === "terms";

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow="약관 및 정책"
        title={isTerms ? "이용약관" : "개인정보처리방침"}
        description="운영 전 법률 검토가 필요한 기본 안내 영역입니다."
      />
      <section className="brand-card mb-6 p-6">
        <h2 className="brand-title">{isTerms ? "서비스 이용 안내" : "개인정보 수집 및 이용 안내"}</h2>
        <p className="mt-2.5 text-[0.88rem] leading-[1.65] text-slate-500">
          상담 신청, 신청 내역 조회, 고객 응대를 위해 필요한 최소 정보를
          수집합니다. 실제 운영 전 사업자 정보, 보관 기간, 위탁 처리, 파기 절차를
          확정해야 합니다.
        </p>
      </section>
      <MarketingConsentNotice />
    </main>
  );
}
