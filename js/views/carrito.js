import { crearElemento } from "../utils/dom.js";
import { formatearPrecio } from "../utils/formato.js";

/** @typedef {import("../data.js").Pelicula} Pelicula */

/**
 * Referencias al DOM del carrito.
 * @typedef {Object} NodosCarrito
 * @property {HTMLElement|null} lista
 * @property {HTMLElement|null} mensajeVacio
 * @property {HTMLElement|null} total
 * @property {HTMLElement|null} botonVaciar
 */

/**
 * Crea el elemento de lista de un ítem del carrito.
 * @param {Pelicula} pelicula
 * @param {number} cantidad
 * @param {boolean} alcanzoStock - Deshabilita el botón de sumar.
 * @returns {HTMLLIElement}
 */
function crearItem(pelicula, cantidad, alcanzoStock) {
  return crearElemento("li", {
    className: "item-carrito",
    dataset: { id: pelicula.id },
    hijos: [
      crearElemento("span", {
        className: "nombre-item",
        textContent: pelicula.nombre,
      }),
      crearElemento("div", {
        className: "controles-cantidad",
        hijos: [
          crearElemento("button", {
            type: "button",
            ariaLabel: `Quitar una unidad de ${pelicula.nombre}`,
            textContent: "−",
            dataset: { accion: "restar" },
          }),
          crearElemento("input", {
            type: "number",
            className: "input-cantidad",
            min: 0,
            max: pelicula.stock,
            step: 1,
            value: cantidad,
            ariaLabel: `Cantidad de ${pelicula.nombre}`,
          }),
          crearElemento("button", {
            type: "button",
            ariaLabel: `Agregar una unidad de ${pelicula.nombre}`,
            textContent: "+",
            disabled: alcanzoStock,
            dataset: { accion: "sumar" },
          }),
        ],
      }),
    ],
  });
}

/**
 * Renderiza el carrito completo en el DOM.
 * @param {NodosCarrito} nodos
 * @param {Object} carrito - Módulo de dominio con obtenerItems, alcanzoStock, estaVacio y calcularTotal.
 * @returns {void}
 */
export function renderizarCarrito(nodos, carrito) {
  const items = carrito
    .obtenerItems()
    .map(({ pelicula, cantidad }) =>
      crearItem(pelicula, cantidad, carrito.alcanzoStock(pelicula.id)),
    );
  const vacio = carrito.estaVacio();

  nodos.lista.replaceChildren(...items);
  nodos.mensajeVacio.hidden = !vacio;
  nodos.botonVaciar.disabled = vacio;
  nodos.total.textContent = formatearPrecio(carrito.calcularTotal());
}
