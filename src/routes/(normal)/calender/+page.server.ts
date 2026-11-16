/**
 * cron が毎朝作るスナップショット(Vercel Blob)から 1 週間分を切り出して SSR する。
 * ページを開いても、Google・iCloud・テニスベアには問い合わせない。
 */
import { redirect } from "@sveltejs/kit";
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
    const day = snapshot?.days[date];
    return {
      date,
      allDay: day?.allDay === true,
      blocks: (day?.blocks ?? []).map(([start, end]) => ({ start, end })),
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
