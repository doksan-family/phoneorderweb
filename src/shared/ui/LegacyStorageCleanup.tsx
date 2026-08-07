"use client";

import { useEffect } from "react";

/**
 * 상담 신청이 API로 넘어가기 전에는 신청 내역을 브라우저에 그대로 저장했다.
 * 이름·연락처·조회 비밀번호가 평문으로 남아 있으므로 방문할 때 한 번 걷어낸다.
 */
const LEGACY_KEYS = ["phone-order-consultations"];

export function LegacyStorageCleanup() {
  useEffect(() => {
    LEGACY_KEYS.forEach((key) => window.localStorage.removeItem(key));
  }, []);

  return null;
}
