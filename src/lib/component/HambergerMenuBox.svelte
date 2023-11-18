<script lang="ts">
  export let name: string;
  export let path: string;
  export let img: string;
  export let explain: string;
  export let aTarget: string | undefined;
</script>

<a href={path} target={aTarget}>
  <div class="menu-box">
    <img class="icon" src={img} alt="" />
    <div class="text">
      <p class="name">{name}</p>
      <p class="explain">{@html explain}</p>
    </div>
    <img class="arrow" src="/img/arrow-osha.svg" alt=">" />
  </div>
</a>

<style lang="scss">
  .menu-box {
    padding: 15px 10px;
    display: flex;
    gap: 5px;
    height: 100px;
    flex-direction: row;
    img {
      &.icon {
        margin: 0 10px;
        height: 50px;
      }
      &.arrow {
        transform: rotate(-90deg);
        height: 15px;
        margin: auto 0;
      }
    }

    .text {
      padding: 0 5px;
      width: 200px;
      .name {
        font-size: 13px;
        margin: 0 0 5px 0;
      }
      .explain {
        font-size: 10px;
      }
    }
  }
</style>
