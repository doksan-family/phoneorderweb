import assert from "node:assert/strict";
import { test } from "node:test";
import { getSwipeDirection, resistEdgeDrag } from "./useSwipe.ts";

test("getSwipeDirection", () => {
  // 임계값(40px) 미만은 스와이프로 보지 않는다
  assert.equal(getSwipeDirection(0), null);
  assert.equal(getSwipeDirection(39), null);
  assert.equal(getSwipeDirection(-39), null);
  // 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전
  assert.equal(getSwipeDirection(-40), 1);
  assert.equal(getSwipeDirection(120), -1);
});

test("resistEdgeDrag", () => {
  // 가운데에서는 손가락 이동을 그대로 따라간다
  assert.equal(resistEdgeDrag(90, 1, 3), 90);
  assert.equal(resistEdgeDrag(-90, 1, 3), -90);
  // 첫 장에서 오른쪽, 마지막 장에서 왼쪽으로 끌면 저항이 걸린다
  assert.equal(resistEdgeDrag(90, 0, 3), 30);
  assert.equal(resistEdgeDrag(-90, 2, 3), -30);
  // 넘길 곳이 있는 방향은 저항 없음
  assert.equal(resistEdgeDrag(-90, 0, 3), -90);
});
