"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminAccount, loginAdmin } from "@/features/admin/model/auth";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(adminAccount.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!loginAdmin(email, password)) {
      setError("관리자 계정 정보를 확인해 주세요.");
      return;
    }

    router.push("/admin");
  }

  return (
    <form className="form-card form-card--narrow" onSubmit={submitForm}>
      <label>
        관리자 이메일
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <p className="form-card__note">개발용 계정 1개: {adminAccount.email}</p>
      {error ? <p className="form-card__error">{error}</p> : null}
      <button className="button button--primary" type="submit">
        로그인
      </button>
    </form>
  );
}
