<script>
    import { onMount, afterUpdate, getContext } from "svelte";
    import TituloPagina from "./TituloPagina.svelte";
    import Mapa from "./Mapa.svelte";
    import Comentarios from "./Comentarios.svelte";
    import { capitalizar } from "./utilidadesString";
    import { redireccionarNotFound } from "./utilidadesLinks";

    export let id;

    const URL = getContext("URL");

    let imagenCentro = `/img/centro/centro.jpg`;
    let centro = {};
    let especialidadesPorTitulacion = [];
    let numeroAnteriorComentarios = 0;

    const getCentro = async () => {
        const response = await fetch(`${URL.centros}/${id}`);
        if (!response.ok) {
            redireccionarNotFound();
        }
        centro = await response.json();
        numeroAnteriorComentarios = await centro.comentarios.length;
    };

    const getEspecialidadesPorTitulacion = async () => {
        const response = await fetch(`${URL.especialidadesCentro}/${id}`);
        const especialidades = await response.json();
        agruparEspecialidadesPorTitulacion(especialidades);
    };

    onMount(() => {
        getCentro();
        getEspecialidadesPorTitulacion();
    });

    afterUpdate(() => {
        if (
            centro.comentarios &&
            centro.comentarios.length !== numeroAnteriorComentarios
        ) {
            numeroAnteriorComentarios = centro.comentarios.length;
            getCentro();
        }
    });

    fetch(`/img/centro/${id}.jpg`)
        .then((response) => {
            if (response.ok) {
                imagenCentro = `/img/centro/${id}.jpg`;
            }
        })
        .catch(() => {
            imagenCentro = "";
        });

    function agruparEspecialidadesPorTitulacion(especialidades) {
        for (let especialidad of especialidades) {
            let nombre = capitalizar(especialidad.nombre);
            let titulacion = capitalizar(especialidad.titulacion.nombre);

            if (titulacion in especialidadesPorTitulacion) {
                if (!especialidadesPorTitulacion[titulacion].includes(nombre)) {
                    especialidadesPorTitulacion[titulacion].push(nombre);
                }
            } else {
                especialidadesPorTitulacion[titulacion] = [nombre];
            }
        }
    }

    $: if (id) {
        especialidadesPorTitulacion = [];
        getCentro();
        getEspecialidadesPorTitulacion();
    }
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
                                    ?.toFixed(1)
                                    .replace(".", ",") ?? "Sin valoraciones"}
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
                                <ul class="list-group-flush titulaciones mt-2">
                                    {#each Object.keys(especialidadesPorTitulacion) as titulacion}
                                        <li class="titulacion">
                                            <details>
                                                <summary
                                                    >{capitalizar(
                                                        titulacion
                                                    )}</summary
                                                >
                                                <ul
                                                    class="list-group-flush especialidades mt-2"
                                                >
                                                    {#each especialidadesPorTitulacion[titulacion] as especialidad}
                                                        <li>
                                                            <i
                                                                class="bi bi-chevron-right"
                                                            />{capitalizar(
                                                                especialidad
                                                            )}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            </details>
                                        </li>
                                    {/each}
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
    <Comentarios bind:comentarios={centro.comentarios} idCentro={centro.id} />
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
        margin-bottom: 0;
        font-size: 15px;
        padding-left: 8%;
    }

    .centro .centro-info > ul {
        padding: 0;
    }

    .centro .centro-info ul li + li {
        margin-top: 10px;
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
