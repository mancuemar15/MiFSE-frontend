<script>
    import { onMount } from "svelte";
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";

    export let latitud;
    export let longitud;
    let mapa;

    onMount(() => {
        mapa = L.map("mapa").setView([latitud, longitud], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapa);

        L.marker([latitud, longitud]).addTo(mapa);
    });

    $: mapa && mapa.setView([latitud, longitud], 13);
</script>

<div class="container">
    <div id="mapa" />
</div>

<style>
    #mapa {
        height: 400px;
        width: 100%;
    }

    :global(.leaflet-container) {
        z-index: 0 !important;
    }
</style>
