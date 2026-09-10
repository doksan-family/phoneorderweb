import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { NoticeDetailView } from "@/views/content/ui/NoticeDetailView";

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const queryClient = makeQueryClient();
  await queryClient
    .prefetchQuery(customerCenterQueryOptions.noticeDetail(id))
    .catch(() => {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetailView noticeId={id} />
    </HydrationBoundary>
  );
}
