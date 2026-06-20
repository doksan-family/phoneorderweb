import type { ConsultationInput, ConsultationRequest } from "./types";

const STORAGE_KEY = "phone-order-consultations";

export function getStoredConsultations(): ConsultationRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return seedConsultations();
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed as ConsultationRequest[];
    }
    return seedConsultations();
  } catch {
    return seedConsultations();
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

function seedConsultations(): ConsultationRequest[] {
  return [
    {
      id: "sample-consultation",
      name: "홍길동",
      phone: "010-1234-5678",
      productId: "aurora-pro",
      productName: "오로라 Pro 256GB",
      password: "1234",
      privacyAgreed: true,
      marketingAgreed: false,
      createdAt: "2026-06-18T09:00:00.000Z",
      status: "접수"
    }
  ];
}

function createId() {
  if (window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `consultation-${Date.now()}`;
}
