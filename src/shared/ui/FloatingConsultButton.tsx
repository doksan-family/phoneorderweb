"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_BOTTOM = 28;
const FOOTER_GAP = 16;

/** 떠 있는 상담 버튼. 푸터를 만나면 겹치지 않고 그 위에 멈춘다. */
export function FloatingConsultButton() {
  const [bottom, setBottom] = useState(BASE_BOTTOM);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    let frame = 0;

    function update() {
      frame = 0;
      const footerTop = footer!.getBoundingClientRect().top;
      const overlap = window.innerHeight - footerTop;
      setBottom(overlap > 0 ? overlap + FOOTER_GAP : BASE_BOTTOM);
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed right-5 z-[200] flex flex-col items-end gap-2.5 max-[900px]:right-3"
      role="complementary"
      aria-label="빠른 상담"
      style={{ bottom }}
    >
      <a
        className="brand-pill h-[46px] gap-2 bg-[var(--kakao)] px-5 text-[0.85rem] font-extrabold text-[var(--kakao-label)] shadow-[0_10px_28px_rgba(21,24,15,0.28)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(21,24,15,0.38)]"
        href="/consultation"
      >
        <MessageCircle size={18} aria-hidden="true" />
        <span className="max-[560px]:hidden">카카오 상담</span>
      </a>
    </div>
  );
}
