function capitalizar(cadena) {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

function quitarAcentos(cadena) {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export { capitalizar, quitarAcentos };
