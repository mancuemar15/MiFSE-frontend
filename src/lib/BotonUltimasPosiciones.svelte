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

<button on:click={obtenerDatos}>{titulacion}</button>

<style>
    button {
        background-color: #fff;
        color: #0257ee;
        font-size: 14px;
        padding: 6px 14px;
        margin: 0 6px 8px 0;
        border: 1px solid #d7e6ff;
        display: inline-block;
        transition: 0.3s;
        min-width: 120px;
    }

    button:hover {
        color: #fff;
        border: 1px solid #4154f1;
        background: #4154f1;
    }
</style>
