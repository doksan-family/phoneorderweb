const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** 호출부가 상태 코드로 분기할 수 있게 status를 실어 보낸다. status 0은 네트워크·타임아웃. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/** 응답 body에서 message를 꺼내고, 없으면 상태 코드에 맞는 한국어 기본 문구를 만든다. */
async function toResponseError(res: Response): Promise<ApiError> {
  const body = await res.json().catch(() => ({}));
  const message =
    typeof body?.message === "string" && body.message
      ? body.message
      : defaultMessageForStatus(res.status);
  return new ApiError(message, res.status);
}

function defaultMessageForStatus(status: number): string {
  if (status === 401) return "로그인이 필요합니다.";
  if (status === 403) return "권한이 없습니다.";
  if (status === 404) return "요청한 정보를 찾을 수 없습니다.";
  if (status === 429) return "요청이 많아 잠시 후 다시 시도해 주세요.";
  if (status >= 500) return "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  return `요청을 처리하지 못했습니다. (${status})`;
}

/** fetch 자체가 실패(네트워크 끊김·타임아웃)한 경우를 ApiError로 정규화한다. */
function toNetworkError(cause: unknown): ApiError {
  if (cause instanceof ApiError) return cause;
  const aborted =
    cause instanceof DOMException && cause.name === "AbortError";
  return new ApiError(
    aborted
      ? "요청 시간이 초과되었습니다. 네트워크 상태를 확인해 주세요."
      : "네트워크 오류가 발생했습니다. 연결 상태를 확인해 주세요.",
    0
  );
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  accessToken?: string,
  timeoutMs = 10_000
): Promise<T> {
  assertAdminAccessToken(path, accessToken);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken ?? ANON_KEY}`,
        apikey: ANON_KEY,
        ...init?.headers,
      },
    });
  } catch (cause) {
    throw toNetworkError(cause);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw await toResponseError(res);

  return res.json() as Promise<T>;
}

export async function apiFetchMultipart<T>(
  path: string,
  body: FormData,
  accessToken?: string,
  method: "POST" | "PATCH" = "POST"
): Promise<T> {
  assertAdminAccessToken(path, accessToken);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${accessToken ?? ANON_KEY}`,
        apikey: ANON_KEY,
      },
    });
  } catch (cause) {
    throw toNetworkError(cause);
  }

  if (!res.ok) throw await toResponseError(res);

  return res.json() as Promise<T>;
}

function assertAdminAccessToken(path: string, accessToken?: string) {
  if (path.startsWith("/functions/v1/admin-") && !accessToken) {
    throw new ApiError("관리자 로그인이 필요합니다.", 401);
  }
}
