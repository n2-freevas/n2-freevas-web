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

// ───────────── テスト(in-source testing。npm test で動き、本番ビルドでは消える) ─────────────

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  const ids = (query: string) => greetingCandidates(new URLSearchParams(query)).map((g) => g.id);
  /** パラメータ無しのときの候補(requestOnly でないもの) */
  const defaults = GREETINGS.filter((g) => !g.requestOnly).map((g) => g.id);

  describe("あいさつの一覧", () => {
    it("パラメータ名は g", () => {
      expect(GREETING_PARAM).toBe("g");
    });

    it("id はすべて英数小文字 2 文字で、重ならない", () => {
      for (const { id } of GREETINGS) expect(id).toMatch(/^[a-z0-9]{2}$/);
      expect(new Set(GREETINGS.map((g) => g.id)).size).toBe(GREETINGS.length);
    });

    it("決まっている id: pf(profile) / wc(welcome) / jf(jubilee の創設者)", () => {
      expect(GREETINGS.map((g) => g.id)).toEqual(expect.arrayContaining(["pf", "wc", "jf"]));
    });

    it("jf はパラメータで指定されたときだけ出る", () => {
      expect(GREETINGS.find((g) => g.id === "jf")?.requestOnly).toBe(true);
      expect(defaults).not.toContain("jf");
    });
  });

  describe("greetingCandidates(?g= の読み方)", () => {
    it("パラメータが無いときは、requestOnly でないものすべて", () => {
      expect(ids("")).toEqual(defaults);
      expect(defaults).toEqual(expect.arrayContaining(["pf", "wc"]));
    });

    it("1 つ指定すると、その id だけ", () => {
      expect(ids("g=jf")).toEqual(["jf"]);
      expect(ids("g=wc")).toEqual(["wc"]);
    });

    it("複数指定は区切らずに 2 文字ずつ並べる", () => {
      expect(ids("g=pfwc").sort()).toEqual(["pf", "wc"]);
      expect(ids("g=jfwc").sort()).toEqual(["jf", "wc"]);
    });

    it("大文字は小文字として読む", () => {
      expect(ids("g=JF")).toEqual(["jf"]);
    });

    it("2 文字に満たない端数は捨てる", () => {
      expect(ids("g=jfw")).toEqual(["jf"]);
    });

    it("知らない id・空・形の合わない値は、パラメータ無しと同じ", () => {
      for (const q of ["g=zz", "g=", "g=j", "g=--", "g=j%20"]) expect(ids(q)).toEqual(defaults);
    });

    it("区切り文字は使わない(カンマ区切りは 2 文字ずつの読みとしてずれる)", () => {
      expect(ids("g=pf,wc")).toEqual(["pf"]); // "pf" ",w" "c" → pf だけ
    });

    it("g 以外の名前(旧形式の greet など)は読まない", () => {
      expect(ids("greet=jf")).toEqual(defaults);
    });
  });

  describe("pickGreeting", () => {
    it("候補の中から random に応じて 1 つ選ぶ", () => {
      const params = new URLSearchParams("g=pfwc");
      const first = pickGreeting(params, () => 0)?.id;
      const last = pickGreeting(params, () => 0.999)?.id;
      expect([first, last].sort()).toEqual(["pf", "wc"]);
    });

    it("パラメータが無いとき jf は選ばれない", () => {
      for (let r = 0; r < 1; r += 0.05) {
        expect(pickGreeting(new URLSearchParams(""), () => r)?.id).not.toBe("jf");
      }
    });

    it("候補が無ければ null", () => {
      expect(pickGreeting(new URLSearchParams(""), Math.random, [])).toBeNull();
    });
  });

  describe("greetingHref", () => {
    it("?g= に id を区切らずに並べる", () => {
      expect(greetingHref("/", "jf")).toBe("/?g=jf");
      expect(greetingHref("/", "pf", "wc")).toBe("/?g=pfwc");
    });

    it("ルールに合わない id はエラーにする", () => {
      expect(() => greetingHref("/", "founder")).toThrow();
      expect(() => greetingHref("/", "JF")).toThrow();
      expect(() => greetingHref("/", "j")).toThrow();
    });

    it("作った URL を読むと、同じ id になる", () => {
      const url = new URL(greetingHref("/", "pf", "jf"), "https://example.com");
      expect(ids(url.search.slice(1)).sort()).toEqual(["jf", "pf"]);
    });
  });
}
