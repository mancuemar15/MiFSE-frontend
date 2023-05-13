<script>
    import { Route } from "svelte-navigator";
    import Inicio from "./Inicio.svelte";
    import UltimasPosiciones from "./UltimasPosiciones.svelte";
    import Centro from "./Centro.svelte";
    import { Modals } from "svelte-modals";
    import { fade } from "svelte/transition";
    import Lista from "./Lista.svelte";
    import Preferencias from "./Preferencias.svelte";
    import Perfil from "./Perfil.svelte";
    import RutaPrivada from "./RutaPrivada.svelte";
    import NotFound from "./NotFound.svelte";
    import Mensajes from "./Mensajes.svelte";
    import Usuarios from "./Usuarios.svelte";
</script>

<main>
    <Route path="/" component={Inicio} />
    <Route path="/ultimas-posiciones" component={UltimasPosiciones} />
    <Route path="/centro/:id" component={Centro} />
    <Route path="/lista/:titulacion" component={Lista} />
    <RutaPrivada path="/lista/:titulacion/:id" let:params>
        <Lista titulacion={params.titulacion} id={params.id} />
    </RutaPrivada>
    <RutaPrivada path="/preferencias/lista/:id" let:params>
        <Preferencias id={params.id} />
    </RutaPrivada>
    <RutaPrivada path="/perfil/*datos-personales">
        <Perfil />
    </RutaPrivada>
    <RutaPrivada path="/mensajes">
        <Mensajes />
    </RutaPrivada>
    <RutaPrivada path="/gestion-usuarios">
        <Usuarios />
    </RutaPrivada>
    <Modals>
        <div slot="backdrop" class="backdrop" transition:fade />
    </Modals>
    <Route component={NotFound} />
</main>

<style>
    main {
        min-height: calc(100vh - 82px - 469.8px);
    }
</style>
