import {
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { ApiError } from "@/shared/api/client";
import { reportError } from "@/shared/lib/reportError";
import { pushToast } from "@/shared/ui/toast/toastBus";

const isServer = typeof window === "undefined";

/** 4xx(요청 자체가 잘못됨)는 재시도하지 않고, 그 외 일시적 오류만 최대 2회 재시도한다. */
function shouldRetry(failureCount: number, error: unknown): boolean {
  if (isServer) return false;
  if (failureCount >= 2) return false;
  if (
    error instanceof ApiError &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return false;
  }
  return true;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: shouldRetry,
      },
      mutations: {
        retry: false,
      },
    },
    // 화면에 이미 데이터가 있는데 백그라운드 갱신이 실패한 경우만 조용히 알린다.
    queryCache: new QueryCache({
      onError: (error, query) => {
        reportError(error, `query:${String(query.queryKey[0] ?? "")}`);
        if (query.state.data !== undefined && !isServer) {
          pushToast("최신 정보를 불러오지 못했습니다.", "error");
        }
      },
    }),
    mutationCache: new MutationCache({
      // 자체 onError로 인라인 처리하는 mutation은 토스트를 띄우지 않는다(중복 방지).
      onError: (error, _variables, _context, mutation) => {
        reportError(error, "mutation");
        if (!isServer && !mutation.options.onError) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : "요청을 처리하지 못했습니다.";
          pushToast(message, "error");
        }
      },
    }),
  });
}
