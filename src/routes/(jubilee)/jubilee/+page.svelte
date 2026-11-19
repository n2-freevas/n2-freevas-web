<!--
  jubilee のトップ。ログインなしで見られる。
  上から、ヒーロー(ロゴとイラスト)・ジュビリーについて・ページの一覧の順に並べる。
  ページの一覧は #lib/jubilee/access.ts の FEATURES で、見ている人が開けない機能(メンバー用)は出さない。
  ヒーローとカードの色は statue-image.svg の 4 色(青・赤・黄・薄い青)とロゴの紺から取っている。
-->
<script lang="ts">
  import { canVisit, FEATURES } from "#lib/jubilee/access.ts";
  import JubileeSeo from "../_components/JubileeSeo.svelte";
  import JubileeStatue from "../_components/JubileeStatue.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  /** 練習会の申し込み先(参加のルールの「申し込みとキャンセル」と同じ) */
  const ENTRY_URL = "https://www.tennisbear.net/pickleball/circle/123286/info";

  const features = $derived(FEATURES.filter((f) => canVisit(f.path, data)));
  /** メンバー用の機能を隠しているか */
  const hidingMemberFeatures = $derived(features.length < FEATURES.length);
</script>

<JubileeSeo />

<section class="hero" aria-labelledby="hero-title">
  <div class="hero-inner">
    <div class="hero-text">
      <h1 id="hero-title">
        <img
          class="logo"
          src="/jubilee/logo_full_gray.svg"
          alt="Jubilee Pickleball Community"
        />
      </h1>

      <div class="actions">
        <a
          class="button primary"
          href={ENTRY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          練習会に申し込む
        </a>
        <a class="button" href="/jubilee/rules">参加のルール</a>
      </div>
    </div>
    <div class="hero-visual">
      <JubileeStatue class="statue-art" />
    </div>
  </div>
</section>

<section class="about" aria-labelledby="about-title">
  <div class="section-inner">
    <p class="eyebrow">ABOUT</p>
    <h2 id="about-title">ジュビリーについて</h2>
    <ul class="cards">
      <li class="card blue">
        <h3>ピックルボールの<br />サークルです</h3>
        <p>
          近年急成長中のスポーツ、ピックルボールを経て、技術の上達・自身の成長・仲間との交流を楽しむサークルです
        </p>
      </li>
      <li class="card red">
        <h3>オープンな<br />団体です</h3>
        <p>
          ピックルボールを多くの人に体験してもらうため、受け入れ人数の許す限り練習会や大会もオープン化を目指します。
        </p>
      </li>
      <li class="card yellow">
        <h3>持続的なプレー環境を<br />目指します</h3>
        <p>
          高額なレンタルコート・専門性の高すぎる用具・ハイフィーなコーチに頼らず、頭を使って継続的に練習できる環境を目指します
        </p>
      </li>
    </ul>
  </div>
</section>

<section class="pages" aria-labelledby="pages-title">
  <div class="section-inner">
    <p class="eyebrow">PAGES</p>
    <h2 id="pages-title">ページ</h2>
    <ul class="features">
      {#each features as feature}
        <li>
          <a href={feature.path}>
            <span class="name">{feature.name}</span>
            <span class="explain">{feature.explain}</span>
          </a>
        </li>
      {/each}
    </ul>
    {#if hidingMemberFeatures}
      <p class="hint">
        {#if data.email}
          このアカウントはメンバーとして登録されていないため、メンバー向けの機能は表示されません。
        {:else}
          メンバーの方は、右上の「ログイン」からログインすると、メンバー向けの機能が表示されます。
        {/if}
      </p>
    {/if}
  </div>
</section>

<style lang="scss">
  /* statue-image.svg とロゴの色 */
  $navy: #3b5d78;
  $blue: #0d84ae;
  $red: #e54b67;
  $yellow: #e5c147;
  $pale: #c2d4e2;
  $ease: cubic-bezier(0.22, 1, 0.36, 1);

  .section-inner,
  .hero-inner {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* ---------- ヒーロー ---------- */
  .hero {
    overflow: hidden;
    padding: 40px 0 56px;
  }
  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 12px;
  }
  h1 {
    margin: 0;
    line-height: 0;
  }
  .logo {
    display: block;
    width: min(100%, 300px);
    height: auto;
  }
  .actions {
    /* ボタンを等幅にする。中身に合わせた幅の grid で列を 1fr にすると、
       どの列も一番長いボタン(の中身)の幅にそろう */
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 12px;
    margin-top: 28px;
  }
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 22px;
    border: solid 1.5px $navy;
    border-radius: 999px;
    color: $navy;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease;
    &:hover {
      background: rgba($navy, 0.08);
    }
    &:active {
      transform: scale(0.97);
    }
    &.primary {
      background: $navy;
      color: white;
      &:hover {
        background: #304d64;
      }
    }
  }
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    /* イラストの後ろに淡い円を敷く */
    &::before {
      content: "";
      position: absolute;
      inset: 8% 4%;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba($pale, 0.55),
        rgba($pale, 0) 70%
      );
    }
    :global(.statue-art) {
      position: relative;
      width: min(100%, 420px);
    }
  }

  /* 読み込み時に文字を少し下から出す(イラストは JubileeStatue が自分で登場する) */
  .hero-text {
    animation: rise 0.9s $ease both;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  /* ---------- 共通の見出し ---------- */
  .about,
  .pages {
    padding: 56px 0;
  }
  .about {
    background: white;
  }
  .eyebrow {
    margin: 0 0 6px;
    color: $blue;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.16em;
  }
  h2 {
    margin: 0 0 28px;
    color: $navy;
    font-size: 22px;
  }

  /* ---------- ジュビリーについて ---------- */
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .card {
    padding: 20px 20px 22px;
    border-top: solid 4px var(--accent);
    border-radius: 4px 4px 12px 12px;
    background: #f6f3ee;
    &.blue {
      --accent: #{$blue};
    }
    &.red {
      --accent: #{$red};
    }
    &.yellow {
      --accent: #{$yellow};
    }
    h3 {
      margin: 0 0 8px;
      font-size: 16px;
    }
    p {
      margin: 0;
      color: #555;
      font-size: 13px;
      line-height: 1.8;
    }
  }

  /* ---------- ページの一覧 ---------- */
  .features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
    a {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 16px;
      border: solid 1px rgba($navy, 0.35);
      border-radius: 8px;
      background: white;
      color: inherit;
      text-decoration: none;
      transition: border-color 0.2s ease;
      &:hover {
        border-color: $navy;
      }
    }
  }
  .name {
    font-size: 15px;
    font-weight: bold;
  }
  .explain {
    color: #666;
    font-size: 13px;
  }
  .hint {
    margin: 16px 0 0;
    color: #666;
    font-size: 12px;
    line-height: 1.8;
  }

  /* ---------- 狭い画面 ---------- */
  @media (max-width: 720px) {
    .hero {
      padding: 24px 0 40px;
    }
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 8px;
      text-align: center;
    }
    .logo {
      width: min(80%, 300px);
      margin: 0 auto;
    }
    .hero-visual {
      order: -1;
      :global(.statue-art) {
        width: min(70%, 300px);
      }
    }
    .cards {
      grid-template-columns: 1fr;
    }
  }
  /* 横に 2 つ並ばないほど狭いときは縦に積む(幅はそろったまま) */
  @media (max-width: 359px) {
    .actions {
      grid-auto-flow: row;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-text {
      animation: none;
    }
    .button {
      transition: none;
    }
  }
</style>
