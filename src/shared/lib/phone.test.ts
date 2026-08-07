import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPhone, isPhoneComplete, toPhoneDigits } from "./phone.ts";

test("formatPhone", () => {
  assert.equal(formatPhone("01012345678"), "010-1234-5678");
  assert.equal(formatPhone("010"), "010-");
  assert.equal(formatPhone("0101234"), "010-1234");
  // 이미 하이픈이 있어도, 숫자가 아닌 문자가 섞여도 같은 결과
  assert.equal(formatPhone("010-1234-5678"), "010-1234-5678");
  assert.equal(formatPhone("010abc12345678999"), "010-1234-5678");
  // 지우는 중에도 형식이 유지된다
  assert.equal(formatPhone("010-1234-"), "010-1234");
  // "010-" 접두사는 지워지지 않는다
  assert.equal(formatPhone(""), "010-");
  assert.equal(formatPhone("01"), "010-");
  assert.equal(formatPhone("010-123"), "010-123");
});

test("isPhoneComplete", () => {
  assert.equal(isPhoneComplete("010-1234-5678"), true);
  assert.equal(isPhoneComplete("010-"), false);
  assert.equal(isPhoneComplete("010-1234-567"), false);
});

test("toPhoneDigits", () => {
  assert.equal(toPhoneDigits("010-1234-5678"), "01012345678");
  assert.equal(toPhoneDigits("010 1234 5678"), "01012345678");
  assert.equal(toPhoneDigits("010-"), "010");
});
