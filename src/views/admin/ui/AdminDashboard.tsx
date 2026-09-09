"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  updateAdminConsultation,
  type ConsultationUpdatePayload,
} from "@/entities/consultation/api/admin";
import {
  adminConsultationsQueryKey,
  consultationQueryOptions,
} from "@/entities/consultation/model/queries";
import { dedupeById } from "@/shared/api/pagination";
import { logoutAdmin } from "@/features/admin/model/auth";
import { AdminPlanManager } from "@/features/plan-admin/ui/AdminPlanManager";
import { AdminApplicationsPanel } from "./AdminApplicationsPanel";
import { AdminAuditLogPanel } from "./AdminAuditLogPanel";
import { AdminCatalogPanel } from "./AdminCatalogPanel";
import { AdminCategoryPanel } from "./AdminCategoryPanel";
import { AdminContentPanel } from "./AdminContentPanel";
import { AdminHeroBannerPanel } from "./AdminHeroBannerPanel";
import { AdminLegalDocumentPanel } from "./AdminLegalDocumentPanel";
import { AdminOverviewPanel } from "./AdminOverviewPanel";
import { AdminPricingPolicyPanel } from "./AdminPricingPolicyPanel";
import { AdminReviewPanel } from "./AdminReviewPanel";
import { AdminSidebar } from "./AdminSidebar";
import { AdminSiteSettingsPanel } from "./AdminSiteSettingsPanel";
import { AdminTopbar } from "./AdminTopbar";
import {
  adminNavItems,
  contentTypeByTab,
  type AdminTab,
} from "./adminDashboardConfig";

const ADMIN_TABS = new Set<string>(adminNavItems.map((item) => item.id));

function isAdminTab(value: string | null): value is AdminTab {
  return value !== null && ADMIN_TABS.has(value);
}

export function AdminDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  // 탭을 URL에서 확정하기 전에는 패널을 그리지 않는다(대시보드가 잠깐 스쳤다 바뀌는 것 방지).
  const [tabReady, setTabReady] = useState(false);

  // 새로고침·뒤로가기에서 탭이 유지되도록 URL ?tab=과 동기화한다.
  // SSR에서는 알 수 없는 값이라 마운트 후 한 번만 반영한다.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tab");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (isAdminTab(fromUrl)) setActiveTab(fromUrl);
    setTabReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const changeTab = useCallback(
    (tab: AdminTab) => {
      setActiveTab(tab);
      const search = tab === "overview" ? "" : `?tab=${tab}`;
      router.replace(`/po-console${search}`, { scroll: false });
    },
    [router]
  );

  const applicationsQuery = useInfiniteQuery({
    ...consultationQueryOptions.adminInfiniteList(),
    enabled: activeTab === "applications",
  });
  const applicationItems = dedupeById(
    applicationsQuery.data?.pages.flatMap((page) => page.items) ?? []
  );
  const contentType = contentTypeByTab[activeTab];

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ConsultationUpdatePayload;
    }) => updateAdminConsultation(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminConsultationsQueryKey }),
  });

  function updateApplication(id: string, payload: ConsultationUpdatePayload) {
    updateMutation.mutate({ id, payload });
  }

  async function logout() {
    await logoutAdmin();
    router.push("/po-console/login");
    router.refresh();
  }

  return (
    <main className="admin-dashboard-shell grid min-h-screen w-full grid-cols-[248px_minmax(0,1fr)] bg-zinc-100 max-[900px]:grid-cols-1 min-[901px]:h-screen min-[901px]:overflow-hidden">
      <AdminSidebar activeTab={activeTab} onTabChange={changeTab} />

      <section className="min-w-0 min-[901px]:flex min-[901px]:h-screen min-[901px]:flex-col min-[901px]:overflow-hidden">
        <AdminTopbar onLogout={logout} />

        <div className="mx-auto box-border flex min-h-[calc(100vh_-_78px)] w-[calc(100%_-_64px)] max-w-[1280px] flex-col pt-[34px] pb-0 max-[900px]:w-[calc(100%_-_32px)] max-[900px]:pt-6 max-[560px]:w-[calc(100%_-_24px)] max-[560px]:pt-5 min-[901px]:block min-[901px]:min-h-0 min-[901px]:flex-1 min-[901px]:overflow-y-auto min-[901px]:pb-8">
          {tabReady && activeTab === "applications" ? (
            <AdminApplicationsPanel
              error={applicationsQuery.error}
              isPending={applicationsQuery.isPending}
              isSaving={updateMutation.isPending}
              items={applicationItems}
              hasMore={applicationsQuery.hasNextPage}
              isLoadingMore={applicationsQuery.isFetchingNextPage}
              onLoadMore={() => applicationsQuery.fetchNextPage()}
              onUpdate={updateApplication}
            />
          ) : null}
          {tabReady && activeTab === "overview" ? <AdminOverviewPanel /> : null}
          {tabReady && activeTab === "banner" ? <AdminHeroBannerPanel /> : null}
          {tabReady && activeTab === "categories" ? <AdminCategoryPanel /> : null}
          {tabReady && activeTab === "catalog" ? <AdminCatalogPanel /> : null}
          {tabReady && activeTab === "pricing" ? <AdminPricingPolicyPanel /> : null}
          {tabReady && activeTab === "plans" ? <AdminPlanManager /> : null}
          {tabReady && activeTab === "reviews" ? <AdminReviewPanel /> : null}
          {tabReady && activeTab === "audit" ? <AdminAuditLogPanel /> : null}
          {tabReady && activeTab === "settings" ? <AdminSiteSettingsPanel /> : null}
          {tabReady && activeTab === "legal" ? <AdminLegalDocumentPanel /> : null}
          {tabReady && contentType ? (
            <AdminContentPanel key={activeTab} type={contentType} />
          ) : null}
        </div>
      </section>
    </main>
  );
}
