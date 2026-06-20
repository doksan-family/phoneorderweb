import { AdminLoginForm } from "@/features/admin/ui/AdminLoginForm";
import { PageHeader } from "@/shared/ui/PageHeader";

export function AdminLoginView() {
  return (
    <main className="page-main">
      <PageHeader
        eyebrow="Admin"
        title="관리자 로그인"
        description="내부 운영자가 콘텐츠와 상담 신청을 관리하는 화면입니다."
      />
      <AdminLoginForm />
    </main>
  );
}
