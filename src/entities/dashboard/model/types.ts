import type { ConsultationStatus } from "@/entities/consultation/model/types";

/** 대시보드 카드에 표시할 핵심 건수 */
export type AdminDashboardSummary = {
  consultations_today: number;
  consultations_month: number;
  products_active: number;
  products_inactive: number;
  reviews_published: number;
  reviews_unpublished: number;
  notices_published: number;
  notices_unpublished: number;
  faqs_published: number;
  faqs_unpublished: number;
};

export type DashboardConsultationStatusCount = {
  status: ConsultationStatus;
  status_label: string;
  count: number;
};

/** 최근 접수순 최대 10건 */
export type DashboardRecentConsultation = {
  id: string;
  application_number: string;
  name: string;
  phone: string;
  product_id: string | null;
  product_name: string | null;
  status: ConsultationStatus;
  /** 한국 시간 "YYYY-MM-DD HH:mm" */
  created_at: string;
};

/** 접수가 없는 날짜도 count 0으로 온다. */
export type DashboardDailyConsultation = {
  /** "YYYY-MM-DD" */
  date: string;
  count: number;
};

export type DashboardTopProduct = {
  product_id: string;
  product_name: string | null;
  consultation_count: number;
};

/** 최근 관리자 변경 작업 최대 10건 */
export type DashboardRecentAdminAction = {
  id: string;
  admin_user_id: string;
  admin_email: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  changed_fields: string[];
  /** 한국 시간 "YYYY-MM-DD HH:mm:ss" */
  created_at: string;
};

export type AdminDashboardData = {
  /** 한국 시간 기준 통계 생성 시각 */
  generated_at: string;
  /** 일별 추이와 인기 상품 계산에 쓴 기간 */
  period_days: number;
  summary: AdminDashboardSummary;
  consultation_status_counts: DashboardConsultationStatusCount[];
  recent_consultations: DashboardRecentConsultation[];
  daily_consultations: DashboardDailyConsultation[];
  top_products: DashboardTopProduct[];
  recent_admin_actions: DashboardRecentAdminAction[];
};

export type AdminDashboardApiResponse = {
  ok: boolean;
  data: AdminDashboardData;
};
