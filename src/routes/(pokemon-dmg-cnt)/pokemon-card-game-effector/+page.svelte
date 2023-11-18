<script lang="ts">
  import { onMount } from "svelte";
  import StorageComponent from "./_component/StorageComponent.svelte";
  import CoinComponent from "./_component/CoinComponent.svelte";
  import EmotionConponent from "./_component/EmotionConponent.svelte";

  onMount(() => {
    const video = document.getElementById("web-video");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        //@ts-ignore
        video.srcObject = stream;
        //@ts-ignore
        video.play();
      })
      .catch((e) => {
        console.log(e);
      });
  });
</script>

<div class="info">
  <div class="n2-logo">
    <img src="/img/pokeca/icon_white.svg" alt="" />
    <h1>Pokemon Card Game Web Damage Counters</h1>
  </div>
</div>

<section id="video-layor">
  <video id="web-video">
    <track kind="captions" />
  </video>
</section>

<section id="effect-layor">
  <StorageComponent />
</section>
<!-- <section id='emotion-layor'>
    <EmotionConponent></EmotionConponent>
</section> -->
<section id="coin-layor">
  <CoinComponent />
</section>

<style lang="scss">
  .info {
    position: fixed;
    width: 60%;
    top: 20px;
    right: 20px;
    max-width: 375px;
    z-index: 100;
    .n2-logo {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));
      padding: 15px 25px;
      img {
        width: 50px;
      }
      h1 {
        font-size: 12px;
        margin: 0 20px;
      }
    }
  }
  section {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  #video-layor {
    display: flex;
    justify-content: center;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 98%;
      margin: auto 0;
    }
  }
  #effect-layor {
    right: 0;
    width: 0px;
    height: 100vh;
  }
  #coin-layor {
    position: fixed;
    width: 0;
    height: 0;
    bottom: 120px;
    left: 40px;
  }
</style>
