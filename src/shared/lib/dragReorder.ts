/** from 위치의 항목을 to 위치로 옮긴 새 배열을 만든다. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0) return items;
  if (from >= items.length || to >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);

  return next;
}
