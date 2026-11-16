<script lang="ts">
  import { goto } from "$app/navigation";
  import N2Clock from "$lib/component/N2Clock.svelte";
  import SEO from "$lib/component/seo/index.svelte";

  function backToHobby() {
    goto("/hobby");
  }
</script>

<SEO title="clock" />

<!-- 画面のどこをタップしても hobby 一覧へ戻る -->
<button class="tap-area" aria-label="hobby一覧へ戻る" on:click={backToHobby}
></button>
<N2Clock position="center" />

<style lang="scss">
  .tap-area {
    position: fixed;
    inset: 0;
    z-index: 50; /* ヘッダー(z-index:100)よりは下 */
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
  }
</style>
