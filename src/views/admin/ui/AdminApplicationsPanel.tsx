"use client";

import type {
  ConsultationRequest,
  ConsultationStatus
} from "@/entities/consultation/model/types";

const statuses: ConsultationStatus[] = ["접수", "상담중", "완료", "보류"];

type AdminApplicationsPanelProps = {
  items: ConsultationRequest[];
  onStatusChange: (id: string, status: ConsultationStatus) => void;
};

export function AdminApplicationsPanel({
  items,
  onStatusChange
}: AdminApplicationsPanelProps) {
  return (
    <section className="border border-slate-200 rounded-xl bg-white p-[22px]">
      <div className="grid gap-2.5">
        {items.map((item) => (
          <article className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center p-[14px] border border-slate-200 rounded-[10px] bg-white max-[900px]:grid-cols-1" key={item.id}>
            <div className="grid gap-1">
              <strong>{item.name}</strong>
              <span className="text-slate-500 text-[0.88rem] leading-[1.65]">{item.phone}</span>
            </div>
            <div className="grid gap-1">
              <strong>{item.productName}</strong>
              <span className="text-slate-500 text-[0.88rem] leading-[1.65]">{new Date(item.createdAt).toLocaleString("ko-KR")}</span>
            </div>
            <select
              className="min-w-[128px]"
              value={item.status}
              onChange={(event) => {
                onStatusChange(item.id, event.target.value as ConsultationStatus);
              }}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
