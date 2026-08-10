"use client";

import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { lookupConsultations } from "@/entities/consultation/api/public";
import { ApplicationLookupResult } from "./ApplicationLookupResult";
import {
  PHONE_PREFIX,
  formatPhone,
  isPhoneComplete,
  toPhoneDigits,
} from "@/shared/lib/phone";

export function ApplicationLookup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [password, setPassword] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [error, setError] = useState("");
  const resultSectionRef = useRef<HTMLElement>(null);

  // 404는 "일치 내역 없음"이라 빈 목록으로 다룬다.
  const lookupMutation = useMutation({
    mutationFn: lookupConsultations,
    onError: (cause: Error) => setError(cause.message),
  });
  const results = lookupMutation.isSuccess ? lookupMutation.data : null;

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const shouldScroll = lookupMutation.isSuccess || (isMobile && lookupMutation.isPending);
    if (!shouldScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    resultSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [lookupMutation.isPending, lookupMutation.isSuccess]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !isPhoneComplete(phone) || !password) {
      setError("이름, 휴대폰 번호, 비밀번호를 입력해 주세요.");
      return;
    }

    if (!privacyAgreed) {
      setError("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }

    lookupMutation.mutate({
      name: name.trim(),
      phone: toPhoneDigits(phone),
      password,
      privacy_agreed: true,
    });
  }

  return (
    <div className="grid grid-cols-[0.8fr_1.2fr] gap-6 items-start max-[900px]:grid-cols-1">
      <form className="grid gap-5 border border-slate-200 rounded-2xl p-8 bg-white shadow-[0_2px_8px_rgba(21,24,15,0.08)]" onSubmit={submitForm}>
        <label className="grid gap-2 font-bold">
          신청자 이름
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="grid gap-2 font-bold">
          휴대폰 번호
          <input
            inputMode="numeric"
            maxLength={13}
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
          />
        </label>
        <label className="grid gap-2 font-bold">
          신청 시 등록한 비밀번호
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label className="flex gap-2.5 items-start text-slate-500 font-medium">
          <input
            type="checkbox"
            checked={privacyAgreed}
            onChange={(event) => setPrivacyAgreed(event.target.checked)}
            className="w-[18px] min-w-[18px] mt-[3px]"
          />
          신청 내역 조회를 위한 개인정보 이용에 동의합니다.
        </label>
        {error ? <p className="m-0 text-red-600 text-sm font-bold">{error}</p> : null}
        <button
          className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] font-bold text-[0.95rem] transition-all bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] hover:bg-[var(--brand-cta-hover)]"
          disabled={lookupMutation.isPending}
          type="submit"
        >
          {lookupMutation.isPending ? (
            <>
              <span
                aria-hidden
                className="mr-2 size-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
              />
              조회 중...
            </>
          ) : (
            "신청 내역 조회"
          )}
        </button>
      </form>
      <section
        className="relative scroll-mt-24 border border-slate-200 rounded-xl bg-white min-h-[320px] p-6"
        ref={resultSectionRef}
      >
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">조회 결과</h2>
        {results === null && !lookupMutation.isPending ? <p className="text-slate-500 text-[0.88rem] leading-[1.65]">신청 정보를 입력하면 내역이 표시됩니다.</p> : null}
        {results?.length === 0 ? <p className="text-slate-500 text-[0.88rem] leading-[1.65]">일치하는 신청 내역이 없습니다.</p> : null}
        {results?.map((item) => (
          <ApplicationLookupResult item={item} key={item.id} />
        ))}
        {lookupMutation.isPending ? (
          <div
            aria-busy="true"
            aria-live="polite"
            className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-white/80 backdrop-blur-sm"
            role="status"
          >
            <div className="grid justify-items-center gap-3 text-center">
              <span className="size-11 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--brand-primary-strong)]" />
              <p className="m-0 text-sm font-bold text-slate-700">
                신청 내역을 확인하고 있습니다.
              </p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
