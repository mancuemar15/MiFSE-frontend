<script>
    import { onMount } from "svelte";
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";

    export let latitud;
    export let longitud;
    let map;

    onMount(() => {
        // Crear el mapa y configurar la vista
        map = L.map("map").setView([51.505, -0.09], 13);

        // Añadir una capa de mapa base de OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Añadir un marcador en la ubicación especificada
        // L.marker([51.5, -0.09])
        //     .addTo(map)
        //     .bindPopup("¡Hola, mundo!")
        //     .openPopup();
        L.marker([latitud, longitud]).addTo(map);
    });

    // Actualizar la posición del marcador cuando cambien las coordenadas
    $: map && map.setView([latitud, longitud], 13);
</script>

<div class="container">
    <div id="map" />
</div>

<style>
    #map {
        height: 400px;
        width: 100%;
    }
</style>
