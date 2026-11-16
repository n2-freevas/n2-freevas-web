/**
 * Google ログイン(OpenID Connect の認可コードフロー + PKCE)。
 * 求める権限は openid / email / profile だけ(Google の審査が要らない範囲)。
 */
import { decodeJwtPayload, pkceChallenge } from "./session";

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const ISSUERS = ["https://accounts.google.com", "accounts.google.com"];

export interface GoogleClient {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/** Google のログイン画面の URL */
export async function authorizationUrl(
  client: GoogleClient,
  state: string,
  codeVerifier: string,
): Promise<string> {
  const params = new URLSearchParams({
    client_id: client.clientId,
    redirect_uri: client.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: await pkceChallenge(codeVerifier),
    code_challenge_method: "S256",
    // 複数アカウントでログインしている人が、どのアカウントで入るか選べるようにする
    prompt: "select_account",
  });
  return `${AUTH_ENDPOINT}?${params}`;
}

interface IdTokenClaims {
  iss?: string;
  aud?: string;
  exp?: number;
  email?: string;
  email_verified?: boolean;
}

/**
 * 認可コードをトークンに交換し、確認済みのメールアドレスを返す。失敗したら null。
 *
 * id_token の署名は検証しない。この id_token は、サーバーが Google のトークンエンドポイントと
 * HTTPS で直接やりとりして受け取ったもので、途中で差し替えられる余地がないため
 * (OpenID Connect Core 3.1.3.7 で、この場合は TLS のサーバー検証で代えてよいとされている)。
 * 発行者・宛先・有効期限・メール確認済みかは確かめる。
 */
export async function exchangeCode(
  client: GoogleClient,
  code: string,
  codeVerifier: string,
  fetchFn: typeof fetch = fetch,
): Promise<string | null> {
  const res = await fetchFn(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: client.clientId,
      client_secret: client.clientSecret,
      redirect_uri: client.redirectUri,
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }),
  });
  if (!res.ok) {
    console.error("[jubilee] Google のトークン交換に失敗しました", res.status, await res.text());
    return null;
  }
  const { id_token } = (await res.json()) as { id_token?: string };
  const claims = id_token ? decodeJwtPayload<IdTokenClaims>(id_token) : null;
  if (
    !claims ||
    !claims.iss ||
    !ISSUERS.includes(claims.iss) ||
    claims.aud !== client.clientId ||
    typeof claims.exp !== "number" ||
    claims.exp < Date.now() / 1000 ||
    claims.email_verified !== true ||
    !claims.email
  ) {
    console.error("[jubilee] id_token の内容が不正です");
    return null;
  }
  return claims.email.toLowerCase();
}
