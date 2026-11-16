import type { RequestEvent } from '@sveltejs/kit';
import { type GetOgp, generate } from '#lib/server/schema.ts'
import { fetchOgp } from '#lib/server/ogp.ts'


export async function GET(e: RequestEvent) {
  const url = e.url.searchParams.get('url')
  if(!url) return new Response(generate({
    status: 200,
    data:{message: "SUCCESS"}
  }))
  
  try{
    const data = await fetchOgp(url)
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
