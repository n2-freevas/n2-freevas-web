<!--
  jubilee 用のメタタグ。n2-freevas.com 本体の SEO 部品(#lib/component/seo)はサイト名「N2 Official」、
  N2 のロゴ画像、N2 の X アカウントを付けるので、別サービスの jubilee では使わない。
  jubilee 用の OGP 画像ができたら openGraph.images に足す。
-->
<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { page } from "$app/state";

  const SITE_NAME = "jubilee";
  const DEFAULT_DESCRIPTION = "試合の動画を振り返るためのサービス。";

  let { title, description = DEFAULT_DESCRIPTION }: { title?: string; description?: string } = $props();

  /** トップは「jubilee」、各ページは「replay / jubilee」 */
  const pageTitle = $derived(title ? `${title} / ${SITE_NAME}` : SITE_NAME);
</script>

<MetaTags
  title={pageTitle}
  {description}
  openGraph={{
    url: page.url.href,
    title: pageTitle,
    description,
    siteName: SITE_NAME,
  }}
  twitter={{
    cardType: "summary",
    title: pageTitle,
    description,
  }}
/>
