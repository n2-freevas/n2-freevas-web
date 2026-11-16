/**
 * jubilee 配下のアクセス確認。ページを開くたび(ページ移動のたびも)に行う。
 *   ログインしていない → Google ログインへ
 *   許可リストにない → 利用できない旨のページへ
 * 認証用のページ(/jubilee/auth/...)はそのまま通す。
 */
import { redirect } from "@sveltejs/kit";
import { authSkipped, isAllowed, readSessionEmail } from "#lib/server/jubilee/auth.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, cookies, setHeaders }) => {
  // ログイン状態によって中身が変わるので、共有キャッシュに載せない
  setHeaders({ "cache-control": "private, no-store" });

  // url.pathname を読むことで、ページ移動のたびにこの load をやり直させる
  const path = url.pathname;

  if (authSkipped) return { email: null, authSkipped: true };

  const email = await readSessionEmail(cookies);
  if (path.startsWith("/jubilee/auth")) return { email, authSkipped: false };

  if (!email) {
    redirect(303, `/jubilee/auth/login?returnTo=${encodeURIComponent(path + url.search)}`);
  }
  if (!(await isAllowed(email))) redirect(303, "/jubilee/auth/denied");

  return { email, authSkipped: false };
};
