<script>
    import {tweened} from "svelte/motion";
    import {onMount} from "svelte";
    import {cubicInOut} from "svelte/easing";
    import strings from "../../strings.json";
    import lang from "../../store"

    // export let current = 0;

    let html = document.querySelector("html");

    let scroll_top = html.scrollTop;
    let scrolling = false;


    function on_scroll(e) {
        if (scrolling) return;
        scroll_top = html.scrollTop;
    }


    function handle_resize() {
        html.scrollTop = window.innerHeight * current;
    }

    let inited = false;
    onMount(() => {
        window.addEventListener("scroll", on_scroll);
        // 检查query
        let query = new URLSearchParams(window.location.search);
        if (query.get("index") || parseInt(query.get("index")) >= 0 || parseInt(query.get("index")) <= 2) {
            html.scrollTop = window.innerHeight * parseInt(query.get("index"));
            scroll_top = html.scrollTop;
        }
        window.addEventListener("resize", handle_resize);
        inited = true;
        return () => {
            window.removeEventListener("scroll", on_scroll);
            window.removeEventListener("resize", handle_resize);
        };
    })

    $:current = Math.round(scroll_top / window.innerHeight);

    function calc(current) {
        return (current - 1) * -50
    }

    const offset = tweened(calc(current), {
        duration: 500,
        easing: cubicInOut
    });

    function stick_to(current) {
        if (scrolling) return;
        const temp = tweened(html.scrollTop, {
            duration: 500,
            easing: cubicInOut
        });
        temp.set(current * window.innerHeight);
        temp.subscribe(top => {
            html.scrollTop = top;
        });
        scroll_top = current * window.innerHeight;
        scrolling = true;
        setTimeout(() => {
            scrolling = false;
        }, 600);
    }

    $: {
        $offset = calc(current);
        stick_to(current);
        if (inited) {
            // 设置?index=...
            let query = new URLSearchParams(window.location.search);
            query.set("index", current);
            window.history.replaceState({}, "", `${window.location.pathname}?${query.toString()}`);
        }
    }

</script>

<div class="container">
    <div style="transform: translateY({$offset}px)">
        <div class="item" class:active={current === 0} on:click={() => {
            stick_to(0)
            $offset = calc(0)
        }}>
            <p>{strings['index.menu.0'][$lang]}</p>
            <div class="line"></div>
        </div>
        <div class="item" class:active={current === 1} on:click={() => {
            stick_to(1)
            $offset = calc(1)
        }}>
            <p>{strings['index.menu.1'][$lang]}</p>
            <div class="line"></div>
        </div>
        <div class="item" class:active={current === 2} on:click={() => {
            stick_to(2)
            $offset = calc(2)
        }}>
            <p>{strings['index.menu.2'][$lang]}</p>
            <div class="line"></div>
        </div>
    </div>

</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .container {
        position: fixed;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        opacity: 0;
        animation: fade-in 0.5s ease-in-out 1s forwards;
    }

    .container::before {
        width: 10px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        content: "";
        right: 0;
        top: 50%;
    }

    .item {
        height: 50px;
        display: flex;
        width: 60px;
        justify-content: space-between;

    }

    .item p {
        color: rgba(255, 255, 255, 0.5);
        font-family: var(--font-sans-serif);
        line-height: 100%;
        cursor: pointer;
    }

    .item.active p {
        color: #fff;
    }

    .line {
        width: 1px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>
