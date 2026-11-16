/**
 * 形の決まっていない JSON(SNS の API の返り値など)から、予定の時間帯をそれらしく拾い出す。
 *
 * - 開始日時らしいキー(startDatetime, startAt, start ...)を持つオブジェクトを予定とみなす
 * - 終了は、終了日時らしいキー → 「5:00-7:00」のような表示用文字列の後ろの時刻 → 既定の長さ、の順に決める
 * - キャンセル済みらしいもの(isCanceled: true、status に CANCEL を含む など)は除く
 *
 * テニスベア以外の SNS を足すときも、API の返り値をこれに通せばだいたい拾える想定。
 */
import { jstDate, jstToEpoch } from "./time";
import type { Busy } from "./types";

const START_KEYS = /^(start|starts|begin)(_?(date)?_?time|_?datetime|_?at|_?date)?(_?string)?$|^(event_?)?(date_?time|datetime)$/i;
const END_KEYS = /^(end|ends|finish)(_?(date)?_?time|_?datetime|_?at|_?date)?(_?string)?$/i;
const CANCEL_KEYS = /^(is_?)?cancel+ed$|^deleted$|^is_?deleted$/i;
/** 「11/17(火) 5:00-23:59」「19:00〜21:00」のような時間帯の表記 */
const TIME_RANGE = /(\d{1,2}):(\d{2})\s*[-~〜～–]\s*(\d{1,2}):(\d{2})/;

export interface HeuristicOptions {
  /** 終了がわからないときの長さ(ミリ秒) */
  defaultDuration?: number;
}

export function extractBusy(json: unknown, opts: HeuristicOptions = {}): Busy[] {
  const defaultDuration = opts.defaultDuration ?? 2 * 60 * 60 * 1000;
  const found = new Map<string, Busy>();

  const visit = (node: unknown, depth: number) => {
    if (depth > 12 || node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const child of node) visit(child, depth + 1);
      return;
    }
    const obj = node as Record<string, unknown>;
    const busy = toBusy(obj, defaultDuration);
    if (busy !== undefined) {
      // 予定とみなしたオブジェクトの中(会場・主催者など)はもう見ない
      if (busy) found.set(busy.kind === "timed" ? `${busy.start}-${busy.end}` : `${busy.startDate}-${busy.endDate}`, busy);
      return;
    }
    for (const child of Object.values(obj)) visit(child, depth + 1);
  };
  visit(json, 0);
  return [...found.values()];
}

/** 予定でなければ undefined、予定だが載せないもの(キャンセル済みなど)は null */
function toBusy(obj: Record<string, unknown>, defaultDuration: number): Busy | null | undefined {
  const startKey = Object.keys(obj).find((k) => START_KEYS.test(k) && parseDate(obj[k]) !== null);
  if (!startKey) return undefined;
  if (isCanceled(obj)) return null;

  const start = parseDate(obj[startKey])!;
  const raw = obj[startKey];
  // 日付だけ(時刻なし)なら終日の予定
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return { kind: "allDay", startDate: raw, endDate: jstDate(start + 24 * 60 * 60 * 1000) };
  }

  let end: number | null = null;
  const endKey = Object.keys(obj).find((k) => END_KEYS.test(k) && parseDate(obj[k]) !== null);
  if (endKey) end = parseDate(obj[endKey]);
  if (end === null) end = endFromDisplayText(obj, start);
  if (end === null || end <= start) end = start + defaultDuration;
  return { kind: "timed", start, end };
}

function isCanceled(obj: Record<string, unknown>): boolean {
  for (const [k, v] of Object.entries(obj)) {
    if (CANCEL_KEYS.test(k) && v === true) return true;
    if (/status/i.test(k) && typeof v === "string" && /cancel/i.test(v)) return true;
  }
  return false;
}

/** 表示用の文字列(datetimeForDisplay など)に書かれた「開始-終了」から、終了時刻を読む */
function endFromDisplayText(obj: Record<string, unknown>, start: number): number | null {
  // タイトルなどに紛れた時刻より、日時の表示用の項目を先に見る
  const entries = Object.entries(obj).sort(
    ([a], [b]) => Number(/time|display/i.test(b)) - Number(/time|display/i.test(a)),
  );
  for (const [, v] of entries) {
    if (typeof v !== "string") continue;
    const m = v.match(TIME_RANGE);
    if (!m) continue;
    const [y, mo, d] = jstDate(start).split("-").map(Number);
    let end = jstToEpoch(y, mo, d, Number(m[3]), Number(m[4]));
    if (end <= start) end += 24 * 60 * 60 * 1000; // 日をまたぐ
    return end;
  }
  return null;
}

/** ISO 8601 の文字列、または UNIX 時刻(秒・ミリ秒)。タイムゾーンのない文字列は日本時間とみなす */
function parseDate(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) {
    if (v > 1e12 && v < 1e14) return v;
    if (v > 1e9 && v < 1e11) return v * 1000;
    return null;
  }
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return Date.parse(`${s}T00:00:00+09:00`);
  const m = s.match(/^(\d{4})[-/](\d{2})[-/](\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/);
  if (!m) return null;
  if (m[7]) {
    const t = Date.parse(s.replace(" ", "T").replace(/\//g, "-"));
    return Number.isNaN(t) ? null : t;
  }
  return jstToEpoch(+m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] ?? 0));
}
