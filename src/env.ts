import { defineEnvVars } from "@sveltejs/kit/env";

/** 空文字・未設定を undefined にそろえる(未設定でもアプリが起動できるようにする) */
const optional = (value: string | undefined) => value?.trim() || undefined;

/** 環境変数(.env またはホスティング側で設定する) */
export const variables = defineEnvVars({
  PUBLIC_GDRIVE_API_KEY: {
    description:
      "jubilee/replay で Google Drive の動画を読み込む API キー。" +
      "ブラウザに公開されるので、Drive API のみ・許可したサイトからのみ使えるよう制限すること",
    public: true,
    static: true,
    // 未設定なら Google Drive のリンク入力欄を出さない
    schema: optional,
  },

  // ───────────── jubilee のログイン(サーバー側だけで使う) ─────────────
  // どれかが未設定なら、jubilee には誰も入れない(安全側に倒す)

  JUBILEE_GOOGLE_OAUTH_CLIENT_ID: {
    description: "jubilee の Google ログインに使う OAuth クライアント ID",
    schema: optional,
  },
  JUBILEE_GOOGLE_OAUTH_CLIENT_SECRET: {
    description: "jubilee の Google ログインに使う OAuth クライアントシークレット",
    schema: optional,
  },
  JUBILEE_SESSION_SECRET: {
    description:
      "jubilee のログイン状態(Cookie)の署名鍵。32 文字以上のランダムな文字列。変えると全員ログアウトされる",
    schema: (value) => {
      const v = optional(value);
      if (v && v.length < 32) throw new Error("JUBILEE_SESSION_SECRET は 32 文字以上にしてください");
      return v;
    },
  },
  GLOBAL_CONFIG: {
    description:
      "Vercel Global Config の接続文字列(プロジェクトに Global Config をつなぐと Vercel が設定する)。" +
      "jubilee の許可リスト(キー jubilee_allowed_emails)を読む",
    schema: optional,
  },
  EDGE_CONFIG: {
    description:
      "Global Config の旧名 Edge Config の時代の接続文字列。GLOBAL_CONFIG が未設定のときだけ使う",
    schema: optional,
  },
  // ───────────── /calender(予定の時間帯だけを公開する週間カレンダー) ─────────────
  // どれも未設定なら、その取得元は使わない(空のカレンダーになる)

  CALENDER_ICS_URLS: {
    description:
      "/calender に載せるカレンダーの iCal(ICS)URL。改行かカンマ区切りで複数書ける。" +
      "Google カレンダーは各カレンダーの「iCal 形式の非公開 URL」、iCloud(iOS)カレンダーは公開カレンダーの URL(webcal:// のままでよい)。" +
      "URL を知っていれば中身まで読めてしまうので、サーバー側だけに置く",
    schema: optional,
  },
  CALENDER_TENNISBEAR_TOKEN: {
    description:
      "テニスベアのログイントークン(ブラウザの Cookie tb_token の値)。" +
      "主催・参加予定のイベントを /calender に載せる",
    schema: optional,
  },

  BLOB_STORE_ID: {
    description:
      "Vercel Blob のストア ID(プロジェクトに Blob のストアをつなぐと Vercel が設定する)。" +
      "/calender のスナップショット(cron が毎朝集めた時間帯)の置き場所。認証は Vercel の OIDC トークンで行う",
    schema: optional,
  },
  CRON_SECRET: {
    description:
      "Vercel Cron が /api/cron/... を呼ぶときに付ける合言葉(Authorization: Bearer <CRON_SECRET>)。" +
      "16 文字以上のランダムな文字列。未設定なら cron の URL は誰にも動かせない",
    schema: optional,
  },

  VERCEL_ENV: {
    description:
      "Vercel が設定する実行環境(production / preview / development)。" +
      "preview では Vercel の Deployment Protection に任せ、jubilee のログインを省く",
    schema: optional,
  },
});
