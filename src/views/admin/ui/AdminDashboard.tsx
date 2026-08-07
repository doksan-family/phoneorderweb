"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  updateAdminConsultation,
  type ConsultationUpdatePayload,
} from "@/entities/consultation/api/admin";
import {
  adminConsultationsQueryKey,
  consultationQueryOptions,
} from "@/entities/consultation/model/queries";
import { logoutAdmin } from "@/features/admin/model/auth";
import { AdminPlanManager } from "@/features/plan-admin/ui/AdminPlanManager";
import { AdminApplicationsPanel } from "./AdminApplicationsPanel";
import { AdminCatalogPanel } from "./AdminCatalogPanel";
import { AdminContentPanel } from "./AdminContentPanel";
import { AdminHeroBannerPanel } from "./AdminHeroBannerPanel";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { contentTypeByTab, type AdminTab } from "./adminDashboardConfig";

export function AdminDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("applications");

  const applicationsQuery = useQuery(consultationQueryOptions.adminList());
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
    <main className="admin-dashboard-shell site-container grid min-h-screen grid-cols-[248px_minmax(0,1fr)] bg-zinc-100 max-[900px]:grid-cols-1">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="min-w-0">
        <AdminTopbar onLogout={logout} />

        <div className="mx-auto box-border flex min-h-[calc(100vh_-_78px)] w-[calc(100%_-_64px)] max-w-[1280px] flex-col pt-[34px] pb-0 max-[900px]:w-[calc(100%_-_32px)] max-[900px]:pt-6 max-[560px]:w-[calc(100%_-_24px)] max-[560px]:pt-5">
          {activeTab === "applications" ? (
            <AdminApplicationsPanel
              error={applicationsQuery.error}
              isPending={applicationsQuery.isPending}
              isSaving={updateMutation.isPending}
              items={applicationsQuery.data ?? []}
              onUpdate={updateApplication}
            />
          ) : null}
          {activeTab === "banner" ? <AdminHeroBannerPanel /> : null}
          {activeTab === "catalog" ? <AdminCatalogPanel /> : null}
          {activeTab === "plans" ? <AdminPlanManager /> : null}
          {contentType ? <AdminContentPanel key={activeTab} type={contentType} /> : null}
        </div>
      </section>
    </main>
  );
}
