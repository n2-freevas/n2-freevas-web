export type OgImage= {
  url: string
  width: number
  height: number
  type: "image/jpeg" | "image/png"
  alt?: string
}

export const OPEN_GRAPH_CONST= {
  site_name: "N2 Official",
  author: "Taro.Nonoyama",
  site_langage: "en_JA",
  default_title: "",
  default_description: "一介のエンジニア兼デザイナー、Taro.NonoyamaのWebサイト",
  default_image: {
    url: "/og-image",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "n2-freevas logo in center of the picture, black background, white logo"
  } as OgImage,
  default_image_square: {
    url: "/og-image-sq",
    width: 630,
    height: 630,
    type: "image/png",
    alt: "n2-freevas logo in center of the picture, black background, white logo"
  }
}

export const TWITTER_GRAPH_CONST = {
  username: "@N2_FreeVAS"
}
