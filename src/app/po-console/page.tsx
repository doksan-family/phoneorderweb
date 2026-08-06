import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { productQueryOptions } from "@/entities/product/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { createClient } from "@/shared/lib/supabase/server";
import { AdminDashboard } from "@/views/admin/ui/AdminDashboard";

export default async function AdminPage() {
  // 인증이 쿠키 기반이라 서버에서도 토큰을 읽어 목록을 미리 받을 수 있다.
  // middleware가 이미 비로그인 접근을 막으므로 여기서는 세션만 꺼낸다.
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;

  const queryClient = makeQueryClient();
  if (accessToken) {
    await queryClient.prefetchQuery(
      productQueryOptions.adminList({}, accessToken)
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboard />
    </HydrationBoundary>
  );
}
