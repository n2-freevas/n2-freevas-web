<!--
  jubilee のトップ。ログインなしで見られる。
  機能の一覧は #lib/jubilee/access.ts の FEATURES で、見ている人が開けない機能(メンバー用)は出さない。
-->
<script lang="ts">
  import { canVisit, FEATURES } from "#lib/jubilee/access.ts";
  import JubileeSeo from "../_components/JubileeSeo.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const features = $derived(FEATURES.filter((f) => canVisit(f.path, data)));
  /** メンバー用の機能を隠しているか */
  const hidingMemberFeatures = $derived(features.length < FEATURES.length);
</script>

<JubileeSeo />

<section class="jubilee-top">
  <ul>
    {#each features as feature}
      <li>
        <a href={feature.path}>
          <span class="name">{feature.name}</span>
          <span class="explain">{feature.explain}</span>
        </a>
      </li>
    {/each}
  </ul>
  {#if hidingMemberFeatures}
    <p class="hint">
      {#if data.email}
        このアカウントはメンバーとして登録されていないため、メンバー向けの機能は表示されません。
      {:else}
        メンバーの方は、右上の「ログイン」からログインすると、メンバー向けの機能が表示されます。
      {/if}
    </p>
  {/if}
</section>

<style lang="scss">
  .jubilee-top {
    max-width: 960px;
    margin: 0 auto;
    padding: 16px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 16px;
    border: solid 1px #333;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
    &:hover {
      border-color: #777;
    }
  }
  .name {
    font-size: 15px;
    font-weight: bold;
  }
  .explain {
    color: #666;
    font-size: 13px;
  }
  .hint {
    margin: 16px 0 0;
    color: #666;
    font-size: 12px;
    line-height: 1.8;
  }
</style>
