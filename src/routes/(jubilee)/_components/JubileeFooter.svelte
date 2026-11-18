<!--
  jubilee 配下の共通フッター。+layout.svelte から全ページに出す。
  ログインしていなくても開けるページ(参加のルール・プライバシーポリシー)へのリンクを置く。
  リンクを増やすときは links に足す。
-->
<script lang="ts">
  import { page } from "$app/state";

  const links = [
    { href: "/jubilee/rules", label: "参加のルール" },
    { href: "/jubilee/privacy", label: "プライバシーポリシー" },
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
