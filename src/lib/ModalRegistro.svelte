<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { capitalizar } from "./utilidadesString";

    export let open = false;
    export let onClosed;

    let titulaciones = [];
    let tiposResidente = [];

    const modalClose = () => {
        open = false;
        if (onClosed) {
            onClosed();
        }
    };

    const getTitulaciones = async () => {
        const response = await fetch("http://localhost:8090/titulaciones");
        titulaciones = await response.json();
    };

    const getTiposResidente = async () => {
        const response = await fetch("http://localhost:8090/tipos-residentes");
        tiposResidente = await response.json();
    };

    function registrarUsuario(event) {
        event.preventDefault();
        const formulario = event.target;
        const nombre = formulario.nombre.value;
        const email = formulario.email.value;
        const contrasena = formulario.contrasena.value;
        const url = "http://localhost:8090/usuarios";
        const datos = { nombre, email, contrasena };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                // Aquí podrías hacer algo con la respuesta
                console.log("Usuario registrado exitosamente");
                // Cerrar el modal
                modalClose();
            })
            .catch((error) => {
                console.error("Error al registrar usuario:", error);
                // Aquí podrías mostrar un mensaje de error en el formulario
            });
    }

    onMount(() => {
        getTitulaciones();
        getTiposResidente();
    });

    // function iniciarSesion(event) {
    //     event.preventDefault();
    //     const formulario = event.target;
    //     const email = formulario.email.value;
    //     const contrasena = formulario.contrasena.value;
    //     const url = "http://localhost:8090/usuarios/login";
    //     const datos = { email, contrasena };
    //     fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(datos),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(response.statusText);
    //             }
    //             // Aquí podrías hacer algo con la respuesta
    //             console.log("Inicio de sesión exitoso");
    //             // Cerrar el modal
    //             modalClose();
    //         })
    //         .catch((error) => {
    //             console.error("Error al iniciar sesión:", error);
    //             // Aquí podrías mostrar un mensaje de error en el formulario
    //         });
    // }
</script>

{#if open}
    <div
        class="modal"
        id="sampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="sampleModalLabel"
        aria-hidden={false}
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
            in:fly={{ y: -50, duration: 300 }}
            out:fly={{ y: -50, duration: 300, easing: quintOut }}
        >
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">Registro</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        on:click={modalClose}
                    />
                </div>
                <div class="modal-body">
                    <form
                        class="formulario-inicio-sesion"
                        on:submit={registrarUsuario}
                    >
                        <div class="row gy-3 gy-lg-4">
                            <div class="col-lg-4 mt-0 mt-lg-auto">
                                <label
                                    for="nombre"
                                    class="form-label obligatorio">Nombre</label
                                >
                                <input
                                    type="text"
                                    id="nombre"
                                    class="form-control"
                                    name="nombre"
                                    required
                                />
                            </div>
                            <div class="col-lg-4">
                                <label
                                    for="apellido1"
                                    class="form-label obligatorio"
                                    >Primer apellido</label
                                >
                                <input
                                    type="text"
                                    id="apellido1"
                                    class="form-control"
                                    name="apellido1"
                                    required
                                />
                            </div>
                            <div class="col-lg-4">
                                <label for="apellido2" class="form-label"
                                    >Segundo apellido</label
                                >
                                <input
                                    type="text"
                                    id="apellido2"
                                    class="form-control"
                                    name="apellido2"
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label
                                    for="email"
                                    class="form-label obligatorio">Email</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    class="form-control"
                                    name="email"
                                    required
                                />
                            </div>

                            <div class="col-lg-6">
                                <label
                                    for="email-repetir"
                                    class="form-label obligatorio"
                                    >Repetir email</label
                                >
                                <input
                                    type="email"
                                    id="email-repetir"
                                    class="form-control"
                                    name="email-repetir"
                                    required
                                />
                            </div>

                            <div class="col-lg-6">
                                <label
                                    for="contrasena"
                                    class="form-label obligatorio"
                                    >Contraseña</label
                                >
                                <input
                                    type="password"
                                    id="contrasena"
                                    class="form-control"
                                    name="contrasena"
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label
                                    for="contrasena-repetir"
                                    class="form-label obligatorio"
                                    >Repetir contraseña</label
                                >
                                <input
                                    type="password"
                                    id="contrasena-repetir"
                                    class="form-control"
                                    name="contrasena-repetir"
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label
                                    for="titulacion"
                                    class="form-label obligatorio"
                                    >Titulación</label
                                >
                                <select
                                    name="titulacion"
                                    id="titulacion"
                                    class="form-select"
                                    required
                                >
                                    <option value="0" selected disabled
                                        >Selecciona una titulación</option
                                    >
                                    {#each titulaciones as titulacion}
                                        <option value={titulacion.id}
                                            >{capitalizar(
                                                titulacion.nombre
                                            )}</option
                                        >
                                    {/each}
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <label
                                    for="tipo-residente"
                                    class="form-label obligatorio"
                                    >Tipo de residente</label
                                >
                                <select
                                    name="tipo-residente"
                                    id="tipo-residente"
                                    class="form-select"
                                    required
                                >
                                    <option value="0" selected disabled
                                        >Selecciona un tipo de residente</option
                                    >
                                    {#each tiposResidente as tipoResidente}
                                        <option value={tipoResidente.id}
                                            >{capitalizar(
                                                tipoResidente.tipo
                                            )}</option
                                        >
                                    {/each}
                                </select>
                            </div>

                            <div class="col-md-12 text-center">
                                <button type="submit" class="boton-azul"
                                    >Registrarse</button
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
{/if}

<style>
    .modal {
        display: block;
    }

    .modal-content {
        border-radius: 0 !important;
        background: #fafbff;
    }

    .modal-header {
        border-bottom: 0;
        padding: 30px 26px 0;
    }

    .modal-title {
        font-size: 26px;
        font-weight: 700;
        color: #012970;
    }

    .modal-body {
        padding-bottom: 0px;
    }

    .formulario-inicio-sesion {
        padding: 30px 10px;
        height: 100%;
    }

    .formulario-inicio-sesion input {
        border-radius: 0;
        box-shadow: none;
        font-size: 14px;
        border-radius: 0;
    }

    .formulario-inicio-sesion input:focus {
        border-color: #4154f1;
    }

    @media (min-width: 425px) {
        .formulario-inicio-sesion {
            padding: 30px;
        }

        .modal-header {
            padding: 46px 46px 0;
        }

        .modal-body {
            padding-bottom: 16px;
        }
    }

    @media (min-width: 992px) {
        .modal {
            --bs-modal-width: 800px;
        }

        .formulario-inicio-sesion {
            padding-top: 0;
        }
    }
</style>
