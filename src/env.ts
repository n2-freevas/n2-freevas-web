import { defineEnvVars } from "@sveltejs/kit/env";

/** 空文字・未設定を undefined にそろえる(未設定でもアプリが起動できるようにする) */
const optional = (value: string | undefined) => value?.trim() || undefined;

/** 環境変数(.env またはホスティング側で設定する) */
export const variables = defineEnvVars({
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
});
