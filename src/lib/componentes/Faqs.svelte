<script>
    import Faq from "./Faq.svelte";

    const faqs = [
        {
            pregunta: "¿Qué es MiFSE?",
            respuesta:
                "MiFSE es una página web que ofrece una plataforma especializada para los antiguos, actuales y futuros residentes para el intercambio de información relacionada con la Formación Sanitaria Especializada (MIR, EIR, FIR, BIR, QIR, PIR y RFIR).",
        },
        {
            pregunta: "¿Cómo puedo registrarme?",
            respuesta:
                "Para registrarte en MiFSE, debes hacer clic en el botón Empezar en la página principal y completar el formulario de registro con su información personal.",
        },
        {
            pregunta: "¿Qué beneficios obtengo al registrarme?",
            respuesta:
                "Al registrarte, podrás guardar varias listas de preferencias, actualizarlas en cualquier momento y dejar comentarios. Además, podrás enviar y recibir mensajes a otros usuarios de la página web.",
        },
        {
            pregunta: "¿Cómo puedo contribuir a la comunidad de MiFSE?",
            respuesta:
                "Si eres actual o antiguo residente puedes contribuir a la comunidad de MiFSE compartiendo comentarios y calificaciones sobre los centros existentes, y respondiendo a los mensajes de la comunidad.",
        },
        {
            pregunta: "¿Puedo eliminar mi cuenta?",
            respuesta:
                "Sí, puedes eliminar tu cuenta en cualquier momento accediendo al área de usuario y siguiendo los pasos indicados para eliminarla.",
        },
        {
            pregunta: "¿Cómo puedo reportar un problema en la página?",
            respuesta:
                "Puedes contactar a nuestro equipo de soporte al cliente a través del formulario de contacto de esta misma página detallando el problema.",
        },
    ];

    const listaFaq1 = faqs.slice(0, 3);
    const listaFaq2 = faqs.slice(3, 6);

    const faqParent1 = "lista-faq-1";
    const faqParent2 = "lista-faq-2";
</script>

<section id="faq" class="faq">
    <div class="container">
        <header class="header-seccion">
            <h2>FAQs</h2>
            <p>Preguntas frecuentes</p>
        </header>

        <div class="row">
            <div class="col-lg-6">
                <div class="accordion accordion-flush" id={faqParent1}>
                    {#each listaFaq1 as faq, i}
                        <Faq
                            id={`faq-contenido-1-${i}`}
                            pregunta={faq.pregunta}
                            respuesta={faq.respuesta}
                            idParent={faqParent1}
                        />
                    {/each}
                </div>
            </div>
            <div class="col-lg-6">
                <div class="accordion accordion-flush" id={faqParent2}>
                    {#each listaFaq2 as faq, i}
                        <Faq
                            id={`faq-contenido-2-${i}`}
                            pregunta={faq.pregunta}
                            respuesta={faq.respuesta}
                            idParent={faqParent2}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
