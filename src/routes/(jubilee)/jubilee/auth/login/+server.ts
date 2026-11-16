/** Google のログイン画面へ送る */
import { redirect } from "@sveltejs/kit";
import { googleClient, safeReturnTo, savePendingLogin } from "#lib/server/jubilee/auth.ts";
import { authorizationUrl } from "#lib/server/jubilee/google.ts";
import { randomToken } from "#lib/server/jubilee/session.ts";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const client = googleClient(url.origin);
  if (!client) redirect(303, "/jubilee/auth/denied?reason=config");

  const pending = {
    state: randomToken(),
    codeVerifier: randomToken(48),
    returnTo: safeReturnTo(url.searchParams.get("returnTo")),
  };
  try {
    await savePendingLogin(cookies, pending);
  } catch {
    redirect(303, "/jubilee/auth/denied?reason=config");
  }
  // 外部への転送は Google のログイン画面だけ許す
  redirect(303, await authorizationUrl(client, pending.state, pending.codeVerifier), {
    external: ["https://accounts.google.com"],
  });
};
