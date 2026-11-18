<!--
  サイト共通: Markdown から変換した HTML(vite-plugins/markdown.ts)を、読みやすい体裁で表示する。

    <script>
      import doc from "./rules.md";
      import MarkdownContent from "#lib/component/markdown/MarkdownContent.svelte";
    </script>
    <MarkdownContent html={doc.html} />

  文字色は親から引き継ぐので、白地(jubilee)にも黒地(n2freevas.com 本体)にも置ける。
  罫線・引用・表の色は --md-muted / --md-border / --md-subtle で上書きできる。
-->
<script lang="ts">
  let { html }: { html: string } = $props();
</script>

<div class="markdown">
  <!-- リポジトリに置いた原稿だけをビルド時に変換したもの(利用者の入力は含まない) -->
  {@html html}
</div>

<style lang="scss">
  .markdown {
    --_muted: var(--md-muted, color-mix(in srgb, currentColor 60%, transparent));
    --_border: var(--md-border, color-mix(in srgb, currentColor 18%, transparent));
    --_subtle: var(--md-subtle, color-mix(in srgb, currentColor 6%, transparent));

    font-size: 14px;
    line-height: 1.9;
    overflow-wrap: anywhere;

    > :global(:first-child) {
      margin-top: 0;
    }
    :global(h1) {
      margin: 0 0 16px;
      font-size: 20px;
      line-height: 1.5;
    }
    :global(h2) {
      margin: 36px 0 8px;
      padding-bottom: 4px;
      border-bottom: solid 1px var(--_border);
      font-size: 16px;
      line-height: 1.5;
    }
    :global(h3) {
      margin: 24px 0 6px;
      font-size: 14px;
      line-height: 1.5;
    }
    :global(p) {
      margin: 0 0 10px;
    }
    :global(ul),
    :global(ol) {
      margin: 0 0 10px;
      padding-left: 1.4em;
    }
    :global(ul) {
      list-style: disc;
    }
    :global(ol) {
      list-style: decimal;
    }
    :global(li) {
      margin-bottom: 4px;
      > :global(ul),
      > :global(ol) {
        margin: 4px 0 0;
      }
    }
    :global(a) {
      color: inherit;
      text-underline-offset: 3px;
    }
    :global(strong) {
      font-weight: bold;
    }
    :global(em) {
      font-style: italic;
    }
    :global(blockquote) {
      margin: 0 0 12px;
      padding: 8px 12px;
      border-left: solid 3px var(--_border);
      background: var(--_subtle);
      color: var(--_muted);
      > :global(:last-child) {
        margin-bottom: 0;
      }
    }
    :global(hr) {
      margin: 28px 0;
      border: none;
      border-top: solid 1px var(--_border);
    }
    :global(code) {
      padding: 1px 4px;
      border-radius: 4px;
      background: var(--_subtle);
      font-family: ui-monospace, Menlo, monospace;
      font-size: 0.92em;
    }
    :global(pre) {
      margin: 0 0 12px;
      padding: 10px 12px;
      overflow-x: auto;
      border-radius: 6px;
      background: var(--_subtle);
      :global(code) {
        padding: 0;
        background: none;
      }
    }
    :global(table) {
      display: block;
      margin: 0 0 12px;
      overflow-x: auto;
      border-collapse: collapse;
      font-size: 13px;
    }
    :global(th),
    :global(td) {
      padding: 6px 10px;
      border: solid 1px var(--_border);
      text-align: left;
      vertical-align: top;
    }
    :global(th) {
      background: var(--_subtle);
      font-weight: bold;
    }
  }
</style>
