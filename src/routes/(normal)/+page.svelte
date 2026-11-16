<script lang="ts">
  import MenuGrid from "#lib/component/MenuGrid.svelte";
  import { mainmenus } from "#lib/store/main-menu.ts";
  import N2Clock from "#lib/component/N2Clock.svelte";
  import SEO from "#lib/component/seo/index.svelte";
</script>

<SEO title="TOP" />

<div id="menu_box">
  <MenuGrid menus={$mainmenus} />
  <N2Clock />
</div>

<style lang="scss">
  #menu_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
