<script>
    import InteractiveMap from "./InteractiveMap.svelte"
    import RegionDetail from "./RegionDetail.svelte"

    let selected = null
</script>

<div class="container">
    <div class="mask">
        {#if selected !== null}
            <RegionDetail region={selected} on:close={() => selected = null}/>
        {/if}
        <InteractiveMap on:select={(e) => selected = e.detail}/>
    </div>
</div>


<style>
    .container {
        width: 100vw;
        height: 100vh;
        /*background: url("/bg.jpg") no-repeat center center fixed;*/
        /*background-size: cover;*/
    }

    .mask {
        width: 100%;
        height: 100%;
        background: rgba(20, 20, 20, 1);
    }
</style>
