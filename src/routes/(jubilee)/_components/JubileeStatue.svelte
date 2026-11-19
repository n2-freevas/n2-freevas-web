<!--
  jubilee のトップの絵(statue-image.svg)を、登場アニメーション付きで描く。
  動きの中身は #lib/jubilee/statue/statue.ts(9 人が惑星のように公転 → 渦を巻いて散る → 人の形に咲く)。

  - サーバーが返す HTML には完成形を入れておき、JS が動き出すまでは隠す。
    JS が読み込めない・遅いときは、CSS だけで少し後に完成形を出す(そのときはアニメーションしない)
  - OS の「視差効果を減らす」設定の人には、最初から完成形を出す
  - 惑星が立体的に回るあいだは、奥にいる人ほど後ろに描くよう、人(とボール)の重ね順を毎コマ並べ替える。
    終わったら SVG の元の並び順に戻す
  - 変形の途中で輪郭が自分と交差すると、fill-rule="evenodd" では穴が開いて見えるので、
    アニメーション中だけ nonzero で塗り、終わったら元に戻す
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { createStatueMotion, STATUE } from "#lib/jubilee/statue/statue.ts";

  let { class: className = "" }: { class?: string } = $props();

  let svg: SVGSVGElement;
  const groups: SVGGElement[] = $state([]);
  const paths: SVGPathElement[] = $state([]);
  const balls: SVGEllipseElement[] = $state([]);
  /** waiting: JS が動き出すのを待っている / playing: アニメーション中 / done: 完成形 */
  let phase: "waiting" | "playing" | "done" = $state("waiting");

  onMount(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // CSS の保険で完成形がすでに見えていたら、今から動かすとちらつくのでそのままにする
    const alreadyShown = getComputedStyle(svg).opacity !== "0";
    if (reduce || alreadyShown) {
      phase = "done";
      return;
    }

    const motion = createStatueMotion();
    let raf = 0;
    let startedAt: number | null = null;

    let order = groups.map((_, i) => i);
    /** 重ね順を変える(SVG は後に書いたものが手前)。変わっていなければ何もしない */
    const restack = (next: number[]) => {
      if (next.every((v, k) => v === order[k])) return;
      for (const i of next) svg.appendChild(groups[i]);
      order = next;
    };
    const apply = (t: number) => {
      const frames = motion.frame(t);
      frames.forEach((f, i) => {
        paths[i].setAttribute("d", f.d);
        paths[i].style.opacity = String(f.opacity);
        balls[i].style.transform = `scale(${f.ball})`;
      });
      restack(frames.map((_, i) => i).sort((a, b) => frames[a].depth - frames[b].depth));
    };
    const finish = () => {
      STATUE.figures.forEach((figure, i) => {
        paths[i].setAttribute("d", figure.d);
        if (figure.fillRule) paths[i].setAttribute("fill-rule", figure.fillRule);
        paths[i].style.removeProperty("opacity");
        balls[i].style.removeProperty("transform");
      });
      restack(groups.map((_, i) => i));
      phase = "done";
    };
    const tick = (now: number) => {
      startedAt ??= now;
      const t = now - startedAt;
      if (t >= motion.duration) return finish();
      apply(t);
      raf = requestAnimationFrame(tick);
    };

    for (const path of paths) path.setAttribute("fill-rule", "nonzero");
    apply(0);
    phase = "playing";
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });
</script>

<svg
  bind:this={svg}
  class="statue {phase} {className}"
  viewBox="0 0 {STATUE.width} {STATUE.height}"
  width={STATUE.width}
  height={STATUE.height}
  aria-hidden="true"
  focusable="false"
>
  {#each STATUE.figures as figure, i}
    <g bind:this={groups[i]}>
      <path bind:this={paths[i]} d={figure.d} fill={figure.fill} fill-rule={figure.fillRule} />
      <ellipse
        bind:this={balls[i]}
        cx={figure.ball.cx}
        cy={figure.ball.cy}
        rx={figure.ball.rx}
        ry={figure.ball.ry}
        fill={figure.ball.fill}
      />
    </g>
  {/each}
</svg>

<style lang="scss">
  .statue {
    display: block;
    height: auto;
    /* 渦の途中で絵の枠の外へ膨らむので、切らない */
    overflow: visible;
  }
  ellipse {
    transform-box: fill-box;
    transform-origin: center;
  }
  .waiting {
    opacity: 0;
    /* JS が 2.5 秒たっても動かなければ、完成形を出す */
    animation: statue-fallback 0s linear 2.5s forwards;
  }
  @keyframes statue-fallback {
    to {
      opacity: 1;
    }
  }
</style>
