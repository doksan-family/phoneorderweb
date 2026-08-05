"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type AdminCreateDialogProps = {
  children: ReactNode;
  title: string;
  widthClassName?: string;
  onClose: () => void;
};

export function AdminCreateDialog({
  children,
  title,
  widthClassName = "w-[min(920px,100%)]",
  onClose,
}: AdminCreateDialogProps) {
  const portalTarget = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!portalTarget) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[500] grid cursor-pointer place-items-center bg-slate-950/55 p-5"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-label={title}
        aria-modal="true"
        className={`grid max-h-[calc(100vh_-_40px)] ${widthClassName} cursor-default grid-rows-[auto_1fr] overflow-hidden rounded-xl bg-white shadow-[0_24px_80px_rgba(21,24,15,0.32)]`}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <h2 className="m-0 text-xl font-black text-slate-950">{title}</h2>
          <button
            aria-label={`${title} 닫기`}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            type="button"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </header>
        <div className="overflow-y-auto p-5">{children}</div>
      </section>
    </div>,
    portalTarget
  );
}
