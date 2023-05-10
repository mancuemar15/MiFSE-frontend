<script>
    import { Link, useNavigate } from "svelte-navigator";
    import logoMifse from "../assets/logo-mifse.svg";

    const navigate = useNavigate();
    const opcionesFooter = [
        {
            titulo: "Links útiles",
            enlaces: [
                { texto: "Inicio", ruta: "/" },
                { texto: "Valores", ruta: "/#valores" },
                { texto: "Características", ruta: "/" },
                { texto: "FAQs", ruta: "/" },
                { texto: "Contacto", ruta: "/" },
                { texto: "Últimas posiciones", ruta: "/ultimas-posiciones" },
                {
                    texto: "Política de privacidad",
                    ruta: "/politica-privacidad",
                },
            ],
        },
        {
            titulo: "Haz tu lista",
            enlaces: [
                { texto: "Biología", ruta: "/lista/biologia" },
                { texto: "Enfermería", ruta: "/lista/enfermeria" },
                { texto: "Farmacia", ruta: "/lista/farmacia" },
                { texto: "Física", ruta: "/lista/fisica" },
                { texto: "Medicina", ruta: "/lista/medicina" },
                { texto: "Psicología", ruta: "/lista/psicologia" },
                { texto: "Química", ruta: "/lista/quimica" },
            ],
        },
    ];
</script>

<footer id="footer" class="footer">
    <div class="footer-top">
        <div class="container">
            <div class="row gy-4">
                <div class="col-md-6 col-xl-8 col-sm-12 footer-info">
                    <div class="logo d-flex align-items-center">
                        <img src={logoMifse} alt="" />
                    </div>
                    <div class="social-links mt-3">
                        <a href="#" class="twitter"
                            ><i class="bi bi-twitter" /></a
                        >
                        <a href="#" class="facebook"
                            ><i class="bi bi-facebook" /></a
                        >
                        <a href="#" class="instagram"
                            ><i class="bi bi-instagram" /></a
                        >
                    </div>
                </div>

                {#each opcionesFooter as opcion}
                    <div class="col-md-3 col-xl-2 col-6 footer-links">
                        <h4>{opcion.titulo}</h4>
                        <ul>
                            {#each opcion.enlaces as enlace}
                                <li>
                                    <i class="bi bi-chevron-right" />
                                    <!-- <button
                                        class="btn btn-link"
                                        on:click={() => {
                                            navigate(enlace.ruta);
                                        }}>{enlace.texto}</button
                                    > -->
                                    <Link to={enlace.ruta}>{enlace.texto}</Link>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="container">
        <div class="copyright">
            &copy; Copyright <strong><span>Manuel Cuevas Martín</span></strong>.
            Todos los derechos reservados.
        </div>
    </div>
</footer>

<style>
    #footer {
        background: #f6f9ff;
        padding: 0 0 30px 0;
        font-size: 14px;
    }

    .footer-top {
        background: white url(../assets/bg-footer3.png) no-repeat right top;
        background-size: contain;
        border-top: 1px solid #e1ecff;
        border-bottom: 1px solid #e1ecff;
        padding: 60px 0 30px 0;
    }

    @media (max-width: 992px) {
        .footer-top {
            background-position: center bottom;
        }
    }

    .footer-top .footer-info {
        margin-bottom: 30px;
    }

    .footer-top .footer-info .logo {
        line-height: 0;
        margin-bottom: 15px;
    }

    .footer-top .footer-info .logo img {
        max-height: 70px;
        margin-right: 6px;
    }

    .footer-top .social-links a {
        font-size: 20px;
        display: inline-block;
        color: rgba(1, 41, 112, 0.5);
        line-height: 0;
        margin-right: 10px;
        transition: 0.3s;
    }

    .footer-top .social-links a:hover {
        color: #012970;
    }

    .footer-top h4 {
        font-size: 16px;
        font-weight: bold;
        color: #012970;
        text-transform: uppercase;
        position: relative;
        padding-bottom: 12px;
    }

    .footer-top .footer-links {
        margin-bottom: 30px;
    }

    .footer-top .footer-links ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-top .footer-links ul i {
        padding-right: 2px;
        color: #d0d4fc;
        font-size: 12px;
        line-height: 0;
    }

    .footer-top .footer-links ul li {
        padding: 10px 0;
        display: flex;
        align-items: center;
    }

    .footer-top .footer-links ul li:first-child {
        padding-top: 0;
    }

    :global(.footer-top .footer-links ul a) {
        color: #013289;
        transition: 0.3s;
        display: inline-block;
        text-decoration: none;
        line-height: 1;
    }

    :global(.footer-top .footer-links ul a:hover) {
        color: #4154f1;
    }

    .copyright {
        text-align: center;
        padding-top: 30px;
        color: #012970;
    }
</style>
