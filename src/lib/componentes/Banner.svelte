<script>
    import imagenBanner from "../../assets/banner.webp";
    import { abrirModalRegistro } from "../utils/utilidadesModales";
</script>

<section id="banner" class="banner d-flex align-items-center">
    <div class="container">
        <div class="row">
            <div
                class="col-lg-6 d-flex flex-column justify-content-center text-center text-md-start"
            >
                <h1>Toda la información para tu residencia en MiFSE</h1>
                <h2>
                    Encuentra los centros que mejor se ajustan a tus necesidades
                    y crea tu lista de preferencias
                </h2>
                <div>
                    <div class="text-center text-lg-start">
                        <button
                            type="button"
                            class="btn boton-empezar d-inline-flex align-items-center justify-content-center align-self-center"
                            on:click={abrirModalRegistro}
                            >Empezar
                            <i class="bi bi-arrow-right" /></button
                        >
                    </div>
                </div>
            </div>
            <div class="col-lg-6 banner-img">
                <img src={imagenBanner} class="img-fluid w-100" alt="" />
            </div>
        </div>
    </div>
</section>

<style>
    .banner {
        width: 100%;
        background: url(/src/assets/bg.webp) top center no-repeat;
        background-size: cover;
        padding: 120px 0 60px 0;
        height: auto;
    }

    h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: #012970;
        outline: transparent;
    }

    h2 {
        color: #444444;
        margin: 15px 0 0 0;
        font-size: 24px;
    }

    .boton-empezar {
        margin-top: 30px;
        line-height: 0;
        padding: 15px 40px !important;
        border-radius: 4px;
        transition: 0.5s;
        color: #fff;
        background: #4154f1;
        box-shadow: 0px 5px 30px rgba(65, 84, 241, 0.4);
        font-family: "Nunito", sans-serif;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 1px;
    }

    .boton-empezar i {
        margin-left: 5px;
        font-size: 18px;
        transition: 0.3s;
    }

    .boton-empezar:hover i {
        transform: translateX(5px);
    }

    .banner-img {
        margin-top: 80px;
        text-align: right;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 48px;
        }

        h2 {
            font-size: 26px;
        }

        .banner-img img {
            width: 80%;
        }
    }

    @media (min-width: 992px) {
        .banner {
            height: 100vh;
        }

        .banner-img img {
            width: 100%;
        }
    }

    @media (min-width: 1024px) {
        .banner {
            background-attachment: fixed;
        }
    }
</style>
