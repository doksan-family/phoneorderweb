import type { ConsultationInput, ConsultationRequest } from "./types";

const STORAGE_KEY = "phone-order-consultations";
const SAMPLE_ID = "sample-consultation";

export function getStoredConsultations(): ConsultationRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) return [];

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];

    // 예전 목데이터가 브라우저에 남아 있으면 걷어낸다.
    const items = (parsed as ConsultationRequest[]).filter(
      (item) => item.id !== SAMPLE_ID
    );
    if (items.length !== parsed.length) saveStoredConsultations(items);

    return items;
  } catch {
    return [];
  }
}

export function saveStoredConsultations(items: ConsultationRequest[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addStoredConsultation(input: ConsultationInput) {
  const nextItem: ConsultationRequest = {
    ...input,
    id: createId(),
    createdAt: new Date().toISOString(),
    status: "접수"
  };

  const items = [nextItem, ...getStoredConsultations()];
  saveStoredConsultations(items);

  return nextItem;
}

export function findStoredConsultations(
  name: string,
  phone: string,
  password: string
) {
  return getStoredConsultations().filter((item) => {
    return item.name === name && item.phone === phone && item.password === password;
  });
}

function createId() {
  if (window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `consultation-${Date.now()}`;
}
