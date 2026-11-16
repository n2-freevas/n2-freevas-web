/**
 * Google から戻ってきたところ。メールアドレスを確かめてログイン状態にする。
 * 許可リストの確認は、各ページを開くたびに +layout.server.ts で行う。
 */
import { redirect } from "@sveltejs/kit";
import { googleClient, startSession, takePendingLogin } from "#lib/server/jubilee/auth.ts";
import { exchangeCode } from "#lib/server/jubilee/google.ts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
  const pending = await takePendingLogin(cookies);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const client = googleClient(url.origin);

  // ログイン画面でキャンセルした、時間が経ちすぎた、別のタブで始めたログインと食い違う、など
  if (!client || !pending || !code || !state || state !== pending.state) {
    redirect(303, "/jubilee/auth/denied?reason=failed");
  }

  const email = await exchangeCode(client, code, pending.codeVerifier, fetch);
  if (!email) redirect(303, "/jubilee/auth/denied?reason=failed");

  await startSession(cookies, email);
  redirect(303, pending.returnTo);
};
