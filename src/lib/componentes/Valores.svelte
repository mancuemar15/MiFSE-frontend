<script>
    import imagenInnovacion from "../../assets/valores-innovacion.png";
    import imagenColaboracion from "../../assets/valores-colaboracion.png";
    import imagenSatisfaccion from "../../assets/valores-satisfaccion.png";
</script>

<section id="valores" class="valores">
    <div class="container">
        <header class="header-seccion">
            <h2>VALORES</h2>
            <p>Nuestra manera de hacer las cosas</p>
        </header>

        <div class="row">
            <div class="col-lg-4">
                <div class="box">
                    <img src={imagenInnovacion} class="img-fluid" alt="" />
                    <h3>Innovación</h3>
                    <p>
                        Apostamos por soluciones innovadoras para mejorar la
                        gestión de la información relacionada con la Formación
                        Sanitaria Especializada.
                    </p>
                </div>
            </div>

            <div class="col-lg-4 mt-4 mt-lg-0">
                <div class="box">
                    <img src={imagenColaboracion} class="img-fluid" alt="" />
                    <h3>Colaboración</h3>
                    <p>
                        Creemos en la colaboración como herramienta fundamental
                        para la mejora de la calidad de vida de los residentes.
                    </p>
                </div>
            </div>

            <div class="col-lg-4 mt-4 mt-lg-0">
                <div class="box">
                    <img src={imagenSatisfaccion} class="img-fluid" alt="" />
                    <h3>Satisfacción</h3>
                    <p>
                        Buscamos la satisfacción de todos los usuarios,
                        ofreciendo una experiencia personalizada y adaptada a
                        sus necesidades.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .box {
        padding: 30px;
        box-shadow: 0px 0 5px rgba(1, 41, 112, 0.08);
        text-align: center;
        transition: 0.3s;
        height: 100%;
    }

    .box img {
        padding: 30px 50px;
        transition: 0.5s;
        transform: scale(1.1);
    }

    .box h3 {
        font-size: 24px;
        color: #012970;
        font-weight: 700;
        margin-bottom: 18px;
    }

    .box:hover {
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
    }

    .box:hover img {
        transform: scale(1);
    }
</style>
