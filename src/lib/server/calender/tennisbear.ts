/**
 * テニスベアで主催・参加しているイベント(マイページの「予定(主催・参加イベント一覧)」と同じもの)。
 *
 * テニスベアの Web 版が使っている API に、ログイン時に発行されるトークン(Cookie tb_token。有効期限は約 3 年)で問い合わせる。
 * 返り値の形は公開されていないので、extractBusy で開始・終了日時らしい項目を拾う。
 */
import { extractBusy } from "./heuristic";
import type { BusySource } from "./types";

const FUTURE_EVENTS = "https://www.tennisbear.net/api/v3/events/me/future";
const PAST_EVENTS = "https://www.tennisbear.net/api/v3/events/me/past";

export function tennisBearSource(token: string): BusySource {
  const headers = { accept: "application/json", authorization: `Bearer ${token}` };
  const get = async (url: string) => {
    const res = await fetch(url, { headers });
    if (res.status === 401) throw new Error("テニスベアのトークンが無効です(ログインし直して tb_token を取り直す)");
    if (!res.ok) throw new Error(`テニスベアの取得に失敗しました(${res.status})`);
    return res.json();
  };
  return {
    name: "tennisbear",
    async fetch(range) {
      // 過去の週を見るときだけ、終わったイベント(新しい順に 20 件)も読む
      const wantPast = range.start < Date.now();
      const [future, past] = await Promise.all([
        get(FUTURE_EVENTS),
        wantPast ? get(`${PAST_EVENTS}?limit=20&offset=0`).catch(() => []) : [],
      ]);
      return extractBusy([future, past]);
    },
  };
}
