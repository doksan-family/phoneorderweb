"use client";

import type {
  ConsultationRequest,
  ConsultationStatus,
} from "@/entities/consultation/model/types";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import {
  formatConsultationDateTime,
  statusOptions,
  statusToneClass,
} from "./adminApplicationStatus";

type AdminApplicationDetailModalProps = {
  item: ConsultationRequest;
  onClose: () => void;
  onStatusChange: (id: string, status: ConsultationStatus) => void;
};

export function AdminApplicationDetailModal({
  item,
  onClose,
  onStatusChange,
}: AdminApplicationDetailModalProps) {
  return (
    <AdminCreateDialog
      title="상담 신청 상세"
      widthClassName="w-[min(640px,100%)]"
      onClose={onClose}
    >
      <div className="grid gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="grid gap-1">
            <strong className="text-lg text-slate-950">{item.name}</strong>
            <a
              className="w-fit text-sm font-bold text-slate-700 underline-offset-4 hover:underline"
              href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
            >
              {item.phone}
            </a>
          </div>
          <span
            className={`brand-pill px-2.5 py-1 text-[0.75rem] ${statusToneClass[item.status]}`}
          >
            {item.status}
          </span>
        </div>

        <dl className="m-0 grid gap-2.5 rounded-xl bg-slate-50 p-4">
          <Row label="문의 상품" value={item.productName} />
          <Row label="선택 조건" value={item.conditions ?? "—"} />
          <Row label="신청 일시" value={formatConsultationDateTime(item.createdAt)} />
          <Row
            label="마케팅 수신"
            value={item.marketingAgreed ? "동의" : "미동의"}
          />
          <Row
            label="개인정보 수집"
            value={item.privacyAgreed ? "동의" : "미동의"}
          />
          <Row label="신청 번호" value={item.id} />
        </dl>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          상담 상태
          <select
            value={item.status}
            onChange={(event) =>
              onStatusChange(item.id, event.target.value as ConsultationStatus)
            }
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </AdminCreateDialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-baseline gap-3">
      <dt className="text-[0.8rem] text-slate-500">{label}</dt>
      <dd className="m-0 break-all text-[0.88rem] font-bold text-slate-950">
        {value}
      </dd>
    </div>
  );
}
