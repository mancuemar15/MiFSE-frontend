<script>
    export let id;
    export let pregunta;
    export let respuesta;
    export let idParent;
</script>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${id}`}
        >
            {pregunta}
        </button>
    </h2>
    <div
        {id}
        class="accordion-collapse collapse"
        data-bs-parent={`#${idParent}`}
    >
        <div class="accordion-body">
            {respuesta}
        </div>
    </div>
</div>

<style>
    .accordion-collapse {
        border: 0;
    }

    .accordion-button {
        padding: 15px 15px 20px 0;
        font-weight: 600;
        border: 0;
        font-size: 18px;
        color: #444444;
        text-align: left;
    }

    .accordion-button:focus {
        box-shadow: none;
    }

    .accordion-button:not(.collapsed) {
        background: none;
        color: #4154f1;
        border-bottom: 0;
    }

    .accordion-body {
        padding: 0 0 25px 0;
        border: 0;
    }
</style>
