import { writable } from "svelte/store";

export const usuario = writable(null);
export const centrosFiltrados = writable([]);
export const centrosSeleccionados = writable([]);