import type { ConsultationStatus } from "./types";

export const statusOptions: ConsultationStatus[] = [
  "pending",
  "contacted",
  "consulting",
  "completed",
  "cancelled",
];

/** API 상태 코드를 화면 문구로 바꾼다. */
export const statusLabel: Record<ConsultationStatus, string> = {
  pending: "접수",
  contacted: "연락완료",
  consulting: "상담중",
  completed: "완료",
  cancelled: "취소",
};

export const statusToneClass: Record<ConsultationStatus, string> = {
  pending: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]",
  contacted: "bg-sky-50 text-sky-700",
  consulting: "bg-amber-50 text-amber-700",
  completed: "bg-slate-100 text-slate-500",
  cancelled: "bg-red-50 text-red-600",
};

/** "2026-08-06 21:35"처럼 ISO가 아닌 값도 그대로 살려서 보여준다. */
export function formatConsultationDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
}
