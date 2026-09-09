"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { moveItem } from "./dragReorder";

export type DragRowProps = {
  draggable: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  onHandleGrab: () => void;
  onDragStart: () => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: () => void;
  onDragEnd: () => void;
};

type DragReorderOptions = {
  /** 무한 스크롤: 아래로 끌면 다음 페이지를 불러온다. */
  hasMore?: boolean;
  onLoadMore?: () => void;
};

const EDGE = 72;
const MAX_SPEED = 20;
const LOAD_COOLDOWN_MS = 600;

/** 컨테이너에서 위로 올라가며 실제로 스크롤되는 요소를 찾는다. */
function resolveScrollEl(start: HTMLElement | null): HTMLElement | null {
  let el: HTMLElement | null = start;
  while (el && el !== document.body) {
    const overflowY = getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return (document.scrollingElement as HTMLElement | null) ?? null;
}

/**
 * HTML5 네이티브 드래그로 목록 순서를 바꾼다.
 * 핸들을 잡았을 때만 draggable을 켜서 행 안의 버튼 클릭을 막지 않는다.
 * 드래그 중 컨테이너 위/아래 가장자리에 가까워지면 자동 스크롤하고,
 * 아래 끝에서는 다음 페이지를 불러온다(무한 스크롤과 함께 쓸 때).
 * ponytail: 터치 드래그는 지원하지 않는다(모바일 필요해지면 라이브러리 검토).
 */
export function useDragReorder<T>(
  items: T[],
  onReorder: (next: T[]) => void,
  options: DragReorderOptions = {}
) {
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [isGrabbed, setIsGrabbed] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const velocityRef = useRef(0);
  const frameRef = useRef(0);
  const lastLoadRef = useRef(0);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  function stopAutoScroll() {
    velocityRef.current = 0;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  }

  function reset() {
    setFromIndex(null);
    setOverIndex(null);
    setIsGrabbed(false);
    stopAutoScroll();
  }

  // 드래그가 끝나지 않은 채 언마운트되는 경우 rAF 정리
  useEffect(() => stopAutoScroll, []);

  function tick() {
    const el = scrollElRef.current;
    if (el && velocityRef.current !== 0) {
      el.scrollTop += velocityRef.current;
    }
    frameRef.current = requestAnimationFrame(tick);
  }

  function startAutoScroll() {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(tick);
  }

  function handleContainerDragOver(event: DragEvent<HTMLElement>) {
    if (fromIndex === null) return;
    event.preventDefault();

    const el = scrollElRef.current ?? containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = event.clientY;
    const fromTop = y - rect.top;
    const fromBottom = rect.bottom - y;

    if (fromTop < EDGE) {
      velocityRef.current = -MAX_SPEED * Math.min(1, (EDGE - fromTop) / EDGE);
    } else if (fromBottom < EDGE) {
      velocityRef.current = MAX_SPEED * Math.min(1, (EDGE - fromBottom) / EDGE);
    } else {
      velocityRef.current = 0;
    }
    startAutoScroll();

    const nearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE * 2;
    if (
      fromBottom < EDGE &&
      nearBottom &&
      optionsRef.current.hasMore &&
      Date.now() - lastLoadRef.current > LOAD_COOLDOWN_MS
    ) {
      lastLoadRef.current = Date.now();
      optionsRef.current.onLoadMore?.();
    }
  }

  const registerContainer = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);

  function getRowProps(index: number): DragRowProps {
    return {
      draggable: isGrabbed,
      isDragging: fromIndex === index,
      isDropTarget: overIndex === index && fromIndex !== index,
      onHandleGrab: () => setIsGrabbed(true),
      onDragStart: () => {
        scrollElRef.current = resolveScrollEl(containerRef.current);
        setFromIndex(index);
      },
      onDragOver: (event) => {
        if (fromIndex === null) return;
        event.preventDefault();
        setOverIndex(index);
      },
      onDrop: () => {
        if (fromIndex !== null) {
          const next = moveItem(items, fromIndex, index);
          if (next !== items) onReorder(next);
        }
        reset();
      },
      onDragEnd: reset,
    };
  }

  return {
    getRowProps,
    registerContainer,
    onContainerDragOver: handleContainerDragOver,
  };
}
