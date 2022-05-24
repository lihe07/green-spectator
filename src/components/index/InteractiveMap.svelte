<script>
    import {createEventDispatcher, onMount} from "svelte";

    const dispatch = createEventDispatcher();
    let container;
    let scale = 1;
    fetch("/chinamap.svg").then(async data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(await data.text(), "image/svg+xml");
        const svg = doc.querySelector("svg");
        const viewBox = svg.getAttribute("viewBox").split(" ");
        const width = parseInt(viewBox[2]);
        const height = parseInt(viewBox[3]);
        container.style.width = width + "px";
        container.style.height = height + "px";
        container.appendChild(svg);
        const scaleX = container.clientWidth / width;
        const scaleY = container.clientHeight / height;
        scale = Math.min(scaleX, scaleY);
        svg.style.transform = `scale(${scale})`;
    })

    function handle_mousewheel(e) {
        e.preventDefault();
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        scale = Math.max(1, Math.min(scale + delta * 0.1, 4));
    }

    let outer;
    onMount(() => {
        console.log(outer)
        outer.onwheel = handle_mousewheel;
        outer.ontouchstart = (e) => {
            mouse_down = true;
            hover_y = 0;
            hover_x = 0;
            last_x = e.touches[0].clientX;
            last_y = e.touches[0].clientY;
        }
        outer.ontouchmove = handle_mousemove
        outer.ontouchend = () => {
            mouse_down = false;
        }
    })

    let translate_x = 0;
    let translate_y = 0;

    let mouse_down = false;
    let hover_x = 0;
    let hover_y = 0;
    let last_x = 0;
    let last_y = 0;

    let hover = null;

    function handle_mousemove(e) {
        if (mouse_down) {
            let touch;
            if (e.touches) {
                touch = e.touches[0];
            } else {
                touch = e;
            }
            e.preventDefault();
            const dx = touch.clientX - last_x;
            const dy = touch.clientY - last_y;
            translate_x += dx / scale;
            translate_y += dy / scale;
            hover_x += dx;
            hover_y += dy;
            last_x = touch.clientX;
            last_y = touch.clientY;
        } else {
            let target = e.target;
            if (hover && hover.id !== target.id) {
                hover.attributes['stroke-opacity'].value = "0";
            }
            if (!target.id) return;
            if (target.attributes.hasOwnProperty("stroke-opacity")) {

                hover = target;
                hover.attributes['stroke-opacity'].value = "1";
            }
        }
    }

    let selected = null;

    function handle_click(e) {
        if (Math.abs(hover_x) < 10 && Math.abs(hover_y) < 10 && e.target.classList.contains("leaflet-interactive")) {
            let target = e.target;
            if (!target.id) return;
            if (selected) {
                selected.attributes['fill-opacity'].value = "0";
            }
            selected = target;
            // fill
            selected.attributes.fill.value = "#fff";
            selected.attributes["fill-opacity"].value = "0.5";
            console.log(selected.id);
            dispatch("select", selected.id);
        }
    }

</script>

<div class="container" bind:this={outer}
     on:mousedown={(e)=>{
    if (e.buttons === 1) {
        hover_x = 0;
        hover_y = 0;
        mouse_down = true;
        last_x = e.clientX;
        last_y = e.clientY;
    }
}}
     on:mousemove={handle_mousemove}
     on:mouseup={()=>{
         mouse_down = false;

     }}
     on:click={handle_click}
>
    <div class="inner" bind:this={container}
         style="transform: scale({scale}) translateX({translate_x}px) translateY({translate_y}px)">

    </div>
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
