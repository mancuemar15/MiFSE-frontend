<script>
    export let mensaje = {};
    export let posicion = "derecha";
</script>

<div class="mensaje pb-4 {posicion}">
    <div class="flex-shrink-1 bg-light">
        <div class="border-bottom py-2 px-3">
            {mensaje.contenido}
        </div>
        <div class="text-muted small py-2 px-3">
            {new Date(mensaje.fechaEnvio).toLocaleString()}
        </div>
    </div>
</div>

<style>
    .mensaje {
        display: flex;
        flex-shrink: 0;
    }

    .izquierda {
        margin-right: 3rem;
    }

    .derecha {
        flex-direction: row-reverse;
        margin-left: 3rem;
    }

    .derecha div div {
        background-color: aliceblue !important;
    }
</style>
