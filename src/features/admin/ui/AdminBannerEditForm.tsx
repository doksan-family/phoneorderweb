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
    <form
      className="grid gap-3 p-4 px-5 bg-white border-l-[3px] border-blue-700 rounded-[0_8px_8px_0] mb-1"
      onSubmit={submit}
    >
      <div className="grid grid-cols-[1fr_1fr] gap-2.5">
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
          제목 *
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
          정렬 순서
          <input
            type="number"
            min={0}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
          />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
          링크 URL
          <input
            type="text"
            placeholder="https://... 또는 /products"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
          CTA 라벨
          <input
            placeholder="자세히 보기"
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
          노출 시작
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-[0.85rem] font-bold">
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
      <div className="flex gap-2">
        <button
          className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900"
          type="submit"
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장"}
        </button>
        <button
          className="inline-flex items-center justify-center min-h-[48px] border-0 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-transparent text-red-600"
          type="button"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </form>
  );
}
