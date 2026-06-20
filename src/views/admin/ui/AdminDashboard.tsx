"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getStoredConsultations,
  saveStoredConsultations
} from "@/entities/consultation/model/storage";
import type { ConsultationStatus } from "@/entities/consultation/model/types";
import { isAdminAuthenticated, logoutAdmin } from "@/features/admin/model/auth";
import { AdminApplicationsPanel } from "./AdminApplicationsPanel";
import { AdminCatalogPanel } from "./AdminCatalogPanel";
import { AdminContentPanel } from "./AdminContentPanel";
import { AdminHeroBannerPanel } from "./AdminHeroBannerPanel";

type AdminTab = "applications" | "catalog" | "content" | "banner";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("applications");
  const [applications, setApplications] = useState(getStoredConsultations);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsAuthenticated(isAdminAuthenticated());
      setApplications(getStoredConsultations());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function changeStatus(id: string, status: ConsultationStatus) {
    const nextItems = applications.map((item) => {
      return item.id === id ? { ...item, status } : item;
    });
    setApplications(nextItems);
    saveStoredConsultations(nextItems);
  }

  function logout() {
    logoutAdmin();
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <main className="page-main">
        <section className="notice-box">
          <h1>관리자 로그인이 필요합니다.</h1>
          <Link className="button button--primary" href="/admin/login">로그인으로 이동</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>기본 CMS 관리 화면</h1>
          <p>상품, 상담 신청, 콘텐츠 노출 상태를 관리합니다.</p>
        </div>
        <button className="button button--secondary" onClick={logout} type="button">로그아웃</button>
      </section>
      <div className="admin-metrics">
        <span>상담 신청 {applications.length}</span>
        <span>상태 변경 가능</span>
        <span>모바일 기본 대응</span>
      </div>
      <div className="admin-tabs" role="tablist" aria-label="관리 메뉴">
        <button onClick={() => setActiveTab("applications")} type="button">상담 신청</button>
        <button onClick={() => setActiveTab("banner")} type="button">홈 배너</button>
        <button onClick={() => setActiveTab("catalog")} type="button">상품</button>
        <button onClick={() => setActiveTab("content")} type="button">콘텐츠</button>
      </div>
      {activeTab === "applications" ? (
        <AdminApplicationsPanel items={applications} onStatusChange={changeStatus} />
      ) : null}
      {activeTab === "banner" ? <AdminHeroBannerPanel /> : null}
      {activeTab === "catalog" ? <AdminCatalogPanel /> : null}
      {activeTab === "content" ? <AdminContentPanel /> : null}
    </main>
  );
}
