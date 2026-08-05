"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getStoredConsultations,
  saveStoredConsultations,
} from "@/entities/consultation/model/storage";
import type { ConsultationRequest, ConsultationStatus } from "@/entities/consultation/model/types";
import { logoutAdmin } from "@/features/admin/model/auth";
import { AdminPlanManager } from "@/features/plan-admin/ui/AdminPlanManager";
import { AdminApplicationsPanel } from "./AdminApplicationsPanel";
import { AdminCatalogPanel } from "./AdminCatalogPanel";
import { AdminContentPanel } from "./AdminContentPanel";
import { AdminHeroBannerPanel } from "./AdminHeroBannerPanel";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import type { AdminTab } from "./adminDashboardConfig";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("applications");
  const [applications, setApplications] = useState<ConsultationRequest[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setApplications(getStoredConsultations());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function changeStatus(id: string, status: ConsultationStatus) {
    const nextItems = applications.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setApplications(nextItems);
    saveStoredConsultations(nextItems);
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
              items={applications}
              onStatusChange={changeStatus}
            />
          ) : null}
          {activeTab === "banner" ? <AdminHeroBannerPanel /> : null}
          {activeTab === "catalog" ? <AdminCatalogPanel /> : null}
          {activeTab === "plans" ? <AdminPlanManager /> : null}
          {activeTab === "content" ? <AdminContentPanel /> : null}
        </div>
      </section>
    </main>
  );
}
