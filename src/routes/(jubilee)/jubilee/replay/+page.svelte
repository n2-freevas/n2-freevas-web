<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_GDRIVE_API_KEY as GDRIVE_API_KEY } from "$app/env/public";
  import JubileeSeo from "../../_components/JubileeSeo.svelte";
  import {
    checkDriveFile,
    driveMediaUrl,
    driveViewUrl,
    parseDriveFileId,
    type DriveProblem,
  } from "./_gdrive";

  /**
   * <sports-video-player> の本体(Webコンポーネント)。
   * https://github.com/n2-freevas/sports-movie-player-in-web の GitHub リリースを static/vendor に置いたもの。
   * hobby/sports-movie-player と同じものを使う。
   */
  const SVP_SRC = "/vendor/sports-video-player/0.2.1/sports-video-player.js";

  let loadError = false;

  onMount(() => {
    // カスタム要素の登録はブラウザでだけ行う(SSR/プリレンダー時は読み込まない)
    if (customElements.get("sports-video-player")) return;
    import(/* @vite-ignore */ SVP_SRC).catch(() => {
      loadError = true;
    });
  });

  // ───────────── 動画の読み込み ─────────────
  // プレーヤーは src(Google Drive)か loadFile(端末のファイル)で受け取って再生するだけ
  // (file-picker を付けないので動画を選ぶUIは出ない)。
  // どちらから読むかを決め、読み込めたかを見届けるのはこのページの役割。

  type Player = HTMLElement & { loadFile(file: File): Promise<void> };

  let player: Player;
  let fileInput: HTMLInputElement;
  let driveLink = "";
  /** 端末のファイルを読み込めなかったときの文言 */
  let localError = "";
  /** Google Drive の共有リンクの誤りなど、直せば読み込み直せるエラーの文言 */
  let driveError = "";
  /**
   * Google Drive の使用制限に当たったか。当たったらこのページを開いている間は
   * Drive からの読み込みを受け付けず、ダウンロードして端末から再生してもらう。
   */
  let driveBlocked = false;
  /** 使用制限に当たった動画の Drive のページ(ここからダウンロードしてもらう) */
  let downloadUrl = "";
  /** 読み込み中の動画、または再生中の動画の出どころ */
  let source: "drive" | "local" | null = null;
  /** 今プレーヤーに入れている Google Drive の動画のファイルID */
  let currentDriveId = "";
  /** 動画を選んでから、プレーヤーが動画の情報を読み込むまで */
  let loading = false;
  /** 動画を1本でも読み込めたか。読み込めるまでは入力欄を閉じられない */
  let hasVideo = false;
  let overlayOpen = true;

  function clearErrors() {
    localError = "";
    driveError = "";
  }

  async function loadFromDrive() {
    if (!GDRIVE_API_KEY || driveBlocked || loading) return;
    clearErrors();
    const fileId = parseDriveFileId(driveLink);
    if (!fileId) {
      driveError = "Google Drive の共有リンクを読み取れませんでした。";
      return;
    }
    loading = true;
    source = "drive";
    const problem = await checkDriveFile(fileId, GDRIVE_API_KEY);
    if (problem) {
      loading = false;
      showDriveProblem(problem, fileId);
      return;
    }
    // 結果はプレーヤーの svp-load / svp-error で受け取る。
    // 同じ動画を開き直したときも読み込み直すよう、一度外してから設定する
    currentDriveId = fileId;
    player.removeAttribute("src");
    player.setAttribute("src", driveMediaUrl(fileId, GDRIVE_API_KEY));
  }

  function showDriveProblem(problem: DriveProblem, fileId: string) {
    switch (problem) {
      case "notFound":
        driveError =
          "動画が見つかりません。共有設定が「リンクを知っている全員」になっているか確認してください。";
        return;
      case "notVideo":
        driveError = "このリンクは動画ファイルではありません。";
        return;
      case "offline":
        driveError =
          "Google Drive に接続できませんでした。通信環境を確認してください。";
        return;
      case "limited":
        blockDrive(fileId);
        return;
    }
  }

  /** Drive の使用制限に当たったので、Drive からの読み込みを止めて端末からの再生に誘導する */
  function blockDrive(fileId: string) {
    driveBlocked = true;
    downloadUrl = driveViewUrl(fileId);
    driveLink = "";
    overlayOpen = true;
  }

  function chooseLocalFile() {
    if (loading) return;
    fileInput.value = ""; // 同じファイルを選び直しても change が起きるように
    fileInput.click();
  }

  function onLocalFileChange() {
    const file = fileInput.files?.[0];
    if (!file) return;
    clearErrors();
    loading = true;
    source = "local";
    currentDriveId = "";
    player.removeAttribute("src");
    // 結果は svp-load / svp-error で受け取るので、Promise の失敗はここでは見ない
    player.loadFile(file).catch(() => {});
  }

  function onPlayerLoad() {
    if (!loading) return;
    loading = false;
    hasVideo = true;
    overlayOpen = false;
    driveLink = "";
  }

  function onPlayerError(e: Event) {
    const { code, message } = (
      e as CustomEvent<{ code: string; message: string }>
    ).detail;
    if (source === "drive" && (loading || code === "network")) {
      // 読み込みの途中でも、再生中(シークの先読みなど)でも、Drive から取れなくなったら止める。
      // <video> のエラーからは理由がわからないが、共有設定は読み込み前に確かめているので、
      // 多くは Drive の使用制限に当たったもの
      loading = false;
      blockDrive(currentDriveId);
      return;
    }
    if (!loading) return;
    loading = false;
    localError = message;
  }

  function openOverlay() {
    clearErrors();
    overlayOpen = true;
  }
</script>

<JubileeSeo
  title="replay"
  description="試合の動画をタップとスワイプで振り返る。"
/>

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
          <h2 id="replay-overlay-title">動画を読み込む</h2>

          <button
            class="local"
            type="button"
            on:click={chooseLocalFile}
            disabled={loading}
          >
            {loading && source === "local"
              ? "読み込み中…"
              : "端末の動画ファイルを選ぶ"}
          </button>
          <input
            bind:this={fileInput}
            type="file"
            accept="video/*"
            on:change={onLocalFileChange}
            hidden
          />
          {#if localError}
            <p class="error-text" role="alert">{localError}</p>
          {/if}

          {#if GDRIVE_API_KEY}
            <div class="drive-section" class:blocked={driveBlocked}>
              <h3>Google Drive から読み込む <span class="beta">beta</span></h3>
              <form class="drive" on:submit|preventDefault={loadFromDrive}>
                <input
                  type="url"
                  bind:value={driveLink}
                  placeholder="共有リンクを貼り付け"
                  aria-label="Google Drive の共有リンク"
                  disabled={loading || driveBlocked}
                />
                <button
                  type="submit"
                  disabled={loading || driveBlocked || !driveLink.trim()}
                >
                  {loading && source === "drive" ? "読み込み中…" : "読み込む"}
                </button>
              </form>
              {#if driveBlocked}
                <p class="error-text" role="alert">
                  Google Drive の使用制限により読み込めませんでした。
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration: underline;"
                  >
                    Google Drive から直接動画を端末にダウンロード
                  </a>
                  し、「端末の動画ファイルを選ぶ」からその動画を選んでください。
                </p>
              {:else if driveError}
                <p class="error-text" role="alert">{driveError}</p>
              {:else}
                <p class="note">
                  試験中の機能です。Google Drive
                  の使用制限により読み込めないことがあります。動画の共有設定を「リンクを知っている全員」にしてから、共有リンクを貼り付けてください。
                </p>
              {/if}
            </div>
          {/if}

          {#if hasVideo}
            <button
              class="close"
              type="button"
              on:click={() => (overlayOpen = false)}
              disabled={loading}
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
      calc(
        (90svh - var(--jubilee-header-height) - var(--below-height)) * 16 / 9
      )
    );
    border: solid 1px #222;
    padding: 6px;
    background-image:
      radial-gradient(#5e5e5e 20%, transparent 20%),
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
      border: solid 1px #777;
      border-radius: 6px;
      background: none;
      color: white;
      font-size: 14px;
      white-space: nowrap;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
  .note,
  .error-text {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
  }
  .note {
    color: #999;
  }
  .error-text {
    color: #ff8a80;
  }
  .error-text a {
    color: inherit;
    text-underline-offset: 3px;
  }
  .local {
    align-self: stretch;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background: white;
    color: black;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
  .drive-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 6px;
    padding-top: 12px;
    border-top: solid 1px #333;
    &.blocked h3 {
      opacity: 0.5;
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
      color: #ccc;
      font-size: 13px;
    }
  }
  .beta {
    padding: 1px 6px;
    border: solid 1px #888;
    border-radius: 999px;
    color: #bbb;
    font-size: 10px;
    font-weight: normal;
    letter-spacing: 0.05em;
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
