<script>
  $: innerWidth = 0;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<svelte:window bind:innerWidth on:contextmenu|preventDefault />

<article id="web-damekan-body">
  {#if innerWidth > 701}
    <slot />
  {:else}
    <p>このアプリは、<br />スマホサイズではお楽しみいただけません。</p>
  {/if}
</article>

<style lang="scss">
  p {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
  }

  article {
    position: relative;
    background: #222222;
    height: 100vh;
    overflow: hidden;
    font-family: "Press Start 2P", cursive;
  }
</style>
