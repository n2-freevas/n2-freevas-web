<!--
  jubilee の練習会の参加ルール。ログインなしで見られる(テニスベアのサークルページなどからリンクする)。
  本文は同じフォルダの rules.md。書き換えたら frontmatter の updated(最終更新日)も更新する。
-->
<script lang="ts">
  import MarkdownContent from "#lib/component/markdown/MarkdownContent.svelte";
  import JubileeSeo from "../../_components/JubileeSeo.svelte";
  import rules from "./rules.md";
</script>

<JubileeSeo title={rules.meta.title} description={rules.meta.description} />

<article class="rules">
  <h1>{rules.meta.title}</h1>
  {#if rules.meta.updated}
    <p class="updated">最終更新日：{rules.meta.updated}</p>
  {/if}
  <MarkdownContent html={rules.html} />
</article>

<style lang="scss">
  .rules {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px 16px 96px;
  }
  h1 {
    margin: 0 0 4px;
    font-size: 20px;
  }
  .updated {
    margin: 0 0 24px;
    color: #666;
    font-size: 12px;
  }
</style>
