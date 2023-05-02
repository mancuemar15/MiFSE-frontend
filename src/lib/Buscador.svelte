<script>
    import { onMount, onDestroy } from "svelte";
    import { Link } from "svelte-navigator";

    export let placeholder = "Buscar...";
    let terminoBusqueda = "";
    let sugerenciasCentros = [];
    let mostrarSugerencias = false;

    function handleInput(event) {
        terminoBusqueda = event.target.value;
        if (terminoBusqueda.length > 0) {
            getSugerenciasCentros();
        } else {
            sugerenciasCentros = [];
            mostrarSugerencias = false;
        }
    }

    async function getSugerenciasCentros() {
        try {
            const response = await fetch(
                `http://localhost:8090/centros/buscar/${terminoBusqueda}`
            );
            const data = await response.json();
            sugerenciasCentros = data;
            mostrarSugerencias = true;
        } catch (error) {
            sugerenciasCentros = [];
        }
    }

    function handleClickFueraComponente(event) {
        // Check if the click event originated from within the component
        if (
            event.target.closest(".contenedor-buscador") === null &&
            mostrarSugerencias
        ) {
            mostrarSugerencias = false;
        }
    }

    function handleLink() {
        mostrarSugerencias = false;
        document.querySelector(".contenedor-buscador input").value = "";
        sugerenciasCentros = [];
        terminoBusqueda = "";
    }

    // Add event listener for click events outside the component
    onMount(() => {
        document.addEventListener("click", handleClickFueraComponente);
    });

    // Clean up the event listener on component destruction
    onDestroy(() => {
        document.removeEventListener("click", handleClickFueraComponente);
    });
</script>

<div class="contenedor-buscador">
    <input
        type="text"
        class="form-control"
        on:input={handleInput}
        on:click={() => (mostrarSugerencias = true)}
        {placeholder}
    />
    {#if mostrarSugerencias}
        <ul>
            {#if sugerenciasCentros.length > 0}
                {#each sugerenciasCentros as sugerencia}
                    <li>
                        <Link
                            to={`/centro/${sugerencia.id}`}
                            on:click={handleLink}>{sugerencia.nombre}</Link
                        >
                    </li>
                {/each}
            {:else if sugerenciasCentros.length === 0 && terminoBusqueda.length > 0}
                <li class="sin-sugerencias">No hay sugerencias</li>
            {/if}
        </ul>
    {/if}
</div>

<style>
    div {
        display: flex;
        position: relative;
    }

    input[type="text"] {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }

    ul {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
        margin: 0;
        max-height: 200px;
        overflow-y: auto;
        overflow-wrap: break-word;
        padding: 0;
        position: absolute;
        top: 80%;
        width: 100%;
        z-index: 1000;
    }

    li {
        cursor: pointer;
        padding: 6px 8px;
    }

    li:hover:not(.sin-sugerencias) {
        background-color: #f2f2f2;
    }

    li.sin-sugerencias {
        cursor: default;
    }

    :global(.contenedor-buscador ul li a) {
        display: block;
        text-decoration: none;
    }

    @media (min-width: 992px) {
        input[type="text"] {
            margin: 0px !important;
            height: 40px;
        }

        ul {
            top: 100%;
        }
    }
</style>
