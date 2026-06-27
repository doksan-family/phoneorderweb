export function todayDateString(): string {
  return new Date().toLocaleDateString("sv"); // YYYY-MM-DD
}

export function oneMonthLaterDateString(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("sv");
}

export function toApiStartAt(date: string): string | null {
  return date ? `${date} 00:00` : null;
}

export function toApiEndAt(date: string): string | null {
  return date ? `${date} 23:59` : null;
}

export function toDateOnly(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10); // "YYYY-MM-DD HH:mm" → "YYYY-MM-DD"
}
