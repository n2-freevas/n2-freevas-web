<script lang="ts">
  import { OPEN_GRAPH_CONST, TWITTER_GRAPH_CONST } from "./const";
  import { MetaTags } from "svelte-meta-tags";
  import { page } from "$app/stores";

  export let title: string;
  export let description: string = OPEN_GRAPH_CONST.default_description;

  const siteUrl = $page.url.href;
  const pageTitle = `${title} / ${OPEN_GRAPH_CONST.site_name}`;
</script>

<MetaTags
  title={pageTitle}
  {description}
  openGraph={{
    url: siteUrl,
    title: pageTitle,
    description: description,
    images: [
      {
        url: `${$page.url.host}/${OPEN_GRAPH_CONST.default_image.url}`,
        width: OPEN_GRAPH_CONST.default_image.width,
        height: OPEN_GRAPH_CONST.default_image.height,
        alt: OPEN_GRAPH_CONST.default_image.alt,
      },
      {
        url: `${$page.url.host}/${OPEN_GRAPH_CONST.default_image_square.url}`,
        width: OPEN_GRAPH_CONST.default_image_square.width,
        height: OPEN_GRAPH_CONST.default_image_square.height,
        alt: OPEN_GRAPH_CONST.default_image_square.alt,
      },
    ],
    siteName: OPEN_GRAPH_CONST.site_name,
  }}
  twitter={{
    handle: TWITTER_GRAPH_CONST.username,
    site: TWITTER_GRAPH_CONST.username,
    cardType: "summary_large_image",
    title: pageTitle,
    description: description,
    image: `${$page.url.host}/${OPEN_GRAPH_CONST.default_image.url}`,
    imageAlt: OPEN_GRAPH_CONST.default_image.alt,
  }}
/>
