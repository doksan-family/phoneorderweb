"use client";

import { useRef, useState, type TouchEvent } from "react";

const SWIPE_THRESHOLD_PX = 40;
/** 첫/마지막에서 더 끌 때 남기는 저항. 값이 클수록 덜 끌린다. */
const EDGE_RESISTANCE = 3;

export type SwipeDirection = 1 | -1;

/** 이동 거리가 임계값을 넘으면 방향(다음 1 / 이전 -1), 아니면 null */
export function getSwipeDirection(deltaX: number): SwipeDirection | null {
  if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return null;
  return deltaX < 0 ? 1 : -1;
}

/** 더 넘길 곳이 없는 방향으로 끌면 저항을 줘서 조금만 따라오게 한다. */
export function resistEdgeDrag(
  deltaX: number,
  index: number,
  count: number
): number {
  const atStart = index === 0 && deltaX > 0;
  const atEnd = index >= count - 1 && deltaX < 0;
  return atStart || atEnd ? deltaX / EDGE_RESISTANCE : deltaX;
}

/** 손가락을 따라 끌리는 스와이프. 놓으면 방향을 알려주고 오프셋을 0으로 되돌린다. */
export function useSwipe(onSwipe: (direction: SwipeDirection) => void) {
  const startX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  return {
    dragX,
    isDragging,
    handlers: {
      onTouchStart: (event: TouchEvent) => {
        startX.current = event.touches[0].clientX;
        setIsDragging(true);
        setDragX(0);
      },
      onTouchMove: (event: TouchEvent) => {
        setDragX(event.touches[0].clientX - startX.current);
      },
      onTouchEnd: (event: TouchEvent) => {
        const direction = getSwipeDirection(
          event.changedTouches[0].clientX - startX.current
        );
        setIsDragging(false);
        setDragX(0);
        if (direction) onSwipe(direction);
      },
    },
  };
}
