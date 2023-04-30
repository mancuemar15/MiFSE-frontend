<script>
    import { onMount, onDestroy } from "svelte";
    import TituloPagina from "./TituloPagina.svelte";
    import Mapa from "./Mapa.svelte";
    import Comentarios from "./Comentarios.svelte";

    export let id;

    let imagenCentro = `/img/centro/centro.jpg`;

    let centro = {};

    const getCentro = async () => {
        const response = await fetch(`http://localhost:8090/centros/${id}`);
        centro = await response.json();
    };

    onMount(getCentro);

    onDestroy(() => {
        centro = {};
        imagenCentro = `/img/centro/centro.jpg`;
    });

    $: if (id) {
        getCentro();
    }

    fetch(`/img/centro/${id}.jpg`)
        .then((response) => {
            if (response.ok) {
                imagenCentro = `/img/centro/${id}.jpg`;
            }
        })
        .catch(() => {
            imagenCentro = `/img/centro/centro.jpg`;
        });
</script>

{#await getCentro() then}
    <TituloPagina seccion="Centro" titulo={centro.nombre} />
    <section id="centro" class="centro">
        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-5">
                    <div class="centro-info">
                        <h3>Información del centro</h3>
                        <ul>
                            <li>
                                <strong>Valoración</strong>: {centro.valoracionMedia
                                    ? centro.valoracionMedia
                                    : "Sin valoraciones"}
                            </li>
                            <li>
                                <strong>Dirección</strong>: {centro.direccion}
                            </li>
                            <li>
                                <strong>Localidad</strong>: {centro.localidad
                                    .nombre}
                            </li>
                            <li>
                                <strong>Provincia</strong>:
                                <span class="text-capitalize"
                                    >{centro.localidad.provincia.nombre.toLowerCase()}</span
                                >
                            </li>
                            <li>
                                <strong>Comunidad Autónoma</strong>:
                                <span class="text-capitalize"
                                    >{centro.localidad.provincia.autonomia.nombre.toLowerCase()}</span
                                >
                            </li>
                            <li>
                                <strong>Especialidades</strong>:
                                <ul class="especialidades mt-2 ps-4 ps-sm-5">
                                    <li>
                                        <i class="bi bi-chevron-right" />
                                        Enfermería del trabajo
                                    </li>
                                    <li>
                                        <i class="bi bi-chevron-right" />
                                        Matrona
                                    </li>
                                    <li>
                                        <i class="bi bi-chevron-right" />
                                        Matrona
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-7">
                    <img src={imagenCentro} class="w-100" alt="" />
                </div>
            </div>
        </div>
    </section>
    {#key centro}
        <Mapa latitud={centro.latitud} longitud={centro.longitud} />
    {/key}
    <Comentarios />
{:catch error}
    <p>Error: {error.message}</p>
{/await}

<style>
    .centro {
        padding-top: 40px;
    }

    .centro .centro-info {
        padding: 30px;
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
    }

    .centro .centro-info h3 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .centro .centro-info ul {
        list-style: none;
        padding: 0;
        font-size: 15px;
    }

    .centro .centro-info ul li + li {
        margin-top: 10px;
    }
</style>
