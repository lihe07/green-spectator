<script>
    import {createEventDispatcher, onMount} from "svelte";
    import ECharts from "echarts-for-svelte"

    const dispatch = createEventDispatcher();

</script>

<div class="container">
    <!-- <ECharts theme="dark"></ECharts> -->
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #17202a;
    }

    :global(.leaflet-interactive) {
        pointer-events: auto;
    }
</style>
