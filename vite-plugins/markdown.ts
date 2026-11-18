/**
 * サイト共通: Markdown(.md)をビルド時に HTML へ変換する Vite プラグイン。
 *
 * `import doc from "./rules.md"` と書くと、doc は { html, meta } になる。
 *   - html : 本文を HTML にしたもの(ビルド時に変換済み。ブラウザやサーバーで Markdown を解釈しない)
 *   - meta : 先頭の frontmatter(--- で囲んだ `key: value` の行)。値はすべて文字列
 * 表示は #lib/component/markdown/MarkdownContent.svelte に html を渡す。
 *
 * Markdown はリポジトリに置いた運営者の原稿だけを対象にする(利用者の入力は通さない)前提で、
 * 生の HTML もそのまま出す。
 */
import { Marked } from "marked";
import type { Plugin } from "vite";

// breaks: 原稿の改行をそのまま改行(<br>)にする。日本語の文中の改行が空白として表示されるのを防ぐ
const marked = new Marked({ gfm: true, breaks: true });

/** `---` で囲んだ先頭部分を `key: value` の組として読む(入れ子・配列は扱わない) */
function splitFrontmatter(source: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { meta: {}, body: source };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^\s*([\w-]+)\s*:\s*(.*?)\s*$/.exec(line);
    if (!kv) continue;
    meta[kv[1]] = kv[2].replace(/^(["'])(.*)\1$/, "$2");
  }
  return { meta, body: source.slice(match[0].length) };
}

export function markdown(): Plugin {
  return {
    name: "n2-markdown",
    enforce: "pre",
    async transform(source, id) {
      // ?raw などのクエリ付きの読み込みは Vite 標準の扱いに任せる
      if (!id.endsWith(".md")) return null;
      const { meta, body } = splitFrontmatter(source);
      const html = await marked.parse(body);
      return {
        code: `export default ${JSON.stringify({ html, meta })};`,
        map: null,
      };
    },
  };
}
