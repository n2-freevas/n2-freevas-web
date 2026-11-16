/**
 * Google Drive の動画を <sports-video-player> の src に渡すための URL を作る。
 * 「リンクを知っている全員」に共有した動画を、Drive API(v3)と API キーで取得する。
 * <video> がそのまま Range リクエストを送れるので、ダウンロードを待たずに途中から再生・シークできる。
 */

const API = "https://www.googleapis.com/drive/v3/files/";
/** Drive のファイルIDに使われる文字(実際は 25 文字以上だが、短めでも受け付ける) */
const ID_PATTERN = /^[A-Za-z0-9_-]{10,}$/;

/**
 * 共有リンクまたはファイルIDからファイルIDを取り出す。読み取れなければ null。
 *   https://drive.google.com/file/d/{ID}/view?usp=sharing
 *   https://drive.google.com/open?id={ID}
 *   https://drive.google.com/uc?id={ID}&export=download
 *   {ID}
 */
export function parseDriveFileId(input: string): string | null {
  const text = input.trim();
  if (!text) return null;
  if (ID_PATTERN.test(text)) return text;

  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return null;
  }
  if (!/(^|\.)google\.com$/.test(url.hostname)) return null;
  const id = url.pathname.match(/\/d\/([A-Za-z0-9_-]+)/)?.[1] ?? url.searchParams.get("id");
  return id && ID_PATTERN.test(id) ? id : null;
}

function apiUrl(fileId: string, apiKey: string, params: Record<string, string>): string {
  // 共有ドライブ上のファイルは supportsAllDrives を付けないと見つからない扱いになる
  const query = new URLSearchParams({ ...params, supportsAllDrives: "true", key: apiKey });
  return `${API}${encodeURIComponent(fileId)}?${query}`;
}

/** 動画そのものの URL(<sports-video-player src> に入れる) */
export function driveMediaUrl(fileId: string, apiKey: string): string {
  return apiUrl(fileId, apiKey, { alt: "media" });
}

/** Drive 上のファイルのページ(ここから動画をダウンロードできる) */
export function driveViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`;
}

/**
 * 読み込む前に開けるかどうか確かめた結果。
 * - offline:  Google Drive に接続できなかった
 * - notFound: 見つからない(非公開・リンクの誤り)
 * - notVideo: 動画ファイルではない
 * - limited:  それ以外のエラー。多くは Drive のダウンロード上限や API の利用制限
 */
export type DriveProblem = "offline" | "notFound" | "notVideo" | "limited";

/**
 * 読み込む前にファイル情報を取りに行き、開けるかどうかを確かめる。
 * <video> のエラーからは原因がわからないので、非公開・利用制限などをここで見分ける。
 * @returns 問題なければ null
 */
export async function checkDriveFile(fileId: string, apiKey: string): Promise<DriveProblem | null> {
  let res: Response;
  try {
    res = await fetch(apiUrl(fileId, apiKey, { fields: "mimeType" }));
  } catch {
    return "offline";
  }
  if (res.status === 404) return "notFound";
  if (!res.ok) return "limited";
  const { mimeType } = (await res.json()) as { mimeType?: string };
  if (mimeType && !mimeType.startsWith("video/")) return "notVideo";
  return null;
}
