<script>
    import { Route } from "svelte-navigator";
    import Inicio from "../paginas/Inicio.svelte";
    import UltimasPosiciones from "../paginas/UltimasPosiciones.svelte";
    import Centro from "../paginas/Centro.svelte";
    import { Modals } from "svelte-modals";
    import { fade } from "svelte/transition";
    import Lista from "../paginas/Lista.svelte";
    import Preferencias from "../paginas/Preferencias.svelte";
    import Perfil from "../paginas/Perfil.svelte";
    import RutaPrivada from "./RutaPrivada.svelte";
    import NotFound from "../paginas/NotFound.svelte";
    import Mensajes from "../paginas/Mensajes.svelte";
    import Usuarios from "../paginas/Usuarios.svelte";
    import PoliticaPrivacidad from "../paginas/PoliticaPrivacidad.svelte";
    import Verificacion from "../paginas/Verificacion.svelte";
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
    <RutaPrivada path="/gestion-usuarios" tipoUsuario={1}>
        <Usuarios />
    </RutaPrivada>
    <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
    <Route path="/verificacion" component={Verificacion} />
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
