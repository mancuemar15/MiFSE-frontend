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
        { tipo: "enlace", pagina: "Inicio", ruta: "/" },
    ];
</script>

<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#each opcionesNav as opcionNav}
                    {#if opcionNav.tipo == "enlace"}
                        <li class="nav-item">
                            <Link class="nav-link" to={opcionNav.ruta}
                                >{opcionNav.pagina}</Link
                            >
                        </li>
                    {:else if opcionNav.tipo == "dropdown"}
                        <li class="nav-item dropdown">
                            <button
                                class="nav-link dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {opcionNav.pagina}
                            </button>
                            <ul class="dropdown-menu">
                                {#each opcionNav.paginas as pagina}
                                    <li>
                                        <Link
                                            class="dropdown-item"
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
            <form class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit"
                    >Search</button
                >
            </form>
        </div>
    </div>
</nav>
