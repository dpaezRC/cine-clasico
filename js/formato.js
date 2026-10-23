export function formatearPrecio(precio) {
  return `$${precio.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}
