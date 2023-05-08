<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { iniciarSesion } from "./store";
    import { getNotificationsContext } from "svelte-notifications";
    import { closeModal } from "svelte-modals";

    export let isOpen;
    export let abrirOtra;

    const { addNotification } = getNotificationsContext();

    function enviarFormularioInicioSesion(event) {
        event.preventDefault();
        const formulario = event.target;
        const email = formulario.email.value;
        const contrasena = formulario.contrasena.value;
        const url = "http://localhost:8090/usuarios/login";
        const datos = { email, contrasena };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((response) => {
                if (response.ok) {
                    addNotification({
                        text: "Inicio de sesión correcto",
                        position: "top-right",
                        type: "success",
                        removeAfter: 4000,
                    });
                    iniciarSesion(response.json());
                    closeModal();
                } else {
                    addNotification({
                        text: "Inicio de sesión incorrecto, compruebe sus credenciales",
                        position: "top-right",
                        type: "error",
                        removeAfter: 4000,
                    });
                }
            })
            .catch(() => {
                addNotification({
                    text: "Se ha producido un error al iniciar sesión",
                    position: "top-right",
                    type: "error",
                    removeAfter: 4000,
                });
            });
    }
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
                                <input
                                    type="password"
                                    id="contrasena"
                                    class="form-control"
                                    name="contrasena"
                                    required
                                />
                            </div>
                            <div class="col-12 text-end">
                                <button
                                    type="button"
                                    class="btn btn-link pe-0"
                                    on:click={abrirOtra}
                                    >No estoy registrado, registrarme</button
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
</style>
