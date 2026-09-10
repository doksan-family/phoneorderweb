"use client";

import { useSyncExternalStore } from "react";
import {
  dismissToast,
  getToasts,
  subscribeToasts,
  type ToastItem,
} from "./toastBus";

const toneClass: Record<ToastItem["tone"], string> = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-slate-200 bg-white text-slate-700",
};

const EMPTY: ToastItem[] = [];

/** 화면 우하단에 쌓이는 토스트. layout에서 한 번만 마운트한다. */
export function Toaster() {
  const items = useSyncExternalStore(subscribeToasts, getToasts, () => EMPTY);

  if (!items.length) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[600] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-2">
      {items.map((item) => (
        <div
          className={`pointer-events-auto flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-[0.85rem] font-semibold shadow-[0_10px_30px_rgba(21,24,15,0.14)] ${toneClass[item.tone]}`}
          key={item.id}
          role="status"
        >
          <span className="min-w-0 break-words">{item.message}</span>
          <button
            aria-label="닫기"
            className="shrink-0 opacity-60 transition hover:opacity-100"
            type="button"
            onClick={() => dismissToast(item.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
