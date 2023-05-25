<script>
    import { abrirModalBorrarCuenta } from "../utils/utilidadesModales";
</script>

<div>
    <h4 class="border-bottom pb-3">
        Para borrar tu cuenta, pulsa el botón de abajo
    </h4>
    <div class="text-center mt-4">
        <button class="btn btn-primary boton-azul" on:click={abrirModalBorrarCuenta}
            >Borrar cuenta</button
        >
    </div>
</div>

<style>
    h4 {
        outline: transparent !important;
    }
</style>
