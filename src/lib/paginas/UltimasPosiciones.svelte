<script>
    import BotonUltimasPosiciones from "../componentes/BotonUltimasPosiciones.svelte";
    import TablaUltimasPosiciones from "../componentes/TablaUltimasPosiciones.svelte";
    import TituloPagina from "../componentes/TituloPagina.svelte";

    let datosTabla = [];

    const actualizarDatos = (datos) => {
        datosTabla = datos;
    };

    let botones = [
        { titulacion: "Enfermería" },
        { titulacion: "Biología" },
        { titulacion: "Medicina" },
        { titulacion: "Física" },
        { titulacion: "Química" },
        { titulacion: "Psicología" },
        { titulacion: "Farmacia" },
    ];
</script>

<TituloPagina seccion="Últimas posiciones" titulo="Últimas posiciones" />
<section id="ultimas-posiciones">
    <div class="container">
        <div id="botones-titulaciones">
            <div class="row gy-3">
                <div class="col-12">
                    <h2>Selecciona una titulación:</h2>
                </div>
                {#each botones as boton}
                    <div class="col text-center">
                        <BotonUltimasPosiciones
                            {actualizarDatos}
                            titulacion={boton.titulacion}
                        />
                    </div>
                {/each}
            </div>
        </div>
        {#if datosTabla.length > 0}
            <TablaUltimasPosiciones ultimasPosiciones={datosTabla} />
        {/if}
    </div>
</section>

<style>
    #ultimas-posiciones {
        padding-top: 40px;
    }

    .col {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }
</style>
