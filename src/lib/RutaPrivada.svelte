<script>
    import { Route } from "svelte-navigator";
    import ProtectorRutaPrivada from "./ProtectorRutaPrivada.svelte";

    export let path;
</script>

<Route {path} let:params let:location let:navigate>
    <ProtectorRutaPrivada>
        <slot {params} {location} {navigate} />
    </ProtectorRutaPrivada>
</Route>
