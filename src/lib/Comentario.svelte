<script>
    import { capitalizar } from "./utilidadesString";
    import { usuario } from "./store";

    export let comentario = {};
    export let borrarComentario;

    function escribirNombreResidente() {
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
            <h5>
                <button class="btn btn-link p-0"
                    >{escribirNombreResidente()}</button
                >
            </h5>
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

    .comment h5 {
        font-size: 16px;
        margin-bottom: 2px;
    }

    .comment h5 button {
        font-family: "Nunito", sans-serif !important;
        text-decoration: none;
        font-weight: bold;
        color: #444444;
        transition: 0.3s;
    }

    .comment h5 button:hover {
        color: #4154f1;
    }

    .comment .subtitulo {
        font-size: 14px;
        color: #013ca3;
    }
</style>
