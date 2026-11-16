<script lang="ts">
  import OgpCard from "$lib/component/ogp/OgpCard.svelte";

  import type { CarrearCardProps } from "../_data";
  import type { GetOgp } from "$lib/server/schema";

  export let props: CarrearCardProps;
  export let ogp: Record<string, GetOgp | null> = {};
</script>

<div class="carrer_card">
  <OgpCard url={props.url} data={ogp[props.url]} />
  {#each props.reffers as ref}
    <div class="carrer_detail">
      <OgpCard {ref} url={ref.url} data={ogp[ref.url]} />
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
