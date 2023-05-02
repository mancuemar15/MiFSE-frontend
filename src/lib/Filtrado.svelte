<script>
    import { onMount } from "svelte";
    import TituloPagina from "./TituloPagina.svelte";
    import Filtros from "./Filtros.svelte";

    export let nombre;

    const titulacionesConTildes = {
        biologia: "biología",
        enfermeria: "enfermería",
        fisica: "física",
        psicologia: "psicología",
        quimica: "química",
    };

    let centros = [];

    const getCentros = async () => {
        const response = await fetch(
            `http://localhost:8090/especialidades-centros/${nombre}`
        );
        centros = await response.json();
        console.log("terminado");
    };

    onMount(() => {
        getCentros();
    });

    $: if (nombre) {
        getCentros();
    }
</script>

<TituloPagina
    seccion="Lista"
    titulo="Lista de {titulacionesConTildes[nombre] || nombre}"
/>
<section class="filtrado">
    <div class="container">
        <div class="row gy-4">
            <div class="col-lg-4">
                <Filtros {centros} />
            </div>
            <div class="col-lg-8 border">
                {#each centros as centro}
                <div class="my-2">
                    <span>{centro.centro.nombre}</span>
                </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .filtrado {
        padding-top: 40px;
    }

    .titulacion > details > summary {
        width: fit-content;
        color: #012970;
        font-weight: 700;
        text-decoration: underline;
    }

    .titulacion > details > summary:hover,
    .titulacion > details[open] > summary:first-of-type {
        color: #4154f1;
    }

    .especialidades i {
        padding-right: 4px;
        color: #d0d4fc;
        font-size: 12px;
    }

    @media (min-width: 425px) {
        .titulaciones,
        .titulaciones ul {
            padding-left: 12% !important;
        }
    }

    @media (min-width: 768px) {
        .titulaciones,
        .titulaciones ul {
            padding-left: 64px !important;
        }
    }

    @media (min-width: 992px) {
        .titulaciones,
        .titulaciones ul {
            padding-left: 12% !important;
        }
    }
</style>
