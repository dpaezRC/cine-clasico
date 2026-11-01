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
 * Callbacks de los controles de cada ítem del carrito.
 * @typedef {Object} AccionesCarrito
 * @property {(id: number) => void} alSumar
 * @property {(id: number) => void} alRestar
 * @property {(id: number, input: HTMLInputElement) => void} alCambiarCantidad
 */

/**
 * Crea el elemento de lista de un ítem del carrito.
 * @param {Pelicula} pelicula
 * @param {number} cantidad
 * @param {boolean} alcanzoStock - Deshabilita el botón de sumar.
 * @param {AccionesCarrito} acciones
 * @returns {HTMLLIElement}
 */
function crearItem(
  pelicula,
  cantidad,
  alcanzoStock,
  { alSumar, alRestar, alCambiarCantidad },
) {
  return crearElemento("li", {
    className: "item-carrito",
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
            onclick: () => alRestar(pelicula.id),
          }),
          crearElemento("input", {
            type: "number",
            className: "input-cantidad",
            min: 0,
            max: pelicula.stock,
            step: 1,
            value: cantidad,
            ariaLabel: `Cantidad de ${pelicula.nombre}`,
            onchange: (evento) => alCambiarCantidad(pelicula.id, evento.target),
          }),
          crearElemento("button", {
            type: "button",
            ariaLabel: `Agregar una unidad de ${pelicula.nombre}`,
            textContent: "+",
            disabled: alcanzoStock,
            onclick: () => alSumar(pelicula.id),
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
 * @param {AccionesCarrito} acciones
 * @returns {void}
 */
export function renderizarCarrito(nodos, carrito, acciones) {
  const items = carrito
    .obtenerItems()
    .map(({ cantidad, ...pelicula }) =>
      crearItem(
        pelicula,
        cantidad,
        carrito.alcanzoStock(pelicula.id),
        acciones,
      ),
    );
  const vacio = carrito.estaVacio();

  nodos.lista.replaceChildren(...items);
  nodos.mensajeVacio.hidden = !vacio;
  nodos.botonVaciar.disabled = vacio;
  nodos.total.textContent = formatearPrecio(carrito.calcularTotal());
}
