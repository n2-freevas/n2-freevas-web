---
name: jubilee-member
description: jubilee（/jubilee 配下）を使えるメンバーを追加・削除・一覧表示する。許可リストは Vercel Edge Config のキー jubilee_allowed_emails にある。「jubilee にメンバーを追加して」「○○さんを jubilee に入れて」「jubilee の利用者を外して」「jubilee に誰が入れるか見せて」などで使う。
---

# jubilee のメンバー管理

jubilee は Google アカウントでログインし、許可リストにあるメールアドレスだけが使える。
許可リストは Vercel Edge Config のキー `jubilee_allowed_emails`（メールアドレスの配列）にある。
リストを変えると数秒で反映され、再デプロイは要らない。

仕組みの詳細は `src/lib/server/jubilee/auth.ts` を参照。

## 準備（初回だけ）

Vercel への認証には、Vercel CLI のログインをそのまま使う。トークンを別に作る必要はない。

1. **Vercel CLI でログインしているか確かめる。** CLI はグローバルに入れず、`npx vercel` で使う。
   ```bash
   npx vercel whoami
   ```
   ログインしていなければ、利用者に `npx vercel login` を実行してもらう（ブラウザでの操作が要るため）。
2. **Edge Config がチームにある場合は、リポジトリを Vercel のプロジェクトに結び付ける。**
   ```bash
   npx vercel link
   ```
   `.vercel/project.json`（git 管理外）が作られ、スクリプトはそこからチーム ID を読む。
   個人アカウントの Edge Config なら不要。
3. **動作を確かめる。**
   ```bash
   node .claude/skills/jubilee-member/member.mjs list
   ```

スクリプトが値を見つける順番は次のとおり。自動で見つからないときだけ、環境変数かリポジトリ直下の `.env`（git 管理外）に書いてもらう。

| 値 | 自動で使うもの | 上書きする名前 |
| --- | --- | --- |
| 認証トークン | Vercel CLI のログイン情報 | `VERCEL_TOKEN` |
| チーム ID | `.vercel/project.json` の `orgId` | `VERCEL_TEAM_ID` |
| Edge Config の ID | Edge Config が1つならそれ。複数あれば名前（slug）が `jubilee` のもの | `JUBILEE_EDGE_CONFIG_ID` |

- **トークンを会話に貼ってもらわない。** 自分でもトークンの値や CLI のログイン情報のファイルの中身を表示しない。
- エラーが「Edge Config が複数あります」なら、表示された候補から jubilee 用の ID を利用者に選んでもらい、`.env` に `JUBILEE_EDGE_CONFIG_ID` を書いてもらう。

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
  - Edge Config をダッシュボードで直接編集してもよい。値は必ず「文字列の配列」のままにする。
  - キーが消える・配列でなくなると、誰も入れなくなる（安全側に倒す作り）。
- **うまく書き込めないとき**
  - スクリプトが `Vercel API 401/403` で失敗したら、まず `npx vercel login` でログインし直してもらう。
  - チームの Edge Config なら、`npx vercel link` で結び付けているかも確かめる。
- **プレビュー環境**
  - Vercel のプレビュー環境ではアプリのログインを省き、Vercel の Deployment Protection に任せている。
  - プレビュー環境に入れる人は、この許可リストではなく Vercel のチームメンバーで決まる。
