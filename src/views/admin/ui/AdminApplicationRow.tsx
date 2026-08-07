import type { ConsultationRequest } from "@/entities/consultation/model/types";
import {
  formatConsultationDateTime,
  statusLabel,
  statusToneClass,
} from "./adminApplicationStatus";

type AdminApplicationRowProps = {
  item: ConsultationRequest;
  onSelect: (id: string) => void;
};

export function AdminApplicationRow({
  item,
  onSelect,
}: AdminApplicationRowProps) {
  return (
    <article
      className="grid cursor-pointer grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-3.5 transition hover:bg-[var(--brand-primary-soft)] max-[900px]:grid-cols-1"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item.id);
        }
      }}
    >
      <div className="grid min-w-0 gap-1">
        <div className="flex items-center gap-2">
          <strong className="truncate">{item.name}</strong>
          <span
            className={`brand-pill shrink-0 px-2 py-0.5 text-[0.72rem] ${statusToneClass[item.status]}`}
          >
            {statusLabel[item.status]}
          </span>
        </div>
        <a
          className="w-fit text-[0.88rem] font-bold text-slate-700 underline-offset-4 hover:underline"
          href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
          onClick={(event) => event.stopPropagation()}
        >
          {item.phone}
        </a>
      </div>

      <div className="grid min-w-0 gap-1">
        <strong className="truncate">{item.productName}</strong>
        {item.conditions ? (
          <span className="truncate text-[0.82rem] leading-[1.6] text-slate-500">
            {item.conditions}
          </span>
        ) : null}
        <span className="text-[0.8rem] text-slate-400">
          {formatConsultationDateTime(item.createdAt)}
        </span>
      </div>

    </article>
  );
}
