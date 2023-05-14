<script>
    import { getContext } from "svelte";

    export let titulacion;
    export let actualizarDatos;

    const URL = getContext("URL");

    async function obtenerDatos() {
        try {
            let nombreTitulacion = titulacion
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            const respuesta = await fetch(
                `${URL.ultimasPosiciones}/${nombreTitulacion}`,
                {
                    method: "GET",
                }
            );
            const datos = await respuesta.json();
            actualizarDatos(datos);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<button class="boton-azul" type="button" on:click={obtenerDatos}
    >{titulacion}</button
>

<style>
    button {
        min-width: 142px;
    }
</style>
