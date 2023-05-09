<script>
    import { navigate } from "svelte-navigator";
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { getNotificationsContext } from "svelte-notifications";
    import { closeModal } from "svelte-modals";
    import { usuario, cerrarSesion } from "./store";

    export let isOpen;

    const { addNotification } = getNotificationsContext();

    const borrarCuenta = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8090/usuarios/${$usuario.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contrasena: e.target.contrasena.value }),
        })
            .then((response) => {
                console.log(response.json());
                if (response.status === 200) {
                    console.log("cuenta borrada");
                    addNotification({
                        text: "La cuenta se ha borrado correctamente",
                        position: "top-right",
                        type: "success",
                        removeAfter: 4000,
                    });
                    closeModal();
                    cerrarSesion();
                    navigate("/");
                } else if (response.status === 401) {
                    console.log("contraseña incorrecta");
                    addNotification({
                        text: "La contraseña no es correcta",
                        position: "top-right",
                        type: "error",
                        removeAfter: 4000,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
</script>

{#if isOpen}
    <div
        class="modal"
        id="modal-borrar-cuenta"
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
                    <h5 class="modal-title">Borrado de cuenta</h5>
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
                        class="formulario-borrar-cuenta"
                        on:submit={borrarCuenta}
                    >
                        <div class="row gy-3 gy-lg-4">
                            <div class="col-12 mt-0">
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

                            <div class="col-md-12 text-center">
                                <button type="submit" class="boton-azul"
                                    >Borrar cuenta</button
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

    .formulario-borrar-cuenta {
        padding: 30px 10px;
        height: 100%;
    }

    .formulario-borrar-cuenta input {
        border-radius: 0;
        box-shadow: none;
        font-size: 14px;
        border-radius: 0;
    }

    .formulario-borrar-cuenta input:focus {
        border-color: #4154f1;
    }

    @media (min-width: 425px) {
        .formulario-borrar-cuenta {
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
