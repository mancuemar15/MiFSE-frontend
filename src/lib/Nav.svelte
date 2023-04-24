<script>
    import { Router, Route, Link } from "svelte-navigator";

    const opcionesNav = [
        { tipo: "enlace", pagina: "Inicio", ruta: "/" },
        {
            tipo: "dropdown",
            pagina: "Haz tu lista",
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
</script>

<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid container-lg">
        <a class="navbar-brand" href="#">Navbar</a>
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
                            <Link class="nav-link" to={opcionNav.ruta}
                                >{opcionNav.pagina}</Link
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
                                            to={pagina.ruta}
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
                class="fondo-blanco d-lg-flex pb-2 pt-0 px-3 mx-3 mb-4 mt-0 my-lg-0 p-lg-0"
            >
                <form class="d-flex">
                    <input
                        class="form-control"
                        type="search"
                        placeholder="Buscar un centro"
                        aria-label="Buscar un centro"
                    />
                </form>
                <button class="boton-empezar w-100 text-start border-0"
                    >Empezar</button
                >
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

    :global(.navbar a, .navbar button) {
        font-family: "Nunito", sans-serif;
        font-size: 16px;
        font-weight: 700;
        transition: 0.3s;
        color: #013289;
    }

    :global(
            .navbar a:hover,
            .navbar button:hover,
            .navbar .active,
            .navbar li:hover > a
        ) {
        color: #4154f1 !important;
    }

    :global(a.nav-link, button.nav-link) {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }

    input[type="search"] {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
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
        background: #4154f1;
        padding: 8px 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 4px !important;
        color: #fff !important;
    }

    .boton-empezar:hover {
        background: #5969f3;
    }

    @media (min-width: 992px) {
        #contenidoNavbar {
            background-color: #fff !important;
        }

        input[type="search"] {
            margin: 0px !important;
        }

        .boton-empezar {
            width: 150px !important;
            text-align: center !important;
            margin: 0px;
        }

        .navbar .dropdown ul {
            display: block;
            position: absolute;
            top: calc(100% + 30px);
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
        }

        .navbar .dropdown:hover > ul {
            opacity: 1;
            top: 85%;
            visibility: visible;
        }
    }
</style>
