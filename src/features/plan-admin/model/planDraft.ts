import type { AdminPlanCreatePayload, CarrierCode } from "@/entities/plan/api/admin";
import type { AdminPlanDraft } from "./types";

export const carrierOptions: { label: string; value: CarrierCode }[] = [
  { label: "SKT", value: "skt" },
  { label: "KT", value: "kt" },
  { label: "LG U+", value: "lguplus" },
];

export function createEmptyPlanDraft(): AdminPlanDraft {
  return {
    carrierCode: "skt",
    name: "",
    monthlyFee: 0,
    descriptionText: "",
    dataAmount: "",
    callTextDescription: "",
    displayOrder: 0,
    isActive: true,
  };
}

export function createPlanPayload(draft: AdminPlanDraft): AdminPlanCreatePayload {
  return {
    carrier_code: draft.carrierCode,
    name: draft.name.trim(),
    monthly_fee: draft.monthlyFee,
    description: splitDescription(draft.descriptionText),
    data_amount: draft.dataAmount.trim(),
    call_text_description: draft.callTextDescription.trim(),
    display_order: draft.displayOrder,
    is_active: draft.isActive,
  };
}

function splitDescription(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
