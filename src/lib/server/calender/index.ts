/**
 * /calender に載せる「埋まっている時間」を、設定されたすべての取得元から集めてスナップショットにする。
 *
 * - 集めるのは cron(/api/cron/calender、毎朝 1 回)だけ。ページを開いたときには取得元に問い合わせない。
 * - スナップショットには時間帯しか入れない。予定の中身はサーバーの外に出さない。
 * - 重なっている・接している時間帯はまとめてしまうので、予定がいくつあるかもわからない。
 */
import { CALENDER_ICS_URLS, CALENDER_TENNISBEAR_TOKEN } from "$app/env/private";
import { icsSource } from "./ics";
import { tennisBearSource } from "./tennisbear";
import { addDays, DAY, jstDate, jstMidnight, weekStartOf } from "./time";
import type { Busy, BusySource } from "./types";

/** 見られる範囲(今週から前後何週か)。cron はこの範囲をまとめて集める */
export const PAST_WEEKS = 4;
export const FUTURE_WEEKS = 26;

function sources(): BusySource[] {
  const list: BusySource[] = [];
  const urls = (CALENDER_ICS_URLS ?? "")
    .split(/[\s,]+/)
    .map((u) => u.trim())
    .filter(Boolean);
  urls.forEach((url, i) => list.push(icsSource(url, i)));
  if (CALENDER_TENNISBEAR_TOKEN) list.push(tennisBearSource(CALENDER_TENNISBEAR_TOKEN));
  // 新しい取得元はここに足す
  return list;
}

/** 1 日分。時刻は 0:00 からの分。予定のない日はスナップショットに入れない */
export interface SnapshotDay {
  allDay?: true;
  blocks?: [start: number, end: number][];
}

export interface Snapshot {
  version: 1;
  /** 集めた時刻(エポックミリ秒) */
  generatedAt: number;
  /** 集めた範囲(日本時間の "YYYY-MM-DD"、to は含まない) */
  from: string;
  to: string;
  /** 取得に失敗した取得元があったか(どれかは公開しない) */
  partial: boolean;
  /** 取得元が 1 つも設定されていない */
  unconfigured: boolean;
  days: Record<string, SnapshotDay>;
}

/** すべての取得元から集める。1 つも取れなかったら null(前回のスナップショットを残すため) */
export async function buildSnapshot(now = Date.now()): Promise<Snapshot | null> {
  const thisWeek = weekStartOf(jstDate(now));
  const from = addDays(thisWeek, -7 * PAST_WEEKS);
  const to = addDays(thisWeek, 7 * (FUTURE_WEEKS + 1));
  const range = { start: jstMidnight(from), end: jstMidnight(to) };

  const list = sources();
  const results = await Promise.allSettled(list.map((s) => s.fetch(range)));
  const busy: Busy[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") busy.push(...r.value);
    else console.error(`[calender] ${list[i].name} の取得に失敗しました:`, r.reason);
  });
  const failed = results.filter((r) => r.status === "rejected").length;
  if (list.length > 0 && failed === list.length) return null;

  const timed = busy.filter((b): b is Extract<Busy, { kind: "timed" }> => b.kind === "timed");
  const allDays = busy.filter((b): b is Extract<Busy, { kind: "allDay" }> => b.kind === "allDay");
  const days: Record<string, SnapshotDay> = {};
  for (let date = from; date < to; date = addDays(date, 1)) {
    const dayStart = jstMidnight(date);
    const dayEnd = dayStart + DAY;
    const day: SnapshotDay = {};
    if (allDays.some((b) => b.startDate <= date && date < b.endDate)) day.allDay = true;
    const blocks = merge(
      timed
        .filter((b) => b.start < dayEnd && b.end > dayStart)
        .map((b) => [
          Math.round((Math.max(b.start, dayStart) - dayStart) / 60000),
          Math.round((Math.min(b.end, dayEnd) - dayStart) / 60000),
        ]),
    );
    if (blocks.length) day.blocks = blocks;
    if (day.allDay || day.blocks) days[date] = day;
  }

  return {
    version: 1,
    generatedAt: now,
    from,
    to,
    partial: failed > 0,
    unconfigured: list.length === 0,
    days,
  };
}

/** 重なる・接する時間帯をまとめる */
function merge(blocks: [number, number][]): [number, number][] {
  const sorted = blocks.filter(([s, e]) => e > s).sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const [s, e] of sorted) {
    const last = out.at(-1);
    if (last && s <= last[1]) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
}
