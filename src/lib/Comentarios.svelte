<script>
    import StarRatting from "@ernane/svelte-star-rating";
    import { usuario } from "./store.js";
    let idCentro;
    let configuracionEstrellas = {
        countStars: 5,
        range: { min: 0, max: 5, step: 0.5 },
        starConfig: {
            size: 30,
            fillColor: "#F9ED4F",
            strokeColor: "#012970",
            unfilledColor: "#FFFFFF",
            strokeUnfilledColor: "#012970",
        },
    };
</script>

<section class="blog-comments">
    <div class="container">
        <h4 class="comments-count">8 Comments</h4>

        <div id="comment-1" class="comment border-bottom">
            <div class="d-flex">
                <div>
                    <h5>
                        <a href="">Georgia Reader</a>
                    </h5>
                    <time datetime="2020-01-01">01 Jan, 2020</time>
                    <p>
                        Et rerum totam nisi. Molestiae vel quam dolorum vel
                        voluptatem et et. Est ad aut sapiente quis molestiae est
                        qui cum soluta. Vero aut rerum vel. Rerum quos
                        laboriosam placeat ex qui. Sint qui facilis et.
                    </p>
                </div>
            </div>
        </div>
        <!-- End comment #1 -->

        <div id="comment-2" class="comment border-bottom">
            <div class="d-flex">
                <div>
                    <h5>
                        <a href="">Aron Alvarado</a>
                    </h5>
                    <time datetime="2020-01-01">01 Jan, 2020</time>
                    <p>
                        Ipsam tempora sequi voluptatem quis sapiente non. Autem
                        itaque eveniet saepe. Officiis illo ut beatae.
                    </p>
                </div>
            </div>
        </div>
        <!-- End comment #2-->

        <div id="comment-3" class="comment border-bottom">
            <div class="d-flex">
                <div>
                    <h5>
                        <a href="">Nolan Davidson</a>
                    </h5>
                    <time datetime="2020-01-01">01 Jan, 2020</time>
                    <p>
                        Distinctio nesciunt rerum reprehenderit sed. Iste omnis
                        eius repellendus quia nihil ut accusantium tempore.
                        Nesciunt expedita id dolor exercitationem aspernatur aut
                        quam ut. Voluptatem est accusamus iste at. Non aut et et
                        esse qui sit modi neque. Exercitationem et eos
                        aspernatur. Ea est consequuntur officia beatae ea aut
                        eos soluta. Non qui dolorum voluptatibus et optio
                        veniam. Quam officia sit nostrum dolorem.
                    </p>
                </div>
            </div>
        </div>
        <!-- End comment #3 -->

        <div id="comment-4" class="comment border-bottom">
            <div class="d-flex">
                <div>
                    <h5>
                        <a href="">Kay Duggan</a>
                    </h5>
                    <time datetime="2020-01-01">01 Jan, 2020</time>
                    <p>
                        Dolorem atque aut. Omnis doloremque blanditiis quia eum
                        porro quis ut velit tempore. Cumque sed quia ut maxime.
                        Est ad aut cum. Ut exercitationem non in fugiat.
                    </p>
                </div>
            </div>
        </div>
        <!-- End comment #4 -->
        <div class="reply-form">
            <h4 class="mb-3">Deja tu valoración y comentario</h4>
            <!-- {#if $usuario} -->
            <form class="text-center" action="">
                <div class="row">
                    <div class="col form-group">
                        <StarRatting config={configuracionEstrellas} />
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <textarea
                            name="comment"
                            class="form-control"
                            placeholder="Comentario*"
                            required
                        />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary"
                    >Enviar comentario</button
                >
            </form>
            <!-- {:else}
                <p>Para poder comentar debes iniciar sesión o registrarte.</p>
                <a href="/login" class="btn btn-primary">Iniciar sesión</a>
                <a href="/registro" class="btn btn-primary">Registrarse</a>
            {/if} -->
        </div>
    </div>
</section>

<style>
    :global(section.stars-container) {
        justify-content: start !important;
        padding: 0;
    }

    .blog-comments {
        margin-bottom: 30px;
    }

    .blog-comments .comments-count {
        font-weight: bold;
    }

    .blog-comments .comment {
        margin-top: 30px;
        position: relative;
    }

    .blog-comments .comment h5 {
        font-size: 16px;
        margin-bottom: 2px;
    }

    .blog-comments .comment h5 a {
        font-family: "Nunito", sans-serif !important;
        text-decoration: none;
        font-weight: bold;
        color: #444444;
        transition: 0.3s;
    }

    .blog-comments .comment h5 a:hover {
        color: #4154f1;
    }

    .blog-comments .comment time {
        display: block;
        font-size: 14px;
        color: #013ca3;
        margin-bottom: 5px;
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
</style>
