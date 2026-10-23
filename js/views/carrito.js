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
 * @returns {HTMLLIElement}
 */
function crearItem(pelicula, cantidad) {
  const item = document.createElement("li");
  item.className = "item-carrito";
  item.dataset.id = String(pelicula.id);

  const nombre = document.createElement("span");
  nombre.className = "nombre-item";
  nombre.textContent = pelicula.nombre;

  const controles = document.createElement("div");
  controles.className = "controles-cantidad";

  const botonRestar = document.createElement("button");
  botonRestar.type = "button";
  botonRestar.dataset.accion = "restar";
  botonRestar.setAttribute(
    "aria-label",
    `Quitar una unidad de ${pelicula.nombre}`,
  );
  botonRestar.textContent = "−";

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.className = "input-cantidad";
  inputCantidad.min = "0";
  inputCantidad.max = String(pelicula.stock);
  inputCantidad.step = "1";
  inputCantidad.value = String(cantidad);
  inputCantidad.dataset.accion = "cantidad";
  inputCantidad.setAttribute("aria-label", `Cantidad de ${pelicula.nombre}`);

  const botonSumar = document.createElement("button");
  botonSumar.type = "button";
  botonSumar.dataset.accion = "sumar";
  botonSumar.setAttribute(
    "aria-label",
    `Agregar una unidad de ${pelicula.nombre}`,
  );
  botonSumar.textContent = "+";
  botonSumar.disabled = cantidad >= pelicula.stock;

  controles.append(botonRestar, inputCantidad, botonSumar);
  item.append(nombre, controles);
  return item;
}

/**
 * Renderiza el carrito completo en el DOM.
 * @param {NodosCarrito} nodos
 * @param {Object} carrito - Módulo de dominio con obtenerItems, estaVacio y calcularTotal.
 * @returns {void}
 */
export function renderizarCarrito(nodos, carrito) {
  const fragmento = document.createDocumentFragment();
  const vacio = carrito.estaVacio();

  carrito.obtenerItems().forEach(({ pelicula, cantidad }) => {
    fragmento.append(crearItem(pelicula, cantidad));
  });

  nodos.lista.replaceChildren(fragmento);
  nodos.mensajeVacio.hidden = !vacio;
  nodos.botonVaciar.disabled = vacio;
  nodos.total.textContent = formatearPrecio(carrito.calcularTotal());
}
