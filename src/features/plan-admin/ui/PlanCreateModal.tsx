"use client";

import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { PlanCreateForm } from "./PlanCreateForm";

type PlanCreateModalProps = {
  onClose: () => void;
};

export function PlanCreateModal({ onClose }: PlanCreateModalProps) {
  return (
    <AdminCreateDialog
      title="요금제 등록"
      widthClassName="w-[min(760px,100%)]"
      onClose={onClose}
    >
      <PlanCreateForm onCancel={onClose} onCreated={onClose} />
    </AdminCreateDialog>
  );
}
