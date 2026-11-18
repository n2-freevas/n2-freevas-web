/**
 * Greeting.svelte が出すあいさつの一覧と、どれを出すかの決め方。
 *
 * 決め方:
 *   - URL パラメータ ?g=<id> があれば、その id のあいさつだけから選ぶ
 *     id は英数小文字 2 文字。複数指定は区切らずに並べる
 *     例: /?g=jf  /?g=pfwc(pf と wc)
 *   - 無い(または知らない id しか無い)ときは、requestOnly でないあいさつから選ぶ
 *   - 候補が複数あるときはランダムに 1 つ
 *
 * パターンを増やすときは GREETINGS に足す(id は英数小文字 2 文字で、ほかと重ならないもの)。
 * リンクに飛ぶ前提の専用のあいさつは requestOnly: true にする。
 */

/** あいさつの 2 文目の部品。文字列はそのまま、{ text, href } はリンクにする */
export type GreetingPart = string | { text: string; href: string };

export interface Greeting {
  /** URL パラメータで指定するときの名前。英数小文字 2 文字 */
  id: string;
  /** 1 文目(大きく出す) */
  title: string;
  /** 2 文目(小さく出す) */
  message: GreetingPart[];
  /** true なら、URL パラメータで指定されたときだけ出す */
  requestOnly?: boolean;
}

/** 読むだけなので、get が使えれば何でもよい(page.url.searchParams は読み取り専用の型) */
type Params = Pick<URLSearchParams, "get">;

/** URL パラメータの名前 */
export const GREETING_PARAM = "g";

/** id の形(英数小文字 2 文字) */
const ID_PATTERN = /^[a-z0-9]{2}$/;

export const GREETINGS: Greeting[] = [
  {
    id: "pf", // profile
    title: "こんにちは。",
    message: ["まずは ", { text: "profile", href: "/introduce" }, " へどうぞ。"],
  },
  {
    id: "wc", // welcome
    title: "ようこそ。",
    message: ["ごゆっくりお過ごしください。"],
  },
  {
    id: "jf", // jubilee founder
    title: "こんにちは。",
    message: ["jubilee の創設者です。"],
    requestOnly: true,
  },
];

// id のルールを破ったまま使われないよう、読み込んだ時点で確かめる(ビルドや開発中に気づける)
{
  const seen = new Set<string>();
  for (const { id } of GREETINGS) {
    if (!ID_PATTERN.test(id)) throw new Error(`あいさつの id "${id}" は英数小文字 2 文字にしてください`);
    if (seen.has(id)) throw new Error(`あいさつの id "${id}" が重なっています`);
    seen.add(id);
  }
}

/** パラメータを付けた URL(他のページからリンクするとき用) */
export function greetingHref(path: string, ...ids: string[]): string {
  for (const id of ids) {
    if (!ID_PATTERN.test(id)) throw new Error(`あいさつの id "${id}" は英数小文字 2 文字にしてください`);
  }
  return `${path}?${GREETING_PARAM}=${ids.join("")}`;
}

/** ?g= の値を 2 文字ずつの id に分ける(端数や形の合わない部分は捨てる) */
function parseIds(value: string | null): string[] {
  return (value?.toLowerCase().match(/.{2}/g) ?? []).filter((id) => ID_PATTERN.test(id));
}

/** 出す候補を決める */
export function greetingCandidates(params: Params, greetings = GREETINGS): Greeting[] {
  const requested = parseIds(params.get(GREETING_PARAM));
  const matched = greetings.filter((g) => requested.includes(g.id));
  return matched.length > 0 ? matched : greetings.filter((g) => !g.requestOnly);
}

/** 候補から 1 つ選ぶ(random は 0 以上 1 未満の数を返す関数。テストで固定するため差し替えられる) */
export function pickGreeting(
  params: Params,
  random: () => number = Math.random,
  greetings = GREETINGS,
): Greeting | null {
  const candidates = greetingCandidates(params, greetings);
  if (candidates.length === 0) return null;
  return candidates[Math.floor(random() * candidates.length)];
}
