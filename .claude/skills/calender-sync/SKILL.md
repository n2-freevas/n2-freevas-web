---
name: calender-sync
description: /calender の予定を今すぐ同期し直す(スナップショットの Vercel Blob を作り直す)。普段は Vercel Cron が毎朝 5 時台に動くので、それを待てないときの手動用。「カレンダーを再同期して」「予定を今すぐ反映して」「calender を同期し直して」などで使う。
---

# /calender の手動同期

/calender は、Vercel Cron が毎朝 5 時台(日本時間)に作るスナップショット(Vercel Blob)を表示している。
予定を入れた・消したのをすぐ反映したいときは、cron と同じ `/api/cron/calender` を手で呼んで作り直す。

仕組みは `src/routes/api/cron/calender/+server.ts` と `src/lib/server/calender/` を参照。

## 手順

1. **本番で作り直す。** 依頼されたら確認なしで動かしてよい(毎朝の cron と同じ処理で、Blob を最新の予定で上書きするだけ)。
   ```bash
   node .claude/skills/calender-sync/sync.mjs
   ```
   1 分ほどかかることがある。Bash のタイムアウトは 3 分以上にする。
2. **結果を伝える。**
   - 作り直せた範囲(`from`〜`to`)と、予定のある日数(`busyDays`)
   - `partial: true` のときは、一部の取得元(Google・iCloud・テニスベアのどれか)から取れず、その分が古いままか抜けていること
   - ページは CDN に最大 10 分ほどキャッシュされるので、表示が変わるまで少しかかることがある

## プレビューで動かす場合

まだ main に入れていないスナップショットの作り方を試すときだけ使う。

```bash
node .claude/skills/calender-sync/sync.mjs --deployment https://<プレビューの URL>
```

- Blob は本番とプレビューで共有している。プレビューで動かすと、本番の表示もそのデプロイのコードで作ったスナップショットに変わる。
- そのため、動かす前に利用者の確認を取る。
- Vercel CLI でログインしている必要がある(`npx --yes vercel@65.16.0 whoami` で確かめる)。

## うまくいかないとき

- **`CRON_SECRET がありません`**
  - リポジトリ直下の `.env` に `CRON_SECRET` を書いてもらう。
  - 値は Vercel の本番の環境変数と同じもの。
- **`HTTP 401`**
  - `.env` の `CRON_SECRET` が、本番の値と違う。
- **`HTTP 502`**
  - すべての取得元で取得に失敗した。この場合、前回のスナップショットはそのまま残る。
  - 取得元の URL・トークン(`CALENDER_ICS_URLS`、`CALENDER_TENNISBEAR_TOKEN`)が切れていないか確かめる。

## 注意

- `CRON_SECRET`、ICS の URL、テニスベアのトークンの値は、会話にもログにも出さない。
- スクリプトは値を表示しない。`.env` を `cat` するなど、値が出る操作もしない。
