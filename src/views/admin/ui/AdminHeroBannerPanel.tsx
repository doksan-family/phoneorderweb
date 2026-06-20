"use client";

import { type FormEvent, useState } from "react";
import { heroBanners } from "@/entities/content/model/mock-content";
import type { HeroBanner } from "@/entities/content/model/types";

const BG_PRESETS = [
  "linear-gradient(130deg, #eff6ff 0%, #dbeafe 100%)",
  "linear-gradient(130deg, #f0fdf4 0%, #dcfce7 100%)",
  "linear-gradient(130deg, #fefce8 0%, #fef9c3 100%)",
  "linear-gradient(130deg, #fdf4ff 0%, #f3e8ff 100%)"
];

export function AdminHeroBannerPanel() {
  const [banners, setBanners] = useState<HeroBanner[]>(heroBanners);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  function addBanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title) return;
    const next: HeroBanner = {
      id: `hero-${Date.now()}`,
      title,
      subtitle,
      bgColor: BG_PRESETS[banners.length % BG_PRESETS.length],
      visible: true,
      order: banners.length + 1
    };
    setBanners((prev) => [...prev, next]);
    setTitle("");
    setSubtitle("");
  }

  return (
    <section className="admin-panel">
      <div className="section__header">
        <p className="eyebrow">Hero Banner</p>
        <h2>홈 배너 관리</h2>
      </div>
      <form
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 18 }}
        onSubmit={addBanner}
      >
        <input
          placeholder="배너 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="부제목 (선택)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <button className="button button--primary" type="submit">
          배너 추가
        </button>
      </form>
      <div className="admin-table">
        {banners.map((banner) => (
          <article className="admin-row" key={banner.id}>
            <div>
              <strong>{banner.title}</strong>
              <span>{banner.subtitle || "부제목 없음"}</span>
            </div>
            <button
              className="button button--secondary"
              type="button"
              onClick={() =>
                setBanners((prev) =>
                  prev.map((b) => b.id === banner.id ? { ...b, visible: !b.visible } : b)
                )
              }
            >
              {banner.visible ? "노출 중" : "숨김"}
            </button>
            <button
              className="button button--ghost"
              type="button"
              onClick={() => setBanners((prev) => prev.filter((b) => b.id !== banner.id))}
            >
              삭제
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
