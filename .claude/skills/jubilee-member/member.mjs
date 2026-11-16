#!/usr/bin/env node
/**
 * jubilee の許可リスト(Vercel Edge Config のキー jubilee_allowed_emails)を見る・変える。
 *
 *   node .claude/skills/jubilee-member/member.mjs list
 *   node .claude/skills/jubilee-member/member.mjs add    a@example.com [b@example.com ...]
 *   node .claude/skills/jubilee-member/member.mjs remove a@example.com [...]
 *   (add / remove は --dry-run を付けると、変更後のリストを表示するだけで書き込まない)
 *
 * Vercel への認証は、Vercel CLI のログイン(`npx vercel login`)をそのまま使う。
 * 次の値は自動で見つけるが、環境変数かリポジトリ直下の .env で上書きもできる(どれも git には入れない):
 *   VERCEL_TOKEN            既定: Vercel CLI のログイン情報(com.vercel.cli/auth.json)のトークン
 *   VERCEL_TEAM_ID          既定: `npx vercel link` で作られる .vercel/project.json の orgId(チームの場合)
 *   JUBILEE_EDGE_CONFIG_ID  既定: Edge Config が 1 つならそれ。複数あれば名前(slug)が jubilee のもの
 *
 * トークンは画面に出さない。Vercel API の仕様: https://vercel.com/docs/edge-config/vercel-api
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = "jubilee_allowed_emails";
const API = "https://api.vercel.com/v1/edge-config";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

/** Vercel CLI の設定フォルダ(OS ごとの置き場所) */
function cliConfigDirs() {
  const home = homedir();
  return [
    process.env.XDG_DATA_HOME && join(process.env.XDG_DATA_HOME, "com.vercel.cli"),
    join(home, "Library", "Application Support", "com.vercel.cli"), // macOS
    join(home, ".local", "share", "com.vercel.cli"), // Linux
    process.env.APPDATA && join(process.env.APPDATA, "com.vercel.cli"), // Windows
  ].filter(Boolean);
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

/** Vercel CLI でログインしたときのトークン */
function cliToken() {
  for (const dir of cliConfigDirs()) {
    const auth = readJson(join(dir, "auth.json"));
    if (auth?.token) return auth.token;
  }
  return "";
}

/** `vercel link` で作られた .vercel/project.json のチーム ID(個人アカウントなら空) */
function linkedTeamId() {
  const project = readJson(join(REPO_ROOT, ".vercel", "project.json"));
  return typeof project?.orgId === "string" && project.orgId.startsWith("team_") ? project.orgId : "";
}

async function config() {
  const dotenv = loadDotEnv();
  const get = (name) => process.env[name] || dotenv[name] || "";

  const token = get("VERCEL_TOKEN") || cliToken();
  if (!token) fail("Vercel にログインしていません。`npx vercel login` を実行してください");

  const teamId = get("VERCEL_TEAM_ID") || linkedTeamId();
  const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  const cfg = { token, query, id: get("JUBILEE_EDGE_CONFIG_ID") };
  if (!cfg.id) cfg.id = await findEdgeConfigId(cfg);
  return cfg;
}

/** Edge Config の ID を探す。1 つならそれ、複数なら名前が jubilee のもの */
async function findEdgeConfigId(cfg) {
  const res = await request(cfg, `${API}${cfg.query}`);
  const configs = await res.json();
  const list = Array.isArray(configs) ? configs : (configs.edgeConfigs ?? []);
  if (list.length === 1) return list[0].id;
  const named = list.find((c) => c.slug === "jubilee");
  if (named) return named.id;
  if (!list.length) {
    fail(
      "Edge Config が見つかりません。Vercel の Storage で作成してプロジェクトにつなぐか、" +
        "チームの Edge Config なら `npx vercel link` を実行してください",
    );
  }
  fail(
    `Edge Config が複数あります。JUBILEE_EDGE_CONFIG_ID を .env に設定してください: ` +
      list.map((c) => `${c.slug}(${c.id})`).join(", "),
  );
}

function fail(message) {
  console.error(`エラー: ${message}`);
  process.exit(1);
}

async function request(cfg, url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${cfg.token}`, "content-type": "application/json", ...init.headers },
  });
  if (res.status === 401 || res.status === 403) {
    fail(
      `Vercel API ${res.status}: 権限がありません。` +
        "`npx vercel login` でログインし直すか、チームの Edge Config なら `npx vercel link` を実行してください",
    );
  }
  return res;
}

async function api(cfg, path, init = {}) {
  const res = await request(cfg, `${API}/${encodeURIComponent(cfg.id)}${path}${cfg.query}`, init);
  if (res.status === 404 && path.startsWith("/item/")) return null;
  if (!res.ok) fail(`Vercel API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function readList(cfg) {
  const item = await api(cfg, `/item/${KEY}`);
  if (!item) return [];
  if (!Array.isArray(item.value)) fail(`${KEY} が配列ではありません: ${JSON.stringify(item.value)}`);
  return item.value.map((v) => String(v).trim().toLowerCase()).filter(Boolean);
}

async function writeList(cfg, list) {
  await api(cfg, "/items", {
    method: "PATCH",
    body: JSON.stringify({ items: [{ operation: "upsert", key: KEY, value: list }] }),
  });
}

function normalizeEmails(args) {
  const emails = args.map((a) => a.trim().toLowerCase()).filter(Boolean);
  if (!emails.length) fail("メールアドレスを指定してください");
  const bad = emails.filter((e) => !EMAIL.test(e));
  if (bad.length) fail(`メールアドレスの形式ではありません: ${bad.join(", ")}`);
  return [...new Set(emails)];
}

function printList(list) {
  console.log(`${KEY}(${list.length} 件)`);
  for (const email of list) console.log(`  - ${email}`);
}

const [command, ...rest] = process.argv.slice(2);
const dryRun = rest.includes("--dry-run");
const args = rest.filter((a) => a !== "--dry-run");

if (!["list", "add", "remove"].includes(command ?? "")) {
  fail("使い方: member.mjs list | add <email...> | remove <email...> [--dry-run]");
}

const cfg = await config();
const current = await readList(cfg);

if (command === "list") {
  printList(current);
  process.exit(0);
}

const emails = normalizeEmails(args);
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

await writeList(cfg, next);
// 書き込めたかを読み直して確かめる
printList(await readList(cfg));
