/** 휴대폰 입력 기본값. 010은 미리 채워 둔다. */
export const PHONE_PREFIX = "010-";

/**
 * 숫자만 남겨 010-1234-5678 형태로 다듬는다.
 * 앞 3자리와 그 다음 4자리 뒤에 하이픈이 붙고, 최대 11자리까지 받는다.
 */
/** 기본값이 "010-"이라 값이 있는지만 봐서는 미입력을 못 걸러낸다. */
export function isPhoneComplete(value: string) {
  return value.replace(/\D/g, "").length === 11;
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
