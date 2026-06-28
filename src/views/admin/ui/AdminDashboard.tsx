"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getStoredConsultations,
  saveStoredConsultations,
} from "@/entities/consultation/model/storage";
import type { ConsultationRequest, ConsultationStatus } from "@/entities/consultation/model/types";
import { logoutAdmin } from "@/features/admin/model/auth";
import { AdminApplicationsPanel } from "./AdminApplicationsPanel";
import { AdminCatalogPanel } from "./AdminCatalogPanel";
import { AdminContentPanel } from "./AdminContentPanel";
import { AdminHeroBannerPanel } from "./AdminHeroBannerPanel";

type AdminTab = "applications" | "catalog" | "content" | "banner";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("applications");
  const [applications, setApplications] = useState<ConsultationRequest[]>([]);

  useEffect(() => {
    setApplications(getStoredConsultations());
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
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="page-main">
      <section className="admin-hero">
        <div />
        <button
          className="button button--secondary"
          onClick={logout}
          type="button"
        >
          로그아웃
        </button>
      </section>
      <div className="admin-tabs" role="tablist" aria-label="관리 메뉴">
        <button onClick={() => setActiveTab("applications")} type="button">
          상담 신청
        </button>
        <button onClick={() => setActiveTab("banner")} type="button">
          홈 배너
        </button>
        <button onClick={() => setActiveTab("catalog")} type="button">
          상품
        </button>
        <button onClick={() => setActiveTab("content")} type="button">
          콘텐츠
        </button>
      </div>
      {activeTab === "applications" ? (
        <AdminApplicationsPanel
          items={applications}
          onStatusChange={changeStatus}
        />
      ) : null}
      {activeTab === "banner" ? <AdminHeroBannerPanel /> : null}
      {activeTab === "catalog" ? <AdminCatalogPanel /> : null}
      {activeTab === "content" ? <AdminContentPanel /> : null}
    </main>
  );
}
