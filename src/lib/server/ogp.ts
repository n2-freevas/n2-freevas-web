import ogp from 'open-graph-scraper';
import type { GetOgp } from '$lib/server/schema';

export async function fetchOgp(url: string): Promise<GetOgp> {
  const metadata = await ogp({ url });
  return {
    title: metadata.result.ogTitle ?? metadata.result.twitterTitle ?? metadata.result.dcTitle ?? 'タイトルなし',
    description: metadata.result.ogDescription ?? metadata.result.twitterDescription ?? metadata.result.dcDescription ?? 'デスクリプションなし',
    images: metadata.result.ogImage ?? metadata.result.twitterImage ?? [],
    siteName: metadata.result.ogSiteName ?? 'サイト名なし',
    siteUrl: metadata.result.ogUrl ?? metadata.result.twitterUrl ?? url
  };
}
