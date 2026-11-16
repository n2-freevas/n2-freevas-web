<!-- jubilee を使えないとき(許可リストにない・ログイン失敗・準備中・ログアウト後)の案内 -->
<script lang="ts">
  import { page } from "$app/state";
  import JubileeSeo from "../../../_components/JubileeSeo.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const reason = $derived(page.url.searchParams.get("reason"));
</script>

<JubileeSeo title="ログイン" />

<section class="denied">
  {#if reason === "logout"}
    <h1>ログアウトしました</h1>
    <a class="button" href="/jubilee/auth/login" data-sveltekit-reload>Google アカウントでログイン</a>
  {:else if reason === "config"}
    <h1>準備中です</h1>
    <p>ログインの設定が完了していないため、現在は利用できません。</p>
  {:else if reason === "failed"}
    <h1>ログインできませんでした</h1>
    <p>もう一度お試しください。</p>
    <a class="button" href="/jubilee/auth/login" data-sveltekit-reload>Google アカウントでログイン</a>
  {:else if data.email}
    <h1>このアカウントでは利用できません</h1>
    <p>
      <strong>{data.email}</strong> は jubilee の利用者として登録されていません。<br />
      利用したい場合は管理者に連絡するか、別のアカウントでログインしてください。
    </p>
    <form method="POST" action="/jubilee/auth/logout">
      <button class="button" type="submit">ログアウトして別のアカウントで入る</button>
    </form>
  {:else}
    <h1>ログインが必要です</h1>
    <a class="button" href="/jubilee/auth/login" data-sveltekit-reload>Google アカウントでログイン</a>
  {/if}
</section>

<style lang="scss">
  .denied {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 560px;
    margin: 0 auto;
    padding: 48px 16px;
    text-align: center;
  }
  h1 {
    margin: 0;
    font-size: 18px;
  }
  p {
    margin: 0;
    color: #555;
    font-size: 14px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 999px;
    background: #222;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }
</style>
