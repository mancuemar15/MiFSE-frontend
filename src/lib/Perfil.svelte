<script>
    import TituloPagina from "./TituloPagina.svelte";
    import DatosPersonales from "./DatosPersonales.svelte";
    import MisListas from "./MisListas.svelte";
    import BorrarCuenta from "./BorrarCuenta.svelte";
    import { Router, Route, Link, useLocation } from "svelte-navigator";
    import { redireccionarNotFound } from "./utilidadesLinks";
    import { usuario } from "./store";

    const opcionesMenuPerfil = [
        {
            nombre: "Datos personales",
            icono: "fa-solid fa-user-pen",
            ruta: "datos-personales",
        },
        {
            nombre: "Mis listas",
            icono: "fa-solid fa-list",
            ruta: "mis-listas",
        },
        {
            nombre: "Borrar cuenta",
            icono: "fa-solid fa-user-xmark",
            ruta: "borrar-cuenta",
        },
    ];

    let titulo = "";

    const location = useLocation();

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive =
            href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        if (isActive) {
            return { className: "activo" };
        }
    }

    $: titulo = opcionesMenuPerfil.find((opcion) => {
        return $location.pathname.includes(opcion.ruta);
    }).nombre;
</script>

<TituloPagina seccion="perfil" {titulo} />
<section id="perfil" class="perfil">
    <div class="container">
        <div class="row gy-4">
            <div class="col-lg-5">
                <div class="perfil-info">
                    <div class="container-fluid">
                        <div class="row">
                            {#each opcionesMenuPerfil as opcion}
                                {#if $usuario && $usuario.tipoUsuario.id === 1 && opcion.nombre !== "Mis listas"}
                                    <Link
                                        to={opcion.ruta}
                                        class="col-12 text-decoration-none border-bottom opcion-menu-perfil d-flex bg-transparent py-3"
                                        {getProps}
                                    >
                                        <i
                                            class="{opcion.icono} d-flex justify-content-center"
                                        />
                                        <h3>{opcion.nombre}</h3>
                                    </Link>
                                {:else if $usuario && $usuario.tipoUsuario.id === 2}
                                    <Link
                                        to={opcion.ruta}
                                        class="col-12 text-decoration-none border-bottom opcion-menu-perfil d-flex bg-transparent py-3"
                                        {getProps}
                                    >
                                        <i
                                            class="{opcion.icono} d-flex justify-content-center"
                                        />
                                        <h3>{opcion.nombre}</h3>
                                    </Link>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 contenido-perfil">
                <Router>
                    <Route path="datos-personales">
                        <DatosPersonales />
                    </Route>
                    <Route path="mis-listas">
                        <MisListas />
                    </Route>
                    <Route path="borrar-cuenta">
                        <BorrarCuenta />
                    </Route>
                    <Route>{redireccionarNotFound}</Route>
                </Router>
            </div>
        </div>
    </div>
</section>

<style>
    .perfil {
        padding-top: 40px;
    }

    .perfil .perfil-info {
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
    }

    :global(.opcion-menu-perfil) {
        padding: 10px 5px;
    }

    :global(.opcion-menu-perfil:nth-last-child(1)) {
        border-bottom: none !important;
    }

    :global(.opcion-menu-perfil i) {
        margin: auto 10px;
        min-width: 30px;
        font-size: 20px;
        color: #012970 !important;
    }

    :global(.opcion-menu-perfil:hover:not([className="activo"]) h3) {
        transform: translateX(5px);
        color: #4154f1 !important;
    }

    :global(.opcion-menu-perfil h3) {
        margin: 0;
        transition: 0.3s;
        color: #012970;
        font-weight: 700;
        font-size: 20px;
    }

    :global(.opcion-menu-perfil:hover i),
    :global(.opcion-menu-perfil[className="activo"] h3),
    :global(.opcion-menu-perfil[className="activo"] i) {
        color: #4154f1 !important;
    }
</style>
