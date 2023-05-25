import { closeModal, openModal } from "svelte-modals";
import ModalRegistro from "../componentes/ModalRegistro.svelte";
import ModalInicioSesion from "../componentes/ModalInicioSesion.svelte";
import ModalLista from "../componentes/ModalLista.svelte";
import ModalBorrarCuenta from "../componentes/ModalBorrarCuenta.svelte";
import ModalRegistroAdmin from "../componentes/ModalRegistroAdmin.svelte";

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

function abrirModalRegistroAdmin() {
    openModal(ModalRegistroAdmin);
}

export { abrirModalRegistro, abrirModalInicioSesion, abrirModalLista, abrirModalBorrarCuenta, abrirModalRegistroAdmin };