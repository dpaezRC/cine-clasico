const formateadorPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export function formatearPrecio(precio) {
  return formateadorPrecio.format(precio);
}
