import type { ConsultationStatus } from "@/entities/consultation/model/types";

export const statusOptions: ConsultationStatus[] = [
  "접수",
  "상담중",
  "완료",
  "보류",
];

export type StatusFilter = ConsultationStatus | "전체";

export const statusFilters: StatusFilter[] = ["전체", ...statusOptions];

export const statusToneClass: Record<ConsultationStatus, string> = {
  접수: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]",
  상담중: "bg-amber-50 text-amber-700",
  완료: "bg-slate-100 text-slate-500",
  보류: "bg-red-50 text-red-600",
};

export function formatConsultationDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
}
