<!--
  jubilee 内のページへのリンク。見ている人が開けないページ(メンバー用のページを非メンバーが見ている)なら、
  何も出さない。公開範囲は #lib/jubilee/access.ts。

    <JubileeLink href="/jubilee/replay">replay で振り返る</JubileeLink>

  リンクの周りの要素(li など)ごと隠したいときは、canVisit(path, page.data) で囲む。
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { page } from "$app/state";
  import { canVisit } from "#lib/jubilee/access.ts";

  let {
    href,
    children,
    ...rest
  }: HTMLAnchorAttributes & { href: string; children: Snippet } = $props();

  const visible = $derived(canVisit(href, { member: page.data.member === true }));
</script>

{#if visible}
  <a {href} {...rest}>{@render children()}</a>
{/if}
