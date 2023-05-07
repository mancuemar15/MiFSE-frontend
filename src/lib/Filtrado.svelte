<script>
    import { onMount } from "svelte";
    import TituloPagina from "./TituloPagina.svelte";
    import Filtros from "./Filtros.svelte";
    import { usuario, centrosFiltrados, centrosSeleccionados } from "./store";
    import {
        abrirModalInicioSesion,
        abrirModalLista,
        abrirModalRegistro,
    } from "./utilidadesModales";

    export let nombre;

    const titulacionesConTildes = {
        biologia: "biología",
        enfermeria: "enfermería",
        fisica: "física",
        psicologia: "psicología",
        quimica: "química",
    };

    let centros = [];

    const getCentros = async () => {
        const response = await fetch(
            `http://localhost:8090/especialidades-centros/${nombre}`
        );
        centros = await response.json();
    };

    onMount(() => {
        getCentros();
        $centrosSeleccionados[nombre] = $centrosSeleccionados[nombre] || [];
    });

    $: if (nombre) {
        getCentros();
        $centrosSeleccionados[nombre] = $centrosSeleccionados[nombre] || [];
    }

    function agregarCentro(e, centro) {
        e.target.checked = false;
        $centrosSeleccionados[nombre] = [
            ...$centrosSeleccionados[nombre],
            centro,
        ];
        $centrosFiltrados = $centrosFiltrados.filter((c) => {
            return (
                c.centro.id !== centro.centro.id ||
                c.especialidad.id !== centro.especialidad.id
            );
        });
    }

    function quitarCentro(e, centro) {
        e.target.checked = true;
        $centrosFiltrados = [...$centrosFiltrados, centro];
        $centrosSeleccionados[nombre] = $centrosSeleccionados[nombre].filter(
            (c) => {
                return (
                    c.centro.id !== centro.centro.id ||
                    c.especialidad.id !== centro.especialidad.id
                );
            }
        );
    }

    async function guardarLista() {
        $usuario = await $usuario;
        const preferencias = $centrosSeleccionados[nombre].map(
            (c, posicion) => {
                return {
                    especialidadCentro: {
                        especialidad: { id: c.especialidad.id },
                        centro: { id: c.centro.id },
                    },
                    numero: posicion + 1,
                };
            }
        );

        const lista = {
            residente: {
                id: $usuario.id,
            },
            fechaCreacion: new Date().toJSON(),
            fechaActualizacion: new Date().toJSON(),
            preferencias: preferencias,
        };

        abrirModalLista(lista);
    }
</script>

{#key nombre}
    <TituloPagina
        seccion="Lista"
        titulo="Lista de {titulacionesConTildes[nombre] || nombre}"
    />
    <section class="filtrado">
        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-4">
                    <Filtros {centros} titulacion={nombre} />
                </div>
                <div class="col-lg-8">
                    <div class="row gy-2">
                        {#await getCentros()}
                            <div class="col-12 text-center">
                                <div
                                    class="spinner-border text-primary"
                                    role="status"
                                >
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        {:then}
                            {#if $centrosFiltrados.length === 0}
                                <div class="col-12 text-center">
                                    <h3 class="text-center">
                                        No hay centros disponibles
                                    </h3>
                                    <p class="text-center">
                                        Seleccione otros filtros.
                                    </p>
                                </div>
                            {:else}
                                {#each $centrosFiltrados as centro}
                                    <div class="col-12 centro p-0">
                                        <div class="blog-author">
                                            <div
                                                class="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between"
                                            >
                                                <label
                                                    class="form-check-label"
                                                    for="check-{centro
                                                        .especialidad
                                                        .id}-{centro.centro.id}"
                                                >
                                                    <div class="text-start">
                                                        <h4>
                                                            {centro.centro
                                                                .nombre}
                                                        </h4>
                                                        <div
                                                            class="social-links"
                                                        >
                                                            <span
                                                                class="text-muted fst-italic"
                                                                >{centro
                                                                    .especialidad
                                                                    .nombre}</span
                                                            >
                                                        </div>
                                                    </div>
                                                </label>
                                                <div>
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        value="{centro
                                                            .especialidad
                                                            .id}-{centro.centro
                                                            .id}"
                                                        id="check-{centro
                                                            .especialidad
                                                            .id}-{centro.centro
                                                            .id}"
                                                        on:change={(e) =>
                                                            agregarCentro(
                                                                e,
                                                                centro
                                                            )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                            <div class="separador border mt-4 mb-3" />
                            <div class="col-12">
                                <h3 class="text-center">
                                    Centros seleccionados
                                </h3>
                            </div>
                            {#if $centrosSeleccionados[nombre].length > 0}
                                {#each $centrosSeleccionados[nombre] as centro}
                                    <div class="col-12 centro-seleccionado p-0">
                                        <div class="blog-author">
                                            <div
                                                class="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between"
                                            >
                                                <label
                                                    class="form-check-label"
                                                    for="check-{centro
                                                        .especialidad
                                                        .id}-{centro.centro.id}"
                                                >
                                                    <div class="text-start">
                                                        <h4>
                                                            {centro.centro
                                                                .nombre}
                                                        </h4>
                                                        <div
                                                            class="social-links"
                                                        >
                                                            <span
                                                                class="text-muted fst-italic"
                                                                >{centro
                                                                    .especialidad
                                                                    .nombre}</span
                                                            >
                                                        </div>
                                                    </div>
                                                </label>
                                                <div>
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        value="{centro
                                                            .especialidad
                                                            .id}-{centro.centro
                                                            .id}"
                                                        id="check-{centro
                                                            .especialidad
                                                            .id}-{centro.centro
                                                            .id}"
                                                        checked
                                                        on:change={(e) =>
                                                            quitarCentro(
                                                                e,
                                                                centro
                                                            )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {:else}
                                <div class="col-12 text-center">
                                    <p>
                                        No hay centros seleccionados. Puedes
                                        seleccionar centros de la lista
                                        superior.
                                    </p>
                                </div>
                            {/if}
                        {/await}
                        <div class="col-12 text-center">
                            <div class="mt-3">
                                {#if $usuario}
                                    <button
                                        type="button"
                                        class="btn boton-azul"
                                        disabled={$centrosSeleccionados[nombre]
                                            .length === 0}
                                        on:click={guardarLista}
                                        >Guardar lista</button
                                    >
                                {:else}
                                    <div class="bloque-usuario-no-login">
                                        <p>
                                            Para guardar la lista de centros
                                            debes iniciar sesión o registrarte.
                                        </p>
                                        <div
                                            class="d-flex flex-row flex-wrap justify-content-center botones-usuario-anonimo"
                                        >
                                            <button
                                                class="btn btn-primary boton-azul"
                                                on:click={abrirModalInicioSesion}
                                                >Iniciar sesión</button
                                            >
                                            <button
                                                class="btn btn-primary boton-azul"
                                                on:click={abrirModalRegistro}
                                                >Registrarse</button
                                            >
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{/key}

<style>
    .filtrado {
        padding-top: 40px;
    }

    .blog-author {
        padding: 15px 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .blog-author h4 {
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 0px;
        padding: 0;
        color: #012970;
    }

    h3 {
        color: #012970;
        font-weight: 700;
    }

    .centro,
    .centro-seleccionado {
        cursor: pointer;
        transition: 0.4s;
    }

    .centro:hover,
    .centro-seleccionado:hover {
        transform: scale(1.01);
    }

    .centro label,
    .centro-seleccionado label {
        width: 100% !important;
        cursor: pointer;
    }

    .centro-seleccionado {
        background-color: rgba(163, 189, 234, 0.3) !important;
    }

    .form-check-input:focus {
        box-shadow: none !important;
    }

    .form-check-input:not(:checked):focus {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e") !important;
        border: 1px solid rgba(0, 0, 0, 0.25) !important;
    }
</style>
