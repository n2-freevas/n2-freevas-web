/**
 * jubilee のページごとの公開範囲。サーバー(アクセス確認)と画面(リンクの出し分け)の両方がここを見る。
 *
 *   public : ログインなしで誰でも見られる
 *   member : ログインし、許可リスト(jubilee_allowed_emails)に入っている人だけ
 *
 * PUBLIC_PAGES に無いページはすべて member 扱い(新しいページは何もしなければ非公開になる)。
 * 新しいページを公開したいときは PUBLIC_PAGES に足す。
 * トップに機能として並べたいときは FEATURES に足す(access は path から自動で決まる)。
 *
 * 画面側で隠すのは「導線」だけで、守っているのはサーバー側(+layout.server.ts)。
 */

/** ログインなしで見られるページ(/jubilee/auth/... はこれとは別に常に公開) */
const PUBLIC_PAGES = new Set(["/jubilee", "/jubilee/rules", "/jubilee/privacy"]);

export type JubileeAccess = "public" | "member";

/** 見ている人の状態。+layout.server.ts が返し、page.data から読める */
export interface JubileeViewer {
  /** ログイン中のメールアドレス(ログインしていなければ null) */
  email: string | null;
  /** member のページを開けるか */
  member: boolean;
}

function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function accessOf(path: string): JubileeAccess {
  const p = normalize(path);
  return p.startsWith("/jubilee/auth") || PUBLIC_PAGES.has(p) ? "public" : "member";
}

/** その人がそのページを開けるか(リンクを出してよいか) */
export function canVisit(path: string, viewer: Pick<JubileeViewer, "member">): boolean {
  // クエリやハッシュ付きのリンクも、パス部分で判断する
  const pathname = path.split(/[?#]/)[0];
  return accessOf(pathname) === "public" || viewer.member;
}

/** トップに並べる機能 */
export const FEATURES: { name: string; path: string; explain: string }[] = [
  {
    name: "replay",
    path: "/jubilee/replay",
    explain: "Google Drive に置いた試合の動画を、タップとスワイプで振り返る。",
  },
  {
    name: "参加のルール",
    path: "/jubilee/rules",
    explain: "練習会に参加するときのルールと留意事項。",
  },
];
