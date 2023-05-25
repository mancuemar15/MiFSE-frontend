<script>
    import { getContext, onMount } from "svelte";
    import TituloPagina from "../componentes/TituloPagina.svelte";
    import Filtros from "../componentes/Filtros.svelte";
    import CentroFiltrado from "../componentes/CentroFiltrado.svelte";
    import { usuario, centrosFiltrados, centrosSeleccionados } from "../utils/store";
    import { navigate } from "svelte-navigator";
    import { redireccionarNotFound } from "../utils/utilidadesLinks";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "../utils/utilidadesNotificaciones";
    import {
        abrirModalInicioSesion,
        abrirModalLista,
        abrirModalRegistro,
    } from "../utils/utilidadesModales";

    export let titulacion;
    export let id;

    const URL = getContext("URL");

    const titulacionesConTildes = {
        biologia: "biología",
        enfermeria: "enfermería",
        fisica: "física",
        psicologia: "psicología",
        quimica: "química",
    };

    let centros = [];
    let lista = {};

    const getCentrosPorTitulacion = async () => {
        const response = await fetch(
            `${URL.especialidadesCentros}/${titulacion}`
        );
        if (response.status !== 200) {
            redireccionarNotFound();
        }
        centros = await response.json();
    };

    const getLista = async () => {
        const response = await fetch(`${URL.listas}/${id}`, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status !== 200) {
            redireccionarNotFound();
        }
        lista = await response.json();
        if ($usuario.id !== lista.residente.id) {
            redireccionarNotFound();
        }
        $centrosSeleccionados[titulacion] = lista.preferencias.map(
            (p) => p.especialidadCentro
        );
    };

    onMount(() => {
        if (id) {
            getLista();
        }
        getCentrosPorTitulacion();
        $centrosSeleccionados[titulacion] =
            $centrosSeleccionados[titulacion] || [];
    });

    $: if (titulacion) {
        getCentrosPorTitulacion();
        $centrosSeleccionados[titulacion] =
            $centrosSeleccionados[titulacion] || [];
    }

    async function guardarLista() {
        const preferencias = $centrosSeleccionados[titulacion].map(
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

        lista.residente = { id: $usuario.id };
        lista.fechaActualizacion = new Date().toJSON();
        lista.preferencias = preferencias;

        if (!id) {
            lista.fechaCreacion = new Date().toJSON();
            abrirModalLista(lista);
        } else {
            const response = await fetch(URL.listas, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${$usuario.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lista),
            });
            if (response.ok) {
                anadirNotificacionExito(
                    "La lista de centros se ha guardado correctamente"
                );
                const respuesta = await response.json();
                navigate(`/preferencias/lista/${respuesta.id}`);
            } else {
                anadirNotificacionError(
                    "Ha ocurrido un error al guardar la lista de centros"
                );
            }
        }
    }
</script>

{#key titulacion}
    <TituloPagina
        seccion="Lista"
        titulo="Lista de {titulacionesConTildes[titulacion] || titulacion}"
    />
    <section class="filtrado">
        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-4">
                    <Filtros {centros} {titulacion} />
                </div>
                <div class="col-lg-8">
                    <div class="row gy-2">
                        {#await getCentrosPorTitulacion()}
                            <div class="col-12 text-center">
                                <div
                                    class="spinner-border text-primary"
                                    role="status"
                                >
                                    <span class="visually-hidden"
                                        >Cargando...</span
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
                                        <CentroFiltrado {centro} {titulacion} />
                                    </div>
                                {/each}
                            {/if}
                            <div class="separador border mt-4 mb-3" />
                            <div class="col-12">
                                <h3 class="text-center">
                                    Centros seleccionados
                                </h3>
                            </div>
                            {#if $centrosSeleccionados[titulacion].length > 0}
                                {#each $centrosSeleccionados[titulacion] as especialidadCentro}
                                    <div
                                        class="col-12 especialidadCentro-seleccionado p-0"
                                    >
                                        <CentroFiltrado
                                            {especialidadCentro}
                                            {titulacion}
                                        />
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
                                        disabled={$centrosSeleccionados[
                                            titulacion
                                        ].length === 0 ||
                                            $usuario.tipoUsuario.id === 1}
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

    h3 {
        color: #012970;
        font-weight: 700;
    }

    button:disabled {
        background-color: #4154f1 !important;
    }
</style>
