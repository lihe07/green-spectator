<script>
    import {flip} from "svelte/animate";
    import {tweened} from "svelte/motion";
    import {cubicInOut} from "svelte/easing";
    import {onMount} from "svelte";

    export let years;

    let current = years.length - 1;

    function calc(current) {
        let middle = years.length * 120 / 2;
        let left = (current + 1) * 120;
        return middle - left + 60;
    }

    const offset = tweened(calc(current), {
        duration: 300,
        easing: cubicInOut,
    });

    function handle_key(e) {
        if (e.keyCode === 37 || e.keyCode === 39) {
            e.preventDefault();
            if (e.keyCode === 37) {
                current = Math.max(0, current - 1);
            } else {
                current = Math.min(years.length - 1, current + 1);
            }
            $offset = calc(current);
        }
    }

    onMount(() => {
        window.addEventListener("keyup", handle_key);
        return () => {
            window.removeEventListener("keyup", handle_key);
        }
    })
</script>

<div class="middle">
    <div class="inner" style="transform: translateX({$offset}px);">
        {#each years as data(data.year)}
            <div class="data" animate:flip>
                <p class="year">{data.year}</p>
                <hr/>
                <p class="value"><span class="number">{data.data}</span><br> UNIT</p>
            </div>
        {/each}
    </div>

</div>
<div class="bottom">
    <div class="left arrow" on:click={() => {
        if (current > 0) {
            current--;
            $offset = calc(current);
        }
    }}>

    </div>
    <div class="right arrow" on:click={() => {
        if (current < years.length - 1) {
            current++;
            $offset = calc(current);
        }
    }}></div>
</div>

<style>
    .data {
        text-align: center;
        width: 120px;
        height: 180px;
    }

    .data::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.9);
        position: relative;
        transform: translateX(55px) translateY(72.5px);
    }

    hr {
        border: none;
        border-top: 1px solid rgba(200, 200, 200, 0.8);
        margin: 0;
        padding: 0;
    }

    .year {
        color: white;
        font-size: 20px;
        font-family: var(--font-sans-serif);
    }

    .value {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        font-family: var(--font-sans-serif);
        /*font-weight: lighter;*/
    }

    .number {
        font-family: "Graduate", serif;
        font-size: 18px;
        font-weight: 400;
        color: white;
        letter-spacing: 2px;
    }

    .middle {
        overflow: hidden;
        max-width: 50vw;
        display: flex;
        justify-content: center;
    }

    .inner {
        width: max-content;
        display: flex;
    }

    .bottom {
        display: flex;
        width: 200px;
        justify-content: space-around;
    }

    .arrow {
        --arrow-color: rgba(255, 255, 255, 0.8);
        /*margin-top: 50px;*/
        width: 30px;
        height: 30px;
        border-top: 5px solid var(--arrow-color);
        border-right: 5px solid var(--arrow-color);
        transform: rotate(45deg);
        cursor: pointer;
    }

    .left {
        transform: rotate(-135deg);
    }

    .arrow:hover {
        --arrow-color: rgba(255, 255, 255, 1);
    }

    .arrow:active {
        --arrow-color: rgba(255, 255, 255, 0.8);
    }
</style>
