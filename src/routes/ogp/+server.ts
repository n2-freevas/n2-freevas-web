import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import ogp from 'ogp-parser'
import { type GetOgp, generate } from '$lib/server/schema'


export async function GET(e: RequestEvent) {
  const url = e.url.searchParams.get('url')
  if(!url) return new Response(generate({
    status: 200,
    data:{message: "SUCCESS"}
  }))
  
  try{
    const metadata = await ogp(url)
    const res = {
      status: 200,
      data: {
        title: metadata.ogp['og:title'] ? metadata.ogp['og:title'][0] : metadata.title,
        description: metadata.ogp['og:description'] ? 
        metadata.ogp['og:description'][0] :  (metadata.seo['og:description'] ? metadata.seo['og:description'][0] : undefined),
        images: metadata.ogp['og:image'].map(i=>{return {url: i}}) ?? [],
        siteName: metadata.ogp['og:site_name'] ? metadata.ogp['og:site_name'][0] : undefined,
        siteUrl: url
      }
    }
    return new Response(generate<GetOgp>(res))
  }catch(e){
    return new Response(generate({
      status: 400,
      //@ts-ignore
      error: e
    }))
  }
  
}
