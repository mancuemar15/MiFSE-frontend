<script>
    import { centrosFiltrados, centrosSeleccionados } from "./store";

    export let centro = null;
    export let especialidadCentro = null;
    export let titulacion;

    function agregarCentro(e, centro) {
        e.target.checked = false;
        $centrosSeleccionados[titulacion] = [
            ...$centrosSeleccionados[titulacion],
            centro,
        ];
        $centrosFiltrados = $centrosFiltrados.filter((c) => {
            return (
                c.centro.id !== centro.centro.id ||
                c.especialidad.id !== centro.especialidad.id
            );
        });
    }

    function quitarCentro(e, centro) {
        e.target.checked = true;
        $centrosFiltrados = [...$centrosFiltrados, centro];
        $centrosSeleccionados[titulacion] = $centrosSeleccionados[
            titulacion
        ].filter((c) => {
            return (
                c.centro.id !== centro.centro.id ||
                c.especialidad.id !== centro.especialidad.id
            );
        });
    }
</script>

{#if centro}
    <div class="centro">
        <div
            class="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between"
        >
            <label
                class="form-check-label"
                for="check-{centro.especialidad.id}-{centro.centro.id}"
            >
                <div class="text-start">
                    <h4>
                        {centro.centro.nombre}
                    </h4>
                    <div class="social-links">
                        <span class="text-muted fst-italic"
                            >{centro.especialidad.nombre}</span
                        >
                    </div>
                </div>
            </label>
            <div>
                <input
                    class="form-check-input"
                    type="checkbox"
                    value="{centro.especialidad.id}-{centro.centro.id}"
                    id="check-{centro.especialidad.id}-{centro.centro.id}"
                    on:change={(e) => agregarCentro(e, centro)}
                />
            </div>
        </div>
    </div>
{:else}
    <div class="centro seleccionado">
        <div
            class="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between"
        >
            <label
                class="form-check-label"
                for="check-{especialidadCentro.especialidad
                    .id}-{especialidadCentro.centro.id}"
            >
                <div class="text-start">
                    <h4>
                        {especialidadCentro.centro.nombre}
                    </h4>
                    <div class="social-links">
                        <span class="text-muted fst-italic"
                            >{especialidadCentro.especialidad.nombre}</span
                        >
                    </div>
                </div>
            </label>
            <div>
                <input
                    class="form-check-input"
                    type="checkbox"
                    value="{especialidadCentro.especialidad
                        .id}-{especialidadCentro.centro.id}"
                    id="check-{especialidadCentro.especialidad
                        .id}-{especialidadCentro.centro.id}"
                    checked
                    on:change={(e) => quitarCentro(e, especialidadCentro)}
                />
            </div>
        </div>
    </div>
{/if}

<style>
    .centro {
        padding: 15px 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .centro h4 {
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 0px;
        padding: 0;
        color: #012970;
    }

    .centro {
        cursor: pointer;
        transition: 0.4s;
    }

    .centro:hover {
        transform: scale(1.01);
    }

    .centro label {
        width: 100% !important;
        cursor: pointer;
    }

    .seleccionado {
        background-color: rgba(163, 189, 234, 0.3) !important;
    }

    .form-check-input:focus {
        box-shadow: none !important;
    }

    .form-check-input:not(:checked):focus {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e") !important;
        border: 1px solid rgba(0, 0, 0, 0.25) !important;
    }
</style>
