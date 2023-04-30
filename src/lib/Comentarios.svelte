<script>
    import StarRatting from "@ernane/svelte-star-rating";
    import { usuario } from "./store.js";
    import Comentario from "./Comentario.svelte";
    export let comentarios = [];
    let configuracionEstrellas = {
        countStars: 5,
        range: { min: 0, max: 5, step: 0.5 },
        score: 0.0,
        starConfig: {
            size: 30,
            fillColor: "#F9ED4F",
            strokeColor: "#444444",
            unfilledColor: "#FFFFFF",
            strokeUnfilledColor: "#444444",
        },
    };

    function enviarComentario(event) {
        event.preventDefault();
        const comentario = event.target.comentario.value.trim();
        console.log(event.target.elements[0].value);
        console.log(comentario);
        event.target.reset();
    }
</script>

<section class="blog-comments">
    <div class="container">
        {#if comentarios.length > 0}
            <h4 class="fw-bold">{comentarios.length} comentarios</h4>

            {#each comentarios as comentario}
                <Comentario {comentario} />
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
                            <StarRatting config={configuracionEstrellas} />
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
                    <button type="submit" class="btn btn-primary"
                        >Enviar comentario</button
                    >
                </form>
            {:else}
                <p>Para poder comentar debes iniciar sesión o registrarte.</p>
                <div
                    class="d-flex flex-row justify-content-center botones-usuario-anonimo"
                >
                    <button class="btn btn-primary">Iniciar sesión</button>
                    <button class="btn btn-primary">Registrarse</button>
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

    .blog-comments .reply-form .btn-primary {
        border-radius: 4px;
        padding: 10px 20px;
        border: 0;
        background-color: #012970;
    }

    .blog-comments .reply-form .btn-primary:hover {
        background-color: #013289;
    }

    .botones-usuario-anonimo {
        gap: 15px;
    }
</style>
