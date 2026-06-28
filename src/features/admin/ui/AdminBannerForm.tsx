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
    <form className="form-card" onSubmit={submit}>
      <h3>배너 등록</h3>
      <BannerImageUpload file={file} onChange={setFile} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label>
          타입 *
          <select value={type} onChange={(e) => setType(e.target.value as BannerType)}>
            <option value="main">메인 (main)</option>
            <option value="event">이벤트 (event)</option>
          </select>
        </label>
        <label>
          정렬 순서
          <input
            type="number"
            min={0}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
          />
        </label>
      </div>
      <label>
        제목 *
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label>
          링크 URL
          <input
            type="text"
            placeholder="https://... 또는 /products"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </label>
        <label>
          CTA 라벨
          <input
            placeholder="자세히 보기"
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
          />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label>
          노출 시작
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </label>
        <label>
          노출 종료
          <input
            type="date"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
        </label>
      </div>
      <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        활성화
      </label>
      {error && <p className="form-card__error">{error}</p>}
      <button className="button button--primary" type="submit" disabled={loading}>
        {loading ? "등록 중..." : "배너 등록"}
      </button>
    </form>
  );
}
