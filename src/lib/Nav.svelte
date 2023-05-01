<script>
    import { Link } from "svelte-navigator";
    import mifseLogo from "../assets/logo-mifse.svg";
    import Buscador from "./Buscador.svelte";
    import { usuario } from "./store";
    import { abrirModalRegistro } from "./utilidadesModales";

    const opcionesNav = [
        { tipo: "enlace", pagina: "Inicio", ruta: "/" },
        {
            tipo: "dropdown",
            pagina: "Haz tu lista",
            ruta: "lista",
            paginas: [
                { tipo: "enlace", pagina: "Biología", ruta: "/biologia" },
                { tipo: "enlace", pagina: "Enfermería", ruta: "/enfermeria" },
                { tipo: "enlace", pagina: "Farmacia", ruta: "/farmacia" },
                { tipo: "enlace", pagina: "Física", ruta: "/fisica" },
                { tipo: "enlace", pagina: "Medicina", ruta: "/medicina" },
                { tipo: "enlace", pagina: "Psicología", ruta: "/psicologia" },
                { tipo: "enlace", pagina: "Química", ruta: "/quimica" },
            ],
        },
        {
            tipo: "enlace",
            pagina: "Últimas posiciones",
            ruta: "/ultimas-posiciones",
        },
    ];

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive =
            href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        if (isActive) {
            return { className: "activo" };
        }
    }

    window.addEventListener("scroll", () => {
        let navElement = document.querySelector(".navbar");

        if (window.scrollY > 10) {
            navElement.classList.add("navbar-scrolled");
        } else {
            navElement.classList.remove("navbar-scrolled");
        }
    });

    function cerrarSesion() {
        usuario.set(null);
    }
</script>

<nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid container-lg">
        <Link to="/" class="navbar-brand">
            <img src={mifseLogo} alt="Logo MiFSE" width="120" />
        </Link>
        <button
            class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#contenidoNavbar"
            aria-controls="contenidoNavbar"
            aria-expanded="false"
            aria-label="Cambiar navegación"
        >
            <span class="toggler-icon linea-superior" />
            <span class="toggler-icon linea-media" />
            <span class="toggler-icon linea-inferior" />
        </button>
        <div
            class="collapse navbar-collapse justify-content-lg-between"
            id="contenidoNavbar"
        >
            <ul class="navbar-nav pt-2 px-3 pb-0 mx-3 mt-4 mb-0 my-lg-0 p-lg-0">
                {#each opcionesNav as opcionNav}
                    {#if opcionNav.tipo == "enlace"}
                        <li class="nav-item text-start">
                            <Link
                                class="nav-link"
                                to={opcionNav.ruta}
                                {getProps}>{opcionNav.pagina}</Link
                            >
                        </li>
                    {:else if opcionNav.tipo == "dropdown"}
                        <li class="nav-item dropdown">
                            <button
                                class="nav-link dropdown-toggle border-0 bg-white"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {opcionNav.pagina}
                            </button>
                            <ul class="dropdown-menu border-0 my-2">
                                {#each opcionNav.paginas as pagina}
                                    <li>
                                        <Link
                                            class="dropdown-item py-2"
                                            to="{opcionNav.ruta}/{pagina.ruta}"
                                            {getProps}
                                        >
                                            {pagina.pagina}
                                        </Link>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/if}
                {/each}
            </ul>
            <div
                class="fondo-blanco d-lg-flex align-items-center pb-2 pt-0 px-3 mx-3 mb-4 mt-0 my-lg-0 p-lg-0"
            >
                <Buscador placeholder="Buscar un centro" />
                {#if $usuario}
                    <div
                        class="dropdown dropdown-usuario d-flex justify-content-end"
                    >
                        <button
                            class="d-block border-0 bg-white dropdown-toggle d-flex align-items-center justify-content-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="bi bi-person-circle d-flex" />
                        </button>
                        <ul
                            class="dropdown-menu dropdown-menu-end text-small border-0"
                        >
                            <li>
                                <a class="dropdown-item" href="#">Mensajes</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Perfil</a>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    on:click={cerrarSesion}>Cerrar sesión</a
                                >
                            </li>
                        </ul>
                    </div>
                {:else}
                    <button
                        class="boton-empezar boton-azul w-100 text-start border-0"
                        on:click={abrirModalRegistro}>Empezar</button
                    >
                {/if}
            </div>
        </div>
    </div>
</nav>

<style>
    /* Botón menú hamburguesa */
    .navbar-toggler {
        width: 20px;
        height: 20px;
    }

    .navbar-toggler,
    .navbar-toggler:focus,
    .navbar-toggler:active {
        box-shadow: none;
        border: 0;
        position: relative;
    }

    .toggler-icon {
        position: absolute;
        height: 3px;
        width: 100%;
        background: #013289;
        left: 0;
        transition: 0.25s ease-in-out;
    }

    .navbar-toggler.collapsed .linea-superior {
        top: 0px;
        transform: rotate(0deg);
    }

    .navbar-toggler.collapsed .linea-media {
        opacity: 1;
        top: 10px;
    }

    .navbar-toggler.collapsed .linea-inferior {
        top: 20px;
        transform: rotate(0deg);
    }

    .navbar-toggler .linea-superior {
        transform: rotate(135deg);
        background-color: rgba(1, 22, 61, 0.9);
    }

    .navbar-toggler .linea-media {
        opacity: 0;
    }

    .navbar-toggler .linea-inferior {
        transform: rotate(-135deg);
        background-color: rgba(1, 22, 61, 0.9);
    }

    /* Fin botón menú hamburguesa */

    .navbar {
        background: transparent;
        transition: 0.25s;
    }

    :global(.navbar a, .navbar button) {
        font-family: "Nunito", sans-serif;
        font-size: 16px;
        font-weight: 700;
        transition: 0.3s;
        color: #013289;
    }

    :global(
            .navbar a:hover,
            .navbar *[className="activo"],
            .navbar li:hover > a
        ) {
        color: #4154f1 !important;
    }

    :global(a.nav-link, button.nav-link),
    .dropdown-usuario {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }

    .dropdown-usuario i {
        font-size: 2rem;
    }

    #contenidoNavbar {
        background-color: rgba(1, 22, 61, 0.9) !important;
        margin-left: -12px !important;
        margin-right: -12px !important;
    }

    .fondo-blanco {
        background-color: #fff;
        border-radius: 0px 0px 10px 10px;
    }

    .navbar-nav {
        border-radius: 10px 10px 0px 0px;
        background-color: #fff !important;
    }

    button.nav-link {
        background-color: transparent !important;
    }

    .dropdown-menu {
        border-radius: 4px;
        box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25) !important;
    }

    :global(.dropdown-item) {
        font-weight: 600 !important;
    }

    :global(.dropdown-item:hover) {
        background-color: #fff;
    }

    .boton-empezar {
        padding: 8px 20px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    :global(.navbar-scrolled) {
        background: #fff !important;
        padding: 4px 0;
        box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
    }

    .dropdown-usuario:hover > ul {
        top: 90% !important;
    }

    @media (min-width: 992px) {
        #contenidoNavbar {
            background-color: transparent !important;
        }

        .boton-empezar {
            width: 150px !important;
            text-align: center !important;
            margin: 0px;
        }

        .dropdown-usuario {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
        }

        .navbar-nav,
        .fondo-blanco {
            background-color: transparent !important;
            gap: 15px;
        }

        .navbar .dropdown ul {
            display: block;
            position: absolute;
            top: calc(100% + 30px);
            z-index: 50;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
        }

        .navbar .dropdown:hover > ul {
            opacity: 1;
            top: 85%;
            visibility: visible;
        }

        .dropdown-usuario:hover > ul {
            top: 115% !important;
        }
    }
</style>
