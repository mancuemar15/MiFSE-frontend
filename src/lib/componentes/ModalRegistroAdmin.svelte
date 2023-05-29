<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { closeModal } from "svelte-modals";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
        anadirNotificacionCargando,
        eliminarNotificacionCargando,
    } from "../utils/utilidadesNotificaciones";
    import { getContext } from "svelte";
    import { usuario } from "../utils/store";

    export let isOpen;

    const URL = getContext("URL");

    function registrarResidente(event) {
        event.preventDefault();
        const formulario = event.target;
        const nombre = formulario.nombre.value;
        const apellido1 = formulario.apellido1.value;
        const apellido2 = formulario.apellido2.value
            ? formulario.apellido2.value
            : null;
        const email = formulario.email.value;
        const contrasena = formulario.contrasena.value;
        const datos = {
            nombre,
            apellido1,
            apellido2,
            email,
            contrasena,
            fechaAlta: new Date().toJSON(),
            tipoUsuario: { id: 1 },
        };
        const idNotificacion = anadirNotificacionCargando(
            "Registrando usuario"
        );
        fetch(`${URL.administradores}/registro`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then(async (response) => {
                eliminarNotificacionCargando(idNotificacion);
                if (response.status === 409) {
                    anadirNotificacionError(
                        "Ya existe un administrador con ese email"
                    );
                } else if (response.status === 201) {
                    anadirNotificacionExito("Registro completado con éxito");
                    closeModal();
                    const usuario = await response.json();
                    const event = new CustomEvent("administradorRegistrado", {
                        detail: usuario,
                    });
                    window.dispatchEvent(event);
                } else {
                    anadirNotificacionError(
                        "No se ha podido registrar el usuario. Inténtelo de nuevo más tarde"
                    );
                }
            })
            .catch(() => {
                anadirNotificacionError(
                    "No se ha podido registrar el usuario. Inténtelo de nuevo más tarde"
                );
            });
    }

    function validarEmail(event) {
        const formulario = event.target.form;
        const email = formulario.email.value;
        const emailConfirmar = formulario.emailConfirmar.value;

        if (email !== emailConfirmar) {
            formulario.emailConfirmar.setCustomValidity(
                "Los correos electrónicos no coinciden"
            );
        } else {
            formulario.emailConfirmar.setCustomValidity("");
        }
    }

    function validarContrasena(event) {
        const formulario = event.target.form;
        const contrasena = formulario.contrasena.value;
        const contrasenaConfirmar = formulario.contrasenaConfirmar.value;

        if (contrasena !== contrasenaConfirmar) {
            formulario.contrasenaConfirmar.setCustomValidity(
                "Las contraseñas no coinciden"
            );
        } else {
            formulario.contrasenaConfirmar.setCustomValidity("");
        }
    }

    const mostrarContrasena = () => {
        const inputContrasena = document.getElementById("contrasena");
        const botonVerContrasena = document.getElementById(
            "boton-ver-contrasena"
        );
        // @ts-ignore
        if (inputContrasena.type === "password") {
            // @ts-ignore
            inputContrasena.type = "text";
            botonVerContrasena.innerHTML = '<i class="bi bi-eye-slash" />';
        } else {
            // @ts-ignore
            inputContrasena.type = "password";
            botonVerContrasena.innerHTML = '<i class="bi bi-eye" />';
        }
    };
</script>

{#if isOpen}
    <div
        class="modal"
        id="modal-registro"
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
                        on:click={closeModal}
                    />
                </div>
                <div class="modal-body">
                    <form
                        class="formulario-inicio-sesion"
                        on:submit={registrarResidente}
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
                                    on:input={validarEmail}
                                />
                            </div>

                            <div class="col-lg-6">
                                <label
                                    for="email-confirmar"
                                    class="form-label obligatorio"
                                    >Repetir email</label
                                >
                                <input
                                    type="email"
                                    id="email-confirmar"
                                    class="form-control"
                                    name="email-confirmar"
                                    required
                                    on:input={validarEmail}
                                />
                            </div>

                            <div class="col-lg-6">
                                <label
                                    for="contrasena"
                                    class="form-label obligatorio"
                                    >Contraseña</label
                                >
                                <div class="input-group">
                                    <input
                                        type="password"
                                        id="contrasena"
                                        class="form-control"
                                        name="contrasena"
                                        required
                                        on:input={validarContrasena}
                                    />
                                    <button
                                        class="btn boton-azul"
                                        type="button"
                                        id="boton-ver-contrasena"
                                        on:click={() => {
                                            mostrarContrasena();
                                        }}><i class="bi bi-eye" /></button
                                    >
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label
                                    for="contrasena-confirmar"
                                    class="form-label obligatorio"
                                    >Repetir contraseña</label
                                >
                                <input
                                    type="password"
                                    id="contrasena-confirmar"
                                    class="form-control"
                                    name="contrasenaConfirmar"
                                    required
                                    on:input={validarContrasena}
                                />
                            </div>
                            <div class="col-md-12 text-center">
                                <button type="submit" class="boton-azul"
                                    >Registrar</button
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

    #boton-ver-contrasena {
        padding: 0 15px !important;
        border-radius: 0 !important;
    }

    #boton-ver-contrasena:hover {
        transform: scale(1);
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
