"use client";

import { type FormEvent, useState } from "react";
import { createAdminBanner } from "@/entities/banner/api/admin";
import {
  oneMonthLaterDateString,
  toApiEndAt,
  toApiStartAt,
  todayDateString,
} from "@/features/admin/model/dateUtils";
import type { AdminBanner, BannerType } from "@/entities/banner/model/types";
import { BannerImageUpload } from "./BannerImageUpload";

type AdminBannerFormProps = {
  onCreated: (banner: AdminBanner) => void;
};

export function AdminBannerForm({ onCreated }: AdminBannerFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<BannerType>("main");
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [startAt, setStartAt] = useState(todayDateString);
  const [endAt, setEndAt] = useState(oneMonthLaterDateString);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError("이미지를 선택해 주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const banner = await createAdminBanner({
        file,
        type,
        title,
        link_url: linkUrl || undefined,
        cta_label: ctaLabel || undefined,
        display_order: displayOrder,
        is_active: isActive,
        start_at: toApiStartAt(startAt) ?? undefined,
        end_at: toApiEndAt(endAt) ?? undefined,
      });
      onCreated(banner);
      setFile(null);
      setTitle("");
      setLinkUrl("");
      setCtaLabel("");
      setDisplayOrder(0);
      setIsActive(true);
      setStartAt(todayDateString());
      setEndAt(oneMonthLaterDateString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-5 border border-slate-200 rounded-2xl p-8 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)]" onSubmit={submit}>
      <h3>배너 등록</h3>
      <BannerImageUpload file={file} onChange={setFile} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label className="grid gap-2 font-bold">
          타입 *
          <select value={type} onChange={(e) => setType(e.target.value as BannerType)}>
            <option value="main">메인 (main)</option>
            <option value="event">이벤트 (event)</option>
          </select>
        </label>
        <label className="grid gap-2 font-bold">
          정렬 순서
          <input
            type="number"
            min={0}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
          />
        </label>
      </div>
      <label className="grid gap-2 font-bold">
        제목 *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label className="grid gap-2 font-bold">
          링크 URL
          <input
            type="text"
            placeholder="https://... 또는 /products"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </label>
        <label className="grid gap-2 font-bold">
          CTA 라벨
          <input
            placeholder="자세히 보기"
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
          />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label className="grid gap-2 font-bold">
          노출 시작
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </label>
        <label className="grid gap-2 font-bold">
          노출 종료
          <input
            type="date"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
        </label>
      </div>
      <label className="flex items-center gap-2 font-medium" style={{ flexDirection: "row" }}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-[18px] min-w-[18px]"
        />
        활성화
      </label>
      {error && <p className="m-0 text-red-600 text-sm font-bold">{error}</p>}
      <button
        className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900"
        type="submit"
        disabled={loading}
      >
        {loading ? "등록 중..." : "배너 등록"}
      </button>
    </form>
  );
}
