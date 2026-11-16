<!--
  jubilee のプライバシーポリシー。ログインなしで見られる(Google の OAuth 同意画面からリンクする)。
  内容を変えたら「最終更新日」も更新する。
-->
<script lang="ts">
  import JubileeSeo from "../../_components/JubileeSeo.svelte";

  const CONTACT = "n2.freevas@gmail.com";
  const UPDATED = "2026年11月16日";
</script>

<JubileeSeo title="プライバシーポリシー" description="jubilee のプライバシーポリシー" />

<article class="privacy">
  <h1>プライバシーポリシー</h1>
  <p class="updated">最終更新日：{UPDATED}</p>

  <p>
    jubilee（https://www.n2-freevas.com/jubilee 以下のページ。以下「本サービス」）の運営者は、
    本サービスの利用者に関する情報を、以下のとおり取り扱います。
  </p>

  <h2>1. 取得する情報</h2>
  <p>本サービスは、Google アカウントでのログイン時に、Google から次の情報だけを受け取ります。</p>
  <ul>
    <li>Google アカウントのメールアドレス（Google が確認済みであること）</li>
  </ul>
  <p>
    氏名・プロフィール画像・連絡先・Google ドライブのファイルなど、メールアドレス以外の Google
    アカウントの情報は取得しません。
  </p>

  <h2>2. 利用目的</h2>
  <p>取得したメールアドレスは、次の目的にだけ使います。</p>
  <ul>
    <li>ログインしている人を識別すること</li>
    <li>運営者が利用を許可した人かどうかを確認すること</li>
  </ul>

  <h2>3. 保存の方法と期間</h2>
  <ul>
    <li>
      ログイン状態を保つため、メールアドレスと有効期限を署名付きの Cookie
      に入れて、利用者のブラウザに保存します（有効期限は最長 14 日）。
    </li>
    <li>
      ログインの途中（Google のログイン画面を開いてから戻るまで）だけ、不正なログインを防ぐための一時的な値を
      Cookie に保存します（最長 10 分）。
    </li>
    <li>
      運営者は、利用を許可した人のメールアドレスの一覧を、ホスティング事業者（Vercel）の設定保存機能に保存します。
      ログインした人のメールアドレスを、この一覧とは別にデータベースなどへ記録することはありません。
    </li>
    <li>サーバーの障害調査のため、ホスティング事業者のアクセスログが一定期間残ることがあります。</li>
  </ul>

  <h2>4. 第三者への提供</h2>
  <p>
    法令に基づく場合を除き、取得した情報を第三者に提供しません。本サービスは、運営のために次の事業者のサービスを利用しています。
  </p>
  <ul>
    <li>Google LLC（ログイン、Google ドライブ上の動画の読み込み）</li>
    <li>Vercel Inc.（ホスティング、利用を許可した人の一覧の保存）</li>
  </ul>
  <p>
    動画の再生機能では、利用者が入力した Google ドライブの共有リンクの動画を、利用者のブラウザから Google
    ドライブへ直接読み込みます。動画やリンクを運営者のサーバーに保存することはありません。
  </p>

  <h2>5. 情報の削除</h2>
  <ul>
    <li>ログアウトすると、ブラウザに保存したログイン状態の Cookie を削除します。</li>
    <li>
      利用を許可した人の一覧からの削除を希望する場合は、下記の連絡先にご連絡ください。速やかに削除します。
    </li>
  </ul>

  <h2>6. お問い合わせ</h2>
  <p>本ポリシーと情報の取り扱いに関するお問い合わせは、次の連絡先までお願いします。</p>
  <p><a href="mailto:{CONTACT}">{CONTACT}</a></p>

  <h2>7. 改定</h2>
  <p>本ポリシーを改定するときは、このページで改定後の内容と最終更新日をお知らせします。</p>
</article>

<style lang="scss">
  .privacy {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px 16px 96px;
    font-size: 14px;
    line-height: 1.9;
  }
  h1 {
    margin: 0 0 4px;
    font-size: 20px;
  }
  h2 {
    margin: 32px 0 8px;
    font-size: 16px;
  }
  .updated {
    margin: 0 0 24px;
    color: #666;
    font-size: 12px;
  }
  p {
    margin: 0 0 8px;
  }
  ul {
    margin: 0 0 8px;
    padding-left: 1.4em;
    list-style: disc;
  }
  li {
    margin-bottom: 4px;
  }
  a {
    color: inherit;
    text-underline-offset: 3px;
  }
</style>
