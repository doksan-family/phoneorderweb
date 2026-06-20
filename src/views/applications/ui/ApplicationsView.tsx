import { ApplicationLookup } from "@/features/consultation/ui/ApplicationLookup";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ApplicationsView() {
  return (
    <main className="page-main">
      <PageHeader
        eyebrow="Lookup"
        title="신청 내역 조회"
        description="회원가입 없이 신청 시 입력한 정보로 상담 신청 상태를 확인합니다."
      />
      <ApplicationLookup />
    </main>
  );
}
