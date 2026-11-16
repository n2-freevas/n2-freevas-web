<script lang="ts">
  import JubileeSeo from "../_components/JubileeSeo.svelte";

  /** jubilee で提供する機能の一覧 */
  const features = [
    {
      name: "replay",
      path: "/jubilee/replay",
      explain:
        "Google Drive に置いた試合の動画を、タップとスワイプで振り返る。",
    },
  ];
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
</style>
