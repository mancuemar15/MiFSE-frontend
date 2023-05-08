<script>
    import TituloPagina from "./TituloPagina.svelte";
    import DragDrop from "svelte-dragdroplist";
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import { getNotificationsContext } from "svelte-notifications";
    import { quitarAcentos } from "./utilidadesString";

    export let id;

    const { addNotification } = getNotificationsContext();

    let lista = {};
    let preferenciasArrastrables = [];
    let titulacion = "";

    const getLista = async () => {
        const url = `http://localhost:8090/listas/${id}`;
        const response = await fetch(url);
        lista = await response.json();
        preferenciasArrastrables = await getPreferenciasArrastrables(lista);
        console.log(preferenciasArrastrables);
        titulacion =
            await lista.preferencias[0].especialidadCentro.especialidad.titulacion.nombre.toLowerCase();
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

    function anadirCentros() {
        guardarPreferencias();
        navigate(`/lista/${quitarAcentos(titulacion)}/${id}`);
    }

    function guardarPreferencias() {
        fetch(`http://localhost:8090/listas`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lista),
        })
            .then((response) => {
                if (response.ok) {
                    addNotification({
                        text: "Se han guardado las preferencias correctamente",
                        position: "top-right",
                        type: "success",
                        removeAfter: 4000,
                    });
                } else {
                    addNotification({
                        text: "No se han podido guardar las preferencias",
                        position: "top-right",
                        type: "error",
                        removeAfter: 4000,
                    });
                }
            })
            .catch(() => {
                addNotification({
                    text: "No se han podido guardar las preferencias",
                    position: "top-right",
                    type: "error",
                    removeAfter: 4000,
                });
            });
    }

    $: lista.preferencias = preferenciasArrastrables.map((p, i) => {
        p.original.numero = i + 1;
        return p.original;
    });
</script>

<TituloPagina seccion="preferencias" titulo="Preferencias de {lista.nombre}" />
<section id="preferencias">
    <div class="container">
        <div class="row gy-4">
            <div class="col-12">
                <DragDrop
                    bind:data={preferenciasArrastrables}
                    removesItems={true}
                />
            </div>
            <div class="col-12">
                <div
                    class="d-flex flex-row flex-wrap justify-content-center botones-usuario-anonimo"
                >
                    <button
                        class="btn btn-primary boton-azul"
                        on:click={anadirCentros}>Añadir más centros</button
                    >
                    <button
                        class="btn btn-primary boton-azul"
                        on:click={guardarPreferencias}
                        >Guardar preferencias</button
                    >
                </div>
            </div>
        </div>
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
