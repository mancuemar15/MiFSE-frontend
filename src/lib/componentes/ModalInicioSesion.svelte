<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { iniciarSesion } from "../utils/store";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
    } from "../utils/utilidadesNotificaciones";
    import { closeModal } from "svelte-modals";
    import { getContext } from "svelte";

    export let isOpen;
    export let abrirOtra;

    const URL = getContext("URL");

    function enviarFormularioInicioSesion(event) {
        event.preventDefault();
        const formulario = event.target;
        const email = formulario.email.value;
        const contrasena = formulario.contrasena.value;
        const datos = { email, contrasena };
        fetch(`${URL.usuarios}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((response) => {
                if (response.status === 200) {
                    anadirNotificacionExito("Inicio de sesión correcto");
                    closeModal();
                    return response.json();
                } else if (response.status === 401) {
                    anadirNotificacionError("Credenciales incorrectos");
                } else {
                    anadirNotificacionError(
                        "Se ha producido un error al iniciar sesión"
                    );
                }
            })
            .then((data) => {
                iniciarSesion(data);
            })
            .catch(() => {
                anadirNotificacionError(
                    "Se ha producido un error al iniciar sesión"
                );
            });
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
        id="modal-inicio-sesion"
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
                    <h5 class="modal-title">Inicio de sesión</h5>
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
                        on:submit={enviarFormularioInicioSesion}
                    >
                        <div class="row gy-3 gy-lg-4">
                            <div class="col-12 mt-0">
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

                            <div class="col-12">
                                <label
                                    for="contrasena"
                                    class="form-label obligatorio"
                                    >Contraseña</label
                                >
                                <div class="input-group mb-3">
                                    <input
                                        type="password"
                                        id="contrasena"
                                        class="form-control"
                                        name="contrasena"
                                        required
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
                            <div
                                class="col-12 d-flex align-items-center justify-content-end cambio-modal"
                            >
                                <span>¿No tienes cuenta?</span>
                                <button
                                    type="button"
                                    class="btn btn-link px-0 ps-1"
                                    on:click={abrirOtra}>Regístrate</button
                                >
                            </div>

                            <div class="col-md-12 text-center">
                                <button type="submit" class="boton-azul"
                                    >Iniciar sesión</button
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

    .cambio-modal {
        font-family: "Nunito", sans-serif;
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
</style>
