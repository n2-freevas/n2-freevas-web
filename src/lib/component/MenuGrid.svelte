<script lang="ts">
  import HomeButton from "#lib/component/HomeButton.svelte";
  import type { MainMenu } from "#lib/store/main-menu.ts";

  export let menus: MainMenu[];
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="icon_box {innerWidth > 701 ? 'large' : ''}">
  {#each menus as menu}
    <HomeButton model={menu} size={innerWidth > 701 ? 120 : 100} />
  {/each}
</div>

<style lang="scss">
  .icon_box {
    display: grid;
    place-items: center;
    grid-template-columns: 140px 140px;
    grid-auto-rows: 150px;
    border: solid 1px white;
    max-width: 500px;
    padding: 20px 10px;
    margin: 0 auto;
    &.large {
      grid-template-columns: 160px 160px;
      grid-auto-rows: 170px;
      padding: 30px 40px;
    }
    background-image:
      radial-gradient(#5e5e5e 20%, transparent 20%),
      radial-gradient(#4c4c4c 20%, transparent 20%);
    background-size: 5px 5px;
    background-position:
      0 0,
      5px 5px;

    position: relative;
    z-index: 2;
    /* ページ遷移時、時計より手前に描画させるため名前を付ける */
    view-transition-name: menu-grid;

    &::before {
      content: "";
      opacity: 0;
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
      opacity: 0;
      position: absolute;
      border: solid 1px white;
      height: 100%;
      width: 100%;
      transition: 0.15s;
    }
    &:hover {
      &::before {
        transform: rotate(-20deg);
        opacity: 1;
        height: 112%;
        width: 112%;
      }
      &::after {
        transform: rotate(30deg);
        opacity: 1;
        height: 103%;
        width: 103%;
      }
    }
  }
</style>
