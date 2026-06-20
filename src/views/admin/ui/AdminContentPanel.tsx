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
    <section className="admin-panel">
      <div className="section__header">
        <p className="eyebrow">Content</p>
        <h2>후기, 공지사항, FAQ 관리</h2>
      </div>
      <form className="admin-form" onSubmit={addItem}>
        <select value={type} onChange={(event) => setType(event.target.value as ContentItem["type"])}>
          <option value="후기">구매후기</option>
          <option value="공지">공지사항</option>
          <option value="FAQ">FAQ</option>
        </select>
        <input placeholder="제목 또는 질문" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input aria-label="이미지 업로드" type="file" />
        <button className="button button--primary" type="submit">콘텐츠 등록</button>
      </form>
      <div className="admin-table">
        {items.map((item) => (
          <article className="admin-row" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.type} · {item.body}</span>
            </div>
            <button className="button button--secondary" onClick={() => setItems(toggleVisible(items, item.id))} type="button">
              {item.visible ? "노출 중" : "숨김"}
            </button>
            <button className="button button--ghost" onClick={() => setItems(items.filter((content) => content.id !== item.id))} type="button">
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
