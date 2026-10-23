const formateadorPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

/**
 * Formatea un precio como moneda.
 * @param {number} precio
 * @returns {string} Precio formateado como moneda es-AR en ARS.
 */
export function formatearPrecio(precio) {
  return formateadorPrecio.format(precio);
}
