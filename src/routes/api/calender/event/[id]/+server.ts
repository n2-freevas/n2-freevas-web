/**
 * /calender の 🏏 の帯をクリックしたときに出す、テニスベアのイベントの情報。
 *
 * スナップショット(Blob)にはイベント ID しか持たせず、中身はイベントページの OGP をそのつど読んで返す。
 * ブラウザから直接テニスベアの HTML は取れない(CORS)ので、ここで代わりに取る。
 * 取りに行く先は https://www.tennisbear.net/event/<数字>/info に固定し、ほかの URL には出ていかない。
 */
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export interface EventPreview {
  title: string;
  description: string | null;
  image: string | null;
  url: string;
}

const ORIGIN = "https://www.tennisbear.net";

export const GET: RequestHandler = async ({ params, setHeaders }) => {
  if (!/^\d{1,12}$/.test(params.id)) error(400, "invalid id");
  const pageUrl = `${ORIGIN}/event/${params.id}/info`;

  const res = await fetch(pageUrl, {
    headers: { accept: "text/html", "user-agent": "Mozilla/5.0 (compatible; n2-freevas-calender)" },
    signal: AbortSignal.timeout(8000),
  }).catch(() => error(504, "upstream timeout"));
  if (res.status === 404) error(404, "not found");
  if (!res.ok) error(502, "upstream error");
  const og = readOgp(await res.text());
  // 消えたイベントは、サイト共通の OGP(タイトルが「テニスベア」だけ)になる
  if (!og.title || og.title === "テニスベア") error(404, "not found");

  // イベントの中身はめったに変わらないので CDN に長めに置く
  setHeaders({ "cache-control": "public, max-age=600, s-maxage=86400, stale-while-revalidate=86400" });
  return json({
    title: og.title,
    description: og.description ?? null,
    image: og.image && /^https:\/\//.test(og.image) ? og.image : null,
    url: og.url && og.url.startsWith(`${ORIGIN}/`) ? og.url : pageUrl,
  } satisfies EventPreview);
};

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
