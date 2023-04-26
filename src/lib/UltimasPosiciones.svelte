<script>
    import BotonUltimasPosiciones from "./BotonUltimasPosiciones.svelte";
    import Footer from "./Footer.svelte";
    import TablaUltimasPosiciones from "./TablaUltimasPosiciones.svelte";
    import TituloPagina from "./TituloPagina.svelte";

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
<div class="container">
    <section id="botones-titulaciones" class="pt-5 pb-0">
        <div class="row">
            <div class="col-12">
                <h2 class="mb-4">Selecciona una titulación:</h2>
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
    </section>
    {#if datosTabla.length > 0}
        <TablaUltimasPosiciones ultimasPosiciones={datosTabla} />
    {/if}
</div>
<Footer />
