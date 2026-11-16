import { defineEnvVars } from "@sveltejs/kit/env";

/** 環境変数(.env またはホスティング側で設定する) */
export const variables = defineEnvVars({
  PUBLIC_GDRIVE_API_KEY: {
    description:
      "jubilee/replay で Google Drive の動画を読み込む API キー。" +
      "ブラウザに公開されるので、Drive API のみ・許可したサイトからのみ使えるよう制限すること",
    public: true,
    static: true,
    // 未設定なら Google Drive のリンク入力欄を出さない
    schema: (value) => value?.trim() || undefined,
  },
});
