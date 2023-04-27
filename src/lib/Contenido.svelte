<script>
    import { Route } from "svelte-navigator";
    import Inicio from "./Inicio.svelte";
    import UltimasPosiciones from "./UltimasPosiciones.svelte";
    import Centro from "./Centro.svelte";
</script>

<main>
    <Route path="/" component={Inicio} />
    <Route path="/ultimas-posiciones" component={UltimasPosiciones} />
    <Route path="/centro/:id" component={Centro} />
</main>
