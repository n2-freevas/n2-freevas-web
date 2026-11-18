<!--
  jubilee 配下の共通フッター。+layout.svelte から全ページに出す。
  ログインしていなくても開けるページ(トップ・参加のルール・プライバシーポリシー)と、
  創設者のサイト(n2freevas.com 本体のトップ)へのリンクを置く。
  リンクを増やすときは links に足す。
-->
<script lang="ts">
  import { page } from "$app/state";
  import { greetingHref } from "#lib/component/greeting/greetings.ts";

  const links = [
    { href: "/jubilee", label: "TOP" },
    { href: "/jubilee/rules", label: "参加のルール" },
    { href: "/jubilee/privacy", label: "プライバシーポリシー" },
    // n2freevas.com のトップを「jubilee の創設者です」のあいさつで開く
    { href: greetingHref("/", "jf"), label: "創設者について" },
  ];

  const year = new Date().getFullYear();
</script>

<footer>
  <nav aria-label="jubilee のフッター">
    <ul>
      {#each links as link}
        <li>
          <a
            href={link.href}
            aria-current={page.url.pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <p class="copyright">© {year} Jubilee</p>
</footer>

<style lang="scss">
  footer {
    padding: 24px 16px calc(24px + env(safe-area-inset-bottom, 0px));
    border-top: solid 1px rgba(0, 0, 0, 0.06);
    text-align: center;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 20px;
    margin: 0 0 10px;
    padding: 0;
    list-style: none;
  }
  a {
    color: #666;
    font-size: 12px;
    text-underline-offset: 3px;
    &[aria-current="page"] {
      color: #222;
      text-decoration: none;
      pointer-events: none;
    }
  }
  .copyright {
    margin: 0;
    color: #999;
    font-size: 11px;
  }
</style>
