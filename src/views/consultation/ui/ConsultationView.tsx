import { Suspense } from "react";
import { ConsultationForm } from "@/features/consultation/ui/ConsultationForm";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ConsultationView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow="상담 신청"
        title="궁금한 조건, 상담사가 바로 알려드려요"
        description="결제 없이 상담 신청만 접수합니다. 담당자가 조건을 확인한 뒤 연락드립니다."
      />
      <Suspense fallback={<div className="grid gap-5 brand-card p-8">상담 신청 양식을 불러오는 중입니다.</div>}>
        <ConsultationForm />
      </Suspense>
    </main>
  );
}
