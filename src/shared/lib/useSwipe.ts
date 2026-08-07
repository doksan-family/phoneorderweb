"use client";

import { useRef, type TouchEvent } from "react";

const SWIPE_THRESHOLD_PX = 40;

export type SwipeDirection = 1 | -1;

/** 이동 거리가 임계값을 넘으면 방향(다음 1 / 이전 -1), 아니면 null */
export function getSwipeDirection(deltaX: number): SwipeDirection | null {
  if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return null;
  return deltaX < 0 ? 1 : -1;
}

/** 터치 스와이프를 감지해 방향을 전달하는 핸들러를 반환한다. */
export function useSwipe(onSwipe: (direction: SwipeDirection) => void) {
  const startX = useRef(0);

  return {
    onTouchStart: (event: TouchEvent) => {
      startX.current = event.touches[0].clientX;
    },
    onTouchEnd: (event: TouchEvent) => {
      const direction = getSwipeDirection(
        event.changedTouches[0].clientX - startX.current,
      );
      if (direction) onSwipe(direction);
    },
  };
}
