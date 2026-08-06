"use client";

import { createPortal } from "react-dom";

type LoadingOverlayProps = {
  label?: string;
};

/** 저장처럼 화면 전체를 잠그는 작업에 쓴다. 모달 위(z-600)에 덮인다. */
export function LoadingOverlay({ label = "저장 중입니다" }: LoadingOverlayProps) {
  const portalTarget = typeof document === "undefined" ? null : document.body;
  if (!portalTarget) return null;

  return createPortal(
    <div
      aria-busy="true"
      aria-live="assertive"
      className="fixed inset-0 z-[600] grid place-items-center bg-slate-950/45 backdrop-blur-[2px]"
      role="status"
    >
      <div className="grid justify-items-center gap-4">
        <span className="size-16 animate-spin rounded-full border-4 border-white/25 border-t-[var(--brand-primary)]" />
        <span className="text-sm font-extrabold text-white">{label}</span>
      </div>
    </div>,
    portalTarget
  );
}
