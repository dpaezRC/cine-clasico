import { PELICULAS } from "./data.js";
import * as carrito from "./services/carrito.js";
import {
  renderizarCatalogo,
  sincronizarBotones,
} from "./views/catalogo.js";
import { renderizarCarrito } from "./views/carrito.js";

const grillaPeliculas = document.getElementById("grilla-peliculas");

/** @type {import("./views/carrito.js").NodosCarrito} */
const nodosCarrito = {
  lista: document.getElementById("lista-carrito"),
  mensajeVacio: document.getElementById("carrito-vacio"),
  total: document.getElementById("total-carrito"),
  botonVaciar: document.getElementById("vaciar-carrito"),
};

/**
 * Re-renderiza el carrito y sincroniza los botones del catálogo.
 * @returns {void}
 */
function actualizarVistas() {
  renderizarCarrito(nodosCarrito, carrito, {
    alSumar: sumar,
    alRestar: restar,
    alCambiarCantidad: cambiarCantidad,
  });
  sincronizarBotones(grillaPeliculas, carrito);
}

/**
 * Agrega una unidad de la película al carrito.
 * @param {number} id
 * @returns {void}
 */
function sumar(id) {
  carrito.agregar(id);
  actualizarVistas();
}

/**
 * Quita una unidad de la película del carrito.
 * @param {number} id
 * @returns {void}
 */
function restar(id) {
  carrito.restar(id);
  actualizarVistas();
}

/**
 * Aplica la cantidad ingresada en el input del carrito; si no es un número, la revierte.
 * @param {number} id
 * @param {HTMLInputElement} input
 * @returns {void}
 */
function cambiarCantidad(id, input) {
  const cantidad = Number(input.value);

  if (input.value === "" || !Number.isFinite(cantidad)) {
    input.value = String(carrito.obtenerCantidad(id));
    return;
  }

  carrito.fijarCantidad(id, Math.trunc(cantidad));
  actualizarVistas();
}

/**
 * Vacía el carrito y actualiza las vistas.
 * @returns {void}
 */
function vaciarCarrito() {
  carrito.vaciar();
  actualizarVistas();
}

/**
 * Realiza el render inicial y asigna el handler del botón estático de vaciar.
 * @returns {void}
 */
function inicializar() {
  renderizarCatalogo(grillaPeliculas, PELICULAS, { alAgregar: sumar });
  actualizarVistas();
  nodosCarrito.botonVaciar.onclick = vaciarCarrito;
}

inicializar();
