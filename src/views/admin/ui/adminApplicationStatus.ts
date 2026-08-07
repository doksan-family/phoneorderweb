import {
  statusLabel,
  statusOptions,
} from "@/entities/consultation/model/status";
import type { ConsultationStatus } from "@/entities/consultation/model/types";

export {
  formatConsultationDateTime,
  statusLabel,
  statusOptions,
  statusToneClass,
} from "@/entities/consultation/model/status";

export type StatusFilter = ConsultationStatus | "all";

export const statusFilters: StatusFilter[] = ["all", ...statusOptions];

export const filterLabel: Record<StatusFilter, string> = {
  all: "전체",
  ...statusLabel,
};
