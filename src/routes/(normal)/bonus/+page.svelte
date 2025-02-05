<script lang="ts">
  import PendulumLoader from "$lib/component/loader/pendulumLoader.svelte";

  // import DotStringLoader from '$lib/component/loader/DotStringLoader.svelte'

  $: innerWidth = 0;

  type ShowItemArg = {
    name: string;
    component: ConstructorOfATypedSvelteComponent;
  };
</script>

<svelte:window bind:innerWidth />

<section class="show-room">
  <PendulumLoader numof_pendulum={20} initial_length={50} />
  <div class="explain-box com_scroll-shader com_is-vertical">
    <p>振り子は、紐の長さで周期が変わります。</p>
    <p>この振り子は、複数の振り子の紐を等幅に変え、同時に振ったものです。</p>
    <p>
      この設計の振り子たちが、減衰なく同時に振れる時、驚きの動きをします。
      ある時は、すべての振り子が調和するように渦を巻き、
      またある時は、一瞬だけ数グループの周期が同期したように連帯します。
      そして最後まで見守ると、同時に振り出した時の状態に戻り、そしてまた繰り返すのです。
    </p>
    <p>
      自然界では、減衰のない振り子は存在しません。電力の続く限りのこの無限と、幾何学の持つ美しさは、コンピュータ上でしか再現できないのです。
    </p>
    <p>そこに、作者が持つ美学を感じていただけたらと、思います。</p>
  </div>
</section>

<style lang="scss">
  .show-room {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;

    .explain-box {
      max-width: 500px;
      height: 150px;
      overflow-y: scroll;
      padding-right: 8px;
      padding-bottom: 32px;
      width: 90%;

      p {
        padding: 4px 0;
        font-size: 15px;
      }
      .shade {
        height: 20px;
      }
    }
  }
</style>
