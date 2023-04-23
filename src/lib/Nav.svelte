<script>
    import { Router, Route, Link } from "svelte-navigator";

    const opcionesNav = [
        { pagina: "Inicio", ruta: "/" },
        { pagina: "Inicio", ruta: "/" },
        { pagina: "Inicio", ruta: "/" },
    ];
</script>

<nav>
    <ul>
        {#each opcionesNav as opcionNav}
            <li>
                <Link to={opcionNav.ruta}>{opcionNav.pagina}</Link>
            </li>
        {/each}
    </ul>
</nav>
