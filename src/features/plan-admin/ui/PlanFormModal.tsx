"use client";

import type { AdminPlan, CarrierCode } from "@/entities/plan/api/admin";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { PlanForm } from "./PlanForm";

type PlanFormModalProps = {
  plan?: AdminPlan;
  carrierCode?: CarrierCode;
  onClose: () => void;
};

export function PlanFormModal({ plan, carrierCode, onClose }: PlanFormModalProps) {
  return (
    <AdminCreateDialog
      title={plan ? "요금제 수정" : "요금제 등록"}
      widthClassName="w-[min(760px,100%)]"
      onClose={onClose}
    >
      <PlanForm carrierCode={carrierCode} plan={plan} onCancel={onClose} onSaved={onClose} />
    </AdminCreateDialog>
  );
}
