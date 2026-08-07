"use client";

import { useState } from "react";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { IconDeleteButton } from "@/shared/ui/IconDeleteButton";
import { VisibilityToggle } from "@/shared/ui/VisibilityToggle";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import type {
  AdminContentItem,
  AdminContentType,
} from "../model/adminContent";
import { contentTypeLabel, initialContentItems } from "../model/adminContent";
import { ContentCreateModal } from "./ContentCreateModal";

type AdminContentPanelProps = {
  type: AdminContentType;
};

export function AdminContentPanel({ type }: AdminContentPanelProps) {
  const [items, setItems] = useState(initialContentItems);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const label = contentTypeLabel[type];
  const visibleItems = items.filter((item) => item.type === type);

  function addItem(title: string) {
    setItems((current) => [
      {
        id: `content-${Date.now()}`,
        title,
        body: "관리자 등록 콘텐츠입니다.",
        type,
        visible: true,
      },
      ...current
    ]);
  }

  return (
    <section className={adminFullPanelWithFabClass}>
      <div className="mb-7">
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">{label} 관리</h2>
      </div>
      <div className="grid gap-2.5">
        {!visibleItems.length ? (
          <AdminEmptyState message={`등록된 ${label}이(가) 없습니다.`} />
        ) : null}
        {visibleItems.map((item) => (
          <article className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 items-center p-[14px] border border-slate-200 rounded-[10px] bg-white" key={item.id}>
            <div className="grid gap-1">
              <strong>{item.title}</strong>
              <span className="text-slate-500 text-[0.88rem] leading-[1.65]">{item.body}</span>
            </div>
            <VisibilityToggle
              active={item.visible}
              label={`${item.title} 노출`}
              onChange={() => setItems(toggleVisible(items, item.id))}
            />
            <IconDeleteButton
              label={`${label} 삭제`}
              targetName={item.title}
              onClick={() =>
                setItems(items.filter((content) => content.id !== item.id))
              }
            />
          </article>
        ))}
      </div>
      <FloatingActionButton
        label={`${label} 등록`}
        onClick={() => setIsCreateOpen(true)}
      />
      {isCreateOpen ? (
        <ContentCreateModal
          type={type}
          onClose={() => setIsCreateOpen(false)}
          onCreate={addItem}
        />
      ) : null}
    </section>
  );
}

function toggleVisible(items: AdminContentItem[], id: string) {
  return items.map((item) => {
    return item.id === id ? { ...item, visible: !item.visible } : item;
  });
}
