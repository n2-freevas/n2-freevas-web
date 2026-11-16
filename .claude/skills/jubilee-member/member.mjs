#!/usr/bin/env node
/**
 * jubilee の許可リスト(Vercel Edge Config のキー jubilee_allowed_emails)を見る・変える。
 *
 *   node .claude/skills/jubilee-member/member.mjs list
 *   node .claude/skills/jubilee-member/member.mjs add    a@example.com [b@example.com ...]
 *   node .claude/skills/jubilee-member/member.mjs remove a@example.com [...]
 *   (add / remove は --dry-run を付けると、変更後のリストを表示するだけで書き込まない)
 *
 * 必要な値(環境変数、なければリポジトリ直下の .env から読む。どれも git には入れない):
 *   VERCEL_TOKEN            Vercel のアクセストークン(Edge Config を書き換える権限)
 *   JUBILEE_EDGE_CONFIG_ID  Edge Config の ID(ecfg_ で始まる)
 *   VERCEL_TEAM_ID          Edge Config がチームにある場合のチーム ID(個人アカウントなら不要)
 *
 * トークンは画面に出さない。Vercel API の仕様: https://vercel.com/docs/edge-config/vercel-api
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = "jubilee_allowed_emails";
const API = "https://api.vercel.com/v1/edge-config";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loadDotEnv() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
  const file = resolve(root, ".env");
  if (!existsSync(file)) return {};
  const vars = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) vars[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return vars;
}

function config() {
  const dotenv = loadDotEnv();
  const get = (name) => process.env[name] || dotenv[name] || "";
  const token = get("VERCEL_TOKEN");
  const id = get("JUBILEE_EDGE_CONFIG_ID");
  const missing = [!token && "VERCEL_TOKEN", !id && "JUBILEE_EDGE_CONFIG_ID"].filter(Boolean);
  if (missing.length) {
    fail(`${missing.join(", ")} が未設定です(環境変数か .env に設定してください)`);
  }
  const teamId = get("VERCEL_TEAM_ID");
  return { token, id, query: teamId ? `?teamId=${encodeURIComponent(teamId)}` : "" };
}

function fail(message) {
  console.error(`エラー: ${message}`);
  process.exit(1);
}

async function api(cfg, path, init = {}) {
  const res = await fetch(`${API}/${encodeURIComponent(cfg.id)}${path}${cfg.query}`, {
    ...init,
    headers: { authorization: `Bearer ${cfg.token}`, "content-type": "application/json", ...init.headers },
  });
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

const cfg = config();
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
