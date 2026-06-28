"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const adminTabs: Array<{
  id: AdminTab;
  label: string;
  meta: string;
}> = [
  { id: "applications", label: "상담 신청", meta: "신규 접수" },
  { id: "banner", label: "홈 배너", meta: "메인 관리" },
  { id: "catalog", label: "상품 관리", meta: "카탈로그" },
  { id: "content", label: "콘텐츠", meta: "후기/공지/FAQ" },
];

const adminNavItems: Array<{ id: AdminTab; label: string }> = [
  { id: "applications", label: "상담 신청" },
  { id: "banner", label: "홈 배너" },
  { id: "catalog", label: "상품 관리" },
  { id: "content", label: "콘텐츠 관리" },
];

const secondaryActionClass =
  "inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:text-blue-700";

function navButtonClass(isActive: boolean) {
  return [
    "w-full rounded-lg border-0 px-3.5 py-3 text-left text-sm font-bold transition max-[900px]:text-center max-[900px]:whitespace-nowrap",
    isActive
      ? "bg-slate-100 text-slate-950"
      : "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
  ].join(" ");
}

function tabButtonClass(isActive: boolean) {
  return [
    "grid min-h-16 gap-2 rounded-[10px] border-0 px-4 py-3.5 text-left transition",
    isActive
      ? "bg-zinc-800 text-white shadow-[0_8px_20px_rgba(39,39,42,0.18)]"
      : "bg-slate-50 text-slate-700 hover:bg-slate-100",
  ].join(" ");
}

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("applications");
  const [applications, setApplications] = useState<ConsultationRequest[]>(() =>
    getStoredConsultations()
  );

  const activeLabel =
    adminTabs.find((item) => item.id === activeTab)?.label ?? "관리";

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
    <main className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] bg-zinc-100 pb-0 max-[900px]:grid-cols-1">
      <aside
        className="sticky top-0 flex h-screen flex-col gap-[34px] border-r border-slate-200 bg-white px-7 py-[30px] max-[900px]:static max-[900px]:grid max-[900px]:h-auto max-[900px]:gap-4 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:p-5 max-[560px]:px-3.5 max-[560px]:py-[18px]"
        aria-label="관리자 메뉴"
      >
        <Link
          className="text-xl font-black tracking-[-0.3px] text-blue-900"
          href="/"
        >
          Phone<em className="not-italic text-blue-700">Order</em>
        </Link>
        <nav className="grid gap-3.5 max-[900px]:grid-cols-[repeat(4,minmax(120px,1fr))] max-[900px]:overflow-x-auto max-[900px]:[-webkit-overflow-scrolling:touch] max-[560px]:grid-cols-2">
          {adminNavItems.map((item) => (
            <button
              className={navButtonClass(activeTab === item.id)}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0">
        <header className="flex min-h-[78px] items-center justify-between gap-6 border-b border-slate-200 bg-white px-8 max-[900px]:min-h-0 max-[900px]:px-5 max-[900px]:py-4 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3.5">
          <div>
            <p className="m-0 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
              Admin Console
            </p>
            <h1 className="m-0 mt-0.5 text-lg font-extrabold tracking-[-0.2px] text-slate-950">
              {activeLabel}
            </h1>
          </div>
          <div className="flex items-center gap-3 max-[560px]:w-full max-[560px]:flex-wrap max-[560px]:justify-between">
            <Link className={secondaryActionClass} href="/">
              사이트 보기
            </Link>
            <button
              className={secondaryActionClass}
              onClick={logout}
              type="button"
            >
              로그아웃
            </button>
            <div className="grid gap-0.5 text-right max-[560px]:hidden">
              <span className="text-sm font-extrabold text-slate-950">
                관리자
              </span>
              <strong className="text-[0.68rem] tracking-[0.04em] text-slate-400">
                ADMIN
              </strong>
            </div>
            <span
              className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-full bg-zinc-800 text-sm font-black text-white"
              aria-hidden="true"
            >
              관
            </span>
          </div>
        </header>

        <div className="mx-auto w-[calc(100%_-_64px)] max-w-[1280px] py-[34px] pb-20 max-[900px]:w-[calc(100%_-_32px)] max-[900px]:py-6 max-[900px]:pb-14 max-[560px]:w-[calc(100%_-_24px)] max-[560px]:pt-5">
          <div className="mb-7 text-sm font-extrabold text-slate-950">
            ← 관리자 대시보드
          </div>
          <div
            className="mb-[30px] grid grid-cols-4 gap-2 rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.08)] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:p-2"
            role="tablist"
            aria-label="관리 메뉴"
          >
            {adminTabs.map((item) => (
              <button
                className={tabButtonClass(activeTab === item.id)}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <strong className="text-sm">{item.label}</strong>
                <span
                  className={
                    activeTab === item.id
                      ? "text-xs font-extrabold text-white/70"
                      : "text-xs font-extrabold text-slate-500"
                  }
                >
                  {item.id === "applications"
                    ? `${applications.length}건`
                    : item.meta}
                </span>
              </button>
            ))}
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
        </div>
      </section>
    </main>
  );
}
