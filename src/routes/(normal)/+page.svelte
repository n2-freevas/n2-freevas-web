<script lang="ts">
  import HomeButton from "$lib/component/HomeButton.svelte";
  import { mainmenus } from "$lib/store/main-menu";
  import N2Clock from "$lib/component/N2Clock.svelte";
  import SEO from "$lib/component/seo/index.svelte";

  let mainmenu_array = $mainmenus;
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<SEO title="TOP" />

<div id="menu_box">
  {#if innerWidth > 701}
    <div class="icon_box large">
      {#each mainmenu_array as menu}
        <HomeButton model={menu} size={120} />
      {/each}
    </div>
  {:else}
    <div class="icon_box">
      {#each mainmenu_array as menu}
        <HomeButton model={menu} size={100} />
      {/each}
    </div>
  {/if}
  <N2Clock />
</div>

<style lang="scss">
  #menu_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .icon_box {
    display: grid;
    place-items: center;
    grid-template-columns: 140px 140px;
    grid-template-rows: 150px 150px 150px;
    border: solid 1px white;
    max-width: 500px;
    padding: 20px 10px;
    margin: 0 auto;
    &.large {
      grid-template-columns: 160px 160px;
      grid-template-rows: 170px 170px 170px;
      padding: 30px 40px;
    }
    background-image: radial-gradient(#5e5e5e 20%, transparent 20%),
      radial-gradient(#4c4c4c 20%, transparent 20%);
    background-size: 5px 5px;
    background-position: 0 0, 5px 5px;

    position: relative;
    z-index: 2;

    &::before {
      content: "";
      z-index: 1;
      position: absolute;
      border: solid 1px white;
      height: 100%;
      width: 100%;
      transition: 0.1s;
    }
    &::after {
      content: "";
      z-index: 0;
      position: absolute;
      border: solid 1px white;
      height: 100%;
      width: 100%;
      transition: 0.15s;
    }
    &:hover {
      &::before {
        height: 120%;
        width: 120%;
      }
      &::after {
        height: 103%;
        width: 103%;
      }
    }
  }
</style>
