import { ApplicationLookup } from "@/features/consultation/ui/ApplicationLookup";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ApplicationsView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow="신청조회"
        title="내 상담 신청 진행상황 확인"
        description="회원가입 없이 신청 시 입력한 정보로 상담 신청 상태를 확인합니다."
      />
      <ApplicationLookup />
    </main>
  );
}
