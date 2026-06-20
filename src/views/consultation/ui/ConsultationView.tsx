import { Suspense } from "react";
import { ConsultationForm } from "@/features/consultation/ui/ConsultationForm";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ConsultationView() {
  return (
    <main className="page-main">
      <PageHeader
        eyebrow="Consultation"
        title="상품 상담 신청"
        description="결제 없이 상담 신청만 접수합니다. 담당자가 조건을 확인한 뒤 연락드립니다."
      />
      <Suspense fallback={<div className="form-card">상담 신청 양식을 불러오는 중입니다.</div>}>
        <ConsultationForm />
      </Suspense>
    </main>
  );
}
