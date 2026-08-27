"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <main
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            padding: "24px",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "grid", gap: 12, maxWidth: 420, justifyItems: "center" }}>
            <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900 }}>
              문제가 발생했습니다
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>
              잠시 후 다시 시도해 주세요.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 8,
                minHeight: 48,
                padding: "0 22px",
                borderRadius: 10,
                border: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                background: "#5f8f14",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              다시 시도
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
