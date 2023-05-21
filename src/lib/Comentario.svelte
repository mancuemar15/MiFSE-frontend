<script>
    import { capitalizar } from "./utilidadesString";
    import { usuario } from "./store";
    import { navigate } from "svelte-navigator";
    import { abrirModalInicioSesion } from "./utilidadesModales";
    import { anadirNotificacionInfo } from "./utilidadesNotificaciones";

    export let comentario = {};
    export let borrarComentario;

    function escribirNombreResidente(comentario) {
        return (
            `${comentario.residente.nombre} ${comentario.residente.apellido1}` +
            (comentario.residente.apellido2
                ? ` ${comentario.residente.apellido2}`
                : "")
        );
    }
</script>

<div class="comment border-bottom">
    <div class="d-flex justify-content-between">
        <div>
            {#if $usuario && comentario.residente.id === $usuario.id}
                <button class="btn btn-link dropdown-toggle p-0" disabled
                    >Tú</button
                >
            {:else}
                <div class="dropend">
                    <button
                        class="btn btn-link dropdown-toggle p-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >{escribirNombreResidente(comentario)}</button
                    >
                    <ul class="dropdown-menu">
                        {#if $usuario && $usuario.verificado}
                            <li>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    on:click={() => {
                                        navigate("/mensajes", {
                                            replace: true,
                                            state: {
                                                destinatario:
                                                    comentario.residente,
                                            },
                                        });
                                    }}
                                >
                                    Enviar mensaje
                                </button>
                            </li>
                        {:else if $usuario && !$usuario.verificado}
                            <li>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    on:click={() => {
                                        anadirNotificacionInfo(
                                            "Verifica tu cuenta para poder enviar mensajes"
                                        );
                                    }}
                                >
                                    Enviar mensaje
                                </button>
                            </li>
                        {:else}
                            <li>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    on:click={abrirModalInicioSesion}
                                >
                                    Enviar mensaje
                                </button>
                            </li>
                        {/if}
                    </ul>
                </div>
            {/if}
            <p class="subtitulo my-2">
                {new Date(comentario.fecha).toLocaleDateString()} - {capitalizar(
                    comentario.residente.tipoResidente.tipo
                )} - {capitalizar(comentario.residente.titulacion.nombre)}
            </p>
        </div>
        <div class="d-flex flex-column align-items-end justify-content-between">
            <div class="valoracion d-flex justify-content-center">
                <p class="m-0">
                    {comentario.valoracion.toFixed(1).replace(".", ",")}
                </p>
            </div>
            {#if $usuario && $usuario.tipoUsuario.id === 1}
                <button
                    class="btn btn-link link-danger p-0"
                    on:click={() => {
                        borrarComentario(comentario.id);
                    }}>Eliminar</button
                >
            {/if}
        </div>
    </div>

    <p>{comentario.contenido}</p>
</div>

<style>
    .comment {
        margin-top: 30px;
        position: relative;
    }

    .comment button:not(.link-danger),
    .comment button:disabled {
        font-size: 16px;
        font-family: "Nunito", sans-serif !important;
        text-decoration: none !important;
        font-weight: bold;
        transition: 0.3s;
        opacity: 1 !important;
        color: #012970 !important;
    }

    .comment button:hover {
        color: #4154f1 !important;
    }

    .comment .valoracion {
        height: 32px;
        width: 32px;
        font-size: 18px;
        background-color: #013ca3;
        color: #fff;
        padding: 3px;
    }

    .comment .subtitulo {
        font-size: 14px;
        color: #013ca3;
    }

    .dropdown-toggle::after {
        display: none !important;
    }

    @media (min-width: 992px) {
        .comment .valoracion {
            height: 39px;
            width: 39px;
            font-size: 22px;
        }
    }
</style>
