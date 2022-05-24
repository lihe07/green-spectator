<script>

    import {tweened} from "svelte/motion";
    import {cubicInOut} from "svelte/easing";
    import {onMount} from "svelte";

    let inner;
    const outer_height = tweened(32, {
        duration: 300,
        easing: cubicInOut
    });

    const observer = new ResizeObserver(() => {
        outer_height.set(inner.offsetHeight);
    })
    onMount(() => {
        observer.observe(inner);
    });
</script>

<div style="height: {$outer_height}px">
    <div bind:this={inner}>
        <slot/>
    </div>
</div>
