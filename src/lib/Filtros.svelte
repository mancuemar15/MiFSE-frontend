<script>
    import RangeSlider from "svelte-range-slider-pips";
    import Svelecte from "svelecte";
    import { onMount } from "svelte";

    export let centros;

    let tiposTrabajoFinResidencia = [];
    let tiposGuardiasFindesFestivos = [];

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

    let options = [
        "Czechia",
        "Germany",
        "Spainnnnnnnnnnnnnnnnnnnnnnn",
        "France",
        "Italy",
        "Poland",
    ];

    let labelAsValue = false;

    let selection = [];
    let value = ["Czechia", "Germany"];
</script>

<div class="filtros">
    <h3>Filtros</h3>
    <div class="filtro border-bottom pt-0">
        <h4>Especialidades</h4>
        <Svelecte
            {options}
            {labelAsValue}
            bind:readSelection={selection}
            bind:value
            multiple
            highlightFirstItem={false}
            placeholder="Selecciona una o varias"
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Comunidades</h4>
        <Svelecte
            {options}
            {labelAsValue}
            bind:readSelection={selection}
            bind:value
            multiple
            highlightFirstItem={false}
            placeholder="Selecciona una o varias"
        />
    </div>
    <div class="filtro border-bottom">
        <h4>Provincias</h4>
        <Svelecte
            {options}
            {labelAsValue}
            bind:readSelection={selection}
            bind:value
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
                type="checkbox"
                value="0"
                id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"> Sí </label>
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
                id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"> Sí </label>
        </div>
    </div>
    <div class="filtro border-bottom">
        <h4>Exámenes</h4>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="0"
                id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"> Sí </label>
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
                id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault"> No </label>
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"> Sí </label>
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
