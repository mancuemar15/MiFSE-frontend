<script>
    import { navigate } from "svelte-navigator";
    export let placeholder;

    const options = [
        {
            value: "San Francisco",
        },
        {
            value: "New York",
        },
        {
            value: "Seattle",
        },
        {
            value: "Los Angeles",
        },
        {
            value: "Chicago",
        },
    ];

    function handleOptionClick(event) {
        const value = event.target.value;
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) {
            navigate(`/centro/${value}`);
        } else {
            console.log("Opción no válida");
        }
    }
</script>

<div class="d-flex">
    <input
        class="form-control"
        type="search"
        list="datalistOptions"
        {placeholder}
        aria-label={placeholder}
        on:change={handleOptionClick}
    />
    <datalist id="datalistOptions">
        {#each options as option}
            <option value={option.value} />
        {/each}
    </datalist>
</div>

<!-- <div>
    <input
        class="form-control"
        type="search"
        list="datalistOptions"
        {placeholder}
        aria-label={placeholder}
        on:change={handleOptionSelect}
    />
    <datalist id="datalistOptions">
        {#each options as option}
            <option value={option.value} />
        {/each}
    </datalist>
</div> -->

<style>
    input[type="search"] {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }

    @media (min-width: 992px) {
        input[type="search"] {
            margin: 0px !important;
        }
    }
</style>
