<script>
    import { onMount, onDestroy } from "svelte";
    import { navigate, Link } from "svelte-navigator";

    export let placeholder = "Buscar...";
    let searchTerm = "";
    let suggestions = [];
    let showSuggestions = false;

    function handleInput(event) {
        searchTerm = event.target.value;
        if (searchTerm.length > 0) {
            fetchSuggestions();
        } else {
            suggestions = [];
            showSuggestions = false;
        }
    }

    async function fetchSuggestions() {
        try {
            const response = await fetch(
                `http://localhost:8090/centros/buscar/${searchTerm}`
            );
            const data = await response.json();
            suggestions = data;
            showSuggestions = true;
        } catch (error) {
            suggestions = [];
        }
    }

    function handleFocus() {
        showSuggestions = true;
    }

    function handleBlur() {
        showSuggestions = false;
    }

    // Añadimos los event listeners para el input
    onMount(() => {
        const input = document.querySelector(".form-control");
        // input.addEventListener("focus", handleFocus);
        // input.addEventListener("blur", handleBlur);
    });

    // Limpiamos los event listeners al destruir el componente
    onDestroy(() => {
        const input = document.querySelector(".form-control");
        // input.removeEventListener("focus", handleFocus);
        // input.removeEventListener("blur", handleBlur);
    });

    function handleCentroClick(id) {
        // navigate(`/centro/458`);
        navigate(`/centro/${id}`);
    }
</script>

<div class="search-container">
    <input
        type="text"
        class="form-control"
        on:input={handleInput}
        {placeholder}
    />
    {#if showSuggestions}
        <ul>
            {#if suggestions.length > 0}
                {#each suggestions as suggestion}
                    <!-- <Link to="/centro/{suggestion.id}">{suggestion.nombre}</Link> -->
                    <!-- <li>
                        {suggestion.nombre}
                    </li> -->

                    <li on:click={() => handleCentroClick(suggestion.id)}>
                        {suggestion.nombre}
                    </li>
                {/each}
            {:else if suggestions.length === 0 && searchTerm.length > 0}
                <li class="sin-sugerencias">No hay sugerencias</li>
            {/if}
        </ul>
    {/if}
</div>

<!-- <div class="search-container">
    <input
        type="text"
        class="form-control"
        on:input={handleInput}
        {placeholder}
    />
    {#if showSuggestions}
        <ul>
            {#if suggestions.length > 0}
                {#each suggestions as suggestion}
                    <li value={suggestion.id}>{suggestion.nombre}</li>
                {/each}
            {:else if suggestions.length === 0 && searchTerm.length > 0}
                <li class="sin-sugerencias">No hay sugerencias</li>
            {/if}
        </ul>
    {/if}
</div> -->

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
        font-size: 16px;
        padding: 8px;
    }

    li:hover:not(.sin-sugerencias) {
        background-color: #f2f2f2;
    }

    li.sin-sugerencias {
        cursor: default;
    }

    @media (min-width: 992px) {
        input[type="text"] {
            margin: 0px !important;
        }

        ul {
            top: 100%;
        }
    }
</style>
