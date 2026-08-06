import type {
  AdminPlan,
  AdminPlanCreatePayload,
  CarrierCode,
} from "@/entities/plan/api/admin";
import type { AdminPlanDraft } from "./types";

export { carrierOptions } from "@/entities/plan/model/carriers";

export function createEmptyPlanDraft(carrierCode: CarrierCode = "skt"): AdminPlanDraft {
  return {
    carrierCode,
    name: "",
    monthlyFee: 0,
    descriptionText: "",
    dataAmount: "",
    callTextDescription: "",
    displayOrder: 0,
    isActive: true,
  };
}

export function createPlanDraftFromPlan(plan: AdminPlan): AdminPlanDraft {
  return {
    carrierCode: (plan.carrier_code as CarrierCode) ?? "skt",
    name: plan.name,
    monthlyFee: plan.monthly_fee,
    descriptionText: (plan.description ?? []).join("\n"),
    dataAmount: plan.data_amount ?? "",
    callTextDescription: plan.call_text_description ?? "",
    displayOrder: plan.display_order ?? 0,
    isActive: plan.is_active !== false,
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
