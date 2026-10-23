import { obtenerPelicula } from "./catalogo.js";

const cantidades = new Map();

export function agregar(id) {
  const pelicula = obtenerPelicula(id);

  if (!pelicula) {
    return;
  }

  const cantidadActual = cantidades.get(id) || 0;

  if (cantidadActual >= pelicula.stock) {
    return;
  }

  fijarCantidad(id, cantidadActual + 1);
}

export function restar(id) {
  const cantidadActual = cantidades.get(id);

  if (cantidadActual === undefined) {
    return;
  }

  fijarCantidad(id, cantidadActual - 1);
}

export function fijarCantidad(id, cantidad) {
  const pelicula = obtenerPelicula(id);

  if (!pelicula) {
    return;
  }

  if (cantidad <= 0) {
    cantidades.delete(id);
    return;
  }

  cantidades.set(id, Math.min(cantidad, pelicula.stock));
}

export function vaciar() {
  cantidades.clear();
}

export function obtenerCantidad(id) {
  return cantidades.get(id) || 0;
}

export function obtenerItems() {
  const items = [];

  cantidades.forEach((cantidad, id) => {
    const pelicula = obtenerPelicula(id);

    if (pelicula) {
      items.push({ pelicula, cantidad });
    }
  });

  return items;
}

export function estaVacio() {
  return cantidades.size === 0;
}

export function calcularTotal() {
  return obtenerItems().reduce(
    (total, item) => total + item.pelicula.precio * item.cantidad,
    0,
  );
}

export function normalizarCantidad(valor, stock) {
  if (!Number.isFinite(valor)) {
    return null;
  }

  return Math.min(Math.max(Math.trunc(valor), 0), stock);
}
