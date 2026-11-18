/**
 * jubilee のログイン・アクセス確認の共通部分。
 *
 * - ログインは Google(google.ts)、ログイン状態は署名付き Cookie(session.ts)。
 * - 誰が入れるかは Vercel Global Config(旧名 Edge Config)のキー jubilee_allowed_emails
 *   (メールアドレスの配列)で決める。リストの編集は .claude/skills/jubilee-member の手順で行う。
 * - 設定が足りない・Global Config が読めないときは、誰も入れない(安全側に倒す)。
 * - Vercel のプレビュー環境では、Vercel の Deployment Protection に任せてログインを省く。
 */
import type { Cookies } from "@sveltejs/kit";
import { createClient, type GlobalConfigClient } from "@vercel/global-config";
import {
  EDGE_CONFIG,
  GLOBAL_CONFIG,
  JUBILEE_GOOGLE_OAUTH_CLIENT_ID,
  JUBILEE_GOOGLE_OAUTH_CLIENT_SECRET,
  JUBILEE_SESSION_SECRET,
  VERCEL_ENV,
} from "$app/env/private";
import { accessOf } from "#lib/jubilee/access.ts";
import type { GoogleClient } from "./google";
import { sign, verify } from "./session";

export const ALLOWLIST_KEY = "jubilee_allowed_emails";

/** ログイン状態の Cookie */
const SESSION_COOKIE = "jubilee_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 日
/** ログイン途中(Google へ行って戻るまで)の state・PKCE を入れる Cookie */
const LOGIN_COOKIE = "jubilee_login";
const LOGIN_MAX_AGE = 60 * 10; // 10 分

const BASE_COOKIE = { httpOnly: true, secure: true, sameSite: "lax" } as const;

/** プレビュー環境ではログインを省く(Vercel の Deployment Protection の管轄) */
export const authSkipped = VERCEL_ENV === "preview";

export function googleClient(origin: string): GoogleClient | null {
  if (!JUBILEE_GOOGLE_OAUTH_CLIENT_ID || !JUBILEE_GOOGLE_OAUTH_CLIENT_SECRET) return null;
  return {
    clientId: JUBILEE_GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: JUBILEE_GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: `${origin}/jubilee/auth/callback`,
  };
}

/** ログインなしで見られるページか。公開範囲の一覧は #lib/jubilee/access.ts */
export function isPublicPath(path: string): boolean {
  return accessOf(path) === "public";
}

// ───────────── ログイン状態 ─────────────

export async function readSessionEmail(cookies: Cookies): Promise<string | null> {
  if (!JUBILEE_SESSION_SECRET) return null;
  const session = await verify<{ email: string }>(cookies.get(SESSION_COOKIE), JUBILEE_SESSION_SECRET);
  return session?.email ?? null;
}

export async function startSession(cookies: Cookies, email: string): Promise<void> {
  if (!JUBILEE_SESSION_SECRET) throw new Error("JUBILEE_SESSION_SECRET が未設定です");
  cookies.set(SESSION_COOKIE, await sign({ email }, JUBILEE_SESSION_SECRET, SESSION_MAX_AGE), {
    ...BASE_COOKIE,
    path: "/jubilee",
    maxAge: SESSION_MAX_AGE,
  });
}

export function endSession(cookies: Cookies): void {
  cookies.delete(SESSION_COOKIE, { ...BASE_COOKIE, path: "/jubilee" });
}

// ───────────── ログイン途中の状態 ─────────────

export interface PendingLogin {
  state: string;
  codeVerifier: string;
  returnTo: string;
}

export async function savePendingLogin(cookies: Cookies, pending: PendingLogin): Promise<void> {
  if (!JUBILEE_SESSION_SECRET) throw new Error("JUBILEE_SESSION_SECRET が未設定です");
  cookies.set(LOGIN_COOKIE, await sign(pending, JUBILEE_SESSION_SECRET, LOGIN_MAX_AGE), {
    ...BASE_COOKIE,
    path: "/jubilee/auth",
    maxAge: LOGIN_MAX_AGE,
  });
}

/** ログイン途中の状態を取り出して消す(1回きり) */
export async function takePendingLogin(cookies: Cookies): Promise<PendingLogin | null> {
  const value = cookies.get(LOGIN_COOKIE);
  cookies.delete(LOGIN_COOKIE, { ...BASE_COOKIE, path: "/jubilee/auth" });
  if (!JUBILEE_SESSION_SECRET) return null;
  return verify<PendingLogin>(value, JUBILEE_SESSION_SECRET);
}

/** ログイン後に戻る先。jubilee 配下のパスだけを受け付ける(外部サイトへの転送を防ぐ) */
export function safeReturnTo(value: string | null | undefined): string {
  if (!value || !value.startsWith("/jubilee") || value.startsWith("//") || value.includes("\\")) {
    return "/jubilee";
  }
  // 認証用のページには戻さない
  return value.startsWith("/jubilee/auth") ? "/jubilee" : value;
}

// ───────────── 許可リスト ─────────────

/** 新しくつないだ Global Config は GLOBAL_CONFIG、名前変更前につないだものは EDGE_CONFIG に入る */
const connectionString = GLOBAL_CONFIG ?? EDGE_CONFIG;
let globalConfig: GlobalConfigClient | null = null;

/** 許可リストに入っているか。読めなければ false(入れない) */
export async function isAllowed(email: string): Promise<boolean> {
  if (!connectionString) {
    console.error("[jubilee] GLOBAL_CONFIG が未設定のため、誰も入れません");
    return false;
  }
  try {
    globalConfig ??= createClient(connectionString);
    const list = await globalConfig.get<string[]>(ALLOWLIST_KEY);
    if (!Array.isArray(list)) {
      console.error(`[jubilee] Global Config に ${ALLOWLIST_KEY}(配列)がありません`);
      return false;
    }
    const target = email.toLowerCase();
    return list.some((item) => typeof item === "string" && item.trim().toLowerCase() === target);
  } catch (err) {
    console.error("[jubilee] Global Config を読めませんでした", err);
    return false;
  }
}
