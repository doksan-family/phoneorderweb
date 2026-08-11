"use client";

import { GripVertical } from "lucide-react";

type DragHandleProps = {
  /** 스크린리더용 대상 이름. "{label} 순서 이동"으로 읽힌다. */
  label: string;
  onGrab: () => void;
};

/** 잡는 동안에만 부모 행의 draggable을 켜는 손잡이. */
export function DragHandle({ label, onGrab }: DragHandleProps) {
  return (
    <button
      aria-label={`${label} 순서 이동`}
      className="shrink-0 cursor-grab border-0 bg-transparent p-0 text-slate-400 active:cursor-grabbing"
      type="button"
      // 행 전체가 클릭 가능한 화면에서 손잡이 클릭이 수정 모달을 열지 않게 막는다
      onClick={(event) => event.stopPropagation()}
      onMouseDown={onGrab}
    >
      <GripVertical aria-hidden size={18} />
    </button>
  );
}
