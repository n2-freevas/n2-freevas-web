<script lang="ts">
  import { onMount } from "svelte";
  import SEO from "#lib/component/seo/index.svelte";

  /**
   * <sports-video-player> の本体(Webコンポーネント)。
   * https://github.com/n2-freevas/sports-movie-player-in-web の GitHub リリース
   * (v0.2.0 の sports-video-player.js) を static/vendor に置いたもの。
   * 更新するときは新しいバージョンのディレクトリを作り、このパスを差し替える。
   */
  const SVP_SRC = "/vendor/sports-video-player/0.2.0/sports-video-player.js";

  let loadError = false;

  onMount(() => {
    // カスタム要素の登録はブラウザでだけ行う(SSR/プリレンダー時は読み込まない)
    if (customElements.get("sports-video-player")) return;
    import(/* @vite-ignore */ SVP_SRC).catch(() => {
      loadError = true;
    });
  });
</script>

<SEO
  title="sports movie player"
  description="タップとスワイプだけでN秒スキップと速度変更ができる動画プレーヤー。"
/>

<section class="player-page">
  <div class="player-frame">
    <sports-video-player file-picker></sports-video-player>
    {#if loadError}
      <p class="error">プレーヤーの読み込みに失敗しました。</p>
    {/if}
  </div>
  <ul class="howto">
    <li><span>左右ダブルタップ</span>巻き戻し・送り(続けてタップで追加)</li>
    <li><span>中央タップ</span>再生・停止</li>
    <li><span>縦スワイプ</span>上で速く、下で遅く(0.1〜2倍)</li>
  </ul>
  <hr />
  <p>
    スポーツ観戦や、スポーツのプレーを動画で分析する時に、スマートフォンで巻き戻し/送りや、
    スロー再生の操作を頻繁に行うわけだが、特にスマートフォン環境で、それら全ての操作がやり易いと感じた動画プレイヤーが存在しませんでした。
  </p>
  <p>このプロダクトは、そこだけに特化した動画プレーヤーです。</p>
  <p>
    特徴として、PC/スマートフォン問わず、再生中の画面内で最小のジェスチャーでそれらの操作を可能にしている点があります。
    左右が巻き戻し・送り、縦の操作が再生速度に影響するシンプルなデザインです。
  </p>
</section>

<style lang="scss">
  .player-page {
    --howto-height: 80px; /* 下の操作説明の分 */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 収まらないときも上(ヘッダー側)にはみ出さないようにする */
    justify-content: safe center;
    gap: 16px;
    max-width: 960px;
    margin: 0 auto;
    padding: 16px;
    padding-bottom: 120px;

    hr {
      width: 100%;
      margin: 32px 0;
    }

    p {
      width: 100%;
      font-size: 14px;
    }
  }
  .player-frame {
    position: relative;
    /* 16:9 のプレーヤーが、ヘッダーと操作説明を除いた高さに収まる幅にする */
    width: min(
      100%,
      calc((90svh - var(--header_height) - var(--howto-height) - 60px) * 16 / 9)
    );
    border: solid 1px white;
    padding: 6px;
    background-image: radial-gradient(#5e5e5e 20%, transparent 20%),
      radial-gradient(#4c4c4c 20%, transparent 20%);
    background-size: 5px 5px;
    background-position:
      0 0,
      5px 5px;
  }
  sports-video-player {
    display: block;
    width: 100%;
  }
  .error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 13px;
  }
  .howto {
    width: 100%;
    color: #bbb;
    font-size: 12px;
    line-height: 1.8;
    span {
      display: inline-block;
      min-width: 9em;
      color: white;
      font-weight: bold;
    }
  }
</style>
