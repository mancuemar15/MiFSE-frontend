<script>
    import Caracteristica from "./Caracteristica.svelte";
    import imagenCaracteristicas from "../../assets/caracteristicas.png";

    const caracteristicas = [
        { titulo: "Buscar centros", icono: "bi bi-check" },
        { titulo: "Filtrar centros", icono: "bi bi-check" },
        { titulo: "Realizar tu lista de preferencias", icono: "bi bi-check" },
        { titulo: "Consultar últimas posiciones", icono: "bi bi-check" },
        { titulo: "Contactar con residentes", icono: "bi bi-check" },
        { titulo: "Leer y escribir opiniones", icono: "bi bi-check" },
    ];
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
                    {#each caracteristicas as caracteristica}
                        <div class="col-md-6">
                            <Caracteristica
                                titulo={caracteristica.titulo}
                                icono={caracteristica.icono}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
