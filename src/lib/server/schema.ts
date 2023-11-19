export interface BaseResponse<T> {
  status: number,
  data?: T
  error?: {
    message: string
    detail: object
  }
}

export function generate<T>(data?: BaseResponse<T>){
  return JSON.stringify(data ?? {})
}

export interface GetOgp {
  title?: string
  description?: string
  siteName?: string
  siteUrl?: string
  images: {
    url?: string,
    width?: number,
    height?: number,
    alt?: string
  }[],

}
