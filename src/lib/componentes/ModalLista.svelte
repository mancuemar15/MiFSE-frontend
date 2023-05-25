<script>
    import { navigate } from "svelte-navigator";
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { closeModal } from "svelte-modals";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "../utils/utilidadesNotificaciones";
    import { getContext } from "svelte";
    import { centrosSeleccionados, usuario } from "../utils/store";

    export let isOpen;
    export let lista;

    const URL = getContext("URL");

    function guardarLista(event) {
        event.preventDefault();
        lista.nombre = event.target.nombreLista.value;

        fetch(URL.listas, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lista),
        })
            .then((response) => {
                if (response.status !== 201) {
                    anadirNotificacionError(
                        "Ha ocurrido un error al guardar la lista de centros"
                    );
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                anadirNotificacionExito(
                    "La lista de centros se ha guardado correctamente"
                );
                closeModal();
                $centrosSeleccionados = [];
                navigate(`/preferencias/lista/${data.id}`);
            })
            .catch(() => {
                anadirNotificacionError(
                    "Ha ocurrido un error al guardar la lista de centros"
                );
            });
    }
</script>

{#if isOpen}
    <div
        class="modal"
        id="modal-guardado-lista"
        tabindex="-1"
        role="dialog"
        aria-labelledby="sampleModalLabel"
        aria-hidden={false}
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
            in:fly={{ y: -50, duration: 300 }}
            out:fly={{ y: -50, duration: 300, easing: quintOut }}
        >
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">Guardado de lista</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        on:click={closeModal}
                    />
                </div>
                <div class="modal-body">
                    <form
                        class="formulario-guardado-lista"
                        on:submit={guardarLista}
                    >
                        <div class="row gy-3 gy-lg-4">
                            <div class="col-12 mt-0">
                                <label
                                    for="nombre-lista"
                                    class="form-label obligatorio"
                                    >Nombre de la lista</label
                                >
                                <input
                                    type="text"
                                    id="nombre-lista"
                                    class="form-control"
                                    name="nombreLista"
                                    required
                                />
                            </div>

                            <div class="col-md-12 text-center">
                                <button type="submit" class="boton-azul"
                                    >Guardar lista</button
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
{/if}

<style>
    .modal {
        display: block;
    }

    .modal-content {
        border-radius: 0 !important;
        background: #fafbff;
    }

    .modal-header {
        border-bottom: 0;
        padding: 30px 26px 0;
    }

    .modal-title {
        font-size: 26px;
        font-weight: 700;
        color: #012970;
    }

    .modal-body {
        padding-bottom: 0px;
    }

    .formulario-guardado-lista {
        padding: 30px 10px;
        height: 100%;
    }

    .formulario-guardado-lista input {
        border-radius: 0;
        box-shadow: none;
        font-size: 14px;
        border-radius: 0;
    }

    .formulario-guardado-lista input:focus {
        border-color: #4154f1;
    }

    @media (min-width: 425px) {
        .formulario-guardado-lista {
            padding: 30px;
        }

        .modal-header {
            padding: 46px 46px 0;
        }

        .modal-body {
            padding-bottom: 16px;
        }
    }
</style>
