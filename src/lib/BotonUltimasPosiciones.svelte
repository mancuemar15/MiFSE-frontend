<script>
    export let titulacion;
    export let actualizarDatos;

    async function obtenerDatos() {
        try {
            let nombreTitulacion = titulacion
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            const respuesta = await fetch(
                `http://localhost:8090/ultimas-posiciones/${nombreTitulacion}`,
                {
                    method: "GET",
                    headers: { "Access-Control-Allow-Origin": "*" },
                    mode: "cors",
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