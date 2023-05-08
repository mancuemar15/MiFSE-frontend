import { writable } from "svelte/store";

export const centrosFiltrados = writable([]);
export const centrosSeleccionados = writable([]);

export const usuario = writable(JSON.parse(sessionStorage.getItem("usuario")) || null);

usuario.subscribe((value) => {
    sessionStorage.setItem("usuario", JSON.stringify(value));
});

export function iniciarSesion(usuarioNuevo) {
    usuario.set(usuarioNuevo);
}

export function cerrarSesion() {
    usuario.set(null);
    sessionStorage.removeItem("usuario");
}