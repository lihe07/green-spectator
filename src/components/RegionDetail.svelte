<script>
    import {fade} from "svelte/transition"
    import {createEventDispatcher} from "svelte"


    import data from "../data.json"
    import strings from "../strings.json"
    import lang from "../store"

    const dispatch = createEventDispatcher()

    export let region

    // import ECharts from "echarts-for-svelte";
    import * as echarts from "echarts"
    import FlexBox from "./FlexBox.svelte"

    function get_option(region) {
        if (!data.hasOwnProperty(region)) {
            return {}
        }
        const regionData = data[region]

        let pollutionNames = Array.from(new Set(regionData.map(item => strings['data'][item.name][$lang])))

        console.log(pollutionNames);
        console.log(regionData);


        
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            animation: true,
            backgroundColor: "#212f3c",
            legend: {
                data: pollutionNames // All kinds of pollution source
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data['years'], // Years
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                animationDuration: 300,
                animationDurationUpdate: 300,
            },
            series: regionData.map(
                item => {
                    return {
                        name: strings['data'][item.name][$lang],
                        type: 'line',
                        data: item.data,
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: {},

                    }
                }
            ),
            animationDuration: 300,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
        }
    }

    let chart
    function chartAction(element) {
        chart = echarts.init(element, 'dark')
        chart.setOption(option)
    }

    $: option = get_option(region)

    $:out_of_data = !data.hasOwnProperty(region)

    lang.subscribe(() => {
        if (chart) {
            chart.setOption(get_option(region))
        }
    })

    console.log("load")
</script>

<div class="container" transition:fade="{{duration: 100}}">
    <div class="mask">
        <FlexBox>
            <span class="close" on:click={() => dispatch("close")}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path
                    d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                    fill="currentColor"></path></svg>
            </span>
            {#if out_of_data}
                <h2 in:fade>{strings["index.region_detail.out_of_data"][$lang]}</h2>
            {:else}
                <div in:fade>
                    <h2>{strings['index.region_detail.title'][$lang].replace("%", strings['areas'][region][$lang])}</h2>
                    <br>
                    <br>
                    <div class="chart" use:chartAction>
                        <!-- <ECharts {echarts} {option} theme="dark" ></ECharts> -->
                    </div>
                </div>

            {/if}
        </FlexBox>
    </div>
</div>

<style>
    .container {
        position: absolute;
        color: white;
        width: 500px;
        height: 100%;
        display: flex;
        z-index: 1;
        transition: all .2s;
        pointer-events: none;
    }

    .mask {
        flex: 1;
        background: #212f3c;
        margin: 20px;
        border-radius: 20px;
        /*height: 100%;*/
        /*width: 100%;*/
        box-shadow: rgba(0, 0, 0, 0.14) 0 12px 17px 2px, rgba(0, 0, 0, 0.12) 0 5px 22px 4px, rgba(0, 0, 0, 0.2) 0 7px 8px 0;
        padding: 30px;
        height: max-content;
        max-width: calc(100vw - 100px);
        pointer-events: all;
    }

    .close {
        position: absolute;
        top: 50px;
        right: 50px;
        cursor: pointer;
    }

    .close svg {
        width: 30px;
        height: 30px;
    }

    h2 {
        margin: 0;
        font-family: var(--font-serif);
    }

    @media screen and (max-width: 600px) {
        .container {
            width: 100%;
            height: 300px;
        }
    }

    .chart {
        width: 100%;
        height: 300px;
    }

</style>
