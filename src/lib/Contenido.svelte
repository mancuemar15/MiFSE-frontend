<script>
    import { Route } from "svelte-navigator";
    import Inicio from "./Inicio.svelte";
    import UltimasPosiciones from "./UltimasPosiciones.svelte";
    import Centro from "./Centro.svelte";
    import { Modals } from "svelte-modals";
    import { fade } from "svelte/transition";
    import Filtrado from "./Filtrado.svelte";
    import Preferencias from "./Preferencias.svelte";
</script>

<main>
    <Route path="/" component={Inicio} />
    <Route path="/ultimas-posiciones" component={UltimasPosiciones} />
    <Route path="/centro/:id" component={Centro} />
    <Route path="/lista/:titulacion" component={Filtrado} />
    <Route path="/lista/:titulacion/:id" component={Filtrado} />
    <Route path="/preferencias/lista/:id" component={Preferencias} />
    <Modals>
        <div slot="backdrop" class="backdrop" transition:fade />
    </Modals>
</main>
