<script>
	import Router from "svelte-spa-router";
    import Index from "./routes/index.svelte"
	const routes = {
		"/": Index,
	}
</script>

<Router {routes}/>

