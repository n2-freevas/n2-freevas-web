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
  const fmt = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

  const title = $derived.by(() => {
    const first = parse(data.days[0].date);
    const last = parse(data.days[6].date);
    if (first.y !== last.y) return `${first.y}年${first.m}月 – ${last.y}年${last.m}月`;
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
  const nowMinutes = $derived(Math.floor(((now + JST_OFFSET) % DAY_MS) / 60000));

  let scroller: HTMLDivElement | undefined = $state();

  onMount(() => {
    const timer = setInterval(() => (now = Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  });

  // 週を移るたびに、見やすい時刻まで縦にスクロールしておく(今週なら今の 1 時間ほど前、ほかは 8 時)
  $effect(() => {
    const isThisWeek = data.week === data.thisWeek;
    if (!scroller) return;
    const target = isThisWeek ? Math.max(0, untrack(() => nowMinutes) / 60 - 1.5) : 8;
    scroller.scrollTop = target * HOUR_PX;
  });
</script>

<SEO title="calender" description="Taro Nonoyama の予定の埋まり具合(内容は非公開)" />

<div class="calender" style:--hour="{HOUR_PX}px">
  <div class="toolbar">
    <a class="today-btn" class:disabled={data.week === data.thisWeek} href="/calender" data-sveltekit-noscroll>今日</a>
    <div class="nav">
      {#if data.prevWeek}
        <a href="/calender?week={data.prevWeek}" aria-label="前の週" data-sveltekit-noscroll>‹</a>
      {:else}
        <span class="disabled" aria-hidden="true">‹</span>
      {/if}
      {#if data.nextWeek}
        <a href="/calender?week={data.nextWeek}" aria-label="次の週" data-sveltekit-noscroll>›</a>
      {:else}
        <span class="disabled" aria-hidden="true">›</span>
      {/if}
    </div>
    <h1>{title}</h1>
    <p class="note">
      {#if data.missing}
        この週の予定はまだ集計されていません
      {:else if data.unconfigured}
        予定の取得元が設定されていません
      {:else}
        {data.partial ? "一部の予定を読み込めませんでした・" : "予定の内容は非公開です・"}{updatedLabel}
      {/if}
    </p>
  </div>

  <div class="head">
    <div class="gutter tz">GMT+09</div>
    {#each data.days as day}
      {@const p = parse(day.date)}
      <div class="day-head" class:today={day.date === data.today} class:sun={p.dow === 0} class:sat={p.dow === 6}>
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
          {#if day.allDay}<div class="band" title="予定あり(終日)"></div>{/if}
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
            <div
              class="band"
              style:top="{(b.start / 60) * HOUR_PX}px"
              style:height="{Math.max(((b.end - b.start) / 60) * HOUR_PX, 4)}px"
              title="予定あり {fmt(b.start)}–{fmt(b.end)}"
            >
              {#if b.end - b.start >= 45}<span>{fmt(b.start)}–{fmt(b.end)}</span>{/if}
            </div>
          {/each}
          {#if day.date === data.today}
            <div class="now" style:top="{(nowMinutes / 60) * HOUR_PX}px"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

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
      border-radius: 4px;
      background: var(--band);
      opacity: 0.85;
    }
  }

  .scroller {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
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
      overflow: hidden;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--band);
      color: black;
      font-size: 11px;
      line-height: 1.3;
      opacity: 0.85;
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
    .col .band span {
      display: none;
    }
    .toolbar .note {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
