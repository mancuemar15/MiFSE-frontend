<script>
    import StarRatting from "@ernane/svelte-star-rating";
    import { usuario } from "./store.js";
    import Comentario from "./Comentario.svelte";
    import {
        abrirModalRegistro,
        abrirModalInicioSesion,
    } from "./utilidadesModales";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "./utilidadesNotificaciones";
    import { getContext } from "svelte";

    export let idCentro;
    export let comentarios = [];

    const URL = getContext("URL");

    let configuracionEstrellas = {
        countStars: 5,
        range: { min: 0, max: 5, step: 0.5 },
        starConfig: {
            size: 30,
            fillColor: "#F9ED4F",
            strokeColor: "#444444",
            unfilledColor: "#FFFFFF",
            strokeUnfilledColor: "#444444",
        },
    };

    const enviarComentario = (event) => {
        event.preventDefault();
        if (comprobarValidezEstrellas(event.target.elements[0])) {
            const comentarioAEnviar = {
                residente: {
                    id: $usuario.id,
                },
                centro: {
                    id: idCentro,
                },
                contenido: event.target.comentario.value.trim(),
                valoracion: configuracionEstrellas.score,
                fecha: new Date().toJSON(),
            };
            fetch(URL.comentarios, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comentarioAEnviar),
            })
                .then((response) => response.json())
                .then((comentario) => {
                    anadirNotificacionExito(
                        "Comentario guardado correctamente"
                    );
                    comentarios = [...comentarios, comentario];
                    configuracionEstrellas.score = undefined;
                    event.target.reset();
                })
                .catch(() => {
                    anadirNotificacionError("Error al guardar el comentario");
                });
        }
    };

    const comprobarValidezEstrellas = (input) => {
        let esValido = false;
        if (isNaN(configuracionEstrellas.score)) {
            input.setCustomValidity("Debes valorar el centro");
            input.reportValidity();
        } else {
            input.setCustomValidity("");
            esValido = true;
        }
        return esValido;
    };

    const borrarComentario = (idComentario) => {
        fetch(`${URL.comentarios}/${idComentario}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    anadirNotificacionExito(
                        "Comentario eliminado correctamente"
                    );
                    comentarios = comentarios.filter(
                        (comentario) => comentario.id !== idComentario
                    );
                }
            })
            .catch(() => {
                anadirNotificacionError("Error al eliminar el comentario");
            });
    };
</script>

<section class="blog-comments">
    <div class="container">
        {#if comentarios.length > 0}
            <h4 class="fw-bold">{comentarios.length} comentarios</h4>

            {#each comentarios as comentario}
                <Comentario {comentario} {borrarComentario} />
            {/each}
        {:else}
            <h4 class="fw-bold sin-comentarios">No hay comentarios</h4>
        {/if}
        <div class="reply-form">
            <h4 class="mb-3">Deja tu valoración y comentario</h4>
            {#if $usuario}
                <form on:submit={enviarComentario} class="text-center">
                    <div class="row">
                        <div class="col form-group">
                            <StarRatting
                                config={configuracionEstrellas}
                                on:change={(e) => {
                                    comprobarValidezEstrellas(e.target);
                                }}
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group text-start">
                            <label
                                for="comentario"
                                class="form-label obligatorio">Comentario</label
                            >
                            <textarea
                                name="comentario"
                                class="form-control"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary boton-azul"
                        disabled={$usuario.tipoUsuario.id === 1}>Enviar</button
                    >
                </form>
            {:else}
                <div class="bloque-usuario-no-login">
                    <p>
                        Para poder comentar debes iniciar sesión o registrarte.
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
                            on:click={abrirModalRegistro}>Registrarse</button
                        >
                    </div>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    :global(section.stars-container) {
        justify-content: start !important;
        padding: 0;
    }

    :global(.stars svg) {
        stroke-width: 4px;
    }

    .blog-comments {
        margin-bottom: 30px;
    }

    .blog-comments .reply-form {
        margin-top: 30px;
        padding: 30px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .blog-comments .reply-form h4 {
        color: #012970;
        font-weight: bold;
        font-size: 22px;
    }

    .blog-comments .reply-form p {
        font-size: 14px;
    }

    .blog-comments .reply-form textarea {
        border-radius: 4px;
        padding: 10px 10px;
        font-size: 14px;
    }

    .blog-comments .reply-form textarea:focus {
        box-shadow: none;
        border-color: #a0aaf8;
    }

    .blog-comments .reply-form .form-group {
        margin-bottom: 25px;
    }
</style>
