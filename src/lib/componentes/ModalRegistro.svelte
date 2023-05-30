<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { getContext, onMount } from "svelte";
    import { capitalizar } from "../utils/utilidadesString";
    import { closeModal } from "svelte-modals";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
        anadirNotificacionCargando,
        eliminarNotificacionCargando,
    } from "../utils/utilidadesNotificaciones";
    import { Link } from "svelte-navigator";

    export let isOpen;
    export let abrirOtra;

    const URL = getContext("URL");

    let titulaciones = [];
    let tiposResidente = [];

    const getTitulaciones = async () => {
        const response = await fetch(URL.titulaciones);
        if (response.status !== 200) {
            return;
        }
        titulaciones = await response.json();
    };

    const getTiposResidente = async () => {
        const response = await fetch(URL.tiposResidentes);
        if (response.status !== 200) {
            return;
        }
        tiposResidente = await response.json();
    };

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
        const titulacion = formulario.titulacion.value;
        const tipoResidente = formulario.tipoResidente.value;
        const datos = {
            nombre,
            apellido1,
            apellido2,
            email,
            contrasena,
            fechaAlta: new Date().toJSON(),
            titulacion: { id: parseInt(titulacion) },
            tipoResidente: { id: parseInt(tipoResidente) },
            tipoUsuario: { id: 2 },
        };
        const idNotificacion = anadirNotificacionCargando(
            "Registrando usuario"
        );
        fetch(`${URL.residentes}/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((response) => {
                eliminarNotificacionCargando(idNotificacion);
                if (response.status === 409) {
                    anadirNotificacionError(
                        "Ya existe un residente con ese email"
                    );
                } else if (response.status === 201) {
                    anadirNotificacionExito("Registro completado con éxito");
                    closeModal();
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
        const patronContrasena =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        formulario.contrasena.setCustomValidity("");
        formulario.contrasenaConfirmar.setCustomValidity("");
        if (!patronContrasena.test(contrasena)) {
            formulario.contrasena.setCustomValidity(
                "La contraseña debe tener al menos 8 caracteres y contener al menos \nun número, una minúscula, una mayúscula y un símbolo"
            );
        } else if (contrasena !== contrasenaConfirmar) {
            formulario.contrasenaConfirmar.setCustomValidity(
                "Las contraseñas no coinciden"
            );
        } else {
            formulario.contrasena.setCustomValidity("");
            formulario.contrasenaConfirmar.setCustomValidity("");
        }
    }

    onMount(() => {
        getTitulaciones();
        getTiposResidente();
    });

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
                                    name="emailConfirmar"
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
                                    <option value="" selected disabled
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
                                    name="tipoResidente"
                                    id="tipo-residente"
                                    class="form-select"
                                    required
                                >
                                    <option value="" selected disabled
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
                            <div
                                class="col-12 d-lg-flex align-items-center justify-content-between cambio-modal"
                            >
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="check-privacidad"
                                        required
                                    />
                                    <label
                                        class="form-check-label obligatorio"
                                        for="check-privacidad"
                                    >
                                        He leído y acepto la
                                        <Link
                                            to="/politica-privacidad"
                                            class="btn-link"
                                            on:click={() => {
                                                closeModal();
                                            }}
                                        >
                                            política de privacidad
                                        </Link>
                                    </label>
                                </div>
                                <div class="enlace-cambio-modal">
                                    <span>¿Ya tienes cuenta?</span>
                                    <button
                                        type="button"
                                        class="btn btn-link px-0 ps-1"
                                        on:click={abrirOtra}
                                        >Inicia sesión</button
                                    >
                                </div>
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

    .cambio-modal {
        font-family: "Nunito", sans-serif;
    }

    .enlace-cambio-modal {
        display: flex !important;
        align-items: center;
        justify-content: center;
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
