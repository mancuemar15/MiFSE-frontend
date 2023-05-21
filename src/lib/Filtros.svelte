<script>
    //@ts-nocheck
    import RangeSlider from "svelte-range-slider-pips";
    import Svelecte, { config } from "svelecte";
    import { onMount, getContext } from "svelte";
    import { centrosFiltrados, centrosSeleccionados } from "./store";

    export let centros;
    export let titulacion;

    const URL = getContext("URL");

    let tiposTrabajoFinResidencia = [];
    let tiposGuardiasFindesFestivos = [];
    let especialidades = [];
    let comunidades = [];
    let necesidadCoche = null;
    let hayClases = null;
    let hayExamenes = null;
    let hayRotacionesExternas = null;

    let especialidadesSeleccionadas = [];
    let comunidadesSeleccionadas = [];
    let valoracionesSeleccionadas = [0, 5];
    let diasVacacionesSeleccionados = [0, 30];
    let tiposTrabajoFinResidenciaSeleccionados = [];
    let tiposGuardiasFindesFestivosSeleccionados = [];
    let diasLibreDisposicionSeleccionados = [0, 7];
    let numerosGuardiasMesSeleccionados = [0, 10];
    let sueldosSeleccionados = [1000, 2000];

    const getTiposTrabajoFinResidencia = async () => {
        const response = await fetch(URL.tiposTrabajos);
        if (response.status !== 200) {
            return;
        }
        tiposTrabajoFinResidencia = await response.json();
    };

    const getTiposGuardiasFindesFestivos = async () => {
        const response = await fetch(URL.tiposGuardias);
        if (response.status !== 200) {
            return;
        }
        tiposGuardiasFindesFestivos = await response.json();
    };

    onMount(() => {
        getTiposTrabajoFinResidencia();
        getTiposGuardiasFindesFestivos();
    });

    let labelAsValue = false;

    $: if (centros) {
        especialidades = [];
        comunidades = [];
        centros.forEach((centro) => {
            const especialidad = {
                id: centro.especialidad.id,
                nombre: centro.especialidad.nombre,
            };
            const comunidad = {
                id: centro.centro.localidad.provincia.autonomia.id,
                nombre: centro.centro.localidad.provincia.autonomia.nombre,
            };
            if (
                !especialidades.some(
                    (e) => JSON.stringify(e) === JSON.stringify(especialidad)
                )
            ) {
                especialidades.push(especialidad);
            }
            if (
                !comunidades.some(
                    (c) => JSON.stringify(c) === JSON.stringify(comunidad)
                )
            ) {
                comunidades.push(comunidad);
            }
        });
    }

    $: $centrosFiltrados = centros.filter((centro) => {
        const cumpleEspecialidades =
            especialidadesSeleccionadas.length === 0 ||
            especialidadesSeleccionadas.some((especialidad) => {
                return (
                    JSON.stringify(centro.especialidad) ===
                    JSON.stringify(especialidad)
                );
            });
        const cumpleComunidades =
            comunidadesSeleccionadas.length === 0 ||
            comunidadesSeleccionadas.some((comunidad) => {
                return (
                    JSON.stringify(
                        centro.centro.localidad.provincia.autonomia
                    ) === JSON.stringify(comunidad)
                );
            });
        const cumpleValoraciones =
            centro.centro.valoracionMedia >= valoracionesSeleccionadas[0] &&
            centro.centro.valoracionMedia <= valoracionesSeleccionadas[1];
        const cumpleNecesidadCoche =
            necesidadCoche === null || centro.necesidadCoche === necesidadCoche;
        const cumpleHayClases =
            hayClases === null || centro.hayClases === hayClases;
        const cumpleHayExamenes =
            hayExamenes === null || centro.hayExamenes === hayExamenes;
        const cumpleHayRotacionesExternas =
            hayRotacionesExternas === null ||
            centro.hayRotacionesExternas === hayRotacionesExternas;
        const cumpleTipoTrabajoFinResidencia =
            tiposTrabajoFinResidenciaSeleccionados.length === 0 ||
            tiposTrabajoFinResidenciaSeleccionados.every((valor) => !valor) ||
            tiposTrabajoFinResidenciaSeleccionados.some(
                (estaSeleccionado, index) => {
                    return estaSeleccionado
                        ? index === centro.tipoGuardiasFindesFestivos.id
                        : false;
                }
            );
        const cumpleTipoGuardiasFindesFestivos =
            tiposGuardiasFindesFestivosSeleccionados.length === 0 ||
            tiposGuardiasFindesFestivosSeleccionados.every((valor) => !valor) ||
            tiposGuardiasFindesFestivosSeleccionados.some(
                (estaSeleccionado, index) => {
                    return estaSeleccionado
                        ? index === centro.tipoGuardiasFindesFestivos.id
                        : false;
                }
            );
        const cumpleDiasVacaciones =
            centro.numeroDiasVacaciones >= diasVacacionesSeleccionados[0] &&
            centro.numeroDiasVacaciones <= diasVacacionesSeleccionados[1];
        const cumpleDiasLibreDispocision =
            centro.numeroDiasLibreDisposicion >=
                diasLibreDisposicionSeleccionados[0] &&
            centro.numeroDiasLibreDisposicion <=
                diasLibreDisposicionSeleccionados[1];
        const cumpleNumerosGuardiasMes =
            centro.numeroGuardiasMes >= numerosGuardiasMesSeleccionados[0] &&
            centro.numeroGuardiasMes <= numerosGuardiasMesSeleccionados[1];
        const cumpleSueldos =
            centro.sueldo >= sueldosSeleccionados[0] &&
            centro.sueldo <= sueldosSeleccionados[1];
        const estaSeleccionado = $centrosSeleccionados[titulacion].some(
            (centroSeleccionado) => {
                return (
                    JSON.stringify(centroSeleccionado) ===
                    JSON.stringify(centro)
                );
            }
        );
        return (
            cumpleEspecialidades &&
            cumpleComunidades &&
            cumpleValoraciones &&
            cumpleNecesidadCoche &&
            cumpleHayClases &&
            cumpleHayExamenes &&
            cumpleHayRotacionesExternas &&
            cumpleDiasVacaciones &&
            cumpleTipoTrabajoFinResidencia &&
            cumpleDiasLibreDispocision &&
            cumpleNumerosGuardiasMes &&
            cumpleSueldos &&
            cumpleTipoGuardiasFindesFestivos &&
            !estaSeleccionado
        );
    });

    function abrirMenuFiltros() {
        const filtros = document.querySelector(".filtros");
        filtros.classList.add("d-block");
    }

    function cerrarMenuFiltros() {
        const filtros = document.querySelector(".filtros");
        filtros.classList.remove("d-block");
    }

    config.i18n = {
        empty: "Sin opciones",
        nomatch: "Sin coincidencias",
    };
</script>

<div class="text-center d-lg-none">
    <button class="boton-azul" on:click={abrirMenuFiltros}>Filtros</button>
</div>
<div class="filtros pt-2">
    <div
        id="cabecera-menu-movil"
        class="d-flex justify-content-between d-lg-none sticky-top bg-white pt-4"
    >
        <h3>Filtros</h3>
        <button class="btn-close" on:click={cerrarMenuFiltros} />
    </div>
    <h3 class="d-none d-lg-block">Filtros</h3>
    <div class="filtro border-bottom pt-0">
        <h4>Especialidades</h4>
        <Svelecte
            options={especialidades}
            {labelAsValue}
            bind:readSelection={especialidadesSeleccionadas}
            multiple
            highlightFirstItem={false}
            placeholder="Selecciona una o varias"
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Comunidades</h4>
        <Svelecte
            options={comunidades}
            {labelAsValue}
            bind:readSelection={comunidadesSeleccionadas}
            multiple
            highlightFirstItem={false}
            placeholder="Selecciona una o varias"
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Valoración del centro</h4>
        <RangeSlider
            range
            step={0.5}
            min={0}
            max={5}
            values={[0, 5]}
            float={true}
            pips
            all={false}
            first="label"
            last="label"
            id="range-valoracion-centro"
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Necesidad de coche</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="necesidadCoche"
                id="radio-necesidad-coche-no"
                on:click={() => (necesidadCoche = false)}
            />
            <label class="form-check-label" for="radio-necesidad-coche-no">
                No
            </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="necesidadCoche"
                id="radio-necesidad-coche-si"
                on:click={() => (necesidadCoche = true)}
            />
            <label class="form-check-label" for="radio-necesidad-coche-si">
                Sí
            </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="necesidadCoche"
                id="radio-necesidad-coche-nulo"
                on:click={() => (necesidadCoche = null)}
            />
            <label class="form-check-label" for="radio-necesidad-coche-nulo">
                Indiferente
            </label>
        </div>
    </div>

    <div class="filtro border-bottom">
        <h4>Clases</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayClases"
                value="0"
                id="radio-clases-no"
                on:click={() => (hayClases = false)}
            />
            <label class="form-check-label" for="radio-clases-no"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayClases"
                value="1"
                id="radio-clases-si"
                on:click={() => (hayClases = true)}
            />
            <label class="form-check-label" for="radio-clases-si"> Sí </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayClases"
                id="radio-clases-nulo"
                on:click={() => (hayClases = null)}
            />
            <label class="form-check-label" for="radio-clases-nulo"
                >Indiferente</label
            >
        </div>
    </div>
    <div class="filtro border-bottom">
        <h4>Exámenes</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayExamenes"
                value="0"
                id="radio-examenes-no"
                on:click={() => (hayExamenes = false)}
            />
            <label class="form-check-label" for="radio-examenes-no"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayExamenes"
                value="1"
                id="radio-examenes-si"
                on:click={() => (hayExamenes = true)}
            />
            <label class="form-check-label" for="radio-examenes-si"> Sí </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayExamenes"
                value=""
                id="radio-examenes-nulo"
                on:click={() => (hayExamenes = null)}
            />
            <label class="form-check-label" for="radio-examenes-nulo">
                Indiferente
            </label>
        </div>
    </div>
    <div class="filtro border-bottom">
        <h4>Rotaciones externas</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayRotacionesExternas"
                value="0"
                id="radio-rotaciones-externas-no"
                on:click={() => (hayRotacionesExternas = false)}
            />
            <label class="form-check-label" for="radio-rotaciones-externas-no">
                No
            </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayRotacionesExternas"
                value="1"
                id="radio-rotaciones-externas-si"
                on:click={() => (hayRotacionesExternas = true)}
            />
            <label class="form-check-label" for="radio-rotaciones-externas-si">
                Sí
            </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="hayRotacionesExternas"
                value=""
                id="radio-rotaciones-externas-nulo"
                on:click={() => (hayRotacionesExternas = null)}
            />
            <label
                class="form-check-label"
                for="radio-rotaciones-externas-nulo"
            >
                Indiferente
            </label>
        </div>
    </div>
    <div class="filtro border-bottom">
        <h4>Trabajo de fin de residencia</h4>
        {#each tiposTrabajoFinResidencia as tipoTrabajoFinResidencia}
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    value={tipoTrabajoFinResidencia.id}
                    bind:checked={tiposTrabajoFinResidenciaSeleccionados[
                        tipoTrabajoFinResidencia.id
                    ]}
                    id="check-tipo-trabajo-{tipoTrabajoFinResidencia.id}"
                />
                <label
                    class="form-check-label"
                    for="check-tipo-trabajo-{tipoTrabajoFinResidencia.id}"
                >
                    {tipoTrabajoFinResidencia.tipo}
                </label>
            </div>
        {/each}
    </div>
    <div class="filtro border-bottom">
        <h4>Días de vacaciones</h4>
        <RangeSlider
            range
            step={1}
            min={0}
            max={30}
            values={[0, 30]}
            float={true}
            pips
            all={false}
            first="label"
            last="label"
            id="range-dias-vacaciones"
            on:stop={(e) => {
                diasVacacionesSeleccionados = e.detail.values;
            }}
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Días de libre disposición</h4>
        <RangeSlider
            range
            step={1}
            min={0}
            max={7}
            values={[0, 7]}
            float={true}
            pips
            all={false}
            first="label"
            last="label"
            id="range-dias-libre-disposicion"
            on:stop={(e) => {
                diasLibreDisposicionSeleccionados = e.detail.values;
            }}
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Número de guardias al mes</h4>
        <RangeSlider
            range
            step={1}
            min={0}
            max={10}
            values={[0, 10]}
            float={true}
            pips
            all={false}
            first="label"
            last="label"
            id="range-numero-guardias"
            on:stop={(e) => {
                numerosGuardiasMesSeleccionados = e.detail.values;
            }}
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Guardias findes y festivos</h4>
        {#each tiposGuardiasFindesFestivos as tipoGuardia}
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    value={tipoGuardia.id}
                    bind:checked={tiposGuardiasFindesFestivosSeleccionados[
                        tipoGuardia.id
                    ]}
                    id="check-tipo-guardia-{tipoGuardia.id}"
                />
                <label
                    class="form-check-label"
                    for="check-tipo-guardia-{tipoGuardia.id}"
                >
                    {tipoGuardia.tipo}
                </label>
            </div>
        {/each}
    </div>

    <div class="filtro">
        <h4>Sueldo</h4>
        <RangeSlider
            range
            step={100}
            min={1000}
            max={2000}
            values={[1000, 2000]}
            float={true}
            pips
            all={false}
            first="label"
            last="label"
            suffix="€"
            id="range-sueldo"
            on:stop={(e) => {
                sueldosSeleccionados = e.detail.values;
            }}
        />
    </div>
</div>

<style>
    #cabecera-menu-movil {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .filtros {
        padding: 30px;
        position: absolute;
        background-color: white;
        z-index: 30;
        top: 0;
        left: 0;
        width: 100%;
        display: none;
    }

    .filtros h3 {
        font-size: 22px;
        font-weight: 700;
    }

    .filtro {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    h4 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .form-check-label {
        font-size: 15px;
        font-weight: 400;
    }

    @media (min-width: 992px) {
        .filtros {
            padding-top: 30px !important;
            box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
            position: relative;
            display: block;
            z-index: 15 !important;
        }

        .filtros h3 {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
    }
</style>
