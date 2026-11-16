#!/usr/bin/env node
/**
 * jubilee の許可リスト(Vercel Global Config のキー jubilee_allowed_emails)を見る・変える。
 * Vercel CLI の `vercel global-config` コマンドを呼ぶだけで、認証は CLI のログインに任せる。
 *
 *   node .claude/skills/jubilee-member/member.mjs list
 *   node .claude/skills/jubilee-member/member.mjs add    a@example.com [b@example.com ...]
 *   node .claude/skills/jubilee-member/member.mjs remove a@example.com [...]
 *   (add / remove は --dry-run を付けると、変更後のリストを表示するだけで書き込まない)
 *
 * 次の値は環境変数か、リポジトリ直下の .env(git 管理外)で変えられる:
 *   JUBILEE_GLOBAL_CONFIG  Global Config の slug か ID(既定: jubilee)
 *   JUBILEE_VERCEL_SCOPE   Global Config があるチームの slug(既定: CLI の今のチーム)
 *   JUBILEE_VERCEL_CLI     Vercel CLI の起動コマンド(既定: npx --yes vercel@65.16.0)
 *
 * CLI の仕様: https://vercel.com/docs/cli/global-config
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = "jubilee_allowed_emails";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** `vercel global-config` が入った版に固定する(グローバルに入れなくても npx で動く) */
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

const dotenv = loadDotEnv();
const setting = (name, fallback = "") => process.env[name] || dotenv[name] || fallback;
const STORE = setting("JUBILEE_GLOBAL_CONFIG", "jubilee");
const SCOPE = setting("JUBILEE_VERCEL_SCOPE");
const [CLI_BIN, ...CLI_ARGS] = setting("JUBILEE_VERCEL_CLI", DEFAULT_CLI).split(/\s+/).filter(Boolean);

/** `vercel global-config <args>` を実行し、--json の出力を返す */
function vercel(args) {
  const all = [...CLI_ARGS, "global-config", ...args, "--json", "--non-interactive"];
  if (SCOPE) all.push("--scope", SCOPE);
  let out;
  try {
    out = execFileSync(CLI_BIN, all, { cwd: REPO_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (err) {
    const detail = String(err.stderr || err.message).trim();
    fail(
      `vercel global-config ${args[0]} に失敗しました。\n${detail}\n` +
        "ログインが切れていれば `npx vercel login`、チームが違えば JUBILEE_VERCEL_SCOPE を確かめてください",
    );
  }
  try {
    return JSON.parse(out);
  } catch {
    fail(`vercel global-config ${args[0]} の出力を JSON として読めませんでした:\n${out}`);
  }
}

/** items の出力(配列・{items}・{キー: 値} のどれでも)から許可リストを取り出す */
function extractList(output) {
  const items = Array.isArray(output) ? output : Array.isArray(output?.items) ? output.items : null;
  const value = items
    ? items.find((item) => item?.key === KEY)?.value
    : output && typeof output === "object"
      ? output[KEY]
      : undefined;
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) fail(`${KEY} が配列ではありません: ${JSON.stringify(value)}`);
  return value.map((v) => String(v).trim().toLowerCase()).filter(Boolean);
}

function readList() {
  return extractList(vercel(["items", STORE]));
}

function writeList(list) {
  vercel(["update", STORE, "--patch", JSON.stringify({ items: [{ operation: "upsert", key: KEY, value: list }] })]);
}

function normalizeEmails(args) {
  const emails = args.map((a) => a.trim().toLowerCase()).filter(Boolean);
  if (!emails.length) fail("メールアドレスを指定してください");
  const bad = emails.filter((e) => !EMAIL.test(e));
  if (bad.length) fail(`メールアドレスの形式ではありません: ${bad.join(", ")}`);
  return [...new Set(emails)];
}

function printList(list) {
  console.log(`${STORE} / ${KEY}(${list.length} 件)`);
  for (const email of list) console.log(`  - ${email}`);
}

const [command, ...rest] = process.argv.slice(2);
const dryRun = rest.includes("--dry-run");
const args = rest.filter((a) => a !== "--dry-run");

if (!["list", "add", "remove"].includes(command ?? "")) {
  fail("使い方: member.mjs list | add <email...> | remove <email...> [--dry-run]");
}
const emails = command === "list" ? [] : normalizeEmails(args);

const current = readList();

if (command === "list") {
  printList(current);
  process.exit(0);
}

let next;
if (command === "add") {
  const added = emails.filter((e) => !current.includes(e));
  const already = emails.filter((e) => current.includes(e));
  if (already.length) console.log(`登録済みのため変更なし: ${already.join(", ")}`);
  if (!added.length) process.exit(0);
  next = [...current, ...added].sort();
  console.log(`追加: ${added.join(", ")}`);
} else {
  const removed = emails.filter((e) => current.includes(e));
  const absent = emails.filter((e) => !current.includes(e));
  if (absent.length) console.log(`登録されていないため変更なし: ${absent.join(", ")}`);
  if (!removed.length) process.exit(0);
  next = current.filter((e) => !removed.includes(e));
  console.log(`削除: ${removed.join(", ")}`);
}

if (dryRun) {
  console.log("(--dry-run のため書き込んでいません。変更後のリスト:)");
  printList(next);
  process.exit(0);
}

writeList(next);
// 書き込めたかを読み直して確かめる
printList(readList());
