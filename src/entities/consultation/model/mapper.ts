import type {
  ConsultationApiResponse,
  ConsultationListPage,
  ConsultationListWrapper,
  ConsultationQuoteSnapshot,
  ConsultationResponseItem,
} from "../api/types";
import type {
  ConsultationQuote,
  ConsultationRequest,
  ConsultationStatus,
} from "./types";

const statusCodes: ConsultationStatus[] = [
  "pending",
  "contacted",
  "consulting",
  "completed",
  "cancelled",
];

/** 목록/단건/`{ ok, data }` 래핑을 모두 배열로 펴 준다. */
export function extractConsultations(
  response: ConsultationApiResponse
): ConsultationResponseItem[] {
  if (Array.isArray(response)) return response;
  if (!isWrapper(response)) return [response];

  const { data, items, consultations } = response;
  if (Array.isArray(data)) return data;
  if (items) return items;
  if (consultations) return consultations;
  if (!data) return [];

  const nested = findNestedItems(data);
  if (nested) return nested;
  return isConsultationItem(data) && !("items" in data) ? [data] : [];
}

/** `data` 안에 items·consultations처럼 이름이 다른 배열이 들어오는 응답도 편다. */
function findNestedItems(
  data: ConsultationResponseItem | ConsultationListPage
): ConsultationResponseItem[] | null {
  for (const value of Object.values(data)) {
    if (Array.isArray(value) && value.every(isConsultationItem)) return value;
  }

  return null;
}

function isConsultationItem(
  value: unknown
): value is ConsultationResponseItem {
  return typeof value === "object" && value !== null;
}

function isWrapper(
  response: ConsultationResponseItem | ConsultationListWrapper
): response is ConsultationListWrapper {
  return "data" in response || "items" in response || "consultations" in response;
}

export function mapConsultations(
  response: ConsultationApiResponse
): ConsultationRequest[] {
  return extractConsultations(response)
    .map(mapConsultation)
    .filter((item): item is ConsultationRequest => item !== null);
}

function mapConsultation(
  item: ConsultationResponseItem
): ConsultationRequest | null {
  // 공개 조회 API는 UUID 없이 신청 번호만 내려줄 수 있다.
  const id = item.id ?? item.application_number;
  if (!id) return null;
  const snapshot = item.quote_snapshot ?? undefined;

  return {
    id,
    applicationNumber: item.application_number,
    name: item.name ?? "",
    phone: item.phone ?? "",
    productId: snapshot?.product_id ?? item.product_id ?? "",
    productName: snapshot?.product_name ?? item.product_name ?? "상품 미지정",
    conditions: formatSnapshotConditions(snapshot),
    adminMemo: item.admin_memo ?? undefined,
    privacyAgreed: item.privacy_agreed ?? true,
    marketingAgreed: item.marketing_agreed ?? false,
    createdAt: item.created_at ?? "",
    status: toStatus(item.status),
    quote: mapQuote(snapshot),
  };
}

/** 신청 당시 스냅샷을 관리자 목록 한 줄 요약으로 만든다. */
function formatSnapshotConditions(snapshot?: ConsultationQuoteSnapshot) {
  // 요약 한 줄에서는 숫자만 있으면 뜻이 안 통하는 할부만 라벨을 붙인다.
  const parts = toConditionRows(snapshot).map((row) =>
    row.label === "할부" ? `할부 ${row.value}` : row.value
  );
  return parts.length ? parts.join(" · ") : undefined;
}

/** 조회 화면에서 표로 보여줄 조건 목록. 값이 없는 항목은 빼고 담는다. */
function toConditionRows(snapshot?: ConsultationQuoteSnapshot) {
  if (!snapshot) return [];

  return [
    { label: "색상", value: snapshot.color_label },
    { label: "용량", value: snapshot.storage_value },
    { label: "통신사", value: snapshot.carrier_name },
    { label: "가입 유형", value: snapshot.subscription_type_label },
    { label: "요금제", value: snapshot.plan_name },
    { label: "할인 방식", value: snapshot.discount_type_label },
    {
      label: "할부",
      value: snapshot.installment_months
        ? `${snapshot.installment_months}개월`
        : null,
    },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

function mapQuote(snapshot?: ConsultationQuoteSnapshot): ConsultationQuote | undefined {
  if (!snapshot) return undefined;

  return {
    conditions: toConditionRows(snapshot),
    monthlyPayment: snapshot.estimated_monthly_payment ?? undefined,
    monthlyDevicePayment: snapshot.monthly_device_payment ?? undefined,
    planMonthlyFee: snapshot.discounted_plan_monthly_fee ?? undefined,
    totalBenefit: snapshot.total_benefit_amount ?? undefined,
  };
}

function toStatus(value?: string): ConsultationStatus {
  return statusCodes.find((status) => status === value) ?? "pending";
}
