const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  accessToken?: string,
  timeoutMs = 10_000
): Promise<T> {
  assertAdminAccessToken(path, accessToken);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken ?? ANON_KEY}`,
      apikey: ANON_KEY,
      ...init?.headers,
    },
  }).finally(() => clearTimeout(timer));

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      typeof body.message === "string" ? body.message : `HTTP ${res.status}`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

/** 호출부가 상태 코드로 분기할 수 있게 status를 실어 보낸다. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetchMultipart<T>(
  path: string,
  body: FormData,
  accessToken?: string,
  method: "POST" | "PATCH" = "POST"
): Promise<T> {
  assertAdminAccessToken(path, accessToken);
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    body,
    headers: {
      Authorization: `Bearer ${accessToken ?? ANON_KEY}`,
      apikey: ANON_KEY,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err.message === "string" ? err.message : `HTTP ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

function assertAdminAccessToken(path: string, accessToken?: string) {
  if (path.startsWith("/functions/v1/admin-") && !accessToken) {
    throw new ApiError("관리자 로그인이 필요합니다.", 401);
  }
}
