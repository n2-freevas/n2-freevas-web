<script context="module" lang="ts">
  export interface CarrearCardProps {
    name: string;
    url: string;
    startAt: Date;
    endAt?: Date;
    reffers: {
      name: string;
      url: string;
    }[];
  }
</script>

<script lang="ts">
  import OgpCard from "$lib/component/ogp/OgpCard.svelte";

  export let props: CarrearCardProps;
</script>

<div class="carrer_card">
  <OgpCard url={props.url} />
  {#each props.reffers as ref}
    <div class="carrer_detail">
      <OgpCard url={ref.url} />
    </div>
  {/each}
</div>

<style lang="scss">
  .carrer_card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .carrer_detail {
      transform: translateX(50px);
      @media (max-width: 720px) {
        transform: translateX(20px);
      }
    }
  }
</style>
