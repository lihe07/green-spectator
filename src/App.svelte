<script>
  import FirstScreen from "./components/FirstScreen.svelte";
  import SecondScreen from "./components/SecondScreen.svelte";
  import data from "./data.json";
  import LastScreen from "./components/LastScreen.svelte";
  import Menu from "./components/Menu.svelte";

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
      data: years_map[year],
    });
  }

  years.sort((a, b) => {
    return a.year - b.year;
  });
</script>

<svelte:head>
  <title>Hello! This is INDEX</title>
</svelte:head>

<div style="overflow: hidden">
  <FirstScreen {years} />
  <SecondScreen />
  <LastScreen />
</div>
<Menu />

<style>
  :root {
    --font-sans-serif: -apple-system, BlinkMacSystemFont, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "PingFang SC",
      HarmonyOS_Regular, "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue",
      Helvetica, "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei",
      Arial, sans-serif;
    --font-serif: STZhongsong, STSong, "Noto Serif CJK", "Noto Serif SC",
      PMingLiu, SimSun, "WenQuanYi Bitmap Song", "Times New Roman", Times, serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --font-mono: ui-monospace, SFMono-Regular, "SF Mono", "Cascadia Code",
      "Segoe UI Mono", "Source Code Pro", Menlo, Consolas, "Liberation Mono",
      monospace;
  }

  :global(html) {
    overflow-y: scroll;
    scrollbar-width: none;
  }

  :global(:-webkit-scrollbar) {
    display: none;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
