"use client";

import { type FormEvent, useState } from "react";
import { updateAdminBanner } from "@/entities/banner/api/admin";
import { toApiEndAt, toApiStartAt, toDateOnly } from "@/features/admin/model/dateUtils";
import type { AdminBanner } from "@/entities/banner/model/types";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";

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
  const [showDateRange, setShowDateRange] = useState(!!(banner.start_at || banner.end_at));
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
        start_at: showDateRange ? toApiStartAt(startAt) : null,
        end_at: showDateRange ? toApiEndAt(endAt) : null,
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
      className="grid gap-3 p-4 px-5 bg-white border-l-[3px] border-[var(--brand-primary-strong)] rounded-[0_8px_8px_0] mb-1"
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
      </div>

      <div className="grid gap-2">
        {showDateRange ? (
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-2.5">
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
            <button
              type="button"
              className="text-left text-sm text-slate-400 hover:text-slate-600 transition"
              onClick={() => { setShowDateRange(false); setStartAt(""); setEndAt(""); }}
            >
              기간 설정 해제
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="m-0 text-sm text-slate-500">설정하지 않으면 무제한으로 보여집니다.</p>
            <button
              type="button"
              className="shrink-0 text-sm font-bold text-slate-800 underline decoration-[var(--brand-primary-strong)] decoration-2 underline-offset-4 transition hover:text-slate-950"
              onClick={() => setShowDateRange(true)}
            >
              노출기간 설정하기
            </button>
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 font-medium">
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
          className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] hover:bg-[var(--brand-cta-hover)]"
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
      {loading ? <LoadingOverlay /> : null}
    </form>
  );
}
