<script>
    import HorizontalSwitch from "./HorizontalSwitch.svelte"
    import strings from "../strings.json"
    import lang from "../store.js"

    export let years

</script>

<div class="container">
    <div class="mask">
        <div class="top">
            <h1>{strings['index.title'][$lang]}</h1>
            <h2>{strings['index.subtitle'][$lang]}</h2>
        </div>
        <HorizontalSwitch {years}/>
        <div class="footer">
            <span class:active={$lang === "en"} on:click={() => $lang = "en"}>English</span>
            <span class:active={$lang === "cn"} on:click={() => $lang = "cn"}>中文</span>
        </div>
    </div>
</div>


<style>
    @font-face {
        font-family: "Graduate";
        font-style: normal;
        font-weight: 400;
        src: url("../assets/Graduate.woff2") format("woff2");
    }

    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../assets/bg.jpg") no-repeat center center fixed;
        background-size: cover;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }


    .mask {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        animation: fade-in 1s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .top {
        text-align: center;
    }

    h1 {
        color: white;
        letter-spacing: 2px;
        font-family: var(--font-serif);
    }

    h2 {
        color: rgba(255, 255, 255, 0.7);
        font-family: var(--font-sans-serif);
        letter-spacing: 1px;
        margin: 0;
    }

    .footer {
        position: absolute;
        bottom: 20px;
    }

    span {
        color: rgba(255, 255, 255, 0.4);
        font-family: var(--font-sans-serif);
        letter-spacing: 1px;
        margin: 10px;
        cursor: pointer;
    }

    span:hover {
        color: rgba(255, 255, 255, 0.8);
    }

    span:active, span.active {
        color: rgba(255, 255, 255, 0.8);
    }
</style>
