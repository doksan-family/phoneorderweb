import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchPublicNotice } from "@/entities/content/api/customerCenter";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { ApiError } from "@/shared/api/client";
import { makeQueryClient } from "@/shared/lib/react-query";
import { NoticeDetailView } from "@/views/content/ui/NoticeDetailView";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const queryClient = makeQueryClient();

  try {
    const notice = await fetchPublicNotice(id);
    queryClient.setQueryData(
      customerCenterQueryOptions.noticeDetail(id).queryKey,
      notice
    );
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound();
    }
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetailView noticeId={id} />
    </HydrationBoundary>
  );
}
