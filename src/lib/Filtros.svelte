<script>
    import RangeSlider from "svelte-range-slider-pips";
    import Svelecte from "svelecte";
    import { onMount } from "svelte";

    export let centros;
    export let centrosFiltrados = [];

    let tiposTrabajoFinResidencia = [];
    let tiposGuardiasFindesFestivos = [];

    let especialidades = [];
    let especialidadesSeleccionadas = [];
    let comunidades = [];
    let comunidadesSeleccionadas = [];
    let necesidadCoche = null;
    let diasVacacionesSeleccionados = [0, 30];

    const getTiposTrabajoFinResidencia = async () => {
        const response = await fetch(`http://localhost:8090/tipos-trabajos`);
        tiposTrabajoFinResidencia = await response.json();
    };

    const getTiposGuardiasFindesFestivos = async () => {
        const response = await fetch(`http://localhost:8090/tipos-guardias`);
        tiposGuardiasFindesFestivos = await response.json();
    };

    onMount(() => {
        getTiposTrabajoFinResidencia();
        getTiposGuardiasFindesFestivos();
    });

    let labelAsValue = false;

    function cumpleFiltros(centro) {
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
        return cumpleEspecialidades && cumpleComunidades;
    }

    $: if (centros) {
        especialidades = [];
        // especialidadesSeleccionadas = [];
        comunidades = [];
        // comunidadesSeleccionadas = [];
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

    // $: centrosFiltrados = centros.filter((centro) => {
    //     return (
    //         especialidadesSeleccionadas.some((especialidad) => {
    //             return (
    //                 JSON.stringify(centro.especialidad) ===
    //                 JSON.stringify(especialidad)
    //             );
    //         }) &&
    //         comunidadesSeleccionadas.some((comunidad) => {
    //             return (
    //                 JSON.stringify(
    //                     centro.centro.localidad.provincia.autonomia
    //                 ) === JSON.stringify(comunidad)
    //             );
    //         })
    //     );
    // });

    // $: centrosFiltrados = centros.filter((centro) => {
    //     // Filtrar por especialidades seleccionadas
    //     const especialidadesDelCentro = {
    //         id: centro.especialidad.id,
    //         nombre: centro.especialidad.nombre,
    //     };
    //     const especialidadSeleccionada = especialidadesSeleccionadas.some(
    //         (e) => JSON.stringify(e) === JSON.stringify(especialidadesDelCentro)
    //     );

    //     // Filtrar por comunidades seleccionadas
    //     const comunidadDelCentro = {
    //         id: centro.centro.localidad.provincia.autonomia.id,
    //         nombre: centro.centro.localidad.provincia.autonomia.nombre,
    //     };
    //     const comunidadSeleccionada = comunidadesSeleccionadas.some(
    //         (c) => JSON.stringify(c) === JSON.stringify(comunidadDelCentro)
    //     );

    //     return especialidadSeleccionada && comunidadSeleccionada;
    // });

    $: centrosFiltrados = centros.filter((centro) => {
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
        const cumpleNecesidadCoche =
            necesidadCoche === null || centro.necesidadCoche === necesidadCoche;
        const cumpleDiasVacaciones =
            centro.numeroDiasVacaciones >= diasVacacionesSeleccionados[0] &&
            centro.numeroDiasVacaciones <= diasVacacionesSeleccionados[1];
        return (
            cumpleEspecialidades &&
            cumpleComunidades &&
            cumpleNecesidadCoche &&
            cumpleDiasVacaciones
        );
    });

    // $: centrosFiltrados = centros.filter((centro) => {
    //     return cumpleFiltros(centro);
    // });
</script>

<div class="filtros">
    <h3>Filtros</h3>
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
        <h4>Necesidad de coche</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                name="necesidad-coche"
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
                name="necesidad-coche"
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
                name="necesidad-coche"
                id="radio-necesidad-coche-nulo"
                on:click={() => (necesidadCoche = null)}
            />
            <label class="form-check-label" for="radio-necesidad-coche-nulo">
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
        <h4>Clases</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="0"
                id="check-clases-no"
            />
            <label class="form-check-label" for="check-clases-no"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="check-clases-si"
            />
            <label class="form-check-label" for="check-clases-si"> Sí </label>
        </div>
    </div>
    <div class="filtro border-bottom">
        <h4>Exámenes</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="0"
                id="check-examenes-no"
            />
            <label class="form-check-label" for="check-examenes-no"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="check-examenes-si"
            />
            <label class="form-check-label" for="check-examenes-si"> Sí </label>
        </div>
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
    <div class="filtro border-bottom">
        <h4>Rotaciones externas</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="0"
                id="check-rotaciones-externas-no"
            />
            <label class="form-check-label" for="check-rotaciones-externas-no">
                No
            </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="check-rotaciones-externas-si"
            />
            <label class="form-check-label" for="check-rotaciones-externas-si">
                Sí
            </label>
        </div>
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
        />
    </div>
</div>

<style>
    .filtros {
        padding: 30px;
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
    }

    .filtros h3 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .filtros ul {
        list-style: none;
        margin-bottom: 0;
        font-size: 15px;
        padding-left: 8%;
    }

    .filtros > ul {
        padding: 0;
    }

    .filtros ul li + li {
        margin-top: 10px;
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
</style>
