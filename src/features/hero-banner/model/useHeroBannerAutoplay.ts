"use client";

import { useEffect } from "react";

type UseHeroBannerAutoplayParams = {
  enabled: boolean;
  delayMs: number;
  onTick: () => void;
};

export function useHeroBannerAutoplay({
  enabled,
  delayMs,
  onTick,
}: UseHeroBannerAutoplayParams) {
  useEffect(() => {
    if (!enabled) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeoutId: number | null = null;

    function clearAutoplay() {
      if (timeoutId === null) return;
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }

    function canAutoplay() {
      return document.visibilityState === "visible" && !motionQuery.matches;
    }

    function scheduleAutoplay() {
      clearAutoplay();
      if (!canAutoplay()) return;

      timeoutId = window.setTimeout(() => {
        onTick();
        scheduleAutoplay();
      }, delayMs);
    }

    scheduleAutoplay();
    document.addEventListener("visibilitychange", scheduleAutoplay);
    motionQuery.addEventListener("change", scheduleAutoplay);

    return () => {
      clearAutoplay();
      document.removeEventListener("visibilitychange", scheduleAutoplay);
      motionQuery.removeEventListener("change", scheduleAutoplay);
    };
  }, [delayMs, enabled, onTick]);
}
