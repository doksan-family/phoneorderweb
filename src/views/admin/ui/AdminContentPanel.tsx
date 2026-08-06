"use client";

import { useState } from "react";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import type {
  AdminContentCreateInput,
  AdminContentItem,
} from "../model/adminContent";
import { initialContentItems } from "../model/adminContent";
import { ContentCreateModal } from "./ContentCreateModal";

const btnSecondary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-slate-200 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-white text-slate-700 hover:bg-[var(--brand-primary-soft)] hover:text-slate-950";
const btnGhost =
  "inline-flex items-center justify-center min-h-[48px] border-0 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-transparent text-red-600";

export function AdminContentPanel() {
  const [items, setItems] = useState(initialContentItems);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  function addItem(input: AdminContentCreateInput) {
    setItems((current) => [
      {
        id: `content-${Date.now()}`,
        title: input.title,
        body: "관리자 등록 콘텐츠입니다.",
        type: input.type,
        visible: true,
      },
      ...current
    ]);
  }

  return (
    <section className={adminFullPanelWithFabClass}>
      <div className="mb-7">
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">후기, 공지사항, FAQ 관리</h2>
      </div>
      <div className="grid gap-2.5">
        {!items.length ? (
          <AdminEmptyState message="등록된 콘텐츠가 없습니다." />
        ) : null}
        {items.map((item) => (
          <article className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center p-[14px] border border-slate-200 rounded-[10px] bg-white max-[900px]:grid-cols-1" key={item.id}>
            <div className="grid gap-1">
              <strong>{item.title}</strong>
              <span className="text-slate-500 text-[0.88rem] leading-[1.65]">{item.type} · {item.body}</span>
            </div>
            <button className={btnSecondary} onClick={() => setItems(toggleVisible(items, item.id))} type="button">
              {item.visible ? "노출 중" : "숨김"}
            </button>
            <button className={btnGhost} onClick={() => setItems(items.filter((content) => content.id !== item.id))} type="button">
              삭제
            </button>
          </article>
        ))}
      </div>
      <FloatingActionButton
        label="콘텐츠 등록"
        onClick={() => setIsCreateOpen(true)}
      />
      {isCreateOpen ? (
        <ContentCreateModal
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
