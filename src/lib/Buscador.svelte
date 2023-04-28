<script>
    import { onMount, onDestroy } from "svelte";
    import { navigate, Link, Route } from "svelte-navigator";
    import Centro from "./Centro.svelte";

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

    function handleClickOutside(event) {
        // Check if the click event originated from within the component
        if (
            event.target.closest(".search-container") === null &&
            showSuggestions
        ) {
            showSuggestions = false;
        }
    }

    // Add event listener for click events outside the component
    onMount(() => {
        document.addEventListener("click", handleClickOutside);
    });

    // Clean up the event listener on component destruction
    onDestroy(() => {
        document.removeEventListener("click", handleClickOutside);
    });
</script>

<div class="search-container">
    <input
        type="text"
        class="form-control"
        on:input={handleInput}
        on:click={() => (showSuggestions = true)}
        {placeholder}
    />
    {#if showSuggestions}
        <ul>
            {#if suggestions.length > 0}
                <!-- <Link to="/centro/{suggestion.id}">{suggestion.nombre}</Link> -->
                <!-- <li>
                {suggestion.nombre}
            </li> -->
                {#each suggestions as suggestion}
                    <li>
                        <Link to={`/centro/${suggestion.id}`}
                            >{suggestion.nombre}</Link
                        >
                        <!-- <Route path="centro/:id" let:params>
                            <Centro centro={suggestion} />
                        </Route> -->
                    </li>
                {/each}
                <!-- 
                                        <li on:click={() => handleCentroClick(suggestion.id)}>
                                            {suggestion.nombre}
                                        </li> -->
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
