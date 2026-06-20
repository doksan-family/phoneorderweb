"use client";

import { FormEvent, useState } from "react";
import { findStoredConsultations } from "@/entities/consultation/model/storage";
import type { ConsultationRequest } from "@/entities/consultation/model/types";

export function ApplicationLookup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [results, setResults] = useState<ConsultationRequest[] | null>(null);
  const [error, setError] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !phone || !password) {
      setError("이름, 휴대폰 번호, 비밀번호를 입력해 주세요.");
      return;
    }

    if (!privacyAgreed) {
      setError("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }

    setResults(findStoredConsultations(name, phone, password));
  }

  return (
    <div className="lookup-grid">
      <form className="form-card" onSubmit={submitForm}>
        <label>
          신청자 이름
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          휴대폰 번호
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          신청 시 등록한 비밀번호
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label className="check-row">
          <input type="checkbox" checked={privacyAgreed} onChange={(event) => setPrivacyAgreed(event.target.checked)} />
          신청 내역 조회를 위한 개인정보 이용에 동의합니다.
        </label>
        {error ? <p className="form-card__error">{error}</p> : null}
        <button className="button button--primary" type="submit">신청 내역 조회</button>
      </form>
      <section className="result-panel">
        <h2>조회 결과</h2>
        {results === null ? <p>신청 정보를 입력하면 내역이 표시됩니다.</p> : null}
        {results?.length === 0 ? <p>일치하는 신청 내역이 없습니다.</p> : null}
        {results?.map((item) => (
          <article className="result-item" key={item.id}>
            <strong>{item.productName}</strong>
            <span>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</span>
            <span>{item.status}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
