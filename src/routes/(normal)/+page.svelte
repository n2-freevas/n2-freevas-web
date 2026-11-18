<script lang="ts">
  import MenuGrid from "#lib/component/MenuGrid.svelte";
  import { mainmenus } from "#lib/store/main-menu.ts";
  import N2Clock from "#lib/component/N2Clock.svelte";
  import SEO from "#lib/component/seo/index.svelte";
  import Greeting from "#lib/component/greeting/Greeting.svelte";
</script>

<SEO title="TOP" />

<div id="menu_box">
  <Greeting />
  <MenuGrid menus={$mainmenus} />
  <N2Clock />
</div>

<style lang="scss">
  #menu_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* 収まらない高さの画面では、上(ヘッダーの下)にはみ出さず下に伸ばす */
    justify-content: safe center;
  }
</style>
