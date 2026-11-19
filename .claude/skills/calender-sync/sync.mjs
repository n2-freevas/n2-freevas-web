#!/usr/bin/env node
/**
 * /calender のスナップショット(Vercel Blob)を、cron を待たずに今すぐ作り直す。
 * 本番の cron と同じ /api/cron/calender を、CRON_SECRET を付けて呼ぶだけ。
 *
 *   node .claude/skills/calender-sync/sync.mjs                       本番(www.n2freevas.com)で作り直す
 *   node .claude/skills/calender-sync/sync.mjs --deployment <URL>    指定したデプロイ(プレビューなど)で作り直す
 *
 * Blob は本番とプレビューで共有しているので、どちらで動かしても同じ Blob が書き換わる。
 * プレビューで動かすと、そのデプロイのコードでスナップショットが作られる点に注意。
 *
 * 次の値は環境変数か、リポジトリ直下の .env(git 管理外)から読む:
 *   CRON_SECRET            cron の合言葉(必須。値は表示しない)
 *   CALENDER_SYNC_URL      本番の URL(既定: https://www.n2freevas.com)
 *   CALENDER_VERCEL_SCOPE  --deployment で使う Vercel のチームの slug(既定: JUBILEE_VERCEL_SCOPE、なければ CLI の今のチーム)
 *   CALENDER_VERCEL_CLI    Vercel CLI の起動コマンド(既定: npx --yes vercel@65.16.0)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PATH = "/api/cron/calender";
const DEFAULT_URL = "https://www.n2freevas.com";
const DEFAULT_CLI = "npx --yes vercel@65.16.0";
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function loadDotEnv() {
  const file = resolve(REPO_ROOT, ".env");
  if (!existsSync(file)) return {};
  const vars = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) vars[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return vars;
}

function fail(message) {
  console.error(`エラー: ${message}`);
  process.exit(1);
}

const env = { ...loadDotEnv(), ...process.env };
const secret = env.CRON_SECRET;
if (!secret) fail("CRON_SECRET が環境変数にも .env にもありません。");

const args = process.argv.slice(2);
const i = args.indexOf("--deployment");
const deployment = i >= 0 ? args[i + 1] : null;
if (i >= 0 && !deployment) fail("--deployment のあとにデプロイの URL か ID を書いてください。");

/** 応答を確かめて表示する */
function report(status, body) {
  let data = null;
  try {
    data = JSON.parse(body);
  } catch {}
  if (status !== 200 || !data?.ok) {
    fail(`作り直せませんでした(HTTP ${status}): ${body.slice(0, 300)}`);
  }
  console.log(JSON.stringify(data));
  console.log(
    `作り直しました: ${data.from}〜${data.to}、予定のある日 ${data.busyDays} 日` +
      (data.partial ? "。ただし一部の取得元から取れませんでした(partial)" : ""),
  );
}

if (!deployment) {
  // 本番は Deployment Protection がないので、Vercel Cron と同じ Authorization ヘッダーで直接呼ぶ
  const base = (env.CALENDER_SYNC_URL || DEFAULT_URL).replace(/\/$/, "");
  console.log(`${base}${PATH} を呼びます(1 分ほどかかることがあります)…`);
  const res = await fetch(`${base}${PATH}`, {
    headers: { authorization: `Bearer ${secret}` },
    signal: AbortSignal.timeout(180_000),
  }).catch((e) => fail(`呼び出しに失敗しました: ${e.message}`));
  report(res.status, await res.text());
} else {
  // プレビューは Deployment Protection が Authorization を使うので、vercel curl で保護を越え、合言葉は x-cron-secret で送る。
  // 合言葉がコマンドラインに出ないよう、ヘッダーは一時ファイル経由で curl に渡す
  const dir = mkdtempSync(join(tmpdir(), "calender-sync-"));
  const headerFile = join(dir, "header");
  writeFileSync(headerFile, `x-cron-secret: ${secret}\n`, { mode: 0o600 });
  const [cmd, ...cliArgs] = (env.CALENDER_VERCEL_CLI || DEFAULT_CLI).split(" ");
  const scope = env.CALENDER_VERCEL_SCOPE || env.JUBILEE_VERCEL_SCOPE;
  console.log(`${deployment} の ${PATH} を呼びます(1 分ほどかかることがあります)…`);
  try {
    const out = execFileSync(
      cmd,
      [
        ...cliArgs,
        "curl",
        PATH,
        "--deployment",
        deployment,
        ...(scope ? ["--scope", scope] : []),
        "--",
        "-sS",
        "-m",
        "180",
        "-H",
        `@${headerFile}`,
        "-w",
        "\n%{http_code}",
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    const lines = out.trimEnd().split("\n");
    const status = Number(lines.pop());
    report(status, lines.at(-1) ?? "");
  } catch (e) {
    fail(`vercel curl に失敗しました: ${String(e.stderr || e.message).slice(0, 500)}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
