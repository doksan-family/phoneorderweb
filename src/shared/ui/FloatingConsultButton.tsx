"use client";

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
        className="brand-pill h-[46px] gap-2 border border-white/40 bg-[var(--kakao)] px-5 text-[0.85rem] font-extrabold text-[var(--kakao-label)] shadow-[0_10px_28px_rgba(21,24,15,0.28)] backdrop-blur-md backdrop-saturate-150 transition-[background-color,box-shadow] supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--kakao)_72%,transparent)] hover:shadow-[0_14px_34px_rgba(21,24,15,0.34)] supports-[backdrop-filter]:hover:bg-[color-mix(in_srgb,var(--kakao)_88%,transparent)]"
        href="/consultation"
      >
        {/* 노란 배경까지 들어간 이미지 대신 말풍선만. 색은 버튼 글자색을 따른다. */}
        <svg
          aria-hidden="true"
          fill="currentColor"
          height={24}
          viewBox="0 0 24 24"
          width={24}
        >
          <path d="M12 3C6.5 3 2 6.48 2 10.78c0 2.79 1.86 5.23 4.65 6.6-.2.72-.74 2.68-.85 3.1-.13.52.19.51.4.37.17-.11 2.63-1.79 3.7-2.52.68.1 1.38.15 2.1.15 5.5 0 10-3.48 10-7.7C22 6.48 17.5 3 12 3Z" />
        </svg>
        <span className="max-[560px]:hidden">카카오 상담</span>
      </a>
    </div>
  );
}
