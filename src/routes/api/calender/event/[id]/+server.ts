/**
 * /calender の 🏏 の帯をクリックしたときに出す、テニスベアのイベントの情報。
 *
 * スナップショット(Blob)にはイベント ID しか持たせず、中身はイベントページの OGP をそのつど読んで返す。
 * ブラウザから直接テニスベアの HTML は取れない(CORS)ので、ここで代わりに取る。
 * 取りに行く先は https://www.tennisbear.net/event/<数字>/info に固定し、ほかの URL には出ていかない。
 *
 * キャッシュは 2 段。
 * - CDN(cache-control の s-maxage):当たれば関数自体が動かない
 * - Vercel Runtime Cache(サーバー側。デプロイしても残る):CDN に当たらなかったとき、テニスベアに取りに行く前に見る
 *   Hobby では同じチームのプロジェクトで 1 つのキャッシュを共有するので、namespace でキーを分ける。
 *   ローカル開発(vite dev)では、@vercel/functions がメモリ上のキャッシュに切り替える。
 */
import { error, json } from "@sveltejs/kit";
import { getCache, type RuntimeCache } from "@vercel/functions";
import type { RequestHandler } from "./$types";

export interface EventPreview {
  title: string;
  description: string | null;
  image: string | null;
  url: string;
}

const ORIGIN = "https://www.tennisbear.net";
/** 取れたイベントを Runtime Cache に置く時間(秒) */
const TTL = 60 * 60 * 24;
/** 見つからなかったイベントを覚えておく時間(秒)。消えたイベントの帯は翌朝の cron で消える */
const NOT_FOUND_TTL = 60 * 60;

/** キャッシュに置く値。見つからなかったことも覚えておき、テニスベアに何度も問い合わせないようにする */
type Cached = { found: true; preview: EventPreview } | { found: false };

export const GET: RequestHandler = async ({ params, setHeaders }) => {
  if (!/^\d{1,12}$/.test(params.id)) error(400, "invalid id");

  const cache = runtimeCache();
  let cached = (await cache?.get(params.id).catch(() => null)) as Cached | null;
  if (!cached) {
    cached = await fetchPreview(params.id);
    // キャッシュに書けなくても、取れた結果はそのまま返す
    await cache
      ?.set(params.id, cached, { ttl: cached.found ? TTL : NOT_FOUND_TTL, tags: ["calender-event"] })
      .catch((e) => console.error("[calender] Runtime Cache に書けませんでした:", e));
  }
  if (!cached.found) error(404, "not found");

  // イベントの中身はめったに変わらないので CDN にも長めに置く
  setHeaders({ "cache-control": "public, max-age=600, s-maxage=86400, stale-while-revalidate=86400" });
  return json(cached.preview);
};

function runtimeCache(): RuntimeCache | null {
  try {
    return getCache({ namespace: "n2-freevas-web:calender-event" });
  } catch (e) {
    console.error("[calender] Runtime Cache を使えません:", e);
    return null;
  }
}

/** テニスベアのイベントページから OGP を読む。通信の失敗は 502/504(キャッシュしない) */
async function fetchPreview(id: string): Promise<Cached> {
  const pageUrl = `${ORIGIN}/event/${id}/info`;
  const res = await fetch(pageUrl, {
    headers: { accept: "text/html", "user-agent": "Mozilla/5.0 (compatible; n2-freevas-calender)" },
    signal: AbortSignal.timeout(8000),
  }).catch(() => error(504, "upstream timeout"));
  if (res.status === 404) return { found: false };
  if (!res.ok) error(502, "upstream error");
  const og = readOgp(await res.text());
  // 消えたイベント・ない ID では、サイト共通や一覧ページの OGP になる。
  // og:url がこのイベントのページ(/event/<id>/info、ピックルボールなどは /pickleball/event/<id>/info)のときだけ使う
  const own = new RegExp(`^${ORIGIN.replace(/\./g, "\\.")}/([a-z-]+/)?event/${id}/info$`);
  if (!og.title || !og.url || !own.test(og.url)) return { found: false };
  return {
    found: true,
    preview: {
      title: og.title,
      description: og.description ?? null,
      image: og.image && /^https:\/\//.test(og.image) ? og.image : null,
      url: og.url,
    },
  };
}

/** <meta property="og:xxx" content="..."> を拾う(属性の順番は問わない) */
function readOgp(html: string): Record<string, string> {
  const headEnd = html.indexOf("</head>");
  const head = headEnd >= 0 ? html.slice(0, headEnd) : html;
  const out: Record<string, string> = {};
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const prop = tag.match(/\bproperty\s*=\s*"og:([a-z_:]+)"/i)?.[1];
    const content = tag.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1];
    if (prop && content !== undefined && !(prop in out)) out[prop] = decodeEntities(content);
  }
  return out;
}

function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|#39);/gi, (m, e: string) => {
    const lower = e.toLowerCase();
    if (lower.startsWith("#x")) return String.fromCodePoint(parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(Number(lower.slice(1)));
    return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string, string>)[lower] ?? m;
  });
}
