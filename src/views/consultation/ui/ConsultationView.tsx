import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/Skeleton";
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
      <Suspense fallback={<ConsultationFormSkeleton />}>
        <ConsultationForm />
      </Suspense>
    </main>
  );
}

function ConsultationFormSkeleton() {
  return (
    <div className="brand-card grid gap-5 p-8">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="grid gap-2" key={index}>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-11 w-full rounded-[10px]" />
        </div>
      ))}
      <Skeleton className="h-12 w-full rounded-[10px]" />
    </div>
  );
}
