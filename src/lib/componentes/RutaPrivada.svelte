<script>
    import { Route } from "svelte-navigator";
    import ProtectorRutaPrivada from "./ProtectorRutaPrivada.svelte";

    export let path;
    export let tipoUsuario = 2;
</script>

<Route {path} let:params let:location let:navigate>
    <ProtectorRutaPrivada {tipoUsuario}>
        <slot {params} {location} {navigate} />
    </ProtectorRutaPrivada>
</Route>
