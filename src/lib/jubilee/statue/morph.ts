/**
 * パスの形を別の形へ変形させるための幾何の部品。
 *
 * 変形は「同じ数の 3 次ベジェでできた 2 つの輪郭を、点ごとに補間する」やり方で行う。
 * 輪郭(Loop)は 1 本の閉じた線を 3 次ベジェの列にしたもので、数値を平らに並べて持つ。
 *
 *   [x0, y0,  c1x, c1y, c2x, c2y, x1, y1,  c1x, c1y, c2x, c2y, x2, y2, ...]
 *
 * 最後の区間の終点は始点 (x0, y0) に戻る。区間の数は (length - 2) / 6。
 * 対応しているのは M / C / L / H / V / Z(大文字・小文字とも)で、輪郭が 1 本だけのパスに限る。
 */

export type Loop = number[];

const TOKEN = /([MmCcLlHhVvZz])|([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)|([A-DF-Za-df-z])/g;

/** パスの d を輪郭に変える。対応していない命令や、輪郭が 2 本以上あるときは例外を投げる */
export function parseLoop(d: string): Loop {
  const tokens: (string | number)[] = [];
  for (const m of d.matchAll(TOKEN)) {
    if (m[3]) throw new Error(`パスの命令 "${m[3]}" には対応していません(M C L H V Z のみ)`);
    tokens.push(m[1] ?? Number(m[2]));
  }

  const loop: Loop = [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let closed = false;
  const num = () => {
    const v = tokens[i++];
    if (typeof v !== "number") throw new Error(`パスの数値が足りません: ${d.slice(0, 40)}…`);
    return v;
  };
  const lineTo = (nx: number, ny: number) => {
    loop.push(x + (nx - x) / 3, y + (ny - y) / 3, x + ((nx - x) * 2) / 3, y + ((ny - y) * 2) / 3, nx, ny);
    x = nx;
    y = ny;
  };

  while (i < tokens.length) {
    if (typeof tokens[i] === "string") cmd = tokens[i++] as string;
    if (closed) throw new Error("輪郭が 2 本以上あるパスには対応していません");
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case "M":
        if (loop.length > 0) throw new Error("輪郭が 2 本以上あるパスには対応していません");
        x = ox + num();
        y = oy + num();
        loop.push(x, y);
        cmd = rel ? "l" : "L"; // M の後に続く座標は L として読む(SVG の仕様)
        break;
      case "C": {
        const c = [ox + num(), oy + num(), ox + num(), oy + num(), ox + num(), oy + num()];
        loop.push(...c);
        x = c[4];
        y = c[5];
        break;
      }
      case "L":
        lineTo(ox + num(), oy + num());
        break;
      case "H":
        lineTo(ox + num(), y);
        break;
      case "V":
        lineTo(x, oy + num());
        break;
      case "Z":
        closed = true;
        break;
      default:
        throw new Error(`パスが M で始まっていません: ${d.slice(0, 40)}…`);
    }
    if (loop.length < 2) throw new Error(`パスが M で始まっていません: ${d.slice(0, 40)}…`);
  }

  // 閉じる線(終点 → 始点)が残っていれば直線の区間として足す
  if (Math.hypot(x - loop[0], y - loop[1]) > 1e-6) lineTo(loop[0], loop[1]);
  if (loop.length < 8) throw new Error("区間が 1 つもないパスです");
  return loop;
}

/** 区間の数 */
export function segmentCount(loop: Loop): number {
  return (loop.length - 2) / 6;
}

/** 3 次ベジェの 1 点 */
function bezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

/**
 * 面積(符号付き)と重心。曲線を細かく折れ線にして測る。
 * 面積の符号は回る向き(atan2 の角度が増える向きに回っていれば正)。
 */
export function measure(loop: Loop, samplesPerSegment = 12): { area: number; cx: number; cy: number } {
  let a2 = 0;
  let sx = 0;
  let sy = 0;
  let px = loop[0];
  let py = loop[1];
  for (let s = 2; s < loop.length; s += 6) {
    const x0 = loop[s - 2];
    const y0 = loop[s - 1];
    for (let k = 1; k <= samplesPerSegment; k++) {
      const t = k / samplesPerSegment;
      const qx = bezier(x0, loop[s], loop[s + 2], loop[s + 4], t);
      const qy = bezier(y0, loop[s + 1], loop[s + 3], loop[s + 5], t);
      const cross = px * qy - qx * py;
      a2 += cross;
      sx += (px + qx) * cross;
      sy += (py + qy) * cross;
      px = qx;
      py = qy;
    }
  }
  return { area: a2 / 2, cx: sx / (3 * a2), cy: sy / (3 * a2) };
}

/** 全体を平行移動した輪郭(新しい配列) */
export function translate(loop: Loop, dx: number, dy: number): Loop {
  return loop.map((v, i) => v + (i % 2 === 0 ? dx : dy));
}

/**
 * target と同じ数の区間でできた、原点が中心で半径 r の円。
 * target の点と対応がつくように作る(target も原点のまわりにある前提)。
 *   - 始点は target の始点と同じ方向に置く
 *   - 回る向きを target と合わせる
 *   - 各区間の角度の幅を、target の区間の長さに比例させる(変形中に点が偏らない)
 */
export function circleLike(target: Loop, r: number): Loop {
  const n = segmentCount(target);
  const lengths: number[] = [];
  for (let s = 2; s < target.length; s += 6) {
    const [x0, y0] = [target[s - 2], target[s - 1]];
    const [x1, y1, x2, y2, x3, y3] = target.slice(s, s + 6);
    const chord = Math.hypot(x3 - x0, y3 - y0);
    const polygon = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(x2 - x1, y2 - y1) + Math.hypot(x3 - x2, y3 - y2);
    lengths.push((chord + polygon) / 2 || 1e-9);
  }
  const total = lengths.reduce((a, b) => a + b, 0);
  const dir = measure(target).area >= 0 ? 1 : -1;

  let theta = Math.atan2(target[1], target[0]);
  const out: Loop = [r * Math.cos(theta), r * Math.sin(theta)];
  for (let k = 0; k < n; k++) {
    const delta = (dir * 2 * Math.PI * lengths[k]) / total;
    const next = theta + delta;
    // 円弧を 3 次ベジェで近似するときの制御点の長さ
    const h = (4 / 3) * Math.tan(delta / 4) * r;
    out.push(
      r * Math.cos(theta) - h * Math.sin(theta),
      r * Math.sin(theta) + h * Math.cos(theta),
      r * Math.cos(next) + h * Math.sin(next),
      r * Math.sin(next) - h * Math.cos(next),
      r * Math.cos(next),
      r * Math.sin(next),
    );
    theta = next;
  }
  // 誤差で始点からずれないよう、最後の点は始点にそろえる
  out[out.length - 2] = out[0];
  out[out.length - 1] = out[1];
  return out;
}

/** 輪郭を d にする */
export function toPathData(loop: Loop, digits = 2): string {
  const f = (v: number) => {
    const s = v.toFixed(digits);
    return s === `-${(0).toFixed(digits)}` ? s.slice(1) : s;
  };
  let d = `M${f(loop[0])} ${f(loop[1])}C`;
  for (let s = 2; s < loop.length; s += 6) {
    d += `${s > 2 ? " " : ""}${loop.slice(s, s + 6).map(f).join(" ")}`;
  }
  return `${d}Z`;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("parseLoop", () => {
    it("直線は 3 次ベジェの区間になり、閉じる線も 1 区間として足される", () => {
      const loop = parseLoop("M0 0 L10 0 L10 10 L0 10 Z");
      expect(segmentCount(loop)).toBe(4);
      expect(loop.slice(-2)).toEqual([0, 0]);
      expect(loop.slice(2, 8)).toEqual([10 / 3, 0, 20 / 3, 0, 10, 0]);
    });

    it("相対座標・H/V・M の後の暗黙の L・区切りのない数値を読める", () => {
      const a = parseLoop("M0 0 L10 0 L10 10 L0 10Z");
      expect(parseLoop("m0 0 10 0v10h-10z")).toEqual(a);
      expect(parseLoop("M0,0H10V10H0Z")).toEqual(a);
      expect(segmentCount(parseLoop("M1-1C2-2.5.5.5 3 3Z"))).toBe(2);
    });

    it("輪郭が 2 本あるパスや、対応していない命令は例外にする", () => {
      expect(() => parseLoop("M0 0L1 0L1 1ZM5 5L6 5L6 6Z")).toThrow("2 本以上");
      expect(() => parseLoop("M0 0Q1 1 2 0Z")).toThrow('"Q"');
      expect(() => parseLoop("M0 0A1 1 0 0 1 2 0Z")).toThrow('"A"');
    });
  });

  describe("measure", () => {
    it("正方形の面積と重心", () => {
      const m = measure(parseLoop("M0 0 L10 0 L10 10 L0 10 Z"));
      expect(m.area).toBeCloseTo(100);
      expect(m.cx).toBeCloseTo(5);
      expect(m.cy).toBeCloseTo(5);
    });

    it("逆回りなら面積の符号が反対になる", () => {
      expect(measure(parseLoop("M0 0 L0 10 L10 10 L10 0 Z")).area).toBeCloseTo(-100);
    });
  });

  describe("circleLike", () => {
    const square = translate(parseLoop("M0 0 L10 0 L10 10 L0 10 Z"), -5, -5);

    it("区間の数・始点の向き・回る向きが target とそろう", () => {
      const c = circleLike(square, 3);
      expect(c.length).toBe(square.length);
      expect(Math.atan2(c[1], c[0])).toBeCloseTo(Math.atan2(square[1], square[0]));
      expect(Math.sign(measure(c).area)).toBe(Math.sign(measure(square).area));
      const reversed = translate(parseLoop("M0 0 L0 10 L10 10 L10 0 Z"), -5, -5);
      expect(Math.sign(measure(circleLike(reversed, 3)).area)).toBe(-1);
    });

    it("区間の端点はすべて半径 r の上にあり、面積は円とほぼ同じ", () => {
      const c = circleLike(square, 3);
      for (let s = 6; s < c.length; s += 6) expect(Math.hypot(c[s], c[s + 1])).toBeCloseTo(3);
      // 折れ線で測るぶん少し小さく出るので、1% までの差は許す
      expect(Math.abs(measure(c).area) / (Math.PI * 9)).toBeGreaterThan(0.99);
      expect(Math.abs(measure(c).area) / (Math.PI * 9)).toBeLessThan(1.01);
    });
  });

  describe("toPathData", () => {
    it("読み直すと同じ輪郭になる", () => {
      const loop = parseLoop("M0 0 C1 2 3 4 5 6 L-1.25 0.5 Z");
      expect(parseLoop(toPathData(loop, 6))).toEqual(loop.map((v) => Number(v.toFixed(6))));
    });
  });
}
