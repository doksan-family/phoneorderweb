"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminCreateDialog } from "./AdminCreateDialog";

type IconDeleteButtonProps = {
  /** 스크린리더용 설명이자 확인 다이얼로그 제목. 예: "배너 삭제" */
  label: string;
  /** 무엇을 지우는지 알려주는 한 줄. 예: 배너 제목 */
  targetName?: string;
  disabled?: boolean;
  onClick: () => void;
};

const btnDanger =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-transparent bg-red-600 px-5 text-sm font-extrabold text-white transition hover:bg-red-700";
const btnCancel =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50";

/** 목록 행에서 쓰는 휴지통 삭제 버튼. 확인 다이얼로그를 거쳐야 실행된다. */
export function IconDeleteButton({
  label,
  targetName,
  disabled,
  onClick,
}: IconDeleteButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <button
        className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={disabled}
        title={label}
        type="button"
        onClick={() => setIsConfirmOpen(true)}
      >
        <Trash2 aria-hidden="true" size={17} />
        <span className="sr-only">{label}</span>
      </button>
      {isConfirmOpen ? (
        <AdminCreateDialog
          title={label}
          widthClassName="w-[min(420px,100%)]"
          onClose={() => setIsConfirmOpen(false)}
        >
          <div className="grid gap-5">
            <p className="m-0 text-[0.92rem] leading-[1.7] text-slate-700">
              {targetName ? (
                <>
                  <strong className="text-slate-950">{targetName}</strong>
                  {"을(를) 삭제할까요? 되돌릴 수 없습니다."}
                </>
              ) : (
                "삭제하면 되돌릴 수 없습니다. 진행할까요?"
              )}
            </p>
            <div className="flex justify-end gap-2 max-[560px]:grid">
              <button
                className={btnCancel}
                type="button"
                onClick={() => setIsConfirmOpen(false)}
              >
                취소
              </button>
              <button
                className={btnDanger}
                type="button"
                onClick={() => {
                  setIsConfirmOpen(false);
                  onClick();
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </AdminCreateDialog>
      ) : null}
    </>
  );
}
