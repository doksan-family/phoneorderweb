"use client";

import { useState, type DragEvent } from "react";
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

/**
 * HTML5 네이티브 드래그로 목록 순서를 바꾼다.
 * 핸들을 잡았을 때만 draggable을 켜서 행 안의 버튼 클릭을 막지 않는다.
 * ponytail: 터치 드래그는 지원하지 않는다(모바일 필요해지면 라이브러리 검토).
 */
export function useDragReorder<T>(items: T[], onReorder: (next: T[]) => void) {
  const [fromIndex, setFromIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [isGrabbed, setIsGrabbed] = useState(false);

  function reset() {
    setFromIndex(null);
    setOverIndex(null);
    setIsGrabbed(false);
  }

  function getRowProps(index: number): DragRowProps {
    return {
      draggable: isGrabbed,
      isDragging: fromIndex === index,
      isDropTarget: overIndex === index && fromIndex !== index,
      onHandleGrab: () => setIsGrabbed(true),
      onDragStart: () => setFromIndex(index),
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

  return { getRowProps };
}
