import { closeModal, openModal } from "svelte-modals";
import ModalRegistro from "./ModalRegistro.svelte";
import ModalInicioSesion from "./ModalInicioSesion.svelte";
import ModalLista from "./ModalLista.svelte";
import ModalBorrarCuenta from "./ModalBorrarCuenta.svelte";
import ModalRegistroAdmin from "./ModalRegistroAdmin.svelte";

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

function abrirModalBorrarCuenta() {
    openModal(ModalBorrarCuenta);
}

function abrirModalRegistroAdmin(usuarios) {
    openModal(ModalRegistroAdmin, { usuarios });
}

export { abrirModalRegistro, abrirModalInicioSesion, abrirModalLista, abrirModalBorrarCuenta, abrirModalRegistroAdmin };