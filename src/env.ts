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
  VERCEL_ENV: {
    description:
      "Vercel が設定する実行環境(production / preview / development)。" +
      "preview では Vercel の Deployment Protection に任せ、jubilee のログインを省く",
    schema: optional,
  },
});
