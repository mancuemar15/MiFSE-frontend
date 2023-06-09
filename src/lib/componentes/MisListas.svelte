<script>
    import { getContext, onMount } from "svelte";
    import { usuario } from "../utils/store";
    import { Link } from "svelte-navigator";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "../utils/utilidadesNotificaciones";

    const URL = getContext("URL");

    let listas = [];
    let listasEditandose = [];

    const getListas = async () => {
        const response = await fetch(`${URL.listas}/residente/${$usuario.id}`, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status === 200) {
            listas = await response.json();
        } else {
            listas = [];
        }
    };

    onMount(() => {
        getListas();
    });

    const eliminarLista = (idLista) => {
        fetch(`${URL.listas}/${idLista}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        })
            .then((response) => {
                if (response.status !== 204) {
                    anadirNotificacionError("Error al eliminar la lista");
                } else {
                    anadirNotificacionExito("Lista eliminada correctamente");
                    getListas();
                }
            })
            .catch(() => {
                anadirNotificacionExito("Lista eliminada correctamente");
            });
    };

    const editarNombreLista = (idLista) => {
        // @ts-ignore
        document.getElementById(`nombre-lista-${idLista}`).disabled = false;
        listasEditandose[idLista] = true;
    };

    const cambiarNombreLista = (idLista) => {
        // @ts-ignore
        document.getElementById(`nombre-lista-${idLista}`).disabled = true;
        listasEditandose[idLista] = false;
        const lista = listas.find((l) => l.id === idLista);
        // @ts-ignore
        lista.nombre = document.getElementById(`nombre-lista-${idLista}`).value;
        fetch(URL.listas, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lista),
        })
            .then((response) => {
                if (response.status !== 200) {
                    anadirNotificacionError(
                        "Error al cambiar el nombre de la lista"
                    );
                } else {
                    anadirNotificacionExito(
                        "Nombre de la lista cambiado correctamente"
                    );
                    getListas();
                }
            })
            .catch(() => {
                anadirNotificacionError(
                    "Error al cambiar el nombre de la lista"
                );
            });
    };
</script>

<div class="row gy-2">
    {#await getListas()}
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status" />
        </div>
    {:then}
        {#if listas.length === 0}
            <div class="col-12 text-center">
                <h3 class="text-center">No tienes listas creadas</h3>
            </div>
        {:else}
            {#each listas as lista}
                <div class="col-12 lista">
                    <div class="d-flex align-items-center">
                        <h4 class="flex-grow-1 m-0">
                            <input
                                type="text"
                                class="w-100"
                                name="nombreLista{lista.id}"
                                id="nombre-lista-{lista.id}"
                                value={lista.nombre}
                                disabled
                            />
                        </h4>
                        <div class="d-flex align-items-end botones ps-2">
                            {#if listasEditandose[lista.id]}
                                <button
                                    class="text-decoration-none bg-transparent border-0 d-flex"
                                    on:click={() => {
                                        cambiarNombreLista(lista.id);
                                    }}
                                >
                                    <span
                                        class="material-symbols-outlined azul icono-guardado"
                                    >
                                        save
                                    </span>
                                </button>
                            {:else}
                                <button
                                    class="text-decoration-none bg-transparent border-0 d-flex"
                                    on:click={() => {
                                        editarNombreLista(lista.id);
                                    }}
                                >
                                    <span
                                        class="material-symbols-outlined azul icono py-1"
                                    >
                                        edit
                                    </span>
                                </button>
                            {/if}
                            <Link
                                to={`/preferencias/lista/${lista.id}`}
                                class="text-decoration-none d-flex align-items-end"
                            >
                                <i
                                    class="material-symbols-outlined azul icono-grande"
                                >
                                    edit_note
                                </i>
                            </Link>
                            <button
                                class="text-decoration-none bg-transparent border-0"
                                on:click={() => {
                                    eliminarLista(lista.id);
                                }}
                                ><i
                                    class="fa-solid fa-trash-can link-danger"
                                /></button
                            >
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    {:catch error}
        <div class="col-12 text-center">
            <h3 class="text-center">
                Ha ocurrido un error al cargar las listas
            </h3>
        </div>
    {/await}
</div>

<style>
    .lista {
        padding: 15px 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .lista input {
        color: #012970 !important;
        font-weight: 500;
        border: none;
        background-color: transparent;
        outline: none !important;
    }

    .lista input:enabled {
        border-bottom: 1px solid #012970 !important;
    }

    .botones {
        gap: 10px;
        font-size: 25px !important;
    }

    .botones .azul {
        color: #012970 !important;
    }

    .botones .azul:hover {
        color: #4154f1 !important;
    }

    .icono {
        font-size: 28px !important;
    }

    .icono-grande {
        font-size: 37px !important;
    }

    .icono-guardado {
        font-size: 30px !important;
    }

    .material-symbols-outlined {
        font-variation-settings: "FILL" 1;
    }

    h3 {
        color: #012970;
        font-weight: 700;
        outline: transparent !important;
    }
</style>
