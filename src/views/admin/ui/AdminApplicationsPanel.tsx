"use client";

import { useMemo, useState } from "react";
import type { ConsultationUpdatePayload } from "@/entities/consultation/api/admin";
import type { ConsultationRequest } from "@/entities/consultation/model/types";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { adminFullPanelClass } from "@/shared/ui/adminPanelStyles";
import { AdminApplicationDetailModal } from "./AdminApplicationDetailModal";
import { AdminApplicationFilters } from "./AdminApplicationFilters";
import { AdminApplicationRow } from "./AdminApplicationRow";
import type { StatusFilter } from "./adminApplicationStatus";

type AdminApplicationsPanelProps = {
  items: ConsultationRequest[];
  isPending?: boolean;
  error?: Error | null;
  isSaving?: boolean;
  onUpdate: (id: string, payload: ConsultationUpdatePayload) => void;
};

export function AdminApplicationsPanel({
  items,
  isPending,
  error,
  isSaving,
  onUpdate,
}: AdminApplicationsPanelProps) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState("");

  // 최근 신청이 위로 오게 두고, 검색어와 상태로 좁힌다.
  const visibleItems = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return [...items]
      .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
      .filter((item) => status === "all" || item.status === status)
      .filter((item) => !search || matchesKeyword(item, search));
  }, [items, keyword, status]);

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <section className={`grid content-start gap-4 ${adminFullPanelClass}`}>
      <AdminApplicationFilters
        items={items}
        keyword={keyword}
        status={status}
        onKeywordChange={setKeyword}
        onStatusChange={setStatus}
      />

      <div className="grid gap-2.5">
        {isPending ? <SkeletonRows count={4} withThumbnail={false} /> : null}
        {!isPending && !visibleItems.length ? (
          <AdminEmptyState
            message={
              error
                ? `상담 신청을 불러오지 못했습니다. (${error.message})`
                : items.length
                  ? "조건에 맞는 상담 신청이 없습니다."
                  : "등록된 상담 신청이 없습니다."
            }
          />
        ) : null}
        {visibleItems.map((item) => (
          <AdminApplicationRow
            item={item}
            key={item.id}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      {selectedItem ? (
        <AdminApplicationDetailModal
          isSaving={isSaving}
          item={selectedItem}
          onClose={() => setSelectedId("")}
          onUpdate={onUpdate}
        />
      ) : null}
    </section>
  );
}

function matchesKeyword(item: ConsultationRequest, search: string) {
  return [
    item.name,
    item.phone,
    item.productName,
    item.conditions ?? "",
    item.applicationNumber ?? "",
  ]
    .join(" ")
    .toLowerCase()
    .includes(search);
}
