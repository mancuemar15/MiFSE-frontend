<script>
    import TituloPagina from "./TituloPagina.svelte";
    import DragDrop from "svelte-dragdroplist";
    import { onMount } from "svelte";

    export let id;

    let lista = {};
    let preferenciasArrastrables = [];

    const getLista = async () => {
        const url = `http://localhost:8090/listas/${id}`;
        const response = await fetch(url);
        lista = await response.json();
        preferenciasArrastrables = await getPreferenciasArrastrables(lista);
    };

    const getPreferenciasArrastrables = async (lista) => {
        return lista.preferencias.map((p, i) => {
            return {
                id: p.numero,
                html: anadirHTML(p),
                original: p,
            };
        });
    };

    onMount(() => {
        getLista();
    });

    function anadirHTML(preferencia) {
        return `<div class="container-fluid">
                    <div class="row">
                        <div class="col-auto p-0">
                            <div class="info-preferencia text-start ps-0">
                                <h4>${preferencia.especialidadCentro.centro.nombre}</h4>
                                <span class="text-muted fst-italic"
                                    >${preferencia.especialidadCentro.especialidad.nombre}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    $: lista.preferencias = preferenciasArrastrables.map((p, i) => {
        p.original.numero = i + 1;
        return p.original;
    });
</script>

<TituloPagina seccion="preferencias" titulo="Preferencias de {lista.nombre}" />
<section id="preferencias">
    <div class="container">
        <DragDrop bind:data={preferenciasArrastrables} removesItems={true} />
    </div>
</section>

<style>
    #preferencias {
        padding-top: 40px;
    }

    :global(.info-preferencia) {
        padding: 10px 5px;
    }

    :global(.info-preferencia h4) {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 0px;
        padding: 0;
        color: #012970;
    }

    :global(.info-preferencia span) {
        font-size: 14px;
    }

    @media (min-width: 768px) {
        :global(.info-preferencia h4) {
            font-size: 22px;
        }
    }
</style>
