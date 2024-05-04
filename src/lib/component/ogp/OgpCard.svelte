<script lang="ts">
  import { onMount } from "svelte";
  import type { GetOgp } from "$lib/server/schema";

  export let url: string;

  let data: GetOgp | null = null;

  onMount(async () => {
    try {
      //@ts-ignore
      data = JSON.parse(await (await fetch(`/ogp?url=${url}`)).text())
        .data as GetOgp;
      console.log(data);
    } catch {
      data = null;
    }
  });
</script>

<div class="ogp_card">
  <!-- <div class="url">{data.siteUrl}</div> -->
  {#if !!data}
    <div class="ogp_card_grids">
      <a href={data.siteUrl}>
        <div class="title">{data.title}</div>
        <div class="description">{data.description ?? "--"}</div>
      </a>
      <div class="thumbnail">
        <img src={data.images[0].url} alt={data.images[0].alt} />
      </div>
    </div>
    <div class="corner_box">
      <div class="url">{data.siteUrl}</div>
    </div>
  {:else}
    <a href={url}>
      <div class="ogp_card_grids">
        <div class="title sktn" />
        <div class="description sktn" />
        <div class="thumbnail sktn" />
      </div>
      <div class="corner_box">
        <div class="url">{url}</div>
      </div>
    </a>
  {/if}
</div>

<style lang="scss">
  .ogp_card {
    position: relative;
    width: 100%;
    max-width: 700px;
    padding: 20px;
    border: solid 1px white;
    background: black;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      top: 0;
      left: 0;
      border: solid 1px white;
      transition: 0.2s;
    }

    &:hover {
      background-image: radial-gradient(#5e5e5e 20%, transparent 20%),
        radial-gradient(#4c4c4c 20%, transparent 20%);
      background-size: 5px 5px;
      background-position:
        0 0,
        5px 5px;
      &::before {
        opacity: 1;
        left: 15px;
        top: -10%;
        width: 105%;
        height: 120%;
      }
    }

    @media (max-width: 720px) {
      padding: 15px;
    }

    .ogp_card_grids {
      display: grid;
      grid-template-columns: 1fr 200px;
      grid-template-rows: auto auto;
      grid-template-areas:
        "title thumbnail"
        "description thumbnail";
      @media (max-width: 720px) {
        grid-template-columns: 1fr 100px;
        grid-template-rows: auto auto;
        grid-template-areas:
          "title thumbnail"
          "description thumbnail";
      }
    }
    .title {
      grid-area: title;
      font-weight: bold;
      margin: 10px 0;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      &.sktn {
        width: 80%;
        height: 40px;
      }
    }
    .description {
      grid-area: description;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      font-size: 12px;

      &.sktn {
        height: 40px;
      }
    }
    .thumbnail {
      grid-area: thumbnail;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        object-fit: cover;
        object-position: center;
        max-width: 100%;
      }
    }
    .corner_box {
      position: absolute;
      right: 5px;
      bottom: -8px;
      max-width: 70%;
      padding: 0 10px;
      background: black;
    }
    .url {
      font-size: 11px;
      color: gray;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
</style>
