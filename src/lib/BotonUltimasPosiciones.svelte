<script>
    import { getContext } from "svelte";
    import { usuario } from "./store";
    import { anadirNotificacionError } from "./utilidadesNotificaciones";

    export let titulacion;
    export let actualizarDatos;

    const URL = getContext("URL");

    async function obtenerDatos() {
        let nombreTitulacion = titulacion
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        const respuesta = await fetch(
            `${URL.ultimasPosiciones}/${nombreTitulacion}`
        );
        if (respuesta.status !== 200) {
            anadirNotificacionError("Error al obtener las últimas posiciones");
            return;
        }
        const datos = await respuesta.json();
        actualizarDatos(datos);
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
