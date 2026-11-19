/**
 * jubilee のトップの絵(static/jubilee/statue-image.svg)と、その登場アニメーション。
 *
 * 絵は 9 人の人の形(path)と、それぞれのボール(circle / ellipse)でできている。
 * SVG ファイルをそのまま読み込んで使うので、絵を差し替えるときは SVG を置き換えるだけでよい。
 * ただし「path の直後に、その人のボールが 1 つ」「path は輪郭 1 本」の並びは守ること(テストで確かめている)。
 *
 * アニメーション(statueFrame)
 *   1. 公転   : 9 人は小さな円(惑星)になり、見えない中心のまわりをばらばらの周期で回っている。
 *               軌道の面は外側ほど大きく傾いていて、立体的に回って見える(手前は大きく、奥は小さく後ろへ)
 *   2. 渦     : 中心に近い人から順に、加速しながら渦を巻いて外へ散っていき、軌道の傾きも平らに戻る
 *   3. 開花   : 着地の直前まで小さな円のままで、最後の一瞬で全員そろって人の形へはじけるように変わり、
 *               勢いで少しだけ大きくなってから元の大きさに収まる
 *   4. ボール : 着地と同時に、全員のボールがポンと出る
 * 時間の配分は TIMING、動きの大きさは MOTION で調整する。
 */

import raw from "../../../../static/jubilee/statue-image.svg?raw";
import { circleLike, measure, parseLoop, toPathData, translate, type Loop } from "./morph.ts";

export interface StatueFigure {
  fill: string;
  /** 元のパス(アニメーションの最後にこれに戻す) */
  d: string;
  fillRule?: "nonzero" | "evenodd";
  ball: { cx: number; cy: number; rx: number; ry: number; fill: string };
  /** 重心(絵の座標) */
  cx: number;
  cy: number;
  /** 重心を原点にした輪郭 */
  local: Loop;
  /** local と点の対応がついた、面積が同じくらいの円 */
  circle: Loop;
}

export interface Statue {
  width: number;
  height: number;
  figures: StatueFigure[];
}

type Attrs = Record<string, string>;

function attrsOf(source: string): Attrs {
  return Object.fromEntries([...source.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}

export function parseStatue(svg: string): Statue {
  const root = attrsOf(svg.match(/<svg\b([^>]*)>/)?.[1] ?? "");
  const [, , width, height] = (root.viewBox ?? `0 0 ${root.width} ${root.height}`).split(/[\s,]+/).map(Number);

  const figures: StatueFigure[] = [];
  let pending: Omit<StatueFigure, "ball"> | null = null;
  for (const m of svg.matchAll(/<(path|circle|ellipse)\b([^>]*?)\/?>/g)) {
    const a = attrsOf(m[2]);
    if (m[1] === "path") {
      if (pending) throw new Error("人の形(path)の後にボールがありません");
      const loop = parseLoop(a.d);
      const { area, cx, cy } = measure(loop);
      const local = translate(loop, -cx, -cy);
      pending = {
        fill: a.fill,
        d: a.d,
        fillRule: a["fill-rule"] === "evenodd" || a["fill-rule"] === "nonzero" ? a["fill-rule"] : undefined,
        cx,
        cy,
        local,
        circle: circleLike(local, Math.sqrt(Math.abs(area) / Math.PI)),
      };
    } else {
      if (!pending) throw new Error("ボールの前に人の形(path)がありません");
      const r = Number(a.r ?? 0);
      figures.push({
        ...pending,
        ball: {
          cx: Number(a.cx),
          cy: Number(a.cy),
          rx: Number(a.rx ?? r),
          ry: Number(a.ry ?? r),
          fill: a.fill,
        },
      });
      pending = null;
    }
  }
  if (pending) throw new Error("最後の人の形(path)にボールがありません");
  return { width, height, figures };
}

export const STATUE: Statue = parseStatue(raw);

/** 時間の配分(ミリ秒) */
export const TIMING = {
  /** 最初に円がふわっと現れる長さ */
  fadeIn: 250,
  /** 渦に入る前に、公転だけしている長さ */
  orbit: 400,
  /** 渦の長さ(最後に渦に入る人の分)。着地は全員同時なので、早く入った人ほど長く渦を巻く */
  spiral: 900,
  /** 1 人ずつ渦に入るのをずらす間隔(中心に近い人から) */
  stagger: 25,
  /** 着地の前の、円から人の形へ変わる長さ。全員がそろって同時に変わる */
  bloom: 280,
  /** 着地の後、はじけた勢いで少し大きくなってから元に収まるまでの長さ */
  settle: 240,
  /** ボールが出る長さ */
  ball: 260,
} as const;

/** 動きの大きさ(長さは絵の座標) */
export const MOTION = {
  /** 公転の半径(内側と外側)。最終位置が中心に近い人ほど内側を回る */
  orbitMin: 40,
  orbitMax: 180,
  /** 公転の周期(秒。内側ほど速い) */
  periodMin: 0.9,
  periodMax: 2.4,
  /** 惑星(円)の大きさ。人の形と同じ面積の円に対する比 */
  planetScale: 0.32,
  /** 渦の間に、最終位置よりどれだけ外へ膨らむか */
  bulge: 60,
  /** 渦の最中に足す回転(周) */
  turns: 1,
  /** 円から人の形への変わり方の急さ。大きいほど最後の最後で一気に変わる(1 で一定の速さ) */
  bloomSharpness: 3,
  /** はじけた勢いで、元の大きさより最大どれだけ大きくなるか(0 でなし) */
  pop: 0.06,
  /** 軌道の面の傾き(度)。いちばん外側の軌道がこの角度で、内側ほど小さい(一番内側は傾かない) */
  tiltMax: 70,
  /** 傾きの増え方。1 より大きいほど、外側の軌道だけが大きく傾く */
  tiltCurve: 1.5,
  /** 傾ける向き(傾きの軸の角度。度)。円盤を斜めから見たような向きにする */
  nodeBase: -25,
  /** 外側の軌道ほど、傾きの軸を少しずつねじる角度(度。軌道 1 つあたり) */
  nodeStep: 8,
  /** 渦の進み具合のうち、ここまでに軌道の傾きを平らに戻す */
  flattenBy: 0.8,
  /** 視点までの距離。小さいほど、手前と奥での大きさの差が大きい */
  perspective: 700,
  /** 奥を通るときに薄くする割合(軌道の半径ぶん奥にあるとき) */
  depthFade: 0.25,
} as const;

const TAU = Math.PI * 2;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeOutBack = (t: number) => {
  if (t <= 0) return 0; // 式のままだと誤差で 0 にならない
  const c = 1.70158;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};

interface Plan {
  /** 渦に入る時刻と、着地する時刻(ms。着地は全員同じ) */
  start: number;
  end: number;
  /** 公転の半径・角速度(rad/s)・渦に入るときの角度 */
  radius: number;
  omega: number;
  angle: number;
  /** 最終位置の、中心からの距離と角度 */
  distance: number;
  finalAngle: number;
  /** 渦の間に回る角度(着地したとき finalAngle にちょうど重なる) */
  sweep: number;
  /** 軌道の面の傾き(rad)と、傾きの軸の向き(rad) */
  tilt: number;
  node: number;
}

function plan(statue: Statue): Plan[] {
  const ox = statue.width / 2;
  const oy = statue.height / 2;
  const n = statue.figures.length;
  const polar = statue.figures.map((f) => ({
    distance: Math.hypot(f.cx - ox, f.cy - oy),
    finalAngle: Math.atan2(f.cy - oy, f.cx - ox),
  }));
  // 最終位置が中心に近い順に、内側の軌道から割り当てる
  const rank = polar.map((_, i) => i).sort((a, b) => polar[a].distance - polar[b].distance);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const end = TIMING.orbit + (n - 1) * TIMING.stagger + TIMING.spiral;

  const plans: Plan[] = [];
  rank.forEach((index, k) => {
    const u = n > 1 ? k / (n - 1) : 0;
    const angle = k * goldenAngle; // 惑星どうしが重ならないよう、黄金角ずつずらして置く
    const { distance, finalAngle } = polar[index];
    const node = ((MOTION.nodeBase + k * MOTION.nodeStep) / 180) * Math.PI;
    plans[index] = {
      start: TIMING.orbit + k * TIMING.stagger,
      end,
      radius: MOTION.orbitMin + (MOTION.orbitMax - MOTION.orbitMin) * u,
      omega: TAU / (MOTION.periodMin + (MOTION.periodMax - MOTION.periodMin) * u),
      angle,
      distance,
      finalAngle,
      // 角度は軌道の面の中で測る。画面上の角度は node だけ回るので、着地点は finalAngle - node
      sweep: MOTION.turns * TAU + ((((finalAngle - node - angle) % TAU) + TAU) % TAU),
      tilt: ((MOTION.tiltMax * u ** MOTION.tiltCurve) / 180) * Math.PI,
      node,
    };
  });
  return plans;
}

export interface FigureFrame {
  d: string;
  opacity: number;
  /** ボールの拡大率(0 で見えない) */
  ball: number;
  /** 重ね順(大きいほど手前)。着地すると SVG の元の並び順になる */
  depth: number;
}

export interface StatueMotion {
  /** 全体の長さ(ms)。これ以降は元の絵のまま */
  duration: number;
  frame(t: number): FigureFrame[];
}

export function createStatueMotion(statue: Statue = STATUE): StatueMotion {
  const plans = plan(statue);
  const ox = statue.width / 2;
  const oy = statue.height / 2;
  const end = Math.max(...plans.map((p) => p.end));
  const bloomStart = end - TIMING.bloom;
  const buffers = statue.figures.map((f) => new Array<number>(f.local.length));

  return {
    duration: end + Math.max(TIMING.ball, TIMING.settle),
    frame(t) {
      return statue.figures.map((figure, i) => {
        const p = plans[i];
        const tau = clamp01((t - p.start) / (p.end - p.start));
        const seconds = (p.end - p.start) / 1000;

        let angle: number;
        if (t < p.start) {
          // 公転: 一定の速さで回る
          angle = p.angle + (p.omega * (t - p.start)) / 1000;
        } else {
          // 渦: 公転の速さから加速し、着地で止まる(3 次エルミート補間)
          const h10 = tau ** 3 - 2 * tau ** 2 + tau;
          const h01 = -2 * tau ** 3 + 3 * tau ** 2;
          angle = p.angle + h10 * p.omega * seconds + h01 * p.sweep;
        }
        const e = easeInOutCubic(tau);
        const radius = p.radius + (p.distance - p.radius) * e + MOTION.bulge * Math.sin(Math.PI * tau) ** 2;
        // 形は公転の向きに合わせて回り、着地すると元の向きになる
        const spin = angle - (p.angle + p.sweep);
        // 人の形へ変わるのは、渦の進み具合ではなく時刻で決める(全員そろって咲く)
        // 加速しながら変わる(ease-in)ので、ほとんどの変化が着地の直前に集まる
        const m = clamp01((t - bloomStart) / TIMING.bloom) ** MOTION.bloomSharpness;
        // 着地後のはじけ: 変わる勢いのまま少し膨らみ、元の大きさに収まる
        const x = clamp01((t - p.end) / TIMING.settle);
        const pop = 1 + MOTION.pop * Math.sin(Math.PI * x) * (1 - x);

        // 軌道の面の中の位置を、傾けた面に載せてから画面へ写す(遠近法)
        const incl = p.tilt * (1 - easeInOutCubic(clamp01(tau / MOTION.flattenBy)));
        const a = radius * Math.cos(angle);
        const b = radius * Math.sin(angle) * Math.cos(incl);
        const z = radius * Math.sin(angle) * Math.sin(incl); // 正なら手前
        const persp = MOTION.perspective / (MOTION.perspective - z);
        const px = ox + (a * Math.cos(p.node) - b * Math.sin(p.node)) * persp - figure.cx;
        const py = oy + (a * Math.sin(p.node) + b * Math.cos(p.node)) * persp - figure.cy;
        const scale = (MOTION.planetScale + (1 - MOTION.planetScale) * m) * (1 - m);
        const cos = Math.cos(spin) * persp * pop;
        const sin = Math.sin(spin) * persp * pop;
        const out = buffers[i];
        for (let k = 0; k < out.length; k += 2) {
          const lx = figure.circle[k] * scale + figure.local[k] * m;
          const ly = figure.circle[k + 1] * scale + figure.local[k + 1] * m;
          out[k] = figure.cx + px + lx * cos - ly * sin;
          out[k + 1] = figure.cy + py + lx * sin + ly * cos;
        }

        return {
          d: t >= p.end + TIMING.settle ? figure.d : toPathData(out, 1),
          opacity: clamp01(t / TIMING.fadeIn) * (1 - MOTION.depthFade * clamp01(-z / MOTION.orbitMax)),
          ball: easeOutBack(clamp01((t - p.end) / TIMING.ball)),
          // 公転中は奥行きで、咲くにつれて元の並び順で重ねる
          depth: (1 - m) * z + m * i * MOTION.orbitMax,
        };
      });
    },
  };
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("STATUE", () => {
    it("9 人の人の形と、それぞれのボールがある", () => {
      expect(STATUE.width).toBe(528);
      expect(STATUE.height).toBe(661);
      expect(STATUE.figures).toHaveLength(9);
      for (const f of STATUE.figures) {
        expect(f.ball.fill).toBe(f.fill);
        expect(f.circle.length).toBe(f.local.length);
      }
    });
  });

  describe("parseStatue", () => {
    it("ボールの無い人の形は例外にする", () => {
      expect(() => parseStatue('<svg viewBox="0 0 10 10"><path d="M0 0L1 0L1 1Z"/></svg>')).toThrow("ボールがありません");
    });
  });

  describe("createStatueMotion", () => {
    const motion = createStatueMotion();

    it("最後は元の絵そのものに戻り、ボールも出そろう", () => {
      const end = motion.frame(motion.duration);
      end.forEach((f, i) => {
        expect(f.d).toBe(STATUE.figures[i].d);
        expect(f.opacity).toBe(1);
        expect(f.ball).toBeCloseTo(1);
      });
    });

    it("最初は見えない円で、ボールも出ていない", () => {
      for (const f of motion.frame(0)) {
        expect(f.opacity).toBe(0);
        expect(f.ball).toBe(0);
      }
    });

    it("外側の軌道ほど大きく傾き、一番内側は傾かない", () => {
      const tilts = plan(STATUE)
        .slice()
        .sort((p, q) => p.radius - q.radius)
        .map((p) => p.tilt);
      expect(tilts[0]).toBe(0);
      expect(tilts.at(-1)).toBeCloseTo((MOTION.tiltMax / 180) * Math.PI);
      tilts.slice(1).forEach((tilt, k) => expect(tilt).toBeGreaterThan(tilts[k]));
    });

    it("着地すると、重ね順は SVG の元の並び順になる", () => {
      const depths = motion.frame(motion.duration).map((f) => f.depth);
      depths.slice(1).forEach((d, k) => expect(d).toBeGreaterThan(depths[k]));
    });

    it("着地と開花は全員同時", () => {
      const plans = plan(STATUE);
      expect(new Set(plans.map((p) => p.end)).size).toBe(1);
      // 開花の始まる前は、全員まだ円(形の点はすべて重心から同じ距離)
      const t = plans[0].end - TIMING.bloom;
      motion.frame(t).forEach((f) => {
        const loop = parseLoop(f.d);
        const { cx, cy } = measure(loop);
        const r = Math.hypot(loop[0] - cx, loop[1] - cy);
        for (let k = 6; k < loop.length; k += 6) {
          expect(Math.abs(Math.hypot(loop[k] - cx, loop[k + 1] - cy) - r)).toBeLessThan(0.5);
        }
      });
    });

    it("着地の後、少し大きくなってから元の大きさに収まる", () => {
      const plans = plan(STATUE);
      const original = Math.abs(measure(parseLoop(STATUE.figures[0].d)).area);
      const area = (t: number) => Math.abs(measure(parseLoop(motion.frame(t)[0].d)).area);
      expect(area(plans[0].end + TIMING.settle / 3)).toBeGreaterThan(original * 1.05);
      expect(motion.frame(plans[0].end + TIMING.settle)[0].d).toBe(STATUE.figures[0].d);
    });

    it("着地の直前は最終の形にほぼ重なっている(着地で形が跳ばない)", () => {
      const plans = plan(STATUE);
      STATUE.figures.forEach((figure, i) => {
        const t = plans[i].end - 0.01;
        const loop = parseLoop(motion.frame(t)[i].d);
        const original = parseLoop(figure.d);
        const gap = Math.max(...loop.map((v, k) => Math.abs(v - original[k])));
        expect(gap).toBeLessThan(0.5);
      });
    });
  });
}
