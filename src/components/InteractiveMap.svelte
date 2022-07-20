<script>
    import {createEventDispatcher, onMount} from "svelte"
    // import ECharts from "echarts-for-svelte"
    import * as echarts from "echarts"

    const dispatch = createEventDispatcher()

    let chart
    function mapAction(element) {
        console.log(element);
        chart = echarts.init(element)
        getGeoJson('100000_full').then(china => initChart(china, '全国'))
    }

    function initChart(geoJson, name) {
        echarts.registerMap(name, geoJson)
        let option = {
            title: {
                text: name,
                left: 'center',
            },
            series: [
                {
                    type: 'map',
                    map: name,
                }
            ]
        }
        chart.setOption(option)
    }

    async function getGeoJson(region) {
        return await fetch('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=' + region)
    }

</script>

<svelte:window on:resize={() => {
    if (chart) {
        chart.resize()
    }
}}></svelte:window>

<div class="container" use:mapAction>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #17202a;
    }
</style>
