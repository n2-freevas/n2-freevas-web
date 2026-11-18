/**
 * cron が毎朝作るスナップショット(Vercel Blob)から 1 週間分を切り出して SSR する。
 * ページを開いても、Google・iCloud・テニスベアには問い合わせない。
 */
import { redirect } from "@sveltejs/kit";
import { FLAG_ORDER } from "#lib/server/calender/index.ts";
import { loadSnapshot } from "#lib/server/calender/store.ts";
import { addDays, calenderRange, jstDate, weekStartOf } from "#lib/server/calender/time.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  const today = jstDate(Date.now());
  const thisWeek = weekStartOf(today);
  // 移動できるのは、cron が集める範囲と同じ「今週〜5 か月後の週」
  const { from: min, lastWeek: max } = calenderRange(today);

  const param = url.searchParams.get("week");
  let week = thisWeek;
  if (param) {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(param) && !Number.isNaN(Date.parse(param));
    const normalized = valid ? weekStartOf(param) : thisWeek;
    const clamped = normalized < min ? min : normalized > max ? max : normalized;
    // 日曜日以外・範囲外の指定は、正しい週の URL にそろえる
    if (clamped !== param) redirect(307, clamped === thisWeek ? "/calender" : `/calender?week=${clamped}`);
    week = clamped;
  }

  // 中身が変わるのは 1 日 1 回なので、Blob を読む回数も減らすよう CDN に 10 分キャッシュさせる
  setHeaders({ "cache-control": "public, max-age=60, s-maxage=600, stale-while-revalidate=3600" });

  const snapshot = await loadSnapshot().catch((e) => {
    console.error("[calender] スナップショットを読めませんでした:", e);
    return null;
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(week, i);
    // version 1 のスナップショット(帯の種類を持たない)は、すべて 💻(o)として出す
    const day = snapshot?.days[date] as
      | { allDay?: string | true; blocks?: [number, number, string?, string[]?][] }
      | undefined;
    return {
      date,
      /** 終日の予定の種類(Flag を並べた文字列)。なければ null */
      allDay: day?.allDay === true ? "o" : (day?.allDay ?? null),
      blocks: snapToSlots(
        (day?.blocks ?? []).map(([start, end, flags, refs]) => ({
          start,
          end,
          flags: flags || "o",
          refs: refs ?? [],
        })),
      ),
    };
  });

  return {
    week,
    today,
    thisWeek,
    prevWeek: week > min ? addDays(week, -7) : null,
    nextWeek: week < max ? addDays(week, 7) : null,
    days,
    generatedAt: snapshot?.generatedAt ?? null,
    /** スナップショットがない・この週がスナップショットの範囲外 */
    missing: !snapshot || week < snapshot.from || addDays(week, 7) > snapshot.to,
    partial: snapshot?.partial ?? false,
    unconfigured: snapshot?.unconfigured ?? false,
  };
};

/** 帯の粒度(分)。cron 側でもそろえているが、古いスナップショット(version 1)もここで 30 分単位にする */
const SLOT = 30;

type Block = { start: number; end: number; flags: string; refs: string[] };

/** 帯を 30 分単位に広げ(14:00〜14:15 → 14:00〜14:30)、広げて重なった・接した帯はまとめる */
function snapToSlots(blocks: Block[]): Block[] {
  const out: Block[] = [];
  const snapped = blocks
    .map((b) => ({
      ...b,
      start: Math.floor(b.start / SLOT) * SLOT,
      end: Math.min(Math.ceil(b.end / SLOT) * SLOT, 1440),
    }))
    .sort((a, b) => a.start - b.start);
  for (const b of snapped) {
    const last = out.at(-1);
    if (last && b.start <= last.end) {
      last.end = Math.max(last.end, b.end);
      last.flags = FLAG_ORDER.filter((f) => last.flags.includes(f) || b.flags.includes(f)).join("");
      last.refs = [...new Set([...last.refs, ...b.refs])];
    } else out.push({ ...b });
  }
  return out;
}
