---
name: jubilee-member
description: jubilee（/jubilee 配下）を使えるメンバーを追加・削除・一覧表示する。許可リストは Vercel Global Config（旧名 Edge Config）のキー jubilee_allowed_emails にある。「jubilee にメンバーを追加して」「○○さんを jubilee に入れて」「jubilee の利用者を外して」「jubilee に誰が入れるか見せて」などで使う。
---

# jubilee のメンバー管理

jubilee は Google アカウントでログインし、許可リストにあるメールアドレスだけが使える。
許可リストは Vercel Global Config（2026年7月に Edge Config から改名）の、slug が `n2-freevas-web-global-config` のストアの
キー `jubilee_allowed_emails`（メールアドレスの配列）にある。
このストアは n2-freevas-web 全体で共有する（Hobby プランではストアを1つしか作れないため）。ほかのキーには触らない。
リストを変えると数秒で反映され、再デプロイは要らない。

仕組みの詳細は `src/lib/server/jubilee/auth.ts` を参照。

## 準備（初回だけ）

スクリプトは Vercel CLI の `vercel global-config` コマンドを呼ぶだけで、認証は CLI のログインに任せる。
CLI はグローバルに入れず、`npx --yes vercel@65.16.0`（`global-config` コマンドがある版に固定）で使う。

1. **Vercel CLI でログインしているか確かめる。**
   ```bash
   npx --yes vercel@65.16.0 whoami
   ```
   ログインしていなければ、利用者に `npx vercel login` を実行してもらう（ブラウザでの操作が要るため）。
2. **ストアがあるか確かめる。**
   ```bash
   npx --yes vercel@65.16.0 global-config list --scope <チームの slug>
   ```
   ストアは n2-freevas-web プロジェクトにつながっていて、アプリは環境変数 `GLOBAL_CONFIG` から読む。
   ストアの slug やチームが既定と違うときは、下の表の値を `.env` に書いてもらう。
3. **動作を確かめる。**
   ```bash
   node .claude/skills/jubilee-member/member.mjs list
   ```

既定と違う場合だけ、環境変数かリポジトリ直下の `.env`（git 管理外）に書いてもらう。

| 名前 | 内容 | 既定 |
| --- | --- | --- |
| `JUBILEE_GLOBAL_CONFIG` | ストアの slug か ID | `n2-freevas-web-global-config` |
| `JUBILEE_VERCEL_SCOPE` | ストアがあるチームの slug（Vercel のアカウントに複数のチームがあるときは必須） | CLI の今のチーム |
| `JUBILEE_VERCEL_CLI` | Vercel CLI の起動コマンド | `npx --yes vercel@65.16.0` |

- トークンを会話に貼ってもらわない。CLI のログイン情報のファイルの中身も表示しない。

## メンバーを追加する

1. **追加するメールアドレスを確かめる。** その人が jubilee のログインに使う Google アカウントのアドレスであること（Gmail 以外の Google アカウントでもよい）。曖昧なら利用者に聞く。
2. **今のリストを見る。**
   ```bash
   node .claude/skills/jubilee-member/member.mjs list
   ```
3. **変更後のリストを確かめる。**
   ```bash
   node .claude/skills/jubilee-member/member.mjs add new@example.com --dry-run
   ```
4. **利用者に確認を取る。** 本番の利用者が変わる操作なので、追加するアドレスと変更後の件数を示して、書き込んでよいか確かめる。依頼文にアドレスがはっきり書かれ、追加を明確に頼まれているなら、その依頼を確認とみなしてよい。
5. **書き込む。** 書き込み後、スクリプトがリストを読み直して表示するので、追加されたことを確かめる。
   ```bash
   node .claude/skills/jubilee-member/member.mjs add new@example.com
   ```
6. **利用者に伝える。**
   - 追加したアドレス
   - 本人は https://www.n2-freevas.com/jubilee を開き、そのアドレスの Google アカウントでログインすれば使えること
   - すでに「このアカウントでは利用できません」と表示されていた人は、ページを開き直せば入れること

## メンバーを外す

追加と同じ流れで、`add` を `remove` に置き換える。

- 外した人は、次にページを開いた・移動したときから使えなくなる。
- 開いたままの画面は、ページを移動するまでそのまま残る。

## 一覧を見る

```bash
node .claude/skills/jubilee-member/member.mjs list
```

## 注意

- **アドレスの扱い**
  - メールアドレスは個人情報。リポジトリ（コード・コミット・PR・README）には書かない。
  - 会話での報告も、必要な範囲にとどめる。
- **リストを壊さないために**
  - Global Config をダッシュボードで直接編集してもよい。値は必ず「文字列の配列」のままにする。
  - キーが消える・配列でなくなると、誰も入れなくなる（安全側に倒す作り）。
- **うまく書き込めないとき**
  - `vercel global-config ... に失敗しました` と出たら、表示された CLI のエラーを読む。
  - ログイン切れなら `npx vercel login`、ストアが見つからないならチーム（`JUBILEE_VERCEL_SCOPE`）とストアの slug を確かめる。
- **プレビュー環境**
  - Vercel のプレビュー環境ではアプリのログインを省き、Vercel の Deployment Protection に任せている。
  - プレビュー環境に入れる人は、この許可リストではなく Vercel のチームメンバーで決まる。
