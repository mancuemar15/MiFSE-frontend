import { closeModal, openModal } from "svelte-modals";
import ModalRegistro from "./ModalRegistro.svelte";
import ModalInicioSesion from "./ModalInicioSesion.svelte";
import ModalLista from "./ModalLista.svelte";

function abrirModalRegistro() {
    openModal(ModalRegistro, {
        abrirOtra: () => {
            closeModal();
            abrirModalInicioSesion();
        },
    });
}

function abrirModalInicioSesion() {
    openModal(ModalInicioSesion, {
        abrirOtra: () => {
            closeModal();
            abrirModalRegistro();
        },
    });
}

function abrirModalLista(lista) {
    openModal(ModalLista, { lista });
}

export { abrirModalRegistro, abrirModalInicioSesion, abrirModalLista };