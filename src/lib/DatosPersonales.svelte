<script>
    import { onMount } from "svelte";
    import DatoPersonal from "./DatoPersonal.svelte";
    import { usuario } from "./store";

    let tiposResidentes = [];

    const getTiposResidente = async () => {
        const url = `http://localhost:8090/tipos-residentes`;
        const response = await fetch(url);
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
    {#if $usuario.apellido2}
        <DatoPersonal
            nombre="Segundo apellido"
            bind:valor={$usuario.apellido2}
            nombreInput="apellido2"
        />
    {/if}
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
    <DatoPersonal
        nombre="Tipo de residente"
        bind:valor={$usuario.tipoResidente}
        tipo="select"
        nombreInput="tipoResidente"
        opcionesSelect={tiposResidentes}
    />
</div>

<style>
    :global(.datos-personales > div:nth-last-child(1)) {
        border-bottom: none !important;
    }
</style>
