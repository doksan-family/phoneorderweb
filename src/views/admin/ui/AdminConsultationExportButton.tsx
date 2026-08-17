"use client";

import { useState } from "react";
import { exportAdminConsultationsCsv } from "@/entities/consultation/api/admin";
import { secondaryButtonClass } from "@/features/admin/ui/adminStyles";
import { downloadBlob } from "@/shared/lib/downloadBlob";
import type { StatusFilter } from "./adminApplicationStatus";

type AdminConsultationExportButtonProps = {
  status: StatusFilter;
};

/** 상담 신청 목록에서 선택한 상태 조건 그대로 CSV로 내려받는다. */
export function AdminConsultationExportButton({
  status,
}: AdminConsultationExportButtonProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExport() {
    setLoading(true);
    setError("");
    try {
      const { blob, filename } = await exportAdminConsultationsCsv({
        status: status === "all" ? undefined : status,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      });
      downloadBlob(blob, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : "CSV 다운로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        aria-label="시작일"
        type="date"
        value={fromDate}
        onChange={(event) => setFromDate(event.target.value)}
      />
      <span className="text-sm text-slate-400">~</span>
      <input
        aria-label="종료일"
        type="date"
        value={toDate}
        onChange={(event) => setToDate(event.target.value)}
      />
      <button
        className={secondaryButtonClass}
        disabled={loading}
        type="button"
        onClick={handleExport}
      >
        {loading ? "다운로드 중..." : "CSV 다운로드"}
      </button>
      {error ? <span className="text-sm font-bold text-red-600">{error}</span> : null}
    </div>
  );
}
