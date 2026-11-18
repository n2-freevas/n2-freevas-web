<!--
  あいさつ。1 文目を大きく、2 文目を小さく、2 行で出す。
  どのあいさつを出すか(URL パラメータ ?g= とランダム)は greetings.ts。

  出すページ(/)はビルド時に静的な HTML にしている(prerender)ので、URL パラメータはブラウザでしか読めない。
  そのためあいさつはブラウザで選んでから表示する。選ぶまでの間も同じ高さを空けておき、表示時に周りがずれないようにする。
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { type Greeting, pickGreeting } from "./greetings";

  let greeting: Greeting | null = $state(null);

  onMount(() => {
    greeting = pickGreeting(page.url.searchParams);
  });
</script>

<div class="greeting" aria-live="polite">
  {#if greeting}
    <p class="title">{greeting.title}</p>
    <p class="message">
      {#each greeting.message as part}
        {#if typeof part === "string"}{part}{:else}<a href={part.href}>{part.text}</a>{/if}
      {/each}
    </p>
  {/if}
</div>

<style lang="scss">
  .greeting {
    /* 表示前後で高さを変えない(1 文目 + 2 文目の高さ) */
    min-height: calc(32px * 1.4 + 8px + 14px * 1.6);
    /* 下のメニュー(枠の装飾)と重ならないよう間を空ける */
    margin: 16px 0 32px;
    padding: 0 16px;
    text-align: center;
  }
  p {
    margin: 0;
    animation: fade-in 0.6s ease both;
  }
  .title {
    font-size: 32px;
    font-weight: bold;
    line-height: 1.4;
    letter-spacing: 0.04em;
  }
  .message {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.75;
    animation-delay: 0.15s;
  }
  a {
    color: var(--active-yellow);
    text-underline-offset: 3px;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    p {
      animation: none;
    }
  }
</style>
