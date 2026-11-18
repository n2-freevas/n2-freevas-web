<script lang="ts">
  import { onMount, untrack } from "svelte";
  import SEO from "#lib/component/seo/index.svelte";

  let { data } = $props();

  /** 1 時間の高さ(px) */
  const HOUR_PX = 44;
  const HOURS = Array.from({ length: 24 }, (_, h) => h);
  const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
  const DAY_MS = 24 * 60 * 60 * 1000;
  const JST_OFFSET = 9 * 60 * 60 * 1000;

  const parse = (date: string) => {
    const [y, m, d] = date.split("-").map(Number);
    return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
  };
  const fmt = (min: number) =>
    `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

  /** 帯の種類(スナップショットの Flag)→ アイコンと帯の色(どれも黄色系) */
  const ICONS: Record<string, { icon: string; label: string; color: string }> =
    {
      t: { icon: "🏏", label: "運動", color: "#ddd23a" },
      w: { icon: "🧳", label: "仕事", color: "#ffbd08" },
      h: { icon: "🏕️", label: "プライベート", color: "#ffd84a" },
      o: { icon: "💻", label: "その他", color: "#ffa31a" },
    };
  /** 帯の色。種類が混ざった帯は先頭(FLAG_ORDER で最優先)の種類の色にする */
  const colorOf = (flags: string) => (ICONS[flags[0]] ?? ICONS.o).color;
  /** 凡例の並び順 */
  const LEGEND = ["w", "h", "t", "o"].map((f) => ICONS[f]);
  const iconsOf = (flags: string) =>
    [...flags].map((f) => ICONS[f] ?? ICONS.o);
  const labelOf = (flags: string) =>
    iconsOf(flags)
      .map((i) => i.label)
      .join("・");

  // 🏏 の帯をクリックしたら、テニスベアのイベントの OGP をそのつど取りに行って出す
  type Preview = {
    title: string;
    description: string | null;
    image: string | null;
    url: string;
  };
  type PreviewState =
    | { status: "loading" }
    | { status: "ok"; data: Preview }
    | { status: "error"; url: string };
  const previewCache = new Map<string, Promise<PreviewState>>();
  const loadPreview = (id: string) => {
    let p = previewCache.get(id);
    if (!p) {
      p = fetch(`/api/calender/event/${id}`)
        .then(async (res) => {
          if (!res.ok) throw new Error(String(res.status));
          return { status: "ok", data: (await res.json()) as Preview } as const;
        })
        .catch(() => {
          previewCache.delete(id); // 失敗したものは、次に開いたときにもう一度取りに行く
          return {
            status: "error",
            url: `https://www.tennisbear.net/event/${id}/info`,
          } as const;
        });
      previewCache.set(id, p);
    }
    return p;
  };

  let popup: {
    date: string;
    start: number;
    end: number;
    items: PreviewState[];
  } | null = $state(null);
  let dialog: HTMLDialogElement | undefined = $state();

  function openPopup(
    date: string,
    b: { start: number; end: number; refs: string[] },
  ) {
    const current = {
      date,
      start: b.start,
      end: b.end,
      items: b.refs.map(() => ({ status: "loading" }) as PreviewState),
    };
    popup = current;
    dialog?.showModal();
    b.refs.forEach((id, i) =>
      loadPreview(id).then((state) => {
        // 待っている間に別の帯を開いていたら捨てる
        if (popup && popup.date === current.date && popup.start === current.start)
          popup.items[i] = state;
      }),
    );
  }
  const popupTitle = $derived.by(() => {
    if (!popup) return "";
    const p = parse(popup.date);
    return `${p.m}/${p.d}(${WEEKDAYS[p.dow]}) ${fmt(popup.start)}–${fmt(popup.end)}`;
  });

  const title = $derived.by(() => {
    const first = parse(data.days[0].date);
    const last = parse(data.days[6].date);
    if (first.y !== last.y)
      return `${first.y}年${first.m}月 – ${last.y}年${last.m}月`;
    if (first.m !== last.m) return `${first.y}年 ${first.m}月 – ${last.m}月`;
    return `${first.y}年 ${first.m}月`;
  });
  const hasAllDay = $derived(data.days.some((d) => d.allDay));
  // 集計した日時(日本時間)
  const updatedLabel = $derived.by(() => {
    if (!data.generatedAt) return "";
    const t = new Date(data.generatedAt + JST_OFFSET);
    return `${t.getUTCMonth() + 1}/${t.getUTCDate()} ${t.getUTCHours()}:${String(t.getUTCMinutes()).padStart(2, "0")} 時点`;
  });

  // 現在時刻の線(日本時間)。1 分ごとに動かす
  let now = $state(Date.now());
  const nowMinutes = $derived(
    Math.floor(((now + JST_OFFSET) % DAY_MS) / 60000),
  );

  let scroller: HTMLDivElement | undefined = $state();

  onMount(() => {
    const timer = setInterval(() => (now = Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  });

  // 週を移るたびに、見やすい時刻まで縦にスクロールしておく(今週なら今の 1 時間ほど前、ほかは 8 時)
  $effect(() => {
    const isThisWeek = data.week === data.thisWeek;
    if (!scroller) return;
    const target = isThisWeek
      ? Math.max(0, untrack(() => nowMinutes) / 60 - 1.5)
      : 8;
    scroller.scrollTop = target * HOUR_PX;
  });
</script>

<SEO
  title="calender"
  description="Taro Nonoyama の予定の埋まり具合(内容は非公開)"
/>

<div class="calender" style:--hour="{HOUR_PX}px">
  <div class="toolbar">
    <a
      class="today-btn"
      class:disabled={data.week === data.thisWeek}
      href="/calender"
      data-sveltekit-noscroll>今日</a
    >
    <div class="nav">
      {#if data.prevWeek}
        <a
          href="/calender?week={data.prevWeek}"
          aria-label="前の週"
          data-sveltekit-noscroll>‹</a
        >
      {:else}
        <span class="disabled" aria-hidden="true">‹</span>
      {/if}
      {#if data.nextWeek}
        <a
          href="/calender?week={data.nextWeek}"
          aria-label="次の週"
          data-sveltekit-noscroll>›</a
        >
      {:else}
        <span class="disabled" aria-hidden="true">›</span>
      {/if}
    </div>
    <h1>{title}</h1>
    <ul class="legend" aria-label="凡例">
      {#each LEGEND as l}<li>
          <i class="swatch" style:background={l.color} aria-hidden="true"></i><span
            aria-hidden="true">{l.icon}</span
          >{l.label}
        </li>{/each}
    </ul>
    <p class="note">
      {#if data.missing}
        この週の予定はまだ集計されていません
      {:else if data.unconfigured}
        予定の取得元が設定されていません
      {:else}
        {data.partial
          ? "一部の予定を読み込めませんでした・"
          : "予定の内容は非公開です・"}{updatedLabel}
      {/if}
    </p>
  </div>

  <div class="head">
    <div class="gutter tz">GMT+09</div>
    {#each data.days as day}
      {@const p = parse(day.date)}
      <div
        class="day-head"
        class:today={day.date === data.today}
        class:sun={p.dow === 0}
        class:sat={p.dow === 6}
      >
        <span class="dow">{WEEKDAYS[p.dow]}</span>
        <span class="num">{p.d}</span>
      </div>
    {/each}
  </div>

  {#if hasAllDay}
    <div class="allday">
      <div class="gutter label">終日</div>
      {#each data.days as day}
        <div class="allday-cell">
          {#if day.allDay}
            <div
              class="band"
              style:background={colorOf(day.allDay)}
              title="{labelOf(day.allDay)}(終日)"
            >
              {#each iconsOf(day.allDay) as i}<span class="icon">{i.icon}</span
                >{/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <div class="scroller" bind:this={scroller}>
    <div class="grid">
      <div class="gutter hours">
        {#each HOURS as h}
          <div class="hour-label">{h === 0 ? "" : `${h}:00`}</div>
        {/each}
      </div>
      {#each data.days as day}
        <div class="col" class:today={day.date === data.today}>
          {#each HOURS as _}<div class="slot"></div>{/each}
          {#each day.blocks as b}
            {@const label = `${labelOf(b.flags)} ${fmt(b.start)}–${fmt(b.end)}`}
            {#if b.refs.length}
              <button
                type="button"
                class="band clickable"
                class:short={b.end - b.start < 60}
                style:background={colorOf(b.flags)}
                style:top="{(b.start / 60) * HOUR_PX}px"
                style:height="{((b.end - b.start) / 60) * HOUR_PX}px"
                title={label}
                aria-label="{label}(イベントの情報を見る)"
                onclick={() => openPopup(day.date, b)}
              >
                {@render bandBody(b)}
              </button>
            {:else}
              <div
                class="band"
                class:short={b.end - b.start < 60}
                style:background={colorOf(b.flags)}
                style:top="{(b.start / 60) * HOUR_PX}px"
                style:height="{((b.end - b.start) / 60) * HOUR_PX}px"
                title={label}
              >
                {@render bandBody(b)}
              </div>
            {/if}
          {/each}
          {#if day.date === data.today}
            <div class="now" style:top="{(nowMinutes / 60) * HOUR_PX}px"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

{#snippet bandBody(b: { start: number; end: number; flags: string })}
  <span class="icons" aria-hidden="true"
    >{#each iconsOf(b.flags) as i}<span class="icon">{i.icon}</span>{/each}</span
  ><span class="time">{fmt(b.start)}–{fmt(b.end)}</span>
{/snippet}

<dialog
  class="popup"
  bind:this={dialog}
  onclose={() => (popup = null)}
  onclick={(e) => {
    // 枠の外(背景)をクリックしたら閉じる
    if (e.target === dialog) dialog?.close();
  }}
>
  {#if popup}
    <div class="popup-inner">
      <header>
        <span>🏏 {popupTitle}</span>
        <button
          type="button"
          class="close"
          aria-label="閉じる"
          onclick={() => dialog?.close()}>×</button
        >
      </header>
      {#each popup.items as item}
        {#if item.status === "loading"}
          <div class="card loading">読み込み中…</div>
        {:else if item.status === "ok"}
          <a
            class="card"
            href={item.data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {#if item.data.image}
              <img src={item.data.image} alt="" loading="lazy" />
            {/if}
            <div class="text">
              <strong>{item.data.title}</strong>
              {#if item.data.description}<p>{item.data.description}</p>{/if}
              <span class="link">テニスベアで見る ↗</span>
            </div>
          </a>
        {:else}
          <a
            class="card loading"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            >イベントの情報を読み込めませんでした。テニスベアで見る ↗</a
          >
        {/if}
      {/each}
    </div>
  {/if}
</dialog>

<style lang="scss">
  .calender {
    --line: rgba(255, 255, 255, 0.12);
    --muted: rgba(255, 255, 255, 0.55);
    --band: var(--active-yellow);
    --gutter: 52px;
    display: flex;
    flex-direction: column;
    height: calc(100svh - var(--header_height, 60px));
    padding: 0 12px;
    color: white;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px 0;
    gap: 8px 16px;
    h1 {
      font-size: 20px;
      font-weight: normal;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      color: var(--muted);
      font-size: 12px;
      gap: 4px 12px;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      span {
        font-size: 14px;
      }
      .swatch {
        width: 14px;
        height: 10px;
        border-radius: 3px;
        opacity: 0.85;
      }
    }
    .note {
      margin-left: auto;
      color: var(--muted);
      font-size: 12px;
    }
  }
  .today-btn {
    padding: 6px 14px;
    border: 1px solid var(--line);
    border-radius: 6px;
    color: white;
    font-size: 14px;
    text-decoration: none;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
  .nav {
    display: flex;
    gap: 4px;
    a,
    span {
      display: grid;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: white;
      font-size: 22px;
      line-height: 1;
      place-items: center;
      text-decoration: none;
    }
    a:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  .head,
  .allday,
  .grid {
    display: grid;
    grid-template-columns: var(--gutter) repeat(7, minmax(0, 1fr));
  }
  .gutter {
    color: var(--muted);
    font-size: 10px;
  }
  .tz {
    align-self: end;
    padding: 0 6px 4px 0;
    text-align: right;
  }
  .day-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--line);
    gap: 2px;
    .dow {
      color: var(--muted);
      font-size: 11px;
    }
    .num {
      display: grid;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 20px;
      place-items: center;
    }
    &.sun .dow {
      color: #ff7a7a;
    }
    &.sat .dow {
      color: #7ab4ff;
    }
    &.today {
      .dow {
        color: var(--band);
      }
      .num {
        background: var(--band);
        color: black;
      }
    }
  }

  .allday {
    border-bottom: 1px solid var(--line);
    .label {
      align-self: center;
      padding-right: 6px;
      text-align: right;
    }
    .allday-cell {
      min-height: 22px;
      padding: 2px;
      border-left: 1px solid var(--line);
    }
    .band {
      height: 18px;
      padding: 0 4px;
      border-radius: 4px;
      background: var(--band);
      font-size: 11px;
      line-height: 18px;
      opacity: 0.85;
    }
  }

  .scroller {
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px; /* お好みの太さに変更（例: 6px） */
    }

    /* スクロールバーの背景（レール）の色 */
    &::-webkit-scrollbar-track {
      background: gray;
    }

    /* スクロールバーのつまみ（動く部分）の色や角丸 */
    &::-webkit-scrollbar-thumb {
      background: white;
      border-radius: 4px;
    }

    /* ホバー時のつまみの色 */
    &::-webkit-scrollbar-thumb:hover {
      background: #ddd;
    }
  }
  .grid {
    position: relative;
  }
  .hours .hour-label {
    position: relative;
    height: var(--hour);
    padding-right: 6px;
    text-align: right;
    transform: translateY(-0.6em);
  }
  .col {
    position: relative;
    border-left: 1px solid var(--line);
    &.today {
      background: rgba(255, 189, 8, 0.04);
    }
    .slot {
      height: var(--hour);
      border-bottom: 1px solid var(--line);
    }
    .band {
      position: absolute;
      right: 3px;
      left: 2px;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      align-items: flex-start;
      padding: 2px 6px;
      border: none;
      border-radius: 4px;
      background: var(--band);
      color: black;
      font: inherit;
      font-size: 11px;
      line-height: 1.3;
      opacity: 0.85;
      text-align: left;
      // 30 分の帯は 1 行に詰める
      &.short {
        flex-direction: row;
        align-items: center;
        padding-top: 0;
        padding-bottom: 0;
        gap: 4px;
      }
      &.clickable {
        cursor: pointer;
        &:hover,
        &:focus-visible {
          opacity: 1;
          outline: 2px solid white;
          outline-offset: -2px;
        }
      }
      .icons {
        font-size: 13px;
        white-space: nowrap;
      }
      .time {
        white-space: nowrap;
      }
    }
    .now {
      position: absolute;
      z-index: 1;
      right: 0;
      left: -1px;
      height: 2px;
      background: #ff4d4d;
      &::before {
        position: absolute;
        top: -5px;
        left: -6px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ff4d4d;
        content: "";
      }
    }
  }

  .popup {
    width: min(420px, calc(100vw - 32px));
    max-height: calc(100svh - 64px);
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    background: #1e1e1e;
    color: white;
    &::backdrop {
      background: rgba(0, 0, 0, 0.6);
    }
    .popup-inner {
      display: flex;
      flex-direction: column;
      padding: 12px;
      gap: 10px;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
    }
    .close {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: white;
      cursor: pointer;
      font-size: 20px;
      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }
    .card {
      display: flex;
      overflow: hidden;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: white;
      text-decoration: none;
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      &.loading {
        padding: 16px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
      }
      img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
      }
      .text {
        display: flex;
        flex-direction: column;
        padding: 10px 12px;
        gap: 6px;
      }
      strong {
        font-size: 14px;
        line-height: 1.4;
      }
      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        line-height: 1.5;
      }
      .link {
        color: var(--active-yellow);
        font-size: 12px;
      }
    }
  }

  @media (width <= 600px) {
    .calender {
      --gutter: 38px;
      padding: 0 4px;
    }
    .day-head .num {
      width: 30px;
      height: 30px;
      font-size: 16px;
    }
    .col .band {
      padding: 1px 2px;
      .time {
        display: none;
      }
    }
    .toolbar .note {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
