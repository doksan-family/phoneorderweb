export const AUDIT_LOG_ACTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "UPLOAD_IMAGE",
] as const;

export type AuditLogAction = (typeof AUDIT_LOG_ACTIONS)[number];

/** 감사 로그·대시보드가 같은 색으로 작업 종류를 보여준다. */
export const auditActionToneClass: Record<string, string> = {
  CREATE: "bg-emerald-50 text-emerald-700",
  UPDATE: "bg-sky-50 text-sky-700",
  DELETE: "bg-rose-50 text-rose-700",
  UPLOAD_IMAGE: "bg-amber-50 text-amber-700",
};

export function auditActionClass(action: string) {
  return auditActionToneClass[action] ?? "bg-slate-100 text-slate-500";
}

export const AUDIT_LOG_RESOURCE_TYPES = [
  "banner",
  "banner_image",
  "plan",
  "consultation",
  "review",
  "notice",
  "faq",
] as const;

export type AuditLogResourceType = (typeof AUDIT_LOG_RESOURCE_TYPES)[number];

/** GET /functions/v1/admin-audit-logs 응답 항목. 민감한 요청값은 저장되지 않는다. */
export type AdminAuditLog = {
  id: string;
  admin_user_id: string;
  admin_email: string | null;
  action: AuditLogAction;
  resource_type: AuditLogResourceType;
  /** 대상 UUID 또는 이미지 Storage 경로 */
  resource_id: string | null;
  /** 실제 값이 아닌 변경 요청에 포함된 필드 이름 목록 */
  changed_fields: string[];
  /** 개인정보가 없는 경우에만 저장되는 요약. 1차 구현에서는 대부분 null. */
  before_data: Record<string, unknown> | null;
  after_data: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
  /** 한국 시간 "YYYY-MM-DD HH:mm:ss" */
  created_at: string;
};

export type AdminAuditLogPage = {
  items: AdminAuditLog[];
  total: number;
  limit: number;
  offset: number;
};

/** 단건(id 지정)이면 AdminAuditLog, 목록이면 페이지가 온다. */
export type AdminAuditLogApiResponse = {
  ok: boolean;
  data: AdminAuditLog | AdminAuditLogPage;
};
