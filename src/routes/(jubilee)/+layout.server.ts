/**
 * jubilee 配下のアクセス確認。ページを開くたび(ページ移動のたびも)に行う。
 *   公開ページ → だれでも通す(ログイン中なら、メンバーかどうかも調べて返す)
 *   メンバー用のページで、ログインしていない → Google ログインへ
 *   メンバー用のページで、許可リストにない → 利用できない旨のページへ
 * どのページが公開かは #lib/jubilee/access.ts。
 *
 * 返す値(JubileeViewer)は page.data から読め、ヘッダーの表示やリンクの出し分けに使う。
 */
import { redirect } from "@sveltejs/kit";
import type { JubileeViewer } from "#lib/jubilee/access.ts";
import { authSkipped, isAllowed, isPublicPath, readSessionEmail } from "#lib/server/jubilee/auth.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
  url,
  cookies,
  setHeaders,
}): Promise<JubileeViewer & { authSkipped: boolean }> => {
  // ログイン状態によって中身が変わるので、共有キャッシュに載せない
  setHeaders({ "cache-control": "private, no-store" });

  // url.pathname を読むことで、ページ移動のたびにこの load をやり直させる
  const path = url.pathname;

  // ヘッダーにログイン状態を出すため、プレビュー環境でもログインの Cookie は読む
  const email = await readSessionEmail(cookies);

  // プレビュー環境はアクセス確認を省き、全員をメンバー扱いにする
  if (authSkipped) return { email, member: true, authSkipped: true };

  const member = !!email && (await isAllowed(email));
  if (isPublicPath(path)) return { email, member, authSkipped: false };

  if (!email) {
    redirect(303, `/jubilee/auth/login?returnTo=${encodeURIComponent(path + url.search)}`);
  }
  if (!member) redirect(303, "/jubilee/auth/denied");

  return { email, member, authSkipped: false };
};
