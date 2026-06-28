import { Suspense } from "react";
import { ConsultationForm } from "@/features/consultation/ui/ConsultationForm";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ConsultationView() {
  return (
    <main className="w-[min(1120px,calc(100%-40px))] mx-auto pt-14 pb-20 max-[560px]:w-[calc(100%-28px)]">
      <PageHeader
        eyebrow="Consultation"
        title="상품 상담 신청"
        description="결제 없이 상담 신청만 접수합니다. 담당자가 조건을 확인한 뒤 연락드립니다."
      />
      <Suspense fallback={<div className="grid gap-5 border border-slate-200 rounded-2xl p-8 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)]">상담 신청 양식을 불러오는 중입니다.</div>}>
        <ConsultationForm />
      </Suspense>
    </main>
  );
}
