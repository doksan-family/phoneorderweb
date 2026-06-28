"use client";

import { type FormEvent, useState } from "react";
import { updateAdminBanner } from "@/entities/banner/api/admin";
import { toApiEndAt, toApiStartAt, toDateOnly } from "@/features/admin/model/dateUtils";
import type { AdminBanner } from "@/entities/banner/model/types";

type AdminBannerEditFormProps = {
  banner: AdminBanner;
  onUpdated: (banner: AdminBanner) => void;
  onCancel: () => void;
};

export function AdminBannerEditForm({
  banner,
  onUpdated,
  onCancel,
}: AdminBannerEditFormProps) {
  const [title, setTitle] = useState(banner.title);
  const [linkUrl, setLinkUrl] = useState(banner.link_url ?? "");
  const [ctaLabel, setCtaLabel] = useState(banner.cta_label ?? "");
  const [displayOrder, setDisplayOrder] = useState(banner.display_order);
  const [isActive, setIsActive] = useState(banner.is_active);
  const [startAt, setStartAt] = useState(toDateOnly(banner.start_at));
  const [endAt, setEndAt] = useState(toDateOnly(banner.end_at));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updated = await updateAdminBanner(banner.id, {
        title,
        link_url: linkUrl || null,
        cta_label: ctaLabel || null,
        display_order: displayOrder,
        is_active: isActive,
        start_at: toApiStartAt(startAt),
        end_at: toApiEndAt(endAt),
      });
      onUpdated(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="banner-edit-form" onSubmit={submit}>
      <div className="banner-edit-form__grid">
        <label>
          제목 *
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
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
      <div className="banner-edit-form__actions">
        <button className="button button--primary" type="submit" disabled={loading}>
          {loading ? "저장 중..." : "저장"}
        </button>
        <button className="button button--ghost" type="button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}
