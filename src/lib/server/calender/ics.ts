/**
 * iCal(ICS)形式のカレンダーから、埋まっている時間だけを取り出す。
 * Google カレンダーの「iCal 形式の非公開 URL」、iCloud の公開カレンダーなど、ICS を出すものなら何でも読める。
 * 繰り返し予定(RRULE)と、その一部だけ変えた回(RECURRENCE-ID)・除外日(EXDATE)にも対応する。
 */
import ICAL from "ical.js";
import { jstDate, jstToEpoch } from "./time";
import type { Busy, BusySource, Origin, Range } from "./types";

/** 1 つの繰り返し予定から展開する回数の上限(壊れた RRULE で止まらないようにする) */
const MAX_OCCURRENCES = 20000;

export function icsSource(url: string, index: number): BusySource {
  // webcal:// は iCloud などの共有リンクの形。中身は https で取れる
  const httpUrl = url.replace(/^webcals?:\/\//i, "https://");
  // Google カレンダーの ICS は calendar.google.com から配られる。それ以外(iCloud など)は "other"
  const origin: Origin = /^https:\/\/([a-z0-9-]+\.)*google\.com\//i.test(httpUrl) ? "google" : "other";
  return {
    name: `ics#${index + 1}`,
    origin,
    async fetch(range) {
      const res = await fetch(httpUrl, { headers: { accept: "text/calendar" } });
      if (!res.ok) throw new Error(`ICS の取得に失敗しました(${res.status})`);
      return parseIcs(await res.text(), range).map((b) => ({ ...b, origin }));
    },
  };
}

export function parseIcs(text: string, range: Range): Busy[] {
  const root = new ICAL.Component(ICAL.parse(text));
  for (const tz of root.getAllSubcomponents("vtimezone")) ICAL.TimezoneService.register(tz);

  // 繰り返しの親と、一部だけ変えた回を UID ごとに結びつける
  const masters = new Map<string, ICAL.Event>();
  const exceptions: ICAL.Component[] = [];
  for (const vevent of root.getAllSubcomponents("vevent")) {
    if (vevent.hasProperty("recurrence-id")) exceptions.push(vevent);
    else masters.set(String(vevent.getFirstPropertyValue("uid") ?? Math.random()), new ICAL.Event(vevent));
  }
  const orphans: ICAL.Event[] = [];
  for (const exc of exceptions) {
    const master = masters.get(String(exc.getFirstPropertyValue("uid")));
    if (master) master.relateException(exc);
    else orphans.push(new ICAL.Event(exc)); // 親のない変更回は単発の予定として扱う
  }

  const result: Busy[] = [];
  const push = (event: ICAL.Event, start: ICAL.Time, end: ICAL.Time) => {
    if (!isBusy(event)) return;
    const busy = toBusy(start, end);
    if (busy && overlaps(busy, range)) result.push(busy);
  };

  for (const event of [...masters.values(), ...orphans]) {
    if (!event.isRecurring()) {
      push(event, event.startDate, event.endDate ?? event.startDate);
      continue;
    }
    const it = event.iterator();
    for (let i = 0, next: ICAL.Time | null; i < MAX_OCCURRENCES && (next = it.next()); i++) {
      if (toEpoch(next) >= range.end) break;
      const occ = event.getOccurrenceDetails(next);
      push(occ.item, occ.startDate, occ.endDate);
    }
  }
  return result;
}

/** 「空き時間」扱いの予定(TRANSP:TRANSPARENT)と、キャンセルされた予定は除く */
function isBusy(event: ICAL.Event): boolean {
  const c = event.component;
  return (
    String(c.getFirstPropertyValue("transp") ?? "").toUpperCase() !== "TRANSPARENT" &&
    String(c.getFirstPropertyValue("status") ?? "").toUpperCase() !== "CANCELLED"
  );
}

function toBusy(start: ICAL.Time, end: ICAL.Time): Busy | null {
  if (start.isDate) {
    // 終日の予定。DTEND がなければ 1 日だけ
    const s = dateString(start);
    const e = end.isDate && end.compare(start) > 0 ? dateString(end) : nextDate(s);
    return { kind: "allDay", startDate: s, endDate: e };
  }
  const s = toEpoch(start);
  const e = toEpoch(end);
  return e > s ? { kind: "timed", start: s, end: e } : null;
}

/** タイムゾーンのない時刻(floating)は日本時間として扱う */
function toEpoch(t: ICAL.Time): number {
  const zone = t.zone;
  if (!zone || zone === ICAL.Timezone.localTimezone || zone.tzid === "floating") {
    return jstToEpoch(t.year, t.month, t.day, t.hour, t.minute, t.second);
  }
  return t.toUnixTime() * 1000;
}

const pad = (n: number) => String(n).padStart(2, "0");
const dateString = (t: ICAL.Time) => `${t.year}-${pad(t.month)}-${pad(t.day)}`;
const nextDate = (date: string) => jstDate(Date.parse(`${date}T00:00:00+09:00`) + 24 * 60 * 60 * 1000);

function overlaps(busy: Busy, range: Range): boolean {
  if (busy.kind === "timed") return busy.start < range.end && busy.end > range.start;
  return busy.startDate <= jstDate(range.end - 1) && busy.endDate > jstDate(range.start);
}
