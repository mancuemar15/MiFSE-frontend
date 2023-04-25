<script>
</script>

<section id="contacto" class="contacto">
    <div class="container">
        <header class="header-seccion">
            <h2>CONTACTO</h2>
            <p>Formulario de contacto</p>
        </header>

        <div class="row gy-4">
            <div class="col">
                <form class="formulario-contacto">
                    <div class="row gy-4">
                        <div class="col-md-6">
                            <label for="nombre" class="form-label">Nombre</label
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
                            <label for="email" class="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                class="form-control"
                                name="email"
                                required
                            />
                        </div>

                        <div class="col-md-12">
                            <label for="asunto" class="form-label">Asunto</label
                            >
                            <input
                                type="text"
                                id="asunto"
                                class="form-control"
                                name="asunto"
                                required
                            />
                        </div>

                        <div class="col-md-12">
                            <label for="mensaje" class="form-label"
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

                        <div class="col-md-12 text-center">
                            <!-- <div class="loading">Loading</div>
                            <div class="error-message" />
                            <div class="sent-message">
                                Your message has been sent. Thank you!
                            </div> -->

                            <button type="submit">Enviar</button>
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

    /* .formulario-contacto .error-message {
        display: none;
        color: #fff;
        background: #ed3c0d;
        text-align: left;
        padding: 15px;
        margin-bottom: 24px;
        font-weight: 600;
    }

    .formulario-contacto .sent-message {
        display: none;
        color: #fff;
        background: #18d26e;
        text-align: center;
        padding: 15px;
        margin-bottom: 24px;
        font-weight: 600;
    } */

    /* .formulario-contacto .loading {
        display: none;
        background: #fff;
        text-align: center;
        padding: 15px;
        margin-bottom: 24px;
    }

    .formulario-contacto .loading:before {
        content: "";
        display: inline-block;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        margin: 0 10px -6px 0;
        border: 3px solid #18d26e;
        border-top-color: #eee;
        animation: animate-loading 1s linear infinite;
    } */

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

    .formulario-contacto input {
        padding: 10px 15px;
    }

    .formulario-contacto textarea {
        padding: 12px 15px;
    }

    .formulario-contacto button[type="submit"] {
        background: #4154f1;
        border: 0;
        padding: 10px 30px;
        color: #fff;
        transition: 0.4s;
        border-radius: 4px;
    }

    .formulario-contacto button[type="submit"]:hover {
        background: #5969f3;
    }

    /* @keyframes animate-loading {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    } */
</style>
