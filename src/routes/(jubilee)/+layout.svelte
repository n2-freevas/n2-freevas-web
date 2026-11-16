<!--
  /jubilee 配下の共通レイアウト。
  n2freevas.com 本体とは別のサービスとして展開するため、(normal) のヘッダーやメニューは引き継がない。
  ルートの +layout.svelte(reset.css と styles.scss の読み込み)だけは SvelteKit の仕組み上すべてのページに掛かる。

  ヘッダーは下側が楕円の下半分のように膨らんだ形で、中央にロゴを載せる。
  下へスクロールすると低く・膨らみも浅くなって控えめになり、最上部に戻ると元の大きさに戻る。
-->
<script lang="ts">
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();

  /** ログイン中で、認証用のページ以外ならログアウトを出す */
  const showLogout = $derived(
    !!data.email && !page.url.pathname.startsWith("/jubilee/auth"),
  );

  /** このスクロール量を超えたら控えめにする(最上部付近では元の大きさ) */
  const COMPACT_AFTER_PX = 8;

  let scrollY = $state(0);
  const compact = $derived(scrollY > COMPACT_AFTER_PX);
</script>

<svelte:window bind:scrollY />

<div class="jubilee">
  <header class:compact>
    <a href="/jubilee" aria-label="jubilee のトップへ">
      <img src="/jubilee/logo_b.svg" alt="jubilee" />
    </a>
    {#if showLogout}
      <form class="logout" method="POST" action="/jubilee/auth/logout">
        <button type="submit" title={data.email}>ログアウト</button>
      </form>
    {/if}
  </header>
  <main>
    {@render children()}
  </main>
  <footer>
    <a href="/jubilee/privacy">プライバシーポリシー</a>
  </footer>
</div>

<style lang="scss">
  .jubilee {
    /* ヘッダーの大きさ。--jubilee-header-height は各ページが「上に空ける高さ」として使う */
    --jubilee-header-height: 112px;
    --header-curve: 44px; /* 下側の膨らみの深さ */
    --header-logo: 56px;
    --header-compact-height: 60px;
    --header-compact-curve: 16px;
    --header-compact-logo: 30px;
    --header-bg: white;
    --header-ease: cubic-bezier(0.22, 1, 0.36, 1);

    min-height: 100svh;
    background: #f6f3ee;
    color: #222;
    font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Segoe UI",
      Roboto, sans-serif;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    /* ロゴは膨らみの分だけ下げ、楕円の中央あたりに置く */
    align-items: center;
    height: var(--jubilee-header-height);
    padding-top: env(safe-area-inset-top, 0px);
    /* 横幅いっぱいの楕円の下半分。左右の端は (高さ − 膨らみ) の位置から始まり、中央で一番下まで膨らむ */
    border-radius: 0 0 50% 50% / 0 0 var(--header-curve) var(--header-curve);
    background: var(--header-bg);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    transition:
      height 0.45s var(--header-ease),
      border-radius 0.45s var(--header-ease),
      background-color 0.3s ease,
      box-shadow 0.3s ease;

    a {
      display: block;
      /* 膨らみの分だけ中心を下げる */
      transform: translateY(calc(var(--header-curve) * 0.25));
      transition: transform 0.45s var(--header-ease);
    }

    img {
      display: block;
      height: var(--header-logo);
      transition: height 0.45s var(--header-ease);
    }

    &.compact {
      height: var(--header-compact-height);
      border-radius: 0 0 50% 50% / 0 0 var(--header-compact-curve)
        var(--header-compact-curve);
      background: rgba(255, 255, 255, 0.82);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);

      a {
        transform: translateY(calc(var(--header-compact-curve) * 0.25));
      }
      img {
        height: var(--header-compact-logo);
      }
    }
  }

  .logout {
    position: absolute;
    top: calc(env(safe-area-inset-top, 0px) + 12px);
    right: 16px;
    button {
      padding: 4px 10px;
      border: solid 1px #ccc;
      border-radius: 999px;
      background: white;
      color: #555;
      font-size: 12px;
      cursor: pointer;
    }
  }

  footer {
    padding: 24px 16px calc(24px + env(safe-area-inset-bottom, 0px));
    text-align: center;
    a {
      color: #666;
      font-size: 12px;
      text-underline-offset: 3px;
    }
  }

  main {
    /* 固定したヘッダーの下に隠れないよう、元の大きさの分だけ空ける */
    padding-top: var(--jubilee-header-height);
  }

  @media (prefers-reduced-motion: reduce) {
    header,
    header a,
    header img {
      transition: none;
    }
  }
</style>
