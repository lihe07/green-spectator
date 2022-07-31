<script>
    import { createEventDispatcher, onMount } from "svelte";
    // import ECharts from "echarts-for-svelte"
    import * as echarts from "echarts";

    const dispatch = createEventDispatcher();

    let chart;
    function mapAction(element) {
        chart = echarts.init(element);
        getGeoJson("100000_full").then((china) => initChart(china, "全国"));
    }

    function initChart(geoJson, name) {
        echarts.registerMap(name, geoJson);
        let option = {
            title: {
                text: "",
                left: "center",
            },
            series: [
                {
                    type: "map",
                    map: name,
                },
            ],
        };
        chart.setOption(option);
        chart.off("click"); // remove the original handler
        chart.on("click", (params) => {
            const code = geoJson.features.filter(
                (item) => item.properties.name === params.name
            )[0].properties.adcode;

            dispatch("select", code);
            getGeoJson(code + "_full")
                .then((region) => 
                    initChart(region, code)
                )
                .catch((err) =>
                    getGeoJson("100000_full").then((china) =>
                        initChart(china, "全国")
                    )
                );
        });
    }

    async function getGeoJson(region) {
        return await (
            await fetch(
                "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=" +
                    region
            )
        ).json();
    }
</script>

<svelte:window
    on:resize={() => {
        if (chart) {
            chart.resize();
        }
    }}
/>

<div class="container" use:mapAction />

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #17202a;
    }
</style>
