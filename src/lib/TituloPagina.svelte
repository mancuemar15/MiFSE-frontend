<script>
    export let seccion;
    export let titulo;
</script>

<section class="titulo-seccion">
    <div class="container">
        <span>{seccion}</span>
        <h2>{titulo}</h2>
    </div>
</section>

<style>
    .titulo-seccion {
        padding: 15px 0;
        background: #012970;
        min-height: 40px;
        margin-top: 77.43px;
        color: #fff;
    }

    .titulo-seccion h2 {
        font-size: 28px;
        font-weight: 500;
        outline: none;
    }

    .titulo-seccion span {
        display: flex;
        font-family: "Nunito", sans-serif;
        font-size: 13px;
        color: #a3bdea;
        font-weight: 700;
        padding: 10px 0;
        text-transform: uppercase;
    }

    @media (min-width: 992px) {
        .titulo-seccion {
            margin-top: 82px;
        }
    }
</style>
