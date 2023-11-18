<script lang="ts">
    import PendulumLoader from '$lib/component/loader/pendulumLoader.svelte'
    import RectWaveLoader from '$lib/component/loader/rectWaveLoader.svelte'
    import RoundFloweringLoader from '$lib/component/loader/roundFloweringLoader.svelte'
    import Bs2ndLoader from '$lib/component/loader/bs2ndLoader.svelte'
    import ShowItem from './_show_item.svelte'
    import DotStringLoader from '$lib/component/Loader/DotStringLoader.svelte'

    $: innerWidth = 0

    type ShowItemArg = {
        name: string
        component: ConstructorOfATypedSvelteComponent
    }
    const show_item_args: ShowItemArg[] = [
        { name: 'bs2nd', component: Bs2ndLoader },
        { name: 'Pendulum', component: PendulumLoader },
        { name: 'Rect Wave', component: RectWaveLoader },
        { name: 'Round Flowering', component: RoundFloweringLoader }
        // {name: "Dot Strings", component: DotStringLoader}
    ]
</script>

<svelte:window bind:innerWidth />

<section class="show-room">
    {#each show_item_args as arg}
    {#if innerWidth > 701}
        
                <div class="show-box-phone">
                    <ShowItem name={arg.name} component={arg.component} />
                </div>
    {:else}
    <div class="show-box">
        <ShowItem name={arg.name} component={arg.component} />
    </div>
    {/if}
    {/each}
</section>

<style lang="scss">
    .show-room {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        .show-box {
            flex-basis: 40%;
            margin: 20px 0;
        }
        .show-box-phone {
            flex-basis: 90%;
            margin: 20px 0;
        }
    }
</style>
