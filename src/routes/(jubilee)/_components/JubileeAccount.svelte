<!--
  ヘッダー右上のログイン状態。
    ログインしていない → 「ログイン」(ログイン後は今のページに戻る)
    ログイン中         → 「ログイン済」。押すとメールアドレスとログアウトを出す
  認証用のページでは何も出さない。
  プレビュー環境(アクセス確認を省いている)でも同じように出し、メニューにその旨を添える。
-->
<script lang="ts">
  import { page } from "$app/state";

  let {
    email,
    member,
    authSkipped,
  }: { email: string | null; member: boolean; authSkipped: boolean } = $props();

  const onAuthPage = $derived(page.url.pathname.startsWith("/jubilee/auth"));
  const loginHref = $derived(
    `/jubilee/auth/login?returnTo=${encodeURIComponent(page.url.pathname + page.url.search)}`,
  );

  let menu: HTMLDetailsElement | undefined = $state();

  /** メニューの外を押したら閉じる */
  function closeOnOutside(event: PointerEvent) {
    if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
  }
</script>

<svelte:document onpointerdown={closeOnOutside} />

{#if !onAuthPage}
  <div class="account">
    {#if email}
      <details bind:this={menu}>
        <summary>ログイン済</summary>
        <div class="menu">
          <p class="email">{email}</p>
          {#if authSkipped}
            <p class="note">プレビュー環境のため、アクセス確認を省いています。</p>
          {:else if !member}
            <p class="note">このアカウントはメンバーとして登録されていません。</p>
          {/if}
          <form method="POST" action="/jubilee/auth/logout">
            <button type="submit">ログアウト</button>
          </form>
        </div>
      </details>
    {:else}
      <!-- ログインはサーバーの処理(Google へ転送)なので、ページ遷移ではなく通常の読み込みにする -->
      <a class="pill login" href={loginHref} data-sveltekit-reload>ログイン</a>
    {/if}
  </div>
{/if}

<style lang="scss">
  .account {
    position: absolute;
    top: calc(env(safe-area-inset-top, 0px) + 12px);
    right: 16px;
    font-size: 12px;
  }

  .pill,
  summary {
    display: inline-block;
    padding: 4px 12px;
    border: solid 1px #ccc;
    border-radius: 999px;
    background: white;
    color: #555;
    line-height: 1.6;
    text-decoration: none;
    cursor: pointer;
  }

  .login {
    border-color: #222;
    background: #222;
    color: white;
    font-weight: bold;
  }

  summary {
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }
    &::before {
      content: "✓ ";
      color: #2e8b57;
    }
  }

  details[open] summary {
    border-color: #999;
  }

  .menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    width: max-content;
    max-width: min(280px, calc(100vw - 32px));
    padding: 12px;
    border: solid 1px #ddd;
    border-radius: 8px;
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    text-align: left;
  }

  .email {
    margin: 0 0 8px;
    color: #333;
    overflow-wrap: anywhere;
  }

  .note {
    margin: 0 0 8px;
    color: #a15c00;
    line-height: 1.6;
  }

  button {
    width: 100%;
    padding: 6px 10px;
    border: solid 1px #ccc;
    border-radius: 6px;
    background: white;
    color: #555;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background: #f4f4f4;
    }
  }
</style>
