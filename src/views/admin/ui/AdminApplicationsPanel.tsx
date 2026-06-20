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
    <section className="admin-panel">
      <div className="section__header">
        <p className="eyebrow">Consultation</p>
        <h2>상담 신청 관리</h2>
      </div>
      <div className="admin-table">
        {items.map((item) => (
          <article className="admin-row" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.phone}</span>
            </div>
            <div>
              <strong>{item.productName}</strong>
              <span>{new Date(item.createdAt).toLocaleString("ko-KR")}</span>
            </div>
            <select
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
