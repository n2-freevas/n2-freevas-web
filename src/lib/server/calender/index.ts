/**
 * /calender に載せる「埋まっている時間」を、設定されたすべての取得元から集めてスナップショットにする。
 *
 * - 集めるのは cron(/api/cron/calender、毎朝 1 回)だけ。ページを開いたときには取得元に問い合わせない。
 * - スナップショットには時間帯しか入れない。予定の中身はサーバーの外に出さない。
 * - 重なっている・接している時間帯はまとめてしまうので、予定がいくつあるかもわからない。
 * - 帯には、取得元と曜日から決めた種類(Flag、1 文字)だけを付ける。テニスベアのイベントだけは、
 *   帯から OGP を引けるようイベント ID も持つ(中身はページを開いた人がそのときに取りに行く)。
 */
import { CALENDER_ICS_URLS, CALENDER_TENNISBEAR_TOKEN } from "$app/env/private";
import holidayJp from "@holiday-jp/holiday_jp";
import { icsSource } from "./ics";
import { tennisBearSource } from "./tennisbear";
import { addDays, calenderRange, DAY, jstDate, jstMidnight } from "./time";
import type { Busy, BusySource } from "./types";

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

/**
 * 帯の種類。1 文字で持ち、ページでアイコンにする。
 * - t: テニスベアのイベント(🏏)。平日 9:30〜16:00 にかかるものは o にする
 * - w: Google カレンダーの平日の予定(🧳)
 * - h: Google カレンダーの休日(土日・祝日)の予定(🏕️)
 * - o: それ以外(💻)
 */
export type Flag = "t" | "w" | "h" | "o";
/** 帯に付けるアイコンの並び順。重なった帯をまとめたときは、この順に並べる */
export const FLAG_ORDER: Flag[] = ["t", "w", "h", "o"];

/** 1 日の帯。時刻は 0:00 からの分(30 分単位)。flags は Flag を並べた文字列。refs はテニスベアのイベント ID */
export type SnapshotBlock = [start: number, end: number, flags: string, refs?: string[]];

/** 1 日分。予定のない日はスナップショットに入れない */
export interface SnapshotDay {
  /** 終日の予定があればその Flag(なければ省く) */
  allDay?: string;
  blocks?: SnapshotBlock[];
}

export interface Snapshot {
  version: 2;
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

/** 帯の粒度(分)。15 分の予定も 30 分の帯にする */
const SLOT = 30;
/** 平日のこの時間帯にかかるテニスベアのイベントは 🏏 にしない(9:30〜16:00、分) */
const TENNIS_HIDDEN: [number, number] = [9 * 60 + 30, 16 * 60];

/** すべての取得元から集める。1 つも取れなかったら null(前回のスナップショットを残すため) */
export async function buildSnapshot(now = Date.now()): Promise<Snapshot | null> {
  // 今週の日曜日〜5 か月後の週の土曜日(time.ts の calenderRange)。過去の週は持たない
  const { from, to } = calenderRange(jstDate(now));
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
    const holiday = isHoliday(date);
    const day: SnapshotDay = {};

    const allDayFlags = allDays
      .filter((b) => b.startDate <= date && date < b.endDate)
      .map((b) => classify(b, holiday, [0, 1440]).flag);
    if (allDayFlags.length) day.allDay = joinFlags(allDayFlags);

    const blocks = merge(
      timed
        .filter((b) => b.start < dayEnd && b.end > dayStart)
        .map((b) => {
          const start = Math.round((Math.max(b.start, dayStart) - dayStart) / 60000);
          const end = Math.round((Math.min(b.end, dayEnd) - dayStart) / 60000);
          const { flag, ref } = classify(b, holiday, [start, end]);
          // 30 分単位に広げる(9:10〜9:25 → 9:00〜9:30)
          return { start: floorTo(start, SLOT), end: Math.min(ceilTo(end, SLOT), 1440), flag, ref };
        }),
    );
    if (blocks.length) day.blocks = blocks;
    if (day.allDay || day.blocks) days[date] = day;
  }

  return {
    version: 2,
    generatedAt: now,
    from,
    to,
    partial: failed > 0,
    unconfigured: list.length === 0,
    days,
  };
}

/** 土日と祝日(振替休日・国民の休日を含む) */
function isHoliday(date: string): boolean {
  const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
  return dow === 0 || dow === 6 || holidayJp.isHoliday(date);
}

/** 予定の 1 日分([start, end) 分)に付ける Flag。テニスベアの ID は 🏏 を付けるときだけ残す */
function classify(b: Busy, holiday: boolean, [start, end]: [number, number]): { flag: Flag; ref?: string } {
  switch (b.origin) {
    case "google":
      return { flag: holiday ? "h" : "w" };
    case "tennisbear":
      if (!holiday && start < TENNIS_HIDDEN[1] && end > TENNIS_HIDDEN[0]) return { flag: "o" };
      return { flag: "t", ...(b.ref ? { ref: b.ref } : {}) };
    default:
      return { flag: "o" };
  }
}

const floorTo = (n: number, unit: number) => Math.floor(n / unit) * unit;
const ceilTo = (n: number, unit: number) => Math.ceil(n / unit) * unit;

function joinFlags(flags: Iterable<string>): string {
  const set = new Set(flags);
  return FLAG_ORDER.filter((f) => set.has(f)).join("");
}

/** 重なる・接する時間帯をまとめる。まとめた帯には、もとの帯の Flag と ID をすべて持たせる */
function merge(blocks: { start: number; end: number; flag: Flag; ref?: string }[]): SnapshotBlock[] {
  const sorted = blocks.filter((b) => b.end > b.start).sort((a, b) => a.start - b.start);
  const out: { start: number; end: number; flags: Set<Flag>; refs: Set<string> }[] = [];
  for (const b of sorted) {
    let last = out.at(-1);
    if (!last || b.start > last.end) {
      last = { start: b.start, end: b.end, flags: new Set(), refs: new Set() };
      out.push(last);
    }
    last.end = Math.max(last.end, b.end);
    last.flags.add(b.flag);
    if (b.ref) last.refs.add(b.ref);
  }
  return out.map(({ start, end, flags, refs }) =>
    refs.size ? [start, end, joinFlags(flags), [...refs]] : [start, end, joinFlags(flags)],
  );
}
