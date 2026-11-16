/**
 * /calender のスナップショットを作り直す。Vercel Cron が毎朝 5 時台(日本時間)に呼ぶ(vercel.json)。
 * Vercel Cron は Authorization: Bearer <CRON_SECRET> を付けてくるので、それ以外からの呼び出しは断る。
 * ローカル開発で CRON_SECRET がないときだけ、合言葉なしで動かせる。
 */
import { error, json } from "@sveltejs/kit";
import { dev } from "$app/env";
import { CRON_SECRET } from "$app/env/private";
import { buildSnapshot } from "#lib/server/calender/index.ts";
import { saveSnapshot } from "#lib/server/calender/store.ts";
import type { RequestHandler } from "./$types";

function authorized(request: Request): boolean {
  if (!CRON_SECRET) return dev;
  // Vercel Cron は Authorization ヘッダーで送ってくる。
  // プレビューで手動実行するときは Deployment Protection が Authorization を横取りするので、x-cron-secret でも受け付ける
  const viaHeader = request.headers.get("x-cron-secret");
  const expected = viaHeader !== null ? CRON_SECRET : `Bearer ${CRON_SECRET}`;
  const actual = viaHeader ?? request.headers.get("authorization") ?? "";
  if (actual.length !== expected.length) return false;
  // 一致する文字数で時間が変わらないよう、最後まで比べる
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export const GET: RequestHandler = async ({ request }) => {
  if (!authorized(request)) error(401, "unauthorized");

  const snapshot = await buildSnapshot();
  // 取得元が全部失敗したときは、前回のスナップショットを残す
  if (!snapshot) error(502, "すべての取得元で取得に失敗しました");

  await saveSnapshot(snapshot);
  return json(
    {
      ok: true,
      from: snapshot.from,
      to: snapshot.to,
      partial: snapshot.partial,
      busyDays: Object.keys(snapshot.days).length,
    },
    { headers: { "cache-control": "no-store" } },
  );
};
