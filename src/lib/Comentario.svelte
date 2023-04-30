<script>
    import { capitalizar } from "./utilidadesString";

    export let comentario = {};

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
    <div class="d-flex">
        <div>
            <h5>
                <a href="">{escribirNombreResidente()}</a>
            </h5>
            <p class="subtitulo my-2">
                {new Date(comentario.fecha).toLocaleDateString()} - {capitalizar(
                    comentario.residente.tipoResidente.tipo
                )} - {capitalizar(comentario.residente.titulacion.nombre)}
            </p>
            <p>{comentario.contenido}</p>
        </div>
    </div>
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

    .comment h5 a {
        font-family: "Nunito", sans-serif !important;
        text-decoration: none;
        font-weight: bold;
        color: #444444;
        transition: 0.3s;
    }

    .comment h5 a:hover {
        color: #4154f1;
    }

    .comment .subtitulo {
        font-size: 14px;
        color: #013ca3;
    }
</style>
