/** @typedef {import("../data.js").Pelicula} Pelicula */

import {obtenerPelicula} from "./catalogo.js";

/** @type {Array<Pelicula & {cantidad: number}>} */
let items = [];

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
  console.log({evento: "fijarCantidad", id, cantidad, items});
  const pelicula = obtenerPelicula(id);

  if (!pelicula) {
    return;
  }

  if (cantidad <= 0) {
    items = items.filter((item) => item.id !== id);
    console.log({evento: "eliminarItem", id, items});
    return;
  }

  const tope = Math.min(cantidad, pelicula.stock);

  if (items.some((item) => item.id === id)) {
    items = items.map((item) =>
      item.id === id ? {...item, cantidad: tope} : item,
    );
    console.log({evento: "actualizarItem", id, cantidad: tope, items});
    return;
  }

  items = [...items, {...pelicula, cantidad: tope}];
  console.log({evento: "agregarItem", id, cantidad: tope, items});
}

/**
 * Vacía el carrito.
 * @returns {void}
 */
export function vaciar() {
  items = [];
}

/**
 * Devuelve la cantidad actual de la película en el carrito.
 * @param {number} id
 * @returns {number} Cantidad actual (0 si no está en el carrito).
 */
export function obtenerCantidad(id) {
  const item = items.find((item) => item.id === id);
  return item ? item.cantidad : 0;
}

/**
 * Indica si la película ya alcanzó su stock dentro del carrito.
 * @param {number} id
 * @returns {boolean} false si la película no existe.
 */
export function alcanzoStock(id) {
  const pelicula = obtenerPelicula(id);
  return pelicula !== undefined && obtenerCantidad(id) >= pelicula.stock;
}

/**
 * Devuelve los ítems del carrito en orden de inserción.
 * @returns {Array<Pelicula & {cantidad: number}>} Ítems del carrito en orden de inserción.
 */
export const obtenerItems = () => items;


/**
 * Indica si el carrito está vacío.
 * @returns {boolean}
 */
export const estaVacio = () => items.length === 0;


/**
 * Calcula el total del carrito.
 * @returns {number} Suma de precio × cantidad.
 */
export function calcularTotal() {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
