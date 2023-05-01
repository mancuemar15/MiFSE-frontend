import { closeModal, openModal } from "svelte-modals";
import ModalRegistro from "./ModalRegistro.svelte";
import ModalInicioSesion from "./ModalInicioSesion.svelte";

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

export { abrirModalRegistro, abrirModalInicioSesion };