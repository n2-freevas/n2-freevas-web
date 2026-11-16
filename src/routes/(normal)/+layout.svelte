<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { mainmenus } from "$lib/store/main-menu";
  import HeaderMenuBox from "$lib/component/HeaderMenuBox.svelte";
  import HambergerMenuBox from "$lib/component/HambergerMenuBox.svelte";
  import ToastArea from "$lib/component/toast/ToastArea.svelte";

  let sliderOpen = false;

  $: innerWidth = 0;
  // N2Clock の位置(home / side)を持つページの route id
  const CLOCK_HOME_ROUTES = ["/(normal)"];
  const CLOCK_SIDE_ROUTES = ["/(normal)/hobby"];

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    const from = navigation.from?.route.id ?? "";
    const to = navigation.to?.route.id ?? "";
    // 時計の転がる向きを決める(左へ行くなら反時計回り、戻るなら時計回り)
    let clockDir = "";
    if (CLOCK_HOME_ROUTES.includes(from) && CLOCK_SIDE_ROUTES.includes(to))
      clockDir = "to-side";
    else if (CLOCK_SIDE_ROUTES.includes(from) && CLOCK_HOME_ROUTES.includes(to))
      clockDir = "to-home";
    document.documentElement.dataset.clockDir = clockDir;

    return new Promise((resolve) => {
      const transition = document.startViewTransition(async () => {
        resolve();
        //@ts-ignore
        await navigation.complete;
      });
      transition.finished.finally(() => {
        delete document.documentElement.dataset.clockDir;
      });
    });
  });
</script>

<svelte:window bind:innerWidth />

<header>
  <div class="n2-logo">
    <a href="/">
      <img src="/img/n2-icon-white.svg" alt="" />
    </a>
  </div>
  {#if innerWidth > 701}
    <div class="menu-row-list">
      {#each $mainmenus as menu}
        {#if menu.active}
          <HeaderMenuBox
            name={menu.name}
            path={menu.path}
            img={menu.img}
            explain={menu.explain}
            aTarget={menu.target}
          />
        {/if}
      {/each}
    </div>
  {:else}
    <button
      class="hamburger-menu"
      on:click={() => {
        sliderOpen ? (sliderOpen = false) : (sliderOpen = true);
      }}
    >
      <span class="hamburger-button">
        <span class="bar bar1" />
        <span class="bar bar2" />
        <span class="bar bar3" />
      </span>
      <div class="hamburger-slider {sliderOpen ? 'open' : ''}">
        {#each $mainmenus as menu}
          {#if menu.active}
            <HambergerMenuBox
              name={menu.name}
              path={menu.path}
              img={menu.img}
              explain={menu.explain}
              aTarget={menu.target}
            />
          {/if}
        {/each}
      </div>
    </button>
  {/if}
</header>

<section id="main">
  <slot />
</section>
<ToastArea />

<style lang="scss">
  * {
    --header_height: 60px;
  }
  header {
    position: relative;
    background: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header_height);
    z-index: 100;
    view-transition-name: header;
    .n2-logo {
      padding: 10px 10px 10px 20px;
      img {
        height: 30px;
      }
    }
    .menu-row-list {
      margin: 0 20px;
    }

    .hamburger-menu {
      position: relative;
      padding: 10px;
      .hamburger-button {
        .bar {
          display: block;
          background-color: #fff;
          height: 4px;
          width: 30px;
          border-radius: 1px;
        }
        .bar1 {
          transform: translateY(-6px);
          transition: transform 0.3s;
        }
        // .bar2{

        // }
        .bar3 {
          transform: translateY(6px);
          transition: transform 0.3s;
        }
      }
      .hamburger-slider {
        position: fixed;
        width: 300px;
        top: 70px;
        right: -320px;
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.8)
        );
        transition: 0.3s;
        &.open {
          right: 0;
        }
      }
    }
  }
  #main {
    z-index: 0;
    height: calc(90svh - var(--header_height));
  }
</style>
