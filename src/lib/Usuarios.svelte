<script>
    import TituloPagina from "./TituloPagina.svelte";
    import { getContext, onMount } from "svelte";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "./utilidadesNotificaciones";
    import { abrirModalRegistroAdmin } from "./utilidadesModales";
    import { usuario } from "./store";

    const URL = getContext("URL");

    let usuarios = [];
    let usuariosFiltrados = [];

    const getUsuarios = async () => {
        const response = await fetch(URL.usuarios, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status !== 200) {
            anadirNotificacionError("Error al obtener los usuarios");
            return;
        }
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
                    `${u.apellido2 ?? ""}`.toLowerCase()
                ).includes(texto) || u.email.toLowerCase().includes(texto)
        );
    };

    onMount(() => {
        getUsuarios();
    });

    const bloquearUsuario = (idUsuario) => {
        fetch(`${URL.usuarios}/bloquear/${idUsuario}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    anadirNotificacionError("Error al bloquear el usuario");
                    return;
                }
            })
            .then(() => {
                anadirNotificacionExito("Usuario bloqueado correctamente");
                getUsuarios();
            })
            .catch(() => {
                anadirNotificacionError("Error al bloquear el usuario");
            });
    };

    const desbloquearUsuario = (idUsuario) => {
        fetch(`${URL.usuarios}/desbloquear/${idUsuario}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    anadirNotificacionError("Error al desbloquear el usuario");
                    return;
                }
            })
            .then(() => {
                anadirNotificacionExito("Usuario desbloqueado correctamente");
                getUsuarios();
            })
            .catch(() => {
                anadirNotificacionError("Error al desbloquear el usuario");
            });
    };

    window.addEventListener("administradorRegistrado", (event) => {
        console.log("evento administradorRegistrado");
        console.log(event);
        const nuevoAdministrador = event.detail;
        usuarios = [...usuarios, nuevoAdministrador];
        getUsuarios();
    });
</script>

<TituloPagina seccion="gestión de usuarios" titulo="Usuarios" />
<section id="usuarios">
    <div class="container-lg">
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
                <button
                    class="boton-azul"
                    on:click={() => {
                        abrirModalRegistroAdmin();
                    }}>Añadir administrador</button
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
                                {#if usuario.habilitado}
                                    <span
                                        class="badge bg-success fs-6 fw-normal"
                                        >Activo</span
                                    >
                                {:else}
                                    <span class="badge bg-danger fs-6 fw-normal"
                                        >Bloqueado</span
                                    >
                                {/if}</td
                            >
                            <td>{usuario.tipoUsuario.tipo}</td>
                            <td class="text-center">
                                <div
                                    class="d-flex justify-content-center align-items-center"
                                >
                                    <button
                                        class="btn d-inline-flex p-0"
                                        title="Desbloquear usuario"
                                        on:click={() => {
                                            desbloquearUsuario(usuario.id);
                                        }}
                                        ><span
                                            class="material-symbols-outlined link-success fs-3"
                                        >
                                            lock_open_right
                                        </span>
                                    </button>
                                    <button
                                        class="btn d-inline-flex p-0"
                                        title="Bloquear usuario"
                                        on:click={() => {
                                            bloquearUsuario(usuario.id);
                                        }}
                                        ><span
                                            class="material-symbols-outlined link-danger fs-3"
                                        >
                                            lock
                                        </span>
                                    </button>
                                </div>
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
