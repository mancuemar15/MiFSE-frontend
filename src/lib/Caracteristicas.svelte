<script>
    import imagenCaracteristicas from "../assets/caracteristicas.png";
</script>

<section id="caracteristicas" class="caracteristicas">
    <div class="container">
        <header class="header-seccion">
            <h2>CARACTERÍSTICAS</h2>
            <p>Descubre todo lo que puedes hacer</p>
        </header>

        <div class="row">
            <div class="col-lg-6">
                <img src={imagenCaracteristicas} class="img-fluid" alt="" />
            </div>

            <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
                <div class="row align-self-center gy-4">
                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Buscar centros</h3>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Filtrar centros</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Realizar tu lista de preferencias</h3>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Consultar últimas posiciones</h3>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Contactar con residentes</h3>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div
                            class="caracteristica-box d-flex align-items-center"
                        >
                            <i class="bi bi-check" />
                            <h3>Leer y escribir opiniones</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .caracteristicas .caracteristica-box {
        padding: 24px 20px;
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
        transition: 0.3s;
        height: 100%;
    }

    .caracteristicas .caracteristica-box h3 {
        font-size: 18px;
        color: #012970;
        font-weight: 700;
        margin: 0;
    }

    .caracteristicas .caracteristica-box i {
        line-height: 0;
        background: #ecf3ff;
        padding: 4px;
        margin-right: 10px;
        font-size: 24px;
        border-radius: 3px;
        transition: 0.3s;
    }

    .caracteristicas .caracteristica-box:hover i {
        background: #4154f1;
        color: #fff;
    }

    .caracteristicas .feture-tabs h3 {
        color: #012970;
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        .caracteristicas .feture-tabs h3 {
            font-size: 28px;
        }
    }

    .caracteristicas .feture-tabs .tab-content i {
        font-size: 24px;
        line-height: 0;
        margin-right: 8px;
        color: #4154f1;
    }

    .caracteristicas .caracteristica-icons h3 {
        color: #012970;
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 20px;
        text-align: center;
    }

    @media (max-width: 768px) {
        .caracteristicas .caracteristica-icons h3 {
            font-size: 28px;
        }
    }

    .caracteristicas .caracteristica-icons .content .icon-box i {
        font-size: 44px;
        line-height: 44px;
        color: #0245bc;
        margin-right: 15px;
    }

    .caracteristicas .caracteristica-icons .content .icon-box p {
        font-size: 15px;
        color: #848484;
    }
</style>
