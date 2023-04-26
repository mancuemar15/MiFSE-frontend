<script>
    export let ultimasPosiciones = [];
    let anos = [];
    let anoSeleccionado = "";
    let ultimasPosicionesFiltradas = [];

    $: anos = Array.from(
        new Set(ultimasPosiciones.map((pos) => pos.ano))
    ).reverse();
    $: ultimasPosicionesFiltradas = ultimasPosiciones.filter(
        (pos) => pos.ano === anoSeleccionado
    );

    $: if (anos.length > 0 && !anoSeleccionado) {
        anoSeleccionado = anos[0];
    }
</script>

<section id="tabla-ultimas-posiciones" class="tabla-ultimas-posiciones">
    <div class="row gx-2 mb-3">
        <label for="ano" class="form-label col-auto col-form-label">Año:</label>
        <div class="col-auto">
            <select id="ano" class="form-select" bind:value={anoSeleccionado}>
                {#each anos as ano}
                    <option value={ano}>{ano}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Especialidad</th>
                    <th>Provincia</th>
                    <th>Centro</th>
                </tr>
            </thead>
            <tbody>
                {#each ultimasPosicionesFiltradas as ultimaPosicion}
                    <tr>
                        <td>{ultimaPosicion.numero}</td>
                        <td>{ultimaPosicion.especialidad.nombre}</td>
                        <td>{ultimaPosicion.ano}</td>
                        <td>{ultimaPosicion.especialidad.nombre}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>

<style>
    label {
        font-family: "Nunito", sans-serif;
        text-transform: uppercase;
        font-weight: 700;
        color: #012970;
    }

    .table-striped > tbody > tr:nth-of-type(odd) > * {
        background-color: #ecf3ff;
    }

    th {
        font-family: "Nunito", sans-serif;
        background-color: #012970;
        color: #fff;
    }
</style>
