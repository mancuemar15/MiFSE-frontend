<script>
    import { capitalizar } from "./utilidadesString";
    import { usuario } from "./store";
    import { navigate } from "svelte-navigator";
    import { abrirModalInicioSesion } from "./utilidadesModales";

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
                <h5 class="mb-0">Tú</h5>
            {:else}
                <div class="btn-group dropend">
                    <button
                        class="btn btn-link dropdown-toggle p-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >{escribirNombreResidente(comentario)}</button
                    >
                    <ul class="dropdown-menu">
                        {#if $usuario}
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
        {#if $usuario && $usuario.tipoUsuario.id === 1}
            <button
                class="btn btn-link link-danger p-0"
                on:click={() => {
                    borrarComentario(comentario.id);
                }}>Eliminar</button
            >
        {/if}
    </div>

    <p>{comentario.contenido}</p>
</div>

<style>
    .comment {
        margin-top: 30px;
        position: relative;
    }

    .comment button,
    .comment h5 {
        font-size: 16px;
        font-family: "Nunito", sans-serif !important;
        text-decoration: none !important;
        font-weight: bold;
        transition: 0.3s;
    }

    .comment button:hover {
        color: #4154f1;
    }

    .comment .subtitulo {
        font-size: 14px;
        color: #013ca3;
    }

    .dropdown-toggle::after {
        display: none !important;
    }
</style>
