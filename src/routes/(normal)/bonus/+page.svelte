<script lang="ts">
  import PendulumLoader from "#lib/component/loader/pendulumLoader.svelte";

  // import DotStringLoader from '#lib/component/loader/DotStringLoader.svelte'

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
    <p>この度は、当サイトにアクセスしていただき、誠にありがとうございます。</p>
    <p>ここには、妙な振り子しかありませんが、ごゆっくりお過ごしください。</p>
    <hr style="margin: 20px 0; height: 1px;" />
    <p>
      ところで、振り子は、紐の長さで周期・つまり1往復するまでの時間が変わるのを知っているでしょうか？
    </p>
    <p>
      ここにあるのは、紐の長さが等幅に異なる複数の振り子を、同時に振らせたもので、あなたが今使用しているブラウザ上で計算を行っています。
    </p>
    <p>この振り子たちが減衰なく同時に振れる時、驚きの動きをします。</p>
    <p>
      バラバラに見える振り子たちは、 ある時は調和するように渦を巻き、
      ある時は数グループに分かれて同期したような動きをし、またすぐバラバラに戻ります。
      そして、最後まで見守ると、同時に振り出した時の状態に戻り、そしてまたこれを繰り返すのです。
    </p>
    <p>
      自然界では、減衰のない振り子は存在しません。この振り子は、あなたの端末が電力の続く限り、この幾何学的で無限の循環を発揮します。
    </p>
    <p>ここに、作者が持つ美学を感じていただけたらと思います。</p>
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
      height: 200px;
      overflow-y: scroll;
      padding-right: 8px;
      padding-bottom: 32px;
      width: 90%;

      &::-webkit-scrollbar {
        width: 4px; /* お好みの太さに変更（例: 6px） */
      }

      /* スクロールバーの背景（レール）の色 */
      &::-webkit-scrollbar-track {
        background: gray;
      }

      /* スクロールバーのつまみ（動く部分）の色や角丸 */
      &::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 4px;
      }

      /* ホバー時のつまみの色 */
      &::-webkit-scrollbar-thumb:hover {
        background: #ddd;
      }

      p {
        padding: 4px 0;
        font-size: 13px;
      }
      .shade {
        height: 20px;
      }
    }
  }
</style>
