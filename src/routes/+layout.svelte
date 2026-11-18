<!--
  全ページ共通。ファビコンはここで出す(app.html には書かない)。
  /jubilee 配下は別サービスなので、jubilee 専用のファビコン(static/jubilee/favicon.png)にする。
  URL で選ぶので、/jubilee 配下の 404 などのエラーページも jubilee のファビコンになる。
-->
<script>
  import { page } from "$app/state";
  import "./reset.css";
  import "./styles.scss";

  $: isJubilee = page.url.pathname === "/jubilee" || page.url.pathname.startsWith("/jubilee/");
</script>

<svelte:head>
  {#if isJubilee}
    <link rel="icon" type="image/png" href="/jubilee/favicon.png" />
    <link rel="apple-touch-icon" href="/jubilee/favicon.png" />
  {:else}
    <link rel="icon" type="image/png" href="/favicon.png" />
  {/if}
</svelte:head>

<slot />
