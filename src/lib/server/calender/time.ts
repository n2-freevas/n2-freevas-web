/**
 * 日本時間(UTC+9、夏時間なし)の日付計算。サーバーの TZ に左右されないよう、すべて UTC で計算して 9 時間ずらす。
 */
export const JST_OFFSET = 9 * 60 * 60 * 1000;
export const DAY = 24 * 60 * 60 * 1000;

/** エポックミリ秒 → 日本時間の "YYYY-MM-DD" */
export function jstDate(ms: number): string {
  return new Date(ms + JST_OFFSET).toISOString().slice(0, 10);
}

/** 日本時間の "YYYY-MM-DD" の 0:00 → エポックミリ秒 */
export function jstMidnight(date: string): number {
  return Date.parse(`${date}T00:00:00Z`) - JST_OFFSET;
}

/** 日本時間の年月日時分 → エポックミリ秒 */
export function jstToEpoch(y: number, mo: number, d: number, h = 0, mi = 0, s = 0): number {
  return Date.UTC(y, mo - 1, d, h, mi, s) - JST_OFFSET;
}

/** "YYYY-MM-DD" に日数を足す */
export function addDays(date: string, days: number): string {
  return jstDate(jstMidnight(date) + days * DAY);
}

/** その日を含む週の日曜日(日本時間) */
export function weekStartOf(date: string): string {
  const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
  return addDays(date, -dow);
}
