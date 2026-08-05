"use client";

import { type FormEvent, useState } from "react";
import { createAdminBanner } from "@/entities/banner/api/admin";
import { toApiEndAt, toApiStartAt } from "@/features/admin/model/dateUtils";
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
  const [showDateRange, setShowDateRange] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
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
        start_at: showDateRange ? (toApiStartAt(startAt) ?? undefined) : undefined,
        end_at: showDateRange ? (toApiEndAt(endAt) ?? undefined) : undefined,
      });
      onCreated(banner);
      setFile(null);
      setTitle("");
      setLinkUrl("");
      setCtaLabel("");
      setDisplayOrder(0);
      setIsActive(true);
      setShowDateRange(false);
      setStartAt("");
      setEndAt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-5 border border-slate-200 rounded-2xl p-8 bg-white shadow-[0_2px_8px_rgba(21,24,15,0.08)]" onSubmit={submit}>
      <h3>배너 등록</h3>
      <BannerImageUpload file={file} onChange={setFile} />
      <div className="grid grid-cols-2 gap-2.5">
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
      <div className="grid grid-cols-2 gap-2.5">
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

      <div className="grid gap-2.5">
        {showDateRange ? (
          <div className="grid gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
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
      <button
        className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-[var(--brand-primary)] text-slate-950 shadow-[0_2px_8px_var(--brand-primary-shadow)] hover:bg-[var(--brand-primary-hover)]"
        type="submit"
        disabled={loading}
      >
        {loading ? "등록 중..." : "배너 등록"}
      </button>
    </form>
  );
}
