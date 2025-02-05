import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import ogp from 'open-graph-scraper'
import { type GetOgp, generate } from '$lib/server/schema'


export async function GET(e: RequestEvent) {
  const url = e.url.searchParams.get('url')
  if(!url) return new Response(generate({
    status: 200,
    data:{message: "SUCCESS"}
  }))
  
  try{
    const metadata = await ogp({url: url})
    const data:GetOgp = {
        title: metadata.result.ogTitle ?? metadata.result.twitterTitle ?? metadata.result.dcTitle ?? "タイトルなし",
        description: metadata.result.ogDescription ?? metadata.result.twitterDescription ?? metadata.result.dcDescription ?? "デスクリプションなし",
        images: metadata.result.ogImage ?? metadata.result.twitterImage ?? [],
        siteName: metadata.result.ogSiteName ?? "サイト名なし",
        siteUrl: metadata.result.ogUrl ?? metadata.result.twitterUrl ?? url
      
    }
    return new Response(generate<GetOgp>({
      status: 200,
      data
    }))
  }catch(e){
    return new Response(generate({
      status: 400,
      //@ts-ignore
      error: e
    }))
  }
  
}
