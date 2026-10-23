/** @typedef {import("../data.js").Pelicula} Pelicula */

import { obtenerPelicula } from "./catalogo.js";

const cantidades = new Map();

/**
 * Agrega una unidad de la película; no hace nada si no existe o ya alcanzó el stock.
 * @param {number} id
 * @returns {void}
 */
export function agregar(id) {
  fijarCantidad(id, obtenerCantidad(id) + 1);
}

/**
 * Quita una unidad de la película; al bajar de 1 se elimina el ítem.
 * @param {number} id
 * @returns {void}
 */
export function restar(id) {
  fijarCantidad(id, obtenerCantidad(id) - 1);
}

/**
 * Fija la cantidad de la película; cantidad ≤ 0 elimina el ítem y se recorta al stock.
 * @param {number} id
 * @param {number} cantidad
 * @returns {void}
 */
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

/**
 * Vacía el carrito.
 * @returns {void}
 */
export function vaciar() {
  cantidades.clear();
}

/**
 * Devuelve la cantidad actual de la película en el carrito.
 * @param {number} id
 * @returns {number} Cantidad actual (0 si no está en el carrito).
 */
export function obtenerCantidad(id) {
  return cantidades.get(id) || 0;
}

/**
 * Devuelve los ítems del carrito en orden de inserción.
 * @returns {Array<{pelicula: Pelicula, cantidad: number}>} Ítems del carrito en orden de inserción.
 */
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

/**
 * Indica si el carrito está vacío.
 * @returns {boolean}
 */
export function estaVacio() {
  return cantidades.size === 0;
}

/**
 * Calcula el total del carrito.
 * @returns {number} Suma de precio × cantidad.
 */
export function calcularTotal() {
  return obtenerItems().reduce(
    (total, item) => total + item.pelicula.precio * item.cantidad,
    0,
  );
}

/**
 * Normaliza una cantidad al rango válido según el stock.
 * @param {number} valor
 * @param {number} stock
 * @returns {number|null} null si el valor no es finito; si no, truncado y recortado a [0, stock].
 */
export function normalizarCantidad(valor, stock) {
  if (!Number.isFinite(valor)) {
    return null;
  }

  return Math.min(Math.max(Math.trunc(valor), 0), stock);
}
