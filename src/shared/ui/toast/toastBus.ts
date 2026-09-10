export type ToastTone = "error" | "success" | "info";

export type ToastItem = {
  id: string;
  message: string;
  tone: ToastTone;
};

type Listener = () => void;

let items: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

/** 현재 토스트 목록. 변경될 때만 새 배열이 되어 useSyncExternalStore에 안전하다. */
export function getToasts(): ToastItem[] {
  return items;
}

/** 컴포넌트 밖(예: react-query 캐시 핸들러)에서도 호출할 수 있는 토스트 발행기. */
export function pushToast(message: string, tone: ToastTone = "info"): void {
  const id = Math.random().toString(36).slice(2);
  items = [...items, { id, message, tone }].slice(-3);
  emit();
  setTimeout(() => dismissToast(id), 4000);
}

export function dismissToast(id: string): void {
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return;
  items = next;
  emit();
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
