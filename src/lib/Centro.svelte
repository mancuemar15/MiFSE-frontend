<script>
    import { onMount } from "svelte";
    import Footer from "./Footer.svelte";
    import TituloPagina from "./TituloPagina.svelte";

    export let id;

    let imagenCentro = `/img/centro/centro.jpg`;

    let centro = {};

    const getCentro = async () => {
        const response = await fetch(`http://localhost:8090/centros/${id}`);
        centro = await response.json();
    };

    onMount(getCentro);

    // fetch(`/img/centro/${nombre}.jpg`)
    //     .then((response) => {
    //         if (response.ok) {
    //             imagenCentro = `/img/centro/${nombre}.jpg`;
    //         }
    //     })
    //     .catch(() => {
    //         imagenCentro = `/img/centro/centro.jpg`;
    //     });
</script>

<TituloPagina seccion="Centro" titulo={centro.nombre} />
<section id="centro" class="centro">
    <div class="container">
        <div class="row gy-4">
            <div class="col-lg-5">
                <div class="centro-info">
                    <h3>Información del centro</h3>
                    <ul>
                        <li><strong>Category</strong>: Web design</li>
                        <li><strong>Client</strong>: ASU Company</li>
                        <li><strong>Project date</strong>: 01 March, 2020</li>
                        <li>
                            <strong>Project URL</strong>:
                            <a href="#">www.example.com</a>
                        </li>
                        <li><strong>Project date</strong>: 01 March, 2020</li>
                        <li><strong>Project date</strong>: 01 March, 2020</li>
                        <li><strong>Project date</strong>: 01 March, 2020</li>
                        <li><strong>Project date</strong>: 01 March, 2020</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-7">
                <img src={imagenCentro} class="w-100" alt="" />
            </div>
        </div>
    </div>
</section>
<Footer />

<style>
    .centro {
        padding-top: 40px;
    }

    .centro .centro-info {
        padding: 30px;
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
    }

    .centro .centro-info h3 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .centro .centro-info ul {
        list-style: none;
        padding: 0;
        font-size: 15px;
    }

    .centro .centro-info ul li + li {
        margin-top: 10px;
    }
</style>
