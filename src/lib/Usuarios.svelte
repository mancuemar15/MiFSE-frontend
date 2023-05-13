<script>
    import TituloPagina from "./TituloPagina.svelte";
    import { onMount } from "svelte";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "./utilidadesNotificaciones";
    import { abrirModalRegistroAdmin } from "./utilidadesModales";

    let usuarios = [];
    let usuariosFiltrados = [];

    const getUsuarios = async () => {
        const url = `http://localhost:8090/usuarios`;
        const response = await fetch(url);
        usuarios = await response.json();
        usuariosFiltrados = await usuarios;
    };

    const filtrarUsuarios = (event) => {
        const texto = event.target.value.toLowerCase();
        usuariosFiltrados = usuarios.filter(
            (u) =>
                (
                    `${u.nombre.toLowerCase()} ` +
                    `${u.apellido1.toLowerCase()} ` +
                    `${u.apellido2?.toLowerCase()}`
                ).includes(texto) || u.email.toLowerCase().includes(texto)
        );
    };

    onMount(() => {
        getUsuarios();
    });

    const bloquearUsuario = (idUsuario) => {
        fetch(`http://localhost:8090/usuarios/bloquear/${idUsuario}`, {
            method: "PUT",
        })
            .then((response) => response.json())
            .then(() => {
                anadirNotificacionExito("Usuario bloqueado correctamente");
                getUsuarios();
            })
            .catch(() => {
                anadirNotificacionError("Error al bloquear el usuario");
            });
    };
</script>

<TituloPagina seccion="gestión de usuarios" titulo="Usuarios" />
<section id="usuarios">
    <div class="container-xl">
        <div class="row justify-content-sm-between gy-2 mb-3">
            <div class="col-12 col-sm-auto order-1 order-sm-0 buscador d-flex">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Buscar por nombre o email"
                    on:input={filtrarUsuarios}
                />
            </div>
            <div class="col-12 col-sm-auto text-center">
                <button class="boton-azul" on:click={abrirModalRegistroAdmin}
                    >Añadir administrador</button
                >
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Tipo de usuario</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {#each usuariosFiltrados as usuario}
                        <tr>
                            <th>{usuario.id}</th>
                            <td
                                >{`${usuario.nombre} ${usuario.apellido1} ${
                                    usuario.apellido2 ?? ""
                                }`}</td
                            >
                            <td>{usuario.email}</td>
                            <td class="text-center">
                                {#if usuario.inhabilitado}
                                    <span class="badge bg-danger fs-6 fw-normal"
                                        >Bloqueado</span
                                    >
                                {:else}
                                    <span
                                        class="badge bg-success fs-6 fw-normal"
                                        >Activo</span
                                    >
                                {/if}</td
                            >
                            <td>{usuario.tipoUsuario.tipo}</td>
                            <td class="text-center">
                                <button
                                    class="btn d-inline-flex p-0"
                                    title="Bloquear usuario"
                                    on:click={() => {
                                        bloquearUsuario(usuario.id);
                                    }}
                                    ><span
                                        class="material-symbols-outlined link-danger fs-3"
                                    >
                                        no_accounts
                                    </span></button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>

<style>
    #usuarios {
        padding-top: 40px;
    }

    .table-striped > tbody > tr:nth-of-type(odd) > * {
        background-color: #ecf3ff;
    }

    thead th {
        font-family: "Nunito", sans-serif;
        background-color: #012970;
        color: #fff;
    }

    .material-symbols-outlined {
        font-variation-settings: "FILL" 1;
    }
    .buscador {
        min-width: 300px !important;
    }
</style>
