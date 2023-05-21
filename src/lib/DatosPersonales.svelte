<script>
    import { getContext, onMount } from "svelte";
    import DatoPersonal from "./DatoPersonal.svelte";
    import { usuario } from "./store";

    const URL = getContext("URL");

    let tiposResidentes = [];

    const getTiposResidente = async () => {
        const response = await fetch(URL.tiposResidentes);
        if (response.status !== 200) {
            return;
        }
        tiposResidentes = await response.json();
    };

    onMount(() => {
        getTiposResidente();
    });
</script>

<div class="row datos-personales">
    <DatoPersonal
        nombre="Nombre"
        bind:valor={$usuario.nombre}
        nombreInput="nombre"
    />
    <DatoPersonal
        nombre="Primer apellido"
        bind:valor={$usuario.apellido1}
        nombreInput="apellido1"
    />
    <DatoPersonal
        nombre="Segundo apellido"
        bind:valor={$usuario.apellido2}
        nombreInput="apellido2"
    />
    <DatoPersonal
        nombre="Email"
        bind:valor={$usuario.email}
        tipo="email"
        nombreInput="email"
    />
    <DatoPersonal
        nombre="Contraseña"
        bind:valor={$usuario.contrasena}
        tipo="password"
        nombreInput="contrasena"
    />
    {#if $usuario.tipoResidente}
        <DatoPersonal
            nombre="Tipo de residente"
            bind:valor={$usuario.tipoResidente}
            tipo="select"
            nombreInput="tipoResidente"
            opcionesSelect={tiposResidentes}
        />
    {/if}
</div>

<style>
    :global(.datos-personales > div:nth-last-child(1)) {
        border-bottom: none !important;
    }
</style>
