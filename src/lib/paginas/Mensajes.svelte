<script>
    import Mensaje from "../componentes/Mensaje.svelte";
    import TituloPagina from "../componentes/TituloPagina.svelte";
    import { usuario } from "../utils/store";
    import { getContext, onMount } from "svelte";
    import {
        anadirNotificacionExito,
        anadirNotificacionError,
        anadirNotificacionCargando,
        eliminarNotificacionCargando,
    } from "../utils/utilidadesNotificaciones";
    import { useLocation } from "svelte-navigator";

    const location = useLocation();
    const URL = getContext("URL");

    let usuariosConMensajesIntercambiados = [];
    let usuariosConMensajesIntercambiadosSinLeer = [];
    let usuariosFiltrados = [];
    let mensajes = [];

    const getUsuariosConMensajesIntercambiados = async () => {
        const url = `${URL.mensajes}/usuarios/${$usuario.id}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status === 200) {
            usuariosConMensajesIntercambiados = await response.json();
            usuariosFiltrados = await usuariosConMensajesIntercambiados;
        } else {
            usuariosConMensajesIntercambiados = [];
            usuariosFiltrados = [];
        }
    };

    const getUsuariosConMensajesIntercambiadosSinLeer = async () => {
        const url = `${URL.mensajes}/usuarios/${$usuario.id}/sin-leer`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status === 200) {
            usuariosConMensajesIntercambiadosSinLeer =
                (await response.json()) ?? [];
        } else {
            usuariosConMensajesIntercambiadosSinLeer = [];
        }
    };

    const marcarMensajesLeidos = (mensajes) => {
        const mensajesAMarcarLeidos = mensajes.filter(
            (m) => m.emisor.id !== $usuario.id && !m.leido
        );
        if (mensajesAMarcarLeidos.length === 0) {
            return;
        }
        fetch(`${URL.mensajes}/leidos`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mensajesAMarcarLeidos),
        }).then((response) => {
            if (response.status !== 200) {
                anadirNotificacionError(
                    "Error al marcar los mensajes como leídos"
                );
            } else {
                getUsuariosConMensajesIntercambiadosSinLeer();
            }
        });
    };

    onMount(() => {
        getUsuariosConMensajesIntercambiados();
        getUsuariosConMensajesIntercambiadosSinLeer();
        if ($location.state.destinatario) {
            getConversacion($location.state.destinatario.id);
        }
    });

    const getConversacion = async (idUsuario) => {
        const url = `${URL.mensajes}/usuarios/${$usuario.id}/${idUsuario}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
            },
        });
        if (response.status === 200) {
            mensajes = await response.json();
            if (window.innerWidth < 992) {
                mostrarConversacion();
            }
            marcarMensajesLeidos(mensajes);
        } else {
            crearConversacion();
        }
    };

    const crearConversacion = () => {
        mensajes = [
            {
                emisor: $usuario,
                receptor: $location.state.destinatario,
                contenido: "",
                fechaEnvio: "",
            },
        ];
        $location.state = null;
    };

    const mostrarConversacion = () => {
        document.querySelector(".usuarios").classList.add("d-none");
        document.querySelector(".conversacion").classList.remove("d-none");
    };

    const volverAMostrarUsuarios = () => {
        document.querySelector(".usuarios").classList.remove("d-none");
        document.querySelector(".conversacion").classList.add("d-none");
    };

    const buscarNombre = (mensajes) => {
        if (mensajes[0].emisor.id == $usuario.id) {
            return `${mensajes[0].receptor.nombre} ${
                mensajes[0].receptor.apellido1
            } ${mensajes[0].receptor.apellido2 ?? ""}`;
        } else {
            return `${mensajes[0].emisor.nombre} ${
                mensajes[0].emisor.apellido1
            } ${mensajes[0].emisor.apellido2 ?? ""}`;
        }
    };

    const buscarTipoResidenteYTitulacion = (mensajes) => {
        if (mensajes[0].emisor.id == $usuario.id) {
            return `${mensajes[0].receptor.tipoResidente.tipo} - ${mensajes[0].receptor.titulacion.nombre}`;
        } else {
            return `${mensajes[0].emisor.tipoResidente.tipo} - ${mensajes[0].emisor.titulacion.nombre}`;
        }
    };

    const enviarMensaje = (event) => {
        const contenido = event.target.querySelector("input").value;
        const idReceptor =
            mensajes[0].emisor.id == $usuario.id
                ? mensajes[0].receptor.id
                : mensajes[0].emisor.id;
        const mensaje = {
            contenido,
            emisor: $usuario,
            receptor: { id: idReceptor },
            fechaEnvio: new Date().toJSON(),
        };
        const idNotificacion = anadirNotificacionCargando(
            "Enviando mensaje..."
        );
        fetch(URL.mensajes, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${$usuario.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mensaje),
        }).then((response) => {
            eliminarNotificacionCargando(idNotificacion);
            if (response.status !== 201) {
                anadirNotificacionError("Error al enviar el mensaje");
            } else {
                anadirNotificacionExito("Mensaje enviado correctamente");
                event.target.querySelector("input").value = "";
                getConversacion(idReceptor);
            }
        });
    };

    const filtrarUsuarios = (e) => {
        usuariosFiltrados = usuariosConMensajesIntercambiados.filter((u) =>
            `${u.nombre} ${u.apellido1} ${u.apellido2 ?? ""}`
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
    };

    const ponerScrollAbajo = async () => {
        const mensajesConversacion = document.querySelector(
            "#mensajes-conversacion"
        );
        mensajesConversacion.scrollTop = mensajesConversacion.scrollHeight;
    };
</script>

<TituloPagina seccion="mensajes" titulo="Mensajes" />
<section id="mensajes">
    <div class="container h-100 p-0">
        <div class="card h-100 rounded-0 pb-0">
            <div class="row h-100 g-0">
                <div class="col-12 col-lg-5 col-xl-3 border-end usuarios">
                    <div class="px-4 border-bottom">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <input
                                    type="text"
                                    class="form-control my-3"
                                    placeholder="Buscar usuario"
                                    on:input={filtrarUsuarios}
                                />
                            </div>
                        </div>
                    </div>
                    <ul>
                        {#each usuariosFiltrados as usuarioConMensajeIntercambiado}
                            <li class="border-top border-bottom">
                                <button
                                    class="list-group-item-action border-0 bg-transparent"
                                    class:activo={usuarioConMensajeIntercambiado.id ===
                                        mensajes[0]?.emisor.id ||
                                        usuarioConMensajeIntercambiado.id ===
                                            mensajes[0]?.receptor.id}
                                    class:sin-leer={usuariosConMensajesIntercambiadosSinLeer.some(
                                        (u) =>
                                            u.id ===
                                            usuarioConMensajeIntercambiado.id
                                    )}
                                    on:click={async () => {
                                        await getConversacion(
                                            usuarioConMensajeIntercambiado.id
                                        );
                                        await ponerScrollAbajo();
                                    }}
                                    ><span>
                                        {usuarioConMensajeIntercambiado.nombre}{" "}
                                        {usuarioConMensajeIntercambiado.apellido1}{" "}
                                        {usuarioConMensajeIntercambiado.apellido2 ??
                                            ""}</span
                                    >
                                </button>
                                {#if usuariosConMensajesIntercambiadosSinLeer.some((u) => u.id === usuarioConMensajeIntercambiado.id)}
                                    <span
                                        class="position-absolute alerta-sin-leer p-2 bg-danger rounded-circle"
                                    />
                                {/if}
                            </li>
                        {/each}
                    </ul>
                </div>
                <div
                    class="col-12 col-lg-7 col-xl-9 bg-white conversacion d-none d-lg-block"
                >
                    <div class="container-fluid">
                        <div class="row">
                            {#if mensajes.length === 0}
                                <div class="col-12 p-0 d-none d-lg-block">
                                    <div
                                        class="d-flex flex-column align-items-center justify-content-center sin-mensajes"
                                    >
                                        <h3>Selecciona una conversación</h3>
                                    </div>
                                </div>
                            {:else}
                                <div
                                    class="col-12 py-2 px-3 px-sm-4 border-bottom"
                                >
                                    <div class="d-flex align-items-center py-1">
                                        <button
                                            class="btn btn-link p-0 fs-5 d-lg-none"
                                            on:click={volverAMostrarUsuarios}
                                        >
                                            <i class="fas fa-arrow-left" />
                                        </button>
                                        <div class="flex-grow-1 ps-3 ps-lg-0">
                                            <strong class="nombre-usuario"
                                                >{buscarNombre(
                                                    mensajes
                                                )}</strong
                                            >
                                            <div class="text-muted small">
                                                <em
                                                    >{buscarTipoResidenteYTitulacion(
                                                        mensajes
                                                    )}</em
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="mensajes-conversacion"
                                    class="col-12 mensajes p-4 px-3 px-sm-4"
                                >
                                    {#each mensajes as mensaje}
                                        {#if mensaje.contenido}
                                            {#if mensaje.emisor.id == $usuario.id}
                                                <Mensaje
                                                    {mensaje}
                                                    posicion="derecha"
                                                />
                                            {:else}
                                                <Mensaje
                                                    {mensaje}
                                                    posicion="izquierda"
                                                />
                                            {/if}
                                        {/if}
                                    {/each}
                                </div>
                                <form
                                    class="col-12 flex-grow-0 py-3 px-4 border-top"
                                    on:submit|preventDefault={enviarMensaje}
                                >
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Escribe un mensaje"
                                        />
                                        <button class="btn boton-azul px-3">
                                            <i class="fas fa-paper-plane" />
                                        </button>
                                    </div>
                                </form>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    #mensajes {
        padding-top: 40px;
    }

    .nombre-usuario {
        font-family: "Nunito", sans-serif;
    }

    .usuarios ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .usuarios ul li button {
        font-family: "Nunito", sans-serif;
        padding: 12px 20px;
        font-size: 18px;
        color: #012970 !important;
        transition: 0.3s;
    }

    .usuarios ul li button:hover,
    .usuarios ul li button.activo {
        background-color: #012970 !important;
    }

    .usuarios ul li button span {
        display: inline-block;
        transition: 0.3s;
    }

    .usuarios ul li button:hover span,
    .usuarios ul li button.activo span {
        transform: translateX(10px);
        color: white !important;
    }

    .mensajes {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height: 60vh !important;
    }

    .sin-leer {
        font-weight: 700 !important;
    }

    .alerta-sin-leer {
        transform: translate(-120%, 20%) !important;
    }

    @media (min-width: 992px) {
        .sin-mensajes {
            height: calc(450px + 69.8px + 70.4px) !important;
        }

        .sin-mensajes::before {
            content: "";
            background-image: url(../../assets/conversacion_2.webp);
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 30%;
        }

        .mensajes {
            height: 442.8px !important;
        }
    }

    @media (min-width: 1400px) {
        .sin-mensajes::before {
            background-size: 350px;
        }
    }
</style>
