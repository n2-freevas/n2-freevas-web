<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_GDRIVE_API_KEY as GDRIVE_API_KEY } from "$app/env/public";
  import JubileeSeo from "../../_components/JubileeSeo.svelte";
  import { checkDriveFile, driveMediaUrl, parseDriveFileId } from "./_gdrive";

  /**
   * <sports-video-player> の本体(Webコンポーネント)。
   * https://github.com/n2-freevas/sports-movie-player-in-web の GitHub リリースを static/vendor に置いたもの。
   * hobby/sports-movie-player と同じものを使う。
   */
  const SVP_SRC = "/vendor/sports-video-player/0.1.0/sports-video-player.js";

  let loadError = false;

  onMount(() => {
    // カスタム要素の登録はブラウザでだけ行う(SSR/プリレンダー時は読み込まない)
    if (customElements.get("sports-video-player")) return;
    import(/* @vite-ignore */ SVP_SRC).catch(() => {
      loadError = true;
    });
  });

  // ───────────── Google Drive の動画の読み込み ─────────────
  // プレーヤーは src を受け取って再生するだけ(file-picker を付けないので動画を選ぶUIは出ない)。
  // 共有リンクから src を作り、読み込めたかを見届けるのはこのページの役割。

  let player: HTMLElement;
  let driveLink = "";
  let driveError = "";
  /** 共有リンクの確認から、プレーヤーが動画の情報を読み込むまで */
  let driveLoading = false;
  /** 動画を1本でも読み込めたか。読み込めるまでは入力欄を閉じられない */
  let hasVideo = false;
  let overlayOpen = true;

  async function loadFromDrive() {
    if (!GDRIVE_API_KEY || driveLoading) return;
    driveError = "";
    const fileId = parseDriveFileId(driveLink);
    if (!fileId) {
      driveError = "Google Drive の共有リンクを読み取れませんでした。";
      return;
    }
    driveLoading = true;
    const problem = await checkDriveFile(fileId, GDRIVE_API_KEY);
    if (problem) {
      driveError = problem;
      driveLoading = false;
      return;
    }
    // 結果はプレーヤーの svp-load / svp-error で受け取る。
    // 同じ動画を開き直したときも読み込み直すよう、一度外してから設定する
    player.removeAttribute("src");
    player.setAttribute("src", driveMediaUrl(fileId, GDRIVE_API_KEY));
  }

  function onPlayerLoad() {
    if (!driveLoading) return;
    driveLoading = false;
    hasVideo = true;
    overlayOpen = false;
    driveLink = "";
  }

  function onPlayerError(e: Event) {
    if (!driveLoading) return;
    driveLoading = false;
    driveError = (e as CustomEvent<{ message: string }>).detail.message;
  }

  function openOverlay() {
    driveError = "";
    overlayOpen = true;
  }
</script>

<JubileeSeo title="replay" description="試合の動画をタップとスワイプで振り返る。" />

<section class="replay-page">
  <div class="player-frame">
    <sports-video-player
      bind:this={player}
      on:svp-load={onPlayerLoad}
      on:svp-error={onPlayerError}
    ></sports-video-player>

    {#if loadError}
      <p class="error">プレーヤーの読み込みに失敗しました。</p>
    {:else if overlayOpen}
      <!-- 動画を読み込めるまではプレーヤーの上に重ねたまま、閉じられないようにする -->
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="replay-overlay-title"
      >
        <div class="overlay-body">
          <h2 id="replay-overlay-title">Google Drive の動画を読み込む</h2>
          {#if GDRIVE_API_KEY}
            <form class="drive" on:submit|preventDefault={loadFromDrive}>
              <input
                type="url"
                bind:value={driveLink}
                placeholder="共有リンクを貼り付け"
                aria-label="Google Drive の共有リンク"
                disabled={driveLoading}
              />
              <button
                type="submit"
                disabled={driveLoading || !driveLink.trim()}
              >
                {driveLoading ? "読み込み中…" : "読み込む"}
              </button>
            </form>
            {#if driveError}
              <p class="drive-error" role="alert">{driveError}</p>
            {:else}
              <p class="note">
                動画の共有設定を「リンクを知っている全員」にしてから、共有リンクを貼り付けてください。
              </p>
            {/if}
          {:else}
            <p class="drive-error">
              Google Drive の API
              キーが設定されていないため、動画を読み込めません。
            </p>
          {/if}
          {#if hasVideo}
            <button
              class="close"
              type="button"
              on:click={() => (overlayOpen = false)}
              disabled={driveLoading}
            >
              今の動画に戻る
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  {#if hasVideo && !overlayOpen}
    <button class="change" type="button" on:click={openOverlay}
      >別の動画を読み込む</button
    >
  {/if}
</section>

<style lang="scss">
  .replay-page {
    --below-height: 80px; /* プレーヤーの下(「別の動画を読み込む」ボタン)の分 */
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
  }
  .player-frame {
    position: relative;
    /* 16:9 のプレーヤーが、jubilee のヘッダーと下の欄を除いた高さに収まる幅にする */
    width: min(
      100%,
      calc((90svh - var(--jubilee-header-height) - var(--below-height)) * 16 / 9)
    );
    border: solid 1px #222;
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
  .overlay {
    position: absolute;
    inset: 6px; /* .player-frame の padding の内側(プレーヤーの上)に重ねる */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    /*
      下のプレーヤーの操作パネルや案内文が重なって見えないよう、不透明にする。
      (プレーヤーの操作パネルはぼかし効果で描かれるため、少しでも透けるとはっきり見えてしまう)
    */
    background: #000;
    z-index: 1;
    /* エラー文が長いときなど、プレーヤーの高さに収まらなければ中でスクロールさせる */
    overflow-y: auto;
    @media (max-width: 480px) {
      padding: 12px;
    }
  }
  .overlay-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: min(100%, 520px);
    /* 中でスクロールするときに上が切れないようにする */
    margin: auto 0;
    h2 {
      margin: 0;
      color: white;
      font-size: 15px;
    }
  }
  .drive {
    display: flex;
    gap: 8px;
    input {
      flex: 1;
      min-width: 0;
      padding: 8px 10px;
      border: solid 1px #555;
      border-radius: 6px;
      background: #181818;
      color: white;
      font-size: 14px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background: white;
      color: black;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
  .note,
  .drive-error {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
  }
  .note {
    color: #999;
  }
  .drive-error {
    color: #ff8a80;
  }
  .close,
  .change {
    align-self: flex-start;
    padding: 0;
    border: none;
    background: none;
    color: #bbb;
    font-size: 13px;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
  .change {
    align-self: flex-end;
    /* プレーヤーの外(明るい背景)に出るので濃い色にする */
    color: #555;
  }
</style>
