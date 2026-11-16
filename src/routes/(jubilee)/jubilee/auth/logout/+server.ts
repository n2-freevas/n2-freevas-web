/** ログアウト。他サイトから勝手にログアウトさせられないよう POST だけ受け付ける */
import { redirect } from "@sveltejs/kit";
import { endSession } from "#lib/server/jubilee/auth.ts";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
  endSession(cookies);
  redirect(303, "/jubilee/auth/denied?reason=logout");
};
