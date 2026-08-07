/** 휴대폰 입력 기본값. 010은 미리 채워 둔다. */
export const PHONE_PREFIX = "010-";

/** 기본값이 "010-"이라 값이 있는지만 봐서는 미입력을 못 걸러낸다. */
export function isPhoneComplete(value: string) {
  return value.replace(/\D/g, "").length === 11;
}

/** API로 보낼 때는 하이픈을 뺀 숫자만 쓴다(서버 저장 형태와 동일). */
export function toPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * 숫자만 남겨 010-1234-5678 형태로 다듬는다.
 * "010-" 접두사는 지워도 항상 다시 붙고, 뒤로 8자리까지 받는다.
 */
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  // "0", "01"처럼 접두사를 지우다 만 값은 뒷자리가 없는 것으로 본다.
  const body = digits.startsWith("010") ? digits.slice(3) : "010".startsWith(digits) ? "" : digits;
  const rest = body.slice(0, 8);
  if (rest.length <= 4) return `${PHONE_PREFIX}${rest}`;
  return `${PHONE_PREFIX}${rest.slice(0, 4)}-${rest.slice(4)}`;
}
