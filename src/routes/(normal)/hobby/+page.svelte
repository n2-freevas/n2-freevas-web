<script lang="ts">
  import MenuGrid from "$lib/component/MenuGrid.svelte";
  import { hobbymenus, type MainMenu } from "$lib/store/main-menu";
  import N2Clock from "$lib/component/N2Clock.svelte";
  import SEO from "$lib/component/seo/index.svelte";

  const backToTop: MainMenu = {
    name: "TOP",
    path: "/",
    img: "/img/n2-icon-white.svg",
    active: true,
    explain: "TOPへ戻ります",
    submenu: [],
  };
</script>

<SEO title="hobby" />

<div id="menu_box">
  <MenuGrid menus={[backToTop, ...$hobbymenus]} />
  <N2Clock position="side" />
</div>

<style lang="scss">
  #menu_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
