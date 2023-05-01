<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { usuario } from "./store";

    export let open = false;
    export let onClosed;

    const modalClose = () => {
        open = false;
        if (onClosed) {
            onClosed();
        }
    };

    function iniciarSesion(event) {
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
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                // Aquí podrías hacer algo con la respuesta
                console.log("Inicio de sesión exitoso");
                $usuario = response.json();
                // Cerrar el modal
                modalClose();
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error);
                // Aquí podrías mostrar un mensaje de error en el formulario
            });
    }
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
                    <h5 class="modal-title">Inicio de sesión</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        on:click={modalClose}
                    />
                </div>
                <div class="modal-body">
                    <div class="row gy-4">
                        <div class="col">
                            <form
                                class="formulario-inicio-sesion"
                                on:submit={iniciarSesion}
                            >
                                <div class="row gy-4">
                                    <div class="col-md-12 mt-0">
                                        <label
                                            for="email"
                                            class="form-label obligatorio"
                                            >Email</label
                                        >
                                        <input
                                            type="email"
                                            id="email"
                                            class="form-control"
                                            name="email"
                                            required
                                        />
                                    </div>

                                    <div class="col-md-12">
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
                                        <button type="submit"
                                            >Iniciar sesión</button
                                        >
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
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
        font-size: 22px;
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

    .formulario-inicio-sesion input {
        padding: 10px 15px;
    }

    .formulario-inicio-sesion button[type="submit"] {
        background: #4154f1;
        border: 0;
        padding: 10px 30px;
        color: #fff;
        transition: 0.4s;
        border-radius: 4px;
    }

    .formulario-inicio-sesion button[type="submit"]:hover {
        background: #5969f3;
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
