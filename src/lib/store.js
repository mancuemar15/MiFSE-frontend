import { writable } from "svelte/store";

// Almacena los centros filtrados
export const centrosFiltrados = writable([]);

// Almacena los centros seleccionados
export const centrosSeleccionados = writable([]);

// Almacena el usuario actualmente autenticado
export const usuario = writable(sessionStorage.getItem("usuario") || null);

// Actualiza sessionStorage cuando cambia el valor de usuario
usuario.subscribe((value) => {
    sessionStorage.setItem("usuario", value);
});

// Define una función para leer y escribir el usuario en sessionStorage
function almacenarUsuarioEnSessionStorage(valor) {
    sessionStorage.setItem("usuario", valor);
}

// Usa la función en vez de repetir el código
usuario.subscribe(almacenarUsuarioEnSessionStorage);

// Define una función para iniciar sesión
export function iniciarSesion(nombreDeUsuario) {
    usuario.set(nombreDeUsuario);
}

// Define una función para cerrar sesión
export function cerrarSesion() {
    usuario.set(null);
    // Elimina la información de autenticación del sessionStorage
    sessionStorage.removeItem("usuario");
}