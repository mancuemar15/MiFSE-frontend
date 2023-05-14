<script>
    import { getContext } from "svelte";
    import { usuario } from "./store";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "./utilidadesNotificaciones";

    let editando = false;
    const URL = getContext("URL");

    export let nombre;
    export let valor;
    export let tipo = "text";
    export let nombreInput;
    export let opcionesSelect = [];

    const editarInput = () => {
        editando = true;
        document.getElementById(nombreInput).disabled = false;
        document.getElementById(nombreInput).focus();
    };

    const guardarInput = () => {
        editando = false;
        document.getElementById(nombreInput).disabled = true;
        usuario.update((u) => {
            u[nombreInput] = document.getElementById(nombreInput).value;
            return u;
        });
        fetch(URL.usuarios, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify($usuario),
        }).then((response) => {
            if (!response.ok) {
                anadirNotificacionError("Error al guardar el nuevo dato");
            } else {
                anadirNotificacionExito("Dato guardado correctamente");
            }
        });
    };
</script>

<div class="col-12 border-bottom dato-personal">
    <div class="d-flex my-3 my-md-2">
        <div
            class="flex-grow-1 d-flex align-items-md-center flex-column flex-md-row"
        >
            <span class="fw-bold nombre-dato mb-2 mb-md-0 me-md-3"
                >{nombre}</span
            >
            {#if tipo === "select"}
                <select
                    class="form-select"
                    id={nombreInput}
                    name={nombreInput}
                    disabled
                >
                    {#each opcionesSelect as opcion}
                        {#if opcion.id === valor.id}
                            <option value={opcion.id} selected
                                >{opcion.tipo}</option
                            >
                        {:else}
                            <option value={opcion.id}>{opcion.tipo}</option>
                        {/if}
                    {/each}
                </select>
            {:else}
                <input
                    type={tipo}
                    class="form-control px-0"
                    name={nombreInput}
                    id={nombreInput}
                    value={valor}
                    disabled
                />
            {/if}
        </div>
        <div class="d-flex align-items-center">
            {#if editando}
                <button class="btn btn-link" on:click={guardarInput}
                    ><span
                        class="material-symbols-outlined azul icono-guardado"
                    >
                        save
                    </span></button
                >
            {:else}
                <button class="btn btn-link" on:click={editarInput}
                    ><span class="material-symbols-outlined azul icono">
                        edit
                    </span></button
                >
            {/if}
        </div>
    </div>
</div>

<style>
    .dato-personal {
        max-height: 100px !important;
        padding: 0px 15px;
    }

    .form-control {
        background-color: white;
        border: none !important;
        border-radius: 0px;
    }

    .form-control:focus {
        box-shadow: none !important;
        border-bottom: 1px solid black !important;
    }

    .form-control:enabled {
        border-bottom: 1px solid black !important;
    }

    .form-control:disabled {
        cursor: not-allowed;
    }

    .form-select:focus {
        box-shadow: none !important;
    }

    .azul {
        color: #012970 !important;
    }

    .azul:hover {
        color: #4154f1 !important;
    }

    .icono {
        font-size: 28px !important;
    }

    .icono-guardado {
        font-size: 30px !important;
        margin: 3px auto !important;
    }

    .material-symbols-outlined {
        font-variation-settings: "FILL" 1;
    }

    @media (min-width: 768px) {
        .dato-personal {
            max-height: 65px !important;
        }

        .form-control:enabled {
            margin-bottom: -1px !important;
        }

        .icono-guardado {
            margin: -2px auto !important;
        }

        .nombre-dato {
            min-width: fit-content;
        }

        .form-select {
            max-width: fit-content;
        }
    }
</style>
