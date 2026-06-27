const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  accessToken?: string
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken ?? ANON_KEY}`,
      apikey: ANON_KEY,
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      typeof body.message === "string" ? body.message : `HTTP ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

export async function apiFetchMultipart<T>(
  path: string,
  body: FormData,
  accessToken?: string
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
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
