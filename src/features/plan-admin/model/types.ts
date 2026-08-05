import type { CarrierCode } from "@/entities/plan/api/admin";

export type AdminPlanDraft = {
  carrierCode: CarrierCode;
  name: string;
  monthlyFee: number;
  descriptionText: string;
  dataAmount: string;
  callTextDescription: string;
  displayOrder: number;
  isActive: boolean;
};
