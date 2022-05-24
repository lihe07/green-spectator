<script>
    import FirstScreen from "../components/index/FirstScreen.svelte";
    import SecondScreen from "../components/index/SecondScreen.svelte";
    import data from "../data.json";
    import LastScreen from "../components/index/LastScreen.svelte";
    import Menu from "../components/index/Menu.svelte";


    let years_map = {};


    for (const region_name in data) {
        let region = data[region_name];
        for (let year in region.data) {
            year = Number.parseInt(year);
            if (years_map.hasOwnProperty(year)) {
                years_map[year] += region.data[year];
            } else {
                years_map[year] = region.data[year];
            }
        }
    }

    let years = [];

    for (const year in years_map) {
        years.push({
            year,
            data: years_map[year]
        })
    }

    years.sort((a, b) => {
        return a.year - b.year;
    });



</script>

<svelte:head>
    <title>Hello! This is INDEX</title>
</svelte:head>

<div style="overflow: hidden">
    <FirstScreen {years}/>
    <SecondScreen/>
    <LastScreen/>
</div>
<Menu/>

<style>

    :global(html) {
        overflow: scroll;
        scrollbar-width: none;
    }
</style>

