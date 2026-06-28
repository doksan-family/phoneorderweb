"use client";

import { FormEvent, useState } from "react";
import { faqs, notices, reviews } from "@/entities/content/model/mock-content";

type ContentItem = {
  id: string;
  title: string;
  body: string;
  type: "후기" | "공지" | "FAQ";
  visible: boolean;
};

const initialItems: ContentItem[] = [
  ...reviews.map((item) => ({ id: item.id, title: item.title, body: item.content, type: "후기" as const, visible: item.visible })),
  ...notices.map((item) => ({ id: item.id, title: item.title, body: item.content, type: "공지" as const, visible: item.visible })),
  ...faqs.map((item) => ({ id: item.id, title: item.question, body: item.answer, type: "FAQ" as const, visible: item.visible }))
];

const btnPrimary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900";
const btnSecondary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-slate-200 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-white text-blue-900 hover:border-blue-700 hover:text-blue-700";
const btnGhost =
  "inline-flex items-center justify-center min-h-[48px] border-0 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-transparent text-red-600";

export function AdminContentPanel() {
  const [items, setItems] = useState(initialItems);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContentItem["type"]>("후기");

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      return;
    }

    setItems((current) => [
      { id: `content-${Date.now()}`, title, body: "관리자 등록 콘텐츠입니다.", type, visible: true },
      ...current
    ]);
    setTitle("");
  }

  return (
    <section className="border border-slate-200 rounded-xl bg-white p-[22px]">
      <div className="mb-7">
        <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">Content</p>
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">후기, 공지사항, FAQ 관리</h2>
      </div>
      <form
        className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-2.5 mb-[18px] max-[900px]:grid-cols-1"
        onSubmit={addItem}
      >
        <select value={type} onChange={(event) => setType(event.target.value as ContentItem["type"])}>
          <option value="후기">구매후기</option>
          <option value="공지">공지사항</option>
          <option value="FAQ">FAQ</option>
        </select>
        <input placeholder="제목 또는 질문" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input aria-label="이미지 업로드" type="file" />
        <button className={btnPrimary} type="submit">콘텐츠 등록</button>
      </form>
      <div className="grid gap-2.5">
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
    </section>
  );
}

function toggleVisible(items: ContentItem[], id: string) {
  return items.map((item) => {
    return item.id === id ? { ...item, visible: !item.visible } : item;
  });
}
