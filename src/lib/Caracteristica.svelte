<script>
    export let titulo;
    export let icono;
</script>

<div class="caracteristica-box d-flex align-items-center">
    <i class={icono} />
    <h3>{titulo}</h3>
</div>

<style>
    .caracteristica-box {
        padding: 24px 20px;
        box-shadow: 0px 0 30px rgba(1, 41, 112, 0.08);
        transition: 0.3s;
        height: 100%;
    }

    .caracteristica-box h3 {
        font-size: 18px;
        color: #012970;
        font-weight: 700;
        margin: 0;
    }

    .caracteristica-box i {
        line-height: 0;
        background: #ecf3ff;
        padding: 4px;
        margin-right: 10px;
        font-size: 24px;
        border-radius: 3px;
        transition: 0.3s;
    }

    .caracteristica-box:hover i {
        background: #4154f1;
        color: #fff;
    }
</style>
