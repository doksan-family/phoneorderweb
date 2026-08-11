import assert from "node:assert/strict";
import { test } from "node:test";
import { moveItem } from "./dragReorder.ts";

test("moveItem은 아래로 옮길 때 사이 항목을 앞으로 당긴다", () => {
  assert.deepEqual(moveItem(["a", "b", "c", "d"], 0, 2), ["b", "c", "a", "d"]);
});

test("moveItem은 위로 옮길 때 사이 항목을 뒤로 민다", () => {
  assert.deepEqual(moveItem(["a", "b", "c", "d"], 3, 1), ["a", "d", "b", "c"]);
});

test("moveItem은 같은 위치나 범위 밖이면 원본을 그대로 준다", () => {
  const items = ["a", "b"];
  assert.equal(moveItem(items, 1, 1), items);
  assert.equal(moveItem(items, 0, 5), items);
  assert.equal(moveItem(items, -1, 0), items);
});
