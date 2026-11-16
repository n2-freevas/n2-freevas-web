/**
 * jubilee のログイン状態を入れる、署名付きの値。
 * 形式は「base64url(JSON) . base64url(HMAC-SHA256 署名)」。データベースは使わない。
 * Web Crypto だけで書き、実行環境(Node / Edge)を選ばない。
 */

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** payload に有効期限(秒)を付けて署名する */
export async function sign<T extends object>(payload: T, secret: string, maxAgeSec: number): Promise<string> {
  const body = toBase64Url(
    encoder.encode(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + maxAgeSec })),
  );
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(body));
  return `${body}.${toBase64Url(new Uint8Array(sig))}`;
}

/** 署名と有効期限を確かめて payload を返す。不正・期限切れなら null */
export async function verify<T extends object>(token: string | undefined, secret: string): Promise<T | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64Url(sig),
      encoder.encode(body),
    );
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as T & { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

/** URL に使える乱数(state・PKCE 用) */
export function randomToken(bytes = 32): string {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(bytes)));
}

/** PKCE の code_challenge(S256) */
export async function pkceChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(verifier));
  return toBase64Url(new Uint8Array(digest));
}

/** id_token の中身(payload)を読む。署名の検証はしない(下の google.ts のコメント参照) */
export function decodeJwtPayload<T>(jwt: string): T | null {
  const part = jwt.split(".")[1];
  if (!part) return null;
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64Url(part))) as T;
  } catch {
    return null;
  }
}
