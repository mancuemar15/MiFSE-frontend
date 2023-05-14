<script>
    import { getContext } from "svelte";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
        anadirNotificacionCargando,
        eliminarNotificacionCargando,
    } from "./utilidadesNotificaciones";

    const URL = getContext("URL");

    const enviarFormulario = (event) => {
        event.preventDefault();

        const formulario = event.target;

        const datos = {
            nombre: formulario.nombre.value,
            email: formulario.email.value,
            asunto: formulario.asunto.value,
            mensaje: formulario.mensaje.value,
        };
        const idNotificacion = anadirNotificacionCargando(
            "Enviando mensaje..."
        );
        fetch(URL.contacto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((response) => {
                if (response.ok) {
                    eliminarNotificacionCargando(idNotificacion);
                    anadirNotificacionExito("Mensaje enviado correctamente");
                    formulario.reset();
                }
            })
            .catch(() => {
                eliminarNotificacionCargando(idNotificacion);
                anadirNotificacionError("Error al enviar el mensaje");
            });
    };
</script>

<section id="contacto" class="contacto">
    <div class="container">
        <header class="header-seccion">
            <h2>CONTACTO</h2>
            <p>Formulario de contacto</p>
        </header>

        <div class="row gy-4">
            <div class="col">
                <form class="formulario-contacto" on:submit={enviarFormulario}>
                    <div class="row gy-3 gy-lg-4">
                        <div class="col-md-6">
                            <label for="nombre" class="form-label obligatorio"
                                >Nombre</label
                            >
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                class="form-control"
                                required
                            />
                        </div>

                        <div class="col-md-6">
                            <label for="email" class="form-label obligatorio"
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

                        <div class="col-12">
                            <label for="asunto" class="form-label obligatorio"
                                >Asunto</label
                            >
                            <input
                                type="text"
                                id="asunto"
                                class="form-control"
                                name="asunto"
                                required
                            />
                        </div>

                        <div class="col-12">
                            <label for="mensaje" class="form-label obligatorio"
                                >Mensaje</label
                            >
                            <textarea
                                class="form-control"
                                id="mensaje"
                                name="mensaje"
                                rows="6"
                                required
                            />
                        </div>
                        <div class="col-12 text-center">
                            <button type="submit" class="boton-azul"
                                >Enviar</button
                            >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<style>
    .formulario-contacto {
        background: #fafbff;
        padding: 30px;
        height: 100%;
    }

    .formulario-contacto input,
    .formulario-contacto textarea {
        border-radius: 0;
        box-shadow: none;
        font-size: 14px;
        border-radius: 0;
    }

    .formulario-contacto input:focus,
    .formulario-contacto textarea:focus {
        border-color: #4154f1;
    }

    .formulario-contacto textarea {
        padding: 12px 15px;
    }
</style>
