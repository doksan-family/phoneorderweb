import assert from "node:assert/strict";
import { test } from "node:test";
import { getSwipeDirection } from "./useSwipe.ts";

test("getSwipeDirection", () => {
  // 임계값(40px) 미만은 스와이프로 보지 않는다
  assert.equal(getSwipeDirection(0), null);
  assert.equal(getSwipeDirection(39), null);
  assert.equal(getSwipeDirection(-39), null);
  // 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전
  assert.equal(getSwipeDirection(-40), 1);
  assert.equal(getSwipeDirection(120), -1);
});
