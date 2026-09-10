/**
 * 앱 전역 오류 신고 창구. 지금은 콘솔에만 남기지만
 * 나중에 Sentry 등 외부 서비스를 여기 한 곳에서 붙인다.
 */
export function reportError(error: unknown, context?: string): void {
  const label = context ? `[${context}]` : "[app]";
  if (error instanceof Error) {
    console.error(label, error.name, error.message, error);
  } else {
    console.error(label, error);
  }
  // TODO: 외부 로깅 서비스 연동
}
