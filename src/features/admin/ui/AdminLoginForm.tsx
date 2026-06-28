"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/features/admin/model/auth";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAdmin(email, password);

    if (!result.success) {
      setError(result.error ?? "로그인에 실패했습니다.");
      setLoading(false);
      return;
    }

    router.push("/po-console");
    router.refresh();
  }

  return (
    <form
      className="grid gap-5 border border-slate-200 rounded-2xl p-8 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)] max-w-[480px] mx-auto"
      onSubmit={submitForm}
    >
      <label className="grid gap-2 font-bold">
        관리자 이메일
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-2 font-bold">
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? <p className="m-0 text-red-600 text-sm font-bold">{error}</p> : null}
      <button
        className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900"
        type="submit"
        disabled={loading}
      >
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
