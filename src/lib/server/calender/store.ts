/**
 * スナップショットの置き場所。本番・プレビューは Vercel Blob(非公開)に 1 ファイルだけ置き、cron が毎回上書きする。
 *
 * Blob への認証は BLOB_STORE_ID(プロジェクトに Blob のストアをつなぐと Vercel が設定する)と、
 * Vercel が実行時にリクエストへ付ける短期の OIDC トークン(x-vercel-oidc-token ヘッダー)で行う。
 * ローカル開発(vite dev)では BLOB_STORE_ID があっても Blob には触らず、開発サーバーのメモリに置く(再起動で消える)。
 * ローカルで cron を動かして本番のデータを上書きしないようにするため。
 */
import { dev } from "$app/env";
import { BLOB_STORE_ID } from "$app/env/private";
import { getRequestEvent } from "$app/server";
import { get, put } from "@vercel/blob";
import type { Snapshot } from "./index";

const PATHNAME = "calender/busy.json";
/** ローカル開発用の置き場所(モジュールを読み直しても消えないよう globalThis に置く) */
const local = globalThis as { __calenderSnapshot?: string };

/** Blob の認証情報。ローカル開発中か、Blob が設定されていなければ null */
function blobAuth(): { storeId: string; oidcToken?: string } | null {
  if (dev || !BLOB_STORE_ID) return null;
  // Vercel 上ではリクエストに OIDC トークンが付いてくる。取れなければ SDK に探させる
  let oidcToken: string | undefined;
  try {
    oidcToken = getRequestEvent().request.headers.get("x-vercel-oidc-token") ?? undefined;
  } catch {
    oidcToken = undefined;
  }
  return { storeId: BLOB_STORE_ID, ...(oidcToken ? { oidcToken } : {}) };
}

export async function saveSnapshot(snapshot: Snapshot): Promise<void> {
  const body = JSON.stringify(snapshot);
  const auth = blobAuth();
  if (!auth) {
    if (!dev) throw new Error("Vercel Blob が未設定です(Blob のストアをプロジェクトにつなぐ)");
    local.__calenderSnapshot = body;
    return;
  }
  await put(PATHNAME, body, {
    ...auth,
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // 上書きしたらすぐ読めるよう、Blob 側のキャッシュは最短にする
    cacheControlMaxAge: 60,
  });
}

/** まだ一度も集めていなければ null */
export async function loadSnapshot(): Promise<Snapshot | null> {
  const auth = blobAuth();
  if (!auth) {
    if (!dev || !local.__calenderSnapshot) return null;
    return JSON.parse(local.__calenderSnapshot) as Snapshot;
  }
  const result = await get(PATHNAME, { ...auth, access: "private" });
  if (!result?.stream) return null;
  return (await new Response(result.stream).json()) as Snapshot;
}
