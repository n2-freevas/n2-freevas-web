import type { PageServerLoad } from "./$types";
import type { GetOgp } from "$lib/server/schema";
import { fetchOgp } from "$lib/server/ogp";
import { CARRER_CARD_DATA } from "./_data";

// ビルド時にOGPを取得して静的HTMLに埋め込む (SSG)
export const prerender = true;

export const load: PageServerLoad = async () => {
  const urls = CARRER_CARD_DATA.flatMap((c) => [
    c.url,
    ...c.reffers.map((r) => r.url),
  ]);
  const entries = await Promise.all(
    urls.map(async (url): Promise<[string, GetOgp | null]> => {
      try {
        return [url, await fetchOgp(url)];
      } catch (e) {
        console.warn(`[introduce] OGP fetch failed: ${url}`, e);
        return [url, null];
      }
    }),
  );
  return {
    careers: CARRER_CARD_DATA,
    ogp: Object.fromEntries(entries) as Record<string, GetOgp | null>,
  };
};
